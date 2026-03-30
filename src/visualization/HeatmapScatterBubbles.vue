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
import { loadViabilityCSV, parseHeatmapData, generateScatterVanishingPointData } from './getData.js';


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
    // cameraAngleY: 0.2,
    cameraPosition  : [0, 10 , 3],
    scale: {
      opacity: { range: [.5, 0.95]},
    }
}
    // Heatmap: pass parsed data uncolored so the heatmap class owns color/opacity scaling.
    const heatmapData = parseHeatmapData(raw);

    heatmapInstance = new Heatmap3D(heatmapCanvas.value, props.heatmapConfig);
    scatterInstance = new ScatterPlot3D(scatterCanvas.value, scatterConfig);
    heatmapInstance.setData(heatmapData);
    scatterInstance.setData(generateScatterVanishingPointData());
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
