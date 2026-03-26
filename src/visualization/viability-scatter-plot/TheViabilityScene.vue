<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';
import { loadViabilityCSV, parseScatterPlotData } from './getData.js';
import { buildScatterLayer } from './ScatterLayer.js';
const USE_DARK_ATMOSPHERE = false;
const BASE_VIEW = {
    fov: 25, 
    cameraDistance: 25,
    cameraPosition: [0, 7.5], //default 7.5
    cameraLookAt: [0, 9.5, 0], //default 6.5
    nearClip: 0.1,
    farClip: 200,
}
const sceneConfig = {
    // ── Camera ──
    ...BASE_VIEW,

    // ── Base lighting ──
    directionalLightIntensity: USE_DARK_ATMOSPHERE ? 0.85 : 0.1,
    ambientLightIntensity: USE_DARK_ATMOSPHERE ? 2.0 : 1.5,
};

// ── Lighting presets ──────────────────────────────────────────────────────────

const ATMOSPHERE_DARK = {
    background: new THREE.Color(0x06040f),
    fog: new THREE.FogExp2(0x06040f, 0.013),
    // Cold violet sky + dark crimson ground; spheres shade differently by height
    hemiLight: { sky: 0x1a1040, ground: 0x1a0010, intensity: 1.2 },
    
};

const ATMOSPHERE_LIGHT = {
    background: null, // transparent — lets the page background show through
    fog: null,
    // Warm white sky + cool grey ground for a clean neutral look
    hemiLight: { sky: 0xffffff, ground: 0xffffff, intensity: 1.0 },
};


const SHOW_SCATTER_PLOT = true;

const props = defineProps({
    dark: { type: Boolean, default: USE_DARK_ATMOSPHERE },
});

const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, sceneConfig);

function applyAtmosphere() {
    const preset = props.dark ? ATMOSPHERE_DARK : ATMOSPHERE_LIGHT;

    scene.scene.background = preset.background;
    scene.scene.fog = preset.fog;

    const { sky, ground, intensity } = preset.hemiLight;
    scene.scene.add(new THREE.HemisphereLight(sky, ground, intensity));
}

onMounted(async () => {
    applyAtmosphere();
    let scatterData;
    const raw = await loadViabilityCSV();
    if (SHOW_SCATTER_PLOT) scatterData = parseScatterPlotData(raw);

    if (SHOW_SCATTER_PLOT) buildScatterLayer(scene, scatterData);

    scene.render();
    scene.startAnimation();

    // On resize, clearMeshes runs first (preserving lights + fog),
    // then these rebuild callbacks recreate the geometry for the new viewport
    scene.onRebuild(() => {
        if (SHOW_SCATTER_PLOT) buildScatterLayer(scene, scatterData);
    }); 
});
</script>
