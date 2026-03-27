<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from '../useViabilityScene.js';

const heatmapConfig = {
    // ── Camera ──
    fov: 25,
    cameraDistance: 25,
    cameraPosition: [0, 4.5, 25],
    cameraLookAt: [0, 6.5, 0],
    nearClip: 1.01,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,

    // ── Planes ──
    planeZoom: 10.8,
    planeWidthMultiplier: 1.6,
    planeYPosition: 1,
    planeOpacityRange: [0.5, 1],
};

const props = defineProps({
    data: { type: Array, required: true },
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const config = { ...heatmapConfig, ...props.sceneConfig };
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    buildPlanes(props.data);

    await new Promise(r => requestAnimationFrame(r));
    scene.render();

    scene.onRebuild(() => buildPlanes(props.data));
});

// ── Scale Computation ──

function computeScales(data) {
    const { fov, cameraDistance } = config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const sceneWidth = visibleWidth;
    const planeWidth = sceneWidth / xExtent[1];
    const planeHeight = visibleHeight / Math.max(zExtent[1], 1);

    const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(config.planeOpacityRange);

    return {
        xScale, zScale, opacityScale,
        xOffset: sceneWidth / 2,
        zOffset: visibleHeight / 2,
        planeWidth, planeHeight,
    };
}

// ── Plane Creation ──

function buildPlanes(data) {
    const scales = computeScales(data);
    const { xScale, zScale, opacityScale, xOffset, zOffset, planeWidth, planeHeight } = scales;
    const { planeZoom, planeWidthMultiplier, planeYPosition } = config;

    data.forEach(d => {
        const geometry = new THREE.PlaneGeometry(
            planeWidth * planeWidthMultiplier * planeZoom,
            planeHeight * planeZoom,
        );
        const material = new THREE.MeshLambertMaterial({
            color: d.rgba,
            side: THREE.DoubleSide,
            opacity: opacityScale(d.z),
            transparent: true,
            depthWrite: false,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(
            (xScale(d.x) - xOffset) * planeZoom,
            planeYPosition,
            (zScale(d.z) - zOffset) * planeZoom,
        );
        scene.scene.add(plane);
    });
}
</script>
