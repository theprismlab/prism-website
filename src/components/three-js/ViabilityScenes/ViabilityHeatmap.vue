<template>
    <canvas id="viability-heatmap-canvas" ref="canvasEl" style="position: absolute; width:100%; height:100%;"></canvas>
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
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
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
const canvasEl = ref(null);
let resizeObserver = null;
let resizeTimer = null;
const scene = useHeatmapScene({
    cameraZoom: props.cameraZoom,
    fov: props.fov,
});

async function rebuildLayers() {
    ready.value = false;
    scene.stopAnimation();
    scene.resetAnimationCallbacks();

    await nextTick();
    scene.resize();
    scene.computeScales();
    ready.value = true;

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();
}

onMounted(async () => {
    const canvas = canvasEl.value || document.getElementById('viability-heatmap-canvas');
    scene.initThreeJs(canvas);
    await scene.loadData();
    scene.computeScales();
    ready.value = true;

    // Wait for child components to mount and add meshes
    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    resizeObserver = new ResizeObserver(() => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            rebuildLayers();
        }, 100);
    });

    const resizeTarget = canvas.parentElement || canvas;
    resizeObserver.observe(resizeTarget);
});

onBeforeUnmount(() => {
    scene.stopAnimation();
    scene.resetAnimationCallbacks();
    if (resizeObserver) resizeObserver.disconnect();
    if (resizeTimer) clearTimeout(resizeTimer);
});
</script>
