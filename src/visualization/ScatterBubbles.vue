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
 * Radial normal distribution: x and y offsets are drawn independently from N(0, sigma),
 * producing an isotropic 2-D Gaussian. Radial distance follows a Rayleigh distribution —
 * dense at the center, smoothly thinning in every direction with no hard boundary.
 * Sphere size and z-depth both fall off with distance so outer points appear small and recede.
 */
function generateScatterCentralClusterData({
    count             = 400,
    cx                = 0.5,   // center x  [0, 1]
    cy                = 0.5,   // center y  [0, 1]
    sigma             = 0.68,  // std-dev of the Gaussian; controls how wide the cloud spreads
    seed              = 42,
    barcodeFraction   = 0.12,
    barcodeZThreshold = 0.6,
} = {}) {
    let s = seed;
    const rand   = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    // Box-Muller: returns two independent standard normals
    const randn2 = () => {
        const u = rand() + 1e-9, v = rand() + 1e-9;
        const mag = Math.sqrt(-2 * Math.log(u));
        return [mag * Math.cos(2 * Math.PI * v), mag * Math.sin(2 * Math.PI * v)];
    };

    const points = [];

    for (let i = 0; i < count; i++) {
        const [nx, ny] = randn2();
        const dx = nx * sigma;
        const dy = ny * sigma;
        const dist  = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // t in [0, 1]: normalised distance (3*sigma covers ~99.7% of the distribution)
        const t = Math.min(dist / (sigma * 3), 1);

        const x      = cx + dx;
        const y      = cy + dy;
        // Linear falloff with a guaranteed floor so outer points stay visible
        const radius = 0.08 + 0.62 * (1 - t) + Math.abs(randn2()[0]) * 0.03;
        // Keep outer points at a moderate z so they don't become too transparent
        const z      = 0.35 + (1 - t) * 0.55 + randn2()[0] * 0.05;
        // Hue by angle -> every direction gets a distinct color from the rainbow
        const color  = ((angle / (Math.PI * 2) + 1) % 1 + rand() * 0.06) % 1;

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
        cameraLookAt:   [0, 0, 4],
        cameraPosition: [0, 0, 25],
        scale: {
            radius: { range: [0.08, 0.75] },
            x:      { domain: [-0.5, 1.5], range: [-6, 6] },
            y:      { domain: [-0.5, 1.5], range: [-6, 6] },
            z:      { domain: [0, 1],      range: [0, 8] },
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
