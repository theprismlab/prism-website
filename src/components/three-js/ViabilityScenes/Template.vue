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

const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    buildCircles(props.data);

    await new Promise(r => requestAnimationFrame(r));
    scene.render();

    scene.onRebuild(() => buildCircles(props.data));
});

function buildCircles(data) {
    const geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);

    data.forEach(d => {
        const material = new THREE.MeshStandardMaterial({
            color: d.rgba || '#4488ff',
            roughness: 0.3,
            metalness: 0.0,
        });

        const mesh = new THREE.Mesh(geometry, material);
        // Position each circle — replace with your own layout logic
        mesh.position.set(d.x || 0, d.y || 0, d.z || 0);
        scene.scene.add(mesh);
    });
}
</script>
