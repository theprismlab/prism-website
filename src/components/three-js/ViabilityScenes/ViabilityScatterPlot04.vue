<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw, ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const sphereConfig = {
    // ── Camera ──
    fov: 45,
    cameraDistance: 45,
    cameraPosition: [0, 7.5, 25],
    cameraLookAt: [0, 6.5, 0],
    nearClip: 0.1,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 0.5,

    // ── Planes ──
    planeZoom: 10.8,

    // ── Spheres ──
    sphereXStep: 8,
    sphereZStep: 1,
    sphereOpacityRange: [0.7, 0.7],
    sphereRadiusScaleRange: [0.5, 3.5],
    sphereRadiusScaleDomain: [1, 0],
    sphereFloatSpeedMin: 0.4,
    sphereFloatSpeedRange: 0.9,
    sphereFloatAmplitudeBase: 0.09,
    sphereFloatAmplitudeRange: 0.09,

    // ── Y-axis spread ──
    ySpread: 25,
    ySpreadOffset: 8,
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

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    scene.onRebuild(() => buildSpheres(props.data));
});

// ── Scale Computation ──

function computeScales(data) {
    const { fov, cameraDistance, ySpread, ySpreadOffset } = config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);
    const cExtent = d3.extent(data, d => d.value);
    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const sceneWidth = visibleWidth;
    const cellWidth = sceneWidth / xExtent[1];
    const cellHeight = visibleHeight / Math.max(zExtent[1], 1);

    const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight * 2]);
    const yScale = d3.scaleLinear().domain(cExtent).range([ySpread, -ySpread + ySpreadOffset]);
    const radiusScale = d3.scaleSqrt().domain(config.sphereRadiusScaleDomain).range(config.sphereRadiusScaleRange);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(config.sphereOpacityRange);
    const valueColorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain(cExtent);

    return markRaw({
        xScale, zScale, yScale, radiusScale, opacityScale, valueColorScale,
        xOffset: sceneWidth / 2,
        zOffset: visibleHeight / 2,
        xExtent,
        zExtent,
        cellWidth, 
        cellHeight, 
    });
}

// ── Sphere Creation & Animation ──

function buildSpheres(data) {
    const scales = computeScales(data);
    const { xScale, zScale, xOffset, zOffset, cellHeight, yScale, radiusScale, opacityScale, valueColorScale } = scales;
    const {
        sphereXStep, sphereZStep,
        sphereFloatSpeedMin, sphereFloatSpeedRange,
        sphereFloatAmplitudeBase, sphereFloatAmplitudeRange,
    } = config;

    const sampled = data.filter(d => d.x % sphereXStep === 0 && d.z % sphereZStep === 0);

   

    const spheres = [];

    sampled.forEach(d => {
        const randomJitter = 0.85 + Math.random() * 0.3;
        const radius = radiusScale(d.radius) * randomJitter;
        const geometry = markRaw(new THREE.SphereGeometry(radius, 24, 24));
        const material = markRaw(new THREE.MeshStandardMaterial({
            color: valueColorScale(d.value),
            transparent: true,
            opacity: opacityScale(d.z),
            roughness: 0.0,
            metalness: 0.0,
        }));
        const sphere = markRaw(new THREE.Mesh(geometry, material));
        const basePosition = markRaw(new THREE.Vector3(
            xScale(d.x) - xOffset,
            yScale(d.value) + radius * 0.2,
            zScale(d.z) - zOffset,
        ));
        sphere.castShadow = true;
        sphere.position.copy(basePosition);
        sphere.userData.basePosition = basePosition;
        sphere.userData.floatPhase = Math.random() * Math.PI * 2;
        sphere.userData.floatSpeed = sphereFloatSpeedMin + Math.random() * sphereFloatSpeedRange;
        sphere.userData.floatAmplitude = cellHeight * (sphereFloatAmplitudeBase + Math.random() * sphereFloatAmplitudeRange);
        sphere.userData.radius = radius;
        sphere.userData.offsetX = 0;
        sphere.userData.offsetY = 0;
        sphere.userData.offsetZ = 0;
        scene.scene.add(sphere);
        spheres.push(sphere);
    });

    scene.onAnimate((elapsed) => {
        applyFloatPosition(spheres, elapsed);
        applySoftCollision(spheres);
    });
}

/**
 * Update each sphere's world position from its base position,
 * sinusoidal Y float, and current collision offset.
 */
function applyFloatPosition(spheres, elapsed) {
    spheres.forEach(s => {
        const { basePosition, floatPhase, floatSpeed, floatAmplitude } = s.userData;
        s.position.x = basePosition.x + Math.sin(elapsed * floatSpeed * 0.7 + floatPhase + 1.3) * floatAmplitude * 0.5 + s.userData.offsetX;
        s.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude + s.userData.offsetY;
        s.position.z = basePosition.z + Math.cos(elapsed * floatSpeed * 0.5 + floatPhase) * floatAmplitude * 0.3 + s.userData.offsetZ;
    });
}

/**
 * Soft sphere-sphere collision detection & response.
 * Overlapping pairs accumulate a small push on each sphere's offset,
 * then all offsets are damped toward zero so spheres drift back
 * to their data-driven base positions.
 */
function applySoftCollision(spheres, pushStrength = 0.15, damping = 0.95) {
    for (let i = 0; i < spheres.length; i++) {
        const a = spheres[i];
        for (let j = i + 1; j < spheres.length; j++) {
            const b = spheres[j];
            const dx = b.position.x - a.position.x;
            const dy = b.position.y - a.position.y;
            const dz = b.position.z - a.position.z;
            const distSq = dx * dx + dy * dy + dz * dz;
            const minDist = a.userData.radius + b.userData.radius;

            if (distSq < minDist * minDist && distSq > 0.0001) {
                const dist = Math.sqrt(distSq);
                const overlap = minDist - dist;
                const nx = dx / dist;
                const ny = dy / dist;
                const nz = dz / dist;
                const push = overlap * pushStrength;

                // Push each sphere away from the other along the collision normal
                a.userData.offsetX -= nx * push;
                a.userData.offsetY -= ny * push;
                a.userData.offsetZ -= nz * push;
                b.userData.offsetX += nx * push;
                b.userData.offsetY += ny * push;
                b.userData.offsetZ += nz * push;
            }
        }
    }

    // Decay offsets so spheres gradually return to base positions
    spheres.forEach(s => {
        s.userData.offsetX *= damping;
        s.userData.offsetY *= damping;
        s.userData.offsetZ *= damping;
    });
}
</script>
