<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';
import { loadViabilityCSV, parseHeatmapData, parseScatterPlotData } from './getData.js';
import { buildHeatmapLayer } from './HeatmapLayer.js';
import { buildScatterLayer } from './ScatterLayer.js';

const sceneConfig = {
    // ── Camera ──
    fov: 35,
    cameraDistance: 45,
    cameraPosition: [0, 7.5], // [x, y] only — z is set by cameraDistance
    cameraLookAt: [0, 6.5, 0],
    nearClip: 0.1,
    farClip: 200,

    // ── Base lighting (atmosphere adds HemisphereLight below) ──
    directionalLightIntensity: 0.2,
    ambientLightIntensity: 0.1,
};

const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, sceneConfig);

function applyAtmosphere() {
    // Deep indigo background and matching fog for seamless depth fade
    scene.scene.background = new THREE.Color(0x06040f);
    scene.scene.fog = new THREE.FogExp2(0x06040f, 0.013);

    // Cold violet sky + dark crimson ground — spheres pick up different tints
    // depending on their vertical position, creating natural depth shading
    const hemiLight = new THREE.HemisphereLight(0x1a1040, 0x1a0010, 1.2);
    scene.scene.add(hemiLight);
}

onMounted(async () => {
    applyAtmosphere();

    const raw = await loadViabilityCSV();
    const heatmapData = parseHeatmapData(raw);
    const scatterData = parseScatterPlotData(raw);

    buildHeatmapLayer(scene, heatmapData);
   // buildScatterLayer(scene, scatterData);

    scene.render();
    scene.startAnimation();

    // On resize, clearMeshes runs first (preserving lights + fog),
    // then these rebuild callbacks recreate the geometry for the new viewport
    scene.onRebuild(() => {
        buildHeatmapLayer(scene, heatmapData);
     //   buildScatterLayer(scene, scatterData);
    });
});
</script>
