<template>
    <div class="three-wrapper">
        <canvas ref="heatmapCanvas" class="three-canvas"></canvas>
        <canvas ref="scatterCanvas" class="three-canvas"></canvas>
    </div>
</template>

<script setup>
import * as d3 from 'd3';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ThreeDHeatmap from './lib/3DHeatmap.js';
import ThreeDScatterPlot from './lib/3DScatterPlot.js';
import { loadViabilityCSV, parseHeatmapData, parseScatterPlotData } from './viability-heatmap-scatter-plot-color/getData.js';

const props = defineProps({
    heatmapConfig: { type: Object, default: () => ({}) },
    scatterConfig: { type: Object, default: () => ({}) },
});

const heatmapCanvas = ref(null);
const scatterCanvas = ref(null);

let heatmapInstance = null;
let scatterInstance = null;

function applyColors(data, colorScale) {
    return data.map(d => ({
        ...d,
        rgba: d3.color(colorScale(d.viability)).formatHex(),
    }));
}

async function initPlots() {
    const raw = await loadViabilityCSV();
    const heatmapData = applyColors(parseHeatmapData(raw), d3.scaleSequential(d3.interpolateTurbo)
        .domain(d3.extent(raw, d => d.viability)));
    const scatterData = applyColors(parseScatterPlotData(raw), d3.scaleSequential(d3.interpolateTurbo)
        .domain(d3.extent(raw, d => d.viability)));

    heatmapInstance = new ThreeDHeatmap(heatmapCanvas.value, props.heatmapConfig);
    scatterInstance = new ThreeDScatterPlot(scatterCanvas.value, props.scatterConfig);
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
