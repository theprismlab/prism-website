<template>
    <div ref="wrapper" class="three-wrapper">
        <canvas ref="scatterCanvas" class="three-canvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ScatterPlotFromJSON from './plots/ScatterPlotFromJSON.js';

const scatterCanvas = ref(null);
const wrapper       = ref(null);
const canvasSize    = ref({ width: 0, height: 0 });
let plot           = null;
let sizeObserver   = null;

onMounted(async () => {
    sizeObserver = new ResizeObserver(([entry]) => {
        const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
        canvasSize.value = { width: Math.round(width), height: Math.round(height) };
    });
    sizeObserver.observe(wrapper.value);

    plot = new ScatterPlotFromJSON(scatterCanvas.value, { scaleToScreen: false  });
    await plot.loadJSON('/data/scatter-plot-data.json');
});

onBeforeUnmount(() => {
    sizeObserver?.disconnect();
    plot?.destroy();
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
