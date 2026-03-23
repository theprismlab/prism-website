<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const meshConfig = {
    // ── Camera ──
    fov: 25,
    cameraDistance: 50,
    cameraPosition: [0, 16.5, 25],
    cameraLookAt: [0, 16.5, 0],
    nearClip: 1.01,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,

    // ── Planes / Mesh ──
    planeZoom: 10.8,
    planeWidthMultiplier: 1.6,
    planeYPosition: 1,
    planeOpacityRange: [0.5, 1],

    // ── Y-axis spread ──
    ySpread: 12,
};

const props = defineProps({
    data: { type: Array, required: true },
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const config = { ...meshConfig, ...props.sceneConfig };
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    buildMesh(props.data);

    await new Promise(r => requestAnimationFrame(r));
    scene.render();

    scene.onRebuild(() => buildMesh(props.data));
});

// ── Scale Computation ──

function computeScales(data) {
    const { fov, cameraDistance } = config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);
    const valueExtent = d3.extent(data, d => d.viability);

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const sceneWidth = visibleWidth;
    const planeWidth = sceneWidth / xExtent[1];
    const planeHeight = visibleHeight / Math.max(zExtent[1], 1);

    const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    const yScale = d3.scaleLinear().domain(valueExtent).range([config.ySpread, -config.ySpread]);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(config.planeOpacityRange);

    return {
        xScale, zScale, yScale, opacityScale,
        xOffset: sceneWidth / 2,
        zOffset: visibleHeight / 2,
        planeWidth, planeHeight,
    };
}

// ── Mesh Creation ──

function buildMesh(data) {
    const scales = computeScales(data);
    const { xScale, zScale, yScale, xOffset, zOffset } = scales;
    const { planeZoom } = config;

    // Build a lookup: grid[z][x] = datum
    const grid = new Map();
    let maxX = 0, maxZ = 0;
    data.forEach(d => {
        if (!grid.has(d.z)) grid.set(d.z, new Map());
        grid.get(d.z).set(d.x, d);
        if (d.x > maxX) maxX = d.x;
        if (d.z > maxZ) maxZ = d.z;
    });

    const zKeys = [...grid.keys()].sort((a, b) => a - b);
    const xKeys = [...new Set(data.map(d => d.x))].sort((a, b) => a - b);
    const cols = xKeys.length;
    const rows = zKeys.length;

    // Map grid coords to sequential indices
    const xIdx = new Map(xKeys.map((k, i) => [k, i]));
    const zIdx = new Map(zKeys.map((k, i) => [k, i]));

    // Vertex arrays
    const positions = new Float32Array(cols * rows * 3);
    const colors = new Float32Array(cols * rows * 3);

    for (let rr = 0; rr < rows; rr++) {
        const zk = zKeys[rr];
        const rowMap = grid.get(zk);
        for (let cc = 0; cc < cols; cc++) {
            const xk = xKeys[cc];
            const idx = rr * cols + cc;
            const d = rowMap?.get(xk);

            const px = (xScale(xk) - xOffset) * planeZoom;
            const pz = (zScale(zk) - zOffset) * planeZoom;
            const py = d
                ? config.planeYPosition + yScale(d.viability)
                : config.planeYPosition;

            positions[idx * 3]     = px;
            positions[idx * 3 + 1] = py;
            positions[idx * 3 + 2] = pz;

            if (d) {
                colors[idx * 3]     = d.rgba.r;
                colors[idx * 3 + 1] = d.rgba.g;
                colors[idx * 3 + 2] = d.rgba.b;
            } else {
                colors[idx * 3] = colors[idx * 3 + 1] = colors[idx * 3 + 2] = 0.8;
            }
        }
    }

    // Triangle indices — two triangles per grid cell
    const indices = [];
    for (let rr = 0; rr < rows - 1; rr++) {
        for (let cc = 0; cc < cols - 1; cc++) {
            const tl = rr * cols + cc;
            const tr = tl + 1;
            const bl = (rr + 1) * cols + cc;
            const br = bl + 1;
            indices.push(tl, bl, tr);
            indices.push(tr, bl, br);
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshLambertMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    scene.scene.add(mesh);
}
</script>
