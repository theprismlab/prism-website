<template>
    <canvas id="viability-heatmap-canvas" style="position: absolute; width:100%; height:100%;"></canvas>
    <HeatmapPlanes
        v-if="ready"
        :scene="scene.state.scene"
        :data="scene.state.heatmapData"
        :scales="scene.state.scales"
        :zoom="heatmapZoom"
    />
    <HeatmapSpheres
        v-if="ready"
        :scene="scene.state.scene"
        :data="scene.state.heatmapData"
        :scales="scene.state.scales"
        :on-animate="scene.onAnimate"
        :x-step="8"
        :z-step="2"
    />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useHeatmapScene } from './useHeatmapScene.js';
import HeatmapPlanes from './ViabilityScenes/HeatmapPlanes.vue/index.js';
import HeatmapSpheres from './ViabilityScenes/HeatmapSpheres.vue/index.js';

const props = defineProps({
    windowSize: Object,
    showHeatmap: { type: Boolean, default: true },
    showSpheres: { type: Boolean, default: true },
    heatmapZoom: { type: Number, default: 0.75 },
    cameraZoom: { type: Number, default: 35 },
    fov: { type: Number, default: 35 },
});

const ready = ref(false);
let resizeObserver = null;
const scene = useHeatmapScene({
    cameraZoom: props.cameraZoom,
    fov: props.fov,
});

onMounted(async () => {
    const canvas = document.getElementById('viability-heatmap-canvas');
    scene.initThreeJs(canvas);
    await scene.loadData();
    scene.computeScales();
    ready.value = true;

    // Wait for child components to mount and add meshes
    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    // Observe canvas resize to update scene
    resizeObserver = new ResizeObserver(() => {
        scene.resize();
    });
    resizeObserver.observe(canvas);
});

onBeforeUnmount(() => {
    scene.stopAnimation();
    if (resizeObserver) resizeObserver.disconnect();
});
</script>
