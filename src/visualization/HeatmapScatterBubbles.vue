<template>
    <div class="three-wrapper">
        <canvas ref="heatmapCanvas" class="three-canvas"></canvas>
        <canvas ref="scatterCanvas" class="three-canvas" style="opacity: 0.9;"></canvas>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Heatmap3D from './lib/Heatmap3D.js';
import ScatterPlot3D, { 
    generateScatterBubblesData, 
    generateScatterGaussianData, 
    generateScatterBimodalData, 
    generateScatterSpiralData, 

    generateScatterExponentialData, 
    generateScatterPowerLawData ,
    generateScatterChevronData,
    generateScatterSineWaveData,
    generateScatterConstellationData,
    generateScatterLogNormalData,
    generateScatterValleyData
} from './lib/ScatterPlot3D.js';
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

const scatterConfig = {
    cameraY: 1,
    scale: {
        color: { domain: [0, 1] },
        // x: { domain: [0, 1.1] },
        // y: { domain: [0, 0.9] },
    }
}
    // Heatmap: pass parsed data uncolored so the heatmap class owns color/opacity scaling.
    const heatmapData = parseHeatmapData(raw);

    heatmapInstance = new Heatmap3D(heatmapCanvas.value, props.heatmapConfig);
    scatterInstance = new ScatterPlot3D(scatterCanvas.value, scatterConfig);
    heatmapInstance.setData(heatmapData);
    scatterInstance.setData(generateScatterValleyData());
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
