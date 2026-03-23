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

// ── Sphere Creation ──

function buildSpheres(data) {
    const { xScale, zScale, yScale, opacityScale, xOffset, zOffset } = computeScales(data);
    const { planeZoom, planeYPosition } = config;

    const geometry = new THREE.SphereGeometry(config.sphereRadius, config.sphereSegments, config.sphereSegments);

    data.forEach(d => {
        const material = new THREE.MeshStandardMaterial({
            color: d.rgba,
            transparent: true,
            opacity: opacityScale(d.z),
            roughness: 0.3,
            metalness: 0.0,
        });

        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;

        sphere.position.set(
            (xScale(d.x) - xOffset) * planeZoom,
            planeYPosition + yScale(d.viability),
            (zScale(d.z) - zOffset) * planeZoom,
        );
        scene.scene.add(sphere);
    });
}
</script>
