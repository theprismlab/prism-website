<template>
    <div class="three-wrapper">
        <canvas ref="scatterCanvas" class="three-canvas"></canvas>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as d3 from 'd3';
import ScatterPlot3D from './plots/ScatterPlot3D.js';




const props = defineProps({
    scatterConfig: { type: Object, default: () => ({}) },
});

const scatterCanvas = ref(null);

let scatterInstance = null;


/**
 * Central Cluster: all points orbit a single center point with random colors per ring layer.
 * Points closer to the center are larger; color varies by angle around the center.
 */
export function generateScatterCentralClusterData({
    count             = 920,
    cx                = 0.5,     // center x
    cy                = 0.5,     // center y
    maxRadius         = 0.38,    // maximum distance from center
    radialBias        = 0.3,     // > 1 pulls points toward center (denser core)
    seed              = 42,
    barcodeFraction   = 0.15,
    barcodeZThreshold = 0.5,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const angle  = rand() * Math.PI * 2;
        const dist   = Math.pow(rand(), radialBias) * maxRadius;   // biased toward center
        const x      = Math.max(0, Math.min(1, cx + Math.cos(angle) * dist + randn() * 0.015));
        const y      = Math.max(0, Math.min(1, cy + Math.sin(angle) * dist + randn() * 0.015));
        const z      = rand();
        const radius = Math.max(0, 0.65 * (1 - dist / maxRadius) + Math.abs(randn()) * 0.06);
        const color  = (angle / (Math.PI * 2) + rand() * 0.08) % 1;  // hue by angle
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length * barcodeFraction)).forEach(p => { p.hasBarcode = true; });

    return points;
}

function initPlot() {
    const scatterConfig = {
        colorInterpolator: d3.interpolateRainbow,
        scale: {
            radius: { range: [ 0,  0.9] },
        },
        ...props.scatterConfig,
    };
    scatterInstance = new ScatterPlot3D(scatterCanvas.value, scatterConfig);
    scatterInstance.setData(generateScatterCentralClusterData());
}

onMounted(() => {
    initPlot();
});

onBeforeUnmount(() => {
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
