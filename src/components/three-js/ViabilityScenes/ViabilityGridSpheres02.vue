<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const sphereConfig = {
    // ── Camera ──
    fov: 25,
    cameraDistance: 100,
    cameraPosition: [0, 16.5, 25],
    cameraLookAt: [0, 12.5, 0],
    nearClip: 1.01,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,

    // ── Layout ──
    planeZoom: 10.8,
    planeYPosition: 1,
    ySpread: 12,

    // ── Spheres ──
    sphereRadius: 0.4,
    sphereSegments: 16,
    planeOpacityRange: [0.4, 1],
    animSpeed: 0.5,         // fraction of the gap covered per second
};

const props = defineProps({
    data: { type: Array, required: true },
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const config = { ...sphereConfig, ...props.sceneConfig };
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    buildSpheres(props.data);

    // OrbitControls for rotation/zoom/pan
    const controls = new OrbitControls(scene.camera, canvasEl.value);
    controls.target.set(...config.cameraLookAt);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.update();

    scene.onAnimate(() => {
        controls.update();
    });

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    scene.onRebuild(() => buildSpheres(props.data));
});

// ── Scale Computation (same as ViabilityMesh) ──

function computeScales(data) {
    const { fov, cameraDistance } = config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);
    const valueExtent = d3.extent(data, d => d.viability);
    const numZRows = zExtent[1] - zExtent[0] + 1;

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const sceneWidth = visibleWidth;
    const zHeight = numZRows * config.sphereRadius * 2;

    const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, zHeight]);
    const yScale = d3.scaleLinear().domain(valueExtent).range([config.ySpread, -config.ySpread]);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(config.planeOpacityRange);

    return {
        xScale, zScale, yScale, opacityScale,
        xOffset: sceneWidth / 2,
        zOffset: zHeight / 2,
    };
}

// ── Sphere Creation & Animation ──

function buildSpheres(data) {
    const { xScale, zScale, yScale, opacityScale, xOffset, zOffset } = computeScales(data);
    const { planeZoom, planeYPosition } = config;

    const geometry = new THREE.SphereGeometry(config.sphereRadius, config.sphereSegments, config.sphereSegments);

    // Group data by x (columns) for y-cycle, and by z (rows) for x-cycle
    const columnMap = new Map();
    const rowMap = new Map();
    data.forEach(d => {
        if (!columnMap.has(d.x)) columnMap.set(d.x, []);
        columnMap.get(d.x).push(d);
        if (!rowMap.has(d.z)) rowMap.set(d.z, []);
        rowMap.get(d.z).push(d);
    });
    columnMap.forEach(col => col.sort((a, b) => a.z - b.z));
    rowMap.forEach(row => row.sort((a, b) => a.x - b.x));

    // Pre-compute x positions per row and y positions per column
    const yPosByCol = new Map();
    columnMap.forEach((colData, xKey) => {
        yPosByCol.set(xKey, colData.map(d => planeYPosition + yScale(d.viability)));
    });

    const xPosByRow = new Map();
    rowMap.forEach((rowData, zKey) => {
        xPosByRow.set(zKey, rowData.map(d => (xScale(d.x) - xOffset) * planeZoom));
    });

    // Draw a red line path for each x-group through its (x, y, z) points
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const curveByCol = new Map();

    columnMap.forEach((colData, xKey) => {
        const points = colData.map(d => {
            const px = (xScale(d.x) - xOffset) * planeZoom;
            const py = planeYPosition + yScale(d.viability);
            const pz = (zScale(d.z) - zOffset) * planeZoom;
            return new THREE.Vector3(px, py, pz);
        });

        const curve = new THREE.CatmullRomCurve3(points);
        curveByCol.set(xKey, curve);
        const curvePoints = curve.getPoints(points.length * 20);
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.scene.add(line);
    });

    // Build spheres and track animation state
    const animatedSpheres = [];

    columnMap.forEach((colData, xKey) => {
        const curve = curveByCol.get(xKey);
        const numInCol = colData.length;

        colData.forEach((d, colIdx) => {
            const material = new THREE.MeshStandardMaterial({
                color: d.rgba,
                transparent: true,
                opacity: opacityScale(d.z),
                roughness: 0.3,
                metalness: 0.0,
            });

            const sphere = new THREE.Mesh(geometry, material);
            sphere.castShadow = true;

            const xPositions = xPosByRow.get(d.z);
            const rowData = rowMap.get(d.z);
            const rowIdx = rowData.findIndex(rd => rd.x === d.x);

            const px = (xScale(d.x) - xOffset) * planeZoom;
            const pz = (zScale(d.z) - zOffset) * planeZoom;

            sphere.position.set(px, planeYPosition + yScale(d.viability), pz);
            scene.scene.add(sphere);

            animatedSpheres.push({
                sphere,
                curve,
                curveT: colIdx / numInCol,
                xPositions,
                xIndex: rowIdx,
                xProgress: 0,
            });
        });
    });

    let prevElapsed = 0;
    scene.onAnimate((elapsed) => {
        const dt = elapsed - prevElapsed;
        prevElapsed = elapsed;

        animatedSpheres.forEach(s => {
            // Advance along the curve
            s.curveT += dt * config.animSpeed * 0.1;
            if (s.curveT >= 1) s.curveT -= 1;

            // Sample y and z from the curve, keep x fixed
            const pt = s.curve.getPoint(s.curveT);
            s.sphere.position.y = pt.y;
            s.sphere.position.z = pt.z;
        });
    });
}
</script>
