<template>
    <canvas ref="canvasEl" style="position: absolute; width:100%; height:100%;"></canvas>
    <HeatmapPlanes
        v-if="ready"
        :scene="scene.state.scene"
        :data="scene.state.heatmapData"
        :scales="scene.state.scales"
        :zoom="heatmapZoom*1.2"
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
import HeatmapPlanes from './HeatmapPlanes.vue';
import HeatmapSpheres from './HeatmapSpheres.vue';

const props = defineProps({
    heatmapZoom: { type: Number, default: 5.5 },
    cameraZoom: { type: Number, default: 45 },
    fov: { type: Number, default: 25 },
});

const ready = ref(false);
const canvasEl = ref(null);
let resizeObserver = null;
let resizeTimer = null;

const scene = useHeatmapScene({
    cameraZoom: props.cameraZoom,
    fov: props.fov,
});

onMounted(async () => {
    const canvas = canvasEl.value;
    scene.initThreeJs(canvas);
    await scene.loadData();
    scene.computeScales();
    ready.value = true;

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    resizeObserver = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(async () => {
            ready.value = false;
            scene.resize();
            await nextTick();
            ready.value = true;
        }, 100);
    });
    // Skip the initial fire by deferring observe
    requestAnimationFrame(() => {
        resizeObserver.observe(canvas.parentElement);
    });
});

onBeforeUnmount(() => {
    scene.stopAnimation();
    if (resizeObserver) resizeObserver.disconnect();
    clearTimeout(resizeTimer);
});
</script>
