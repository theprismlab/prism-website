<template>
    <div class="three-wrapper">
        <canvas ref="heatmapCanvas" class="three-canvas"></canvas>
        <canvas ref="scatterCanvas" class="three-canvas" style="opacity: 0.9;"></canvas>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ThreeDHeatmap from './lib/3DHeatmap.js';
import ThreeDScatterPlotSimple, { generateScatterData, generateScatterVolcanoData } from './lib/3DScatterPlotSimple.js';
import { loadViabilityCSV, parseHeatmapData } from './getData.js';

const props = defineProps({
    heatmapConfig: { type: Object, default: () => ({}) },
    scatterConfig: { type: Object, default: () => ({}) },
});

const heatmapCanvas = ref(null);
const scatterCanvas = ref(null);

let heatmapInstance = null;
let scatterInstance = null;

async function initPlots() {
    const raw = await loadViabilityCSV();


    // Heatmap: pass parsed data uncolored so the heatmap class owns color/opacity scaling.
    const heatmapData = parseHeatmapData(raw);

    heatmapInstance = new ThreeDHeatmap(heatmapCanvas.value, props.heatmapConfig);
    scatterInstance = new ThreeDScatterPlotSimple(scatterCanvas.value, props.scatterConfig);
    heatmapInstance.setData(heatmapData);
    scatterInstance.setData(generateScatterVolcanoData());
}

onMounted(() => {
    initPlots();
});

onBeforeUnmount(() => {
    if (heatmapInstance) heatmapInstance.destroy();
    if (scatterInstance) scatterInstance.destroy();
});
</script>

<style scoped>
.three-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.three-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}
</style>
