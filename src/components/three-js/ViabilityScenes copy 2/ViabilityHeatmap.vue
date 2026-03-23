<template>
    <canvas ref="canvasEl" style="position: absolute; width:100%; height:100%;"></canvas>
    <HeatmapPlanes
        v-if="ready && layers.includes('planes')"
        :scene="scene.state.scene"
        :data="heatmapData"
        :scales="scales"
        :config="config"
    />
    <HeatmapSpheres
        v-if="ready && layers.includes('spheres')"
        :scene="scene.state.scene"
        :data="heatmapData"
        :scales="scales"
        :config="config"
        :on-animate="scene.onAnimate"
    />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { defaultConfig } from './defaultConfig.js';
import { loadHeatmapData } from './loadHeatmapData.js';
import { computeScales } from './computeScales.js';
import { useHeatmapScene } from './useHeatmapScene.js';
import HeatmapPlanes from './HeatmapPlanes.vue';
import HeatmapSpheres from './HeatmapSpheres.vue';

const props = defineProps({
    sceneConfig: { type: Object, default: () => ({}) },
    layers: { type: Array, default: () => ['planes', 'spheres'] },
});

// Merge caller overrides onto defaults
const config = { ...defaultConfig, ...props.sceneConfig };

const ready = ref(false);
const canvasEl = ref(null);
const heatmapData = ref([]);
const scales = ref(null);

let resizeObserver = null;
let resizeTimer = null;

const scene = useHeatmapScene(config);

function recomputeScales() {
    scales.value = computeScales(
        heatmapData.value, config, scene.state.width, scene.state.height,
    );
}

onMounted(async () => {
    const canvas = canvasEl.value;
    scene.init(canvas);

    // Load data once at the parent level
    heatmapData.value = await loadHeatmapData(config);
    recomputeScales();
    ready.value = true;

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    resizeObserver = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(async () => {
            ready.value = false;
            scene.resize();
            recomputeScales();
            await nextTick();
            ready.value = true;
        }, 100);
    });
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
