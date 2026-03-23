<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const props = defineProps({
    data: { type: Array, required: true },
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, props.sceneConfig);
const { config } = scene;

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
    const { xScale, zScale, yScale, opacityScale, xOffset, zOffset, planeWidth, planeHeight } = scales;
    const { planeZoom, planeWidthMultiplier } = config;

    data.forEach(d => {
        const w = planeWidth * planeWidthMultiplier * planeZoom;
        const h = planeHeight * planeZoom;
        const geometry = new THREE.PlaneGeometry(w, h);
        const material = new THREE.MeshLambertMaterial({
            color: d.rgba,
            side: THREE.DoubleSide,
            opacity: opacityScale(d.z),
            transparent: true,
            depthWrite: false,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.receiveShadow = true;
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(
            (xScale(d.x) - xOffset) * planeZoom,
            config.planeYPosition + yScale(d.viability),
            (zScale(d.z) - zOffset) * planeZoom,
        );
        scene.scene.add(mesh);
    });
}
</script>
