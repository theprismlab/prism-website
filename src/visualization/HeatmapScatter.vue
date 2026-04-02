<template>
    <div class="three-wrapper">
        <canvas ref="heatmapCanvas" class="three-canvas"></canvas>
        <canvas ref="scatterCanvas" class="three-canvas" style="opacity: 0.9;"></canvas>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Heatmap3D from './plots/Heatmap3D.js';
import ScatterPlot3D from './plots/ScatterPlot3D.js';
import { loadViabilityCSV, parseHeatmapData, parseScatterData } from './data-services.js';

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

    // for bimodal data
const scatterConfig = {
    scale: {
        y:       { domain: [-1, 1.5], range:null},
        z:       { domain: null, range:null },
        radius:  { domain: null, range: null},
        opacity: { domain: null, range: null },
        color:   { domain: null, range: null },
},
}
const heatmapConfig = {}
    // Heatmap: pass parsed data uncolored so the heatmap class owns color/opacity scaling.
    const heatmapData = parseHeatmapData(raw);
    const scatterData = parseScatterData(raw);
    heatmapInstance = new Heatmap3D(heatmapCanvas.value, heatmapConfig);
    scatterInstance = new ScatterPlot3D(scatterCanvas.value, scatterConfig);
    heatmapInstance.setData(heatmapData);
    scatterInstance.setData(scatterData);
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
