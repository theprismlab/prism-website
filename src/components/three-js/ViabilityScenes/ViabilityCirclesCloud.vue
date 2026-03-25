<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useDefaultScene } from './useDefaultScene.js';

const config = {
    // ── Camera ──
    fov: 40,
    cameraPosition: [0, 0],
    cameraDistance: 200,
    cameraLookAt: [0, 0, 0],
    nearClip: 0.5,
    farClip: 1000,

    // ── Circles ──
    radius: 0.5,
    segments: 32,
};

const props = defineProps({
    data: { type: Array, required: true },
});

// Canvas element ref — useViabilityScene attaches the Three.js renderer to this
const canvasEl = ref(null);
const scene = useDefaultScene(canvasEl, config);

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

// Add rainbow-colored point lights arranged around the scene
function addColoredLights() {
    const vFov = THREE.MathUtils.degToRad(config.fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * config.cameraDistance;
    const r = visibleHeight * 0.45;
    const intensity = 8000;
    const frontZ = config.cameraDistance * 0.5;
    const backZ = -visibleHeight * 0.5;

    // ROYGBIV rainbow colors with x/y positions
    const rainbow = [
        { color: 0xff0000, x: r * 0.0,  y: r * 0.8  },   // Red — top center
        { color: 0xff7700, x: r * 0.2,  y: r * 0.25 },   // Orange — upper right
        { color: 0xffff00, x: r * 0.9,  y: -r * 0.1 },   // Yellow — right
        { color: 0x00cc00, x: r * 0.4,  y: -r * 0.8 },   // Green — lower right
        { color: 0x0066ff, x: -r * 0.4, y: -r * 0.7 },   // Blue — lower left
        { color: 0x4400cc, x: -r * 0.9, y: -r * 0.1 },   // Indigo — left
        { color: 0x8800aa, x: -r * 0.7, y: r * 0.5  },   // Violet — upper left
    ];

    // Place each color at front, middle, and back z-depths
    [frontZ, 0, backZ].forEach(z => {
        rainbow.forEach(({ color, x, y }) => {
            const light = new THREE.PointLight(color, intensity, 0);
            light.position.set(x, y, z);
            scene.scene.add(light);
        });
    });
}

// Create a sphere for each data point, positioned by the scales
function buildCircles(data) {
    addColoredLights();
    const { xScale, yScale, zScale, opacityScale, radiusScale } = computeScales(data);
    // Shared geometry — one allocation reused by all spheres
    const geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);

    data.forEach(d => {
        const material = new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            roughness: 0.1,
            metalness: 0.0,
            transparent: true,
            opacity: 0.75,
            transmission: 0.6,
            thickness: 0.5,
            ior: 1.4,
            iridescence: 0.4,
            iridescenceIOR: 1.3,
            iridescenceThicknessRange: [100, 400],
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            specularIntensity: 0.8,
            side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(xScale(d.x), yScale(d.viability), zScale(d.z));
        mesh.scale.set(radiusScale(d.viability), radiusScale(d.viability), radiusScale(d.viability));
        scene.scene.add(mesh);
    });
}
</script>
