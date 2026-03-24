<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const config = {
    // ── Camera ──
    fov: 40,
    cameraPosition: [0, 0],
    cameraDistance: 200,
    cameraLookAt: [0, 0, 0],
    nearClip: 0.1,
    farClip: 1000,

    // ── Lighting ──
    directionalLightIntensity: 1.5,
    ambientLightIntensity: 1.5,

    // ── Circles ──
    radius: 0.5,
    segments: 32,
};

const props = defineProps({
    data: { type: Array, required: true },
});

// Canvas element ref — useViabilityScene attaches the Three.js renderer to this
const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    buildCircles(props.data);

    // Wait one frame for the renderer to be ready, then draw
    await new Promise(r => requestAnimationFrame(r));
    scene.render();

    // Re-create circles on window resize (scene clears meshes automatically)
    scene.onRebuild(() => buildCircles(props.data));
});

// Compute d3 scales that map data values to Three.js world coordinates,
// sized to fill the camera's visible area at the given distance
function computeScales(data) {
    // Calculate world-space dimensions visible to the camera
    const vFov = THREE.MathUtils.degToRad(config.fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * config.cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const radiusScale = d3.scaleSqrt()
        .domain(d3.extent(data, d => +d.viability))
        .range([0.5, 3]);

    const opacityScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.z))
        .range([0.1, 1]);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.x))
        .range([-visibleWidth / 2, visibleWidth / 2]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.viability))
        .range([-visibleHeight / 2, visibleHeight / 2]);

    const zScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.z))
        .range([-visibleHeight / 2, visibleHeight / 2]);

    return { xScale, yScale, zScale, opacityScale, radiusScale };
}

// Create a sphere for each data point, positioned by the scales
function buildCircles(data) {
    const { xScale, yScale, zScale, opacityScale, radiusScale } = computeScales(data);
    // Shared geometry — one allocation reused by all spheres
    const geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);

    data.forEach(d => {
        const material = new THREE.MeshStandardMaterial({
            color: d.rgba || '#4488ff',
            roughness: 0.3,
            metalness: 0.0,
            transparent: true,
            opacity: opacityScale(d.z),

        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(xScale(d.x), yScale(d.viability), zScale(d.z));
        mesh.scale.set(radiusScale(d.viability), radiusScale(d.viability), radiusScale(d.viability));
        scene.scene.add(mesh);
    });
}
</script>
