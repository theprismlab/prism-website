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
 * Generates a fully randomised field of bubbles spread across the entire scene.
 *
 * x and y are drawn from a mixture of uniform spread and a mild central
 * density bias so the canvas never looks empty at the edges or over-crowded
 * in the middle.
 *
 * z (depth) is independent and uniformly random so bubbles sit at all depth
 * layers, giving a genuine volumetric feel.
 *
 * radius is inversely correlated with z so closer bubbles appear larger, which
 * reinforces depth perception without making any spatial region dominate.
 *
 * color is still the global angle from (0, 0) → same rainbow as other layouts.
 */
function generateScatterRandomData({
    count             = 900,
    spread            = 8.5,   // half-width of the uniform spatial field
    seed              = 31,
    barcodeFraction   = 0.10,
    barcodeZThreshold = 0.6,
} = {}) {
    let s = seed;
    const rand   = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn2 = () => {
        const u = rand() + 1e-9, v = rand() + 1e-9;
        const mag = Math.sqrt(-2 * Math.log(u));
        return [mag * Math.cos(2 * Math.PI * v), mag * Math.sin(2 * Math.PI * v)];
    };

    const points = [];

    for (let i = 0; i < count; i++) {
        // Uniform position across the field.
        const x = (rand() - 0.5) * 2 * spread;
        const y = (rand() - 0.5) * 2 * spread;

        // z fully independent: uniform across [0, 1] in data space.
        const z = rand();

        // Radius: large bubbles near the front (z→1), tiny at the back (z→0),
        // with per-point noise for organic variety.
        const radius = 0.04 + 0.62 * z + Math.abs(randn2()[0]) * 0.04;

        // Color: angle from scene origin so the rainbow wraps the whole field.
        const angle = Math.atan2(y, x);
        const color = ((angle / (Math.PI * 2) + 1) % 1 + (rand() - 0.5) * 0.18) % 1;

        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length * barcodeFraction)).forEach(p => { p.hasBarcode = true; });

    return points;
}



// Custom interpolator that blends two d3 schemes across the [0, 1] color range.
// t ∈ [0, 0.5] → GnBu reversed (dark blue → light green) rescaled so 0→1 and 0.5→0
// t ∈ [0.5, 1] → YlOrRd        (light yellow → dark red)  rescaled so 0.5→0 and 1→1
//
// Reversing GnBu aligns the light end of GnBu (t≈0.5 → green) with the light end
// of YlOrRd (t≈0.5 → yellow), so the junction stays in the light/pastel range on
// both sides and the dark anchors sit at the extremes (t=0 deep blue, t=1 dark red).
// This gives a visually ordered cool→warm progression around the full circle.
const minLight = 0.18; // clamp lightest values: 0 = allow full white/yellow, higher = cut pale tones
const maxDark = 0.78; // clamp darkest values: 1 = allow full black, lower = cut deep tones
const maxDarkBlue = 0.7;
const interpolateGnBuYlOrRd = t =>
    t < 0.5
        ? d3.interpolateYlGnBu(maxDarkBlue - t * 2 * (maxDarkBlue - minLight)) // reversed, range [maxDark → minLight]
        : d3.interpolateYlOrRd(minLight + (t - 0.5) * 2 * (maxDark - minLight)); // forward, range [minLight → 1]

function initPlot() {
    const spread     = 8.5;
    const domainBase = 22;
    const scatterConfig = {
        colorInterpolator: interpolateGnBuYlOrRd,
        cameraLookAt:    [0, 0, 4],
        cameraDistance:  42,
        cameraAzimuth:   0,
        cameraElevation: 0.08,
        scale: {
            radius: { range: [0.01, 1.1], domain: [0, 1] },
            // z is already in [0,1] data space; map to world depth [0, 8]
            z:      { domain: [0, 1], range: [0, 8] },
            x:      { domain: [-spread, spread], range: [-domainBase, domainBase] },
            y:      { domain: [-spread, spread], range: [-domainBase, domainBase] },
        },
        ...props.scatterConfig,
    };
    scatterInstance = new ScatterPlot3D(scatterCanvas.value, scatterConfig);
    scatterInstance.setData(generateScatterRandomData({ spread }));
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
