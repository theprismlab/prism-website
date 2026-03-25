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

const bubbleMeshes = [];

// Canvas element ref — useViabilityScene attaches the Three.js renderer to this
const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
  // keep only even indexed data;
    let data = props.data.filter(d => +d.x % 2 === 0);
    buildCircles(data);
    registerBubbleAnimation();

    // Wait one frame for the renderer to be ready, then draw
    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    // Re-create circles on window resize (scene clears meshes automatically)
    scene.onRebuild(() => {
        buildCircles(data);
        registerBubbleAnimation();
    });
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

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.x))
        .range([-visibleWidth / 2, visibleWidth / 2]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.viability))
        .range([-visibleHeight / 2, visibleHeight / 2]);

    const zScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.z))
        .range([-visibleHeight / 2, visibleHeight / 2]);

    return { xScale, yScale, zScale, radiusScale };
}

function computeWorldBounds() {
    const vFov = THREE.MathUtils.degToRad(config.fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * config.cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);
    const visibleDepth = visibleHeight;

    return {
        minX: -visibleWidth / 2,
        maxX: visibleWidth / 2,
        minY: -visibleHeight / 2,
        maxY: visibleHeight / 2,
        minZ: -visibleDepth / 2,
        maxZ: visibleDepth / 2,
    };
}

function wrapValue(value, min, max) {
    const span = max - min;
    if (value > max) return min + (value - max) % span;
    if (value < min) return max - (min - value) % span;
    return value;
}

function registerBubbleAnimation() {
    scene.onAnimate((elapsed) => {
        bubbleMeshes.forEach((mesh, index) => {
            const {
                vx, vy, vz, bobAmp, bobSpeed, bobPhase,
                xMin, xMax, yMin, yMax, zMin, zMax,
            } = mesh.userData;

            mesh.position.x = wrapValue(mesh.position.x + vx, xMin, xMax);
            mesh.position.y = wrapValue(mesh.position.y + vy + (Math.sin(elapsed * bobSpeed + bobPhase) * bobAmp), yMin, yMax);
            mesh.position.z = wrapValue(mesh.position.z + vz, zMin, zMax);

            mesh.rotation.x += 0.001 + (index % 5) * 0.00015;
            mesh.rotation.y += 0.0012 + (index % 7) * 0.00012;
        });
    });
}

// Create a sphere for each data point, positioned by the scales
function buildCircles(data) {
    const { xScale, yScale, zScale, radiusScale } = computeScales(data);
    const bounds = computeWorldBounds();
    bubbleMeshes.length = 0;
    // Shared geometry — one allocation reused by all spheres
    const geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);

    data.forEach(d => {
        const material = new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            roughness: 0.0,
            metalness: 0.0,
            transparent: true,
            opacity: 1,
            transmission: 1,
            thickness: 0.5,
            ior: 1,
            iridescence: 1,
            iridescenceIOR: 1,
            iridescenceThicknessRange: [0, 1200],
            clearcoat: 1,
            clearcoatRoughness: 0,
            envMapIntensity: 1.5,
            specularIntensity: 1,
            side: THREE.DoubleSide,

        });

        const mesh = new THREE.Mesh(geometry, material);
        const scale = radiusScale(d.viability);
        mesh.position.set(xScale(d.x), yScale(d.viability), zScale(d.z));
        mesh.scale.set(scale, scale, scale);
        mesh.userData.vx = (Math.random() - 0.5) * 0.05;
        mesh.userData.vy = 0.01 + Math.random() * 0.04;
        mesh.userData.vz = (Math.random() - 0.5) * 0.04;
        mesh.userData.bobAmp = 0.003 + Math.random() * 0.01;
        mesh.userData.bobSpeed = 0.6 + Math.random() * 1.2;
        mesh.userData.bobPhase = Math.random() * Math.PI * 2;
        mesh.userData.xMin = bounds.minX;
        mesh.userData.xMax = bounds.maxX;
        mesh.userData.yMin = bounds.minY;
        mesh.userData.yMax = bounds.maxY;
        mesh.userData.zMin = bounds.minZ;
        mesh.userData.zMax = bounds.maxZ;
        bubbleMeshes.push(mesh);
        scene.scene.add(mesh);
    });
}
</script>
