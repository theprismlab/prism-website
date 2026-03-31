<template>
    <div class="three-wrapper">
        <canvas ref="scatterCanvas" class="three-canvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ScatterPlotFromJSON from './plots/ScatterPlotFromJSON.js';

const scatterCanvas = ref(null);
let plot = null;

onMounted(async () => {


    plot = new ScatterPlotFromJSON(scatterCanvas.value, { scaleToScreen: true   });
    await plot.loadJSON('/data/scatter-plot-data.json');
});

onBeforeUnmount(() => plot?.destroy());
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
