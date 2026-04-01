<template>
    <div class="three-wrapper">
        <canvas ref="scatterCanvas" class="three-canvas"></canvas>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as d3 from 'd3';
import ScatterPlot3D from '@/visualization/plots/ScatterPlot3D.js';

const props = defineProps({
    scatterConfig: { type: Object, default: () => ({}) },
});

const scatterCanvas = ref(null);

let scatterInstance = null;
/**
 * Generates an assortment of independent Gaussian clusters with varied sizes
 * and positions.
 *
 * Size and depth (z) are computed locally within each cluster so each blob
 * has its own spatial gradient — large dense core, small sparse periphery.
 * Color uses the global angle from the scene center (0, 0) so the rainbow
 * flows coherently across the entire composition rather than repeating per blob.
 */
function generateScatterAssortmentData({
    seed              = 12, // 12, 15
    barcodeFraction   = 0.10,
    barcodeZThreshold = 0.5,
} = {}) {
    // Each entry: position in data space, point count, and σ spread.
    // Scene center is (0, 0); clusters are placed relative to it.
    const clusterDefs = [
        { cx:  0.0,  cy:  0.0,  count: 380, sigma: 2.0  },  // large central
        { cx:  3.5,  cy:  2.0,  count: 140, sigma: .75 },  // medium top-right
        { cx: -3.0,  cy:  2.5,  count:  90, sigma: .95  },  // small top-left
        { cx: -5.8,  cy: -2.0,  count: 160, sigma: 1.6  },  // medium bottom-left
        { cx:  3.0,  cy: -3.0,  count: 100, sigma: 1.2  },  // small bottom-right
        { cx:  -2.0,  cy: -2.5,  count:  50, sigma: 0.8  },  // tiny bottom-center
        { cx:  6.0,  cy:  0.0,  count:  90, sigma: 1.2 },  // tiny far-right
    ];



    let s = seed;
    const rand   = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn2 = () => {
        const u = rand() + 1e-9, v = rand() + 1e-9;
        const mag = Math.sqrt(-2 * Math.log(u));
        return [mag * Math.cos(2 * Math.PI * v), mag * Math.sin(2 * Math.PI * v)];
    };

    const points = [];

    for (const { cx, cy, count, sigma } of clusterDefs) {
        for (let i = 0; i < count; i++) {
            const [nx, ny] = randn2();
            const dx = nx * sigma;   // offset from this cluster's center
            const dy = ny * sigma;

            const x = cx + dx;
            const y = cy + dy;

            // Local t: normalized distance from this cluster's own center.
            // Each blob independently grades from large/front (core) to small/back (edge).
            const localDist = Math.sqrt(dx * dx + dy * dy);
            const t = Math.min(localDist / (sigma * 3), 1);

            // Global color: angle from scene center (0,0) gives a single coherent
            // rainbow that spans the whole composition.
            const angle = Math.atan2(y, x);
            const color = ((angle / (Math.PI * 2) + 1) % 1 + (rand() - 0.5) * 0.18) % 1;

            const radius = 0.04 + 0.66 * (1 - t) + Math.abs(randn2()[0]) * 0.03;
            const z      = 0.35 + (1 - t) * 0.55 + randn2()[0] * 0.05;

            points.push({ x, y, z, radius, color, hasBarcode: false });
        }
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length * barcodeFraction)).forEach(p => { p.hasBarcode = true; });

    return points;
}


// // Custom interpolator that blends two d3 schemes across the [0, 1] color range.
// // t ∈ [0, 0.5] → GnBu reversed (dark blue → light green) rescaled so 0→1 and 0.5→0
// // t ∈ [0.5, 1] → YlOrRd        (light yellow → dark red)  rescaled so 0.5→0 and 1→1
// //
// // Reversing GnBu aligns the light end of GnBu (t≈0.5 → green) with the light end
// // of YlOrRd (t≈0.5 → yellow), so the junction stays in the light/pastel range on
// // both sides and the dark anchors sit at the extremes (t=0 deep blue, t=1 dark red).
// // This gives a visually ordered cool→warm progression around the full circle.
// const minLight  = 0.18;  // clamp lightest values
// const maxDark   = 0.8;  // clamp darkest values
// const blendZone = 0.09;  // fraction of range over which blue and red blend into purple at the seam

// // Pre-compute the two extreme colors and their midpoint (purple) so they're
// // calculated once rather than on every interpolator call.
// const _blueMax = d3.interpolateYlGnBu(maxDark);
// const _redMax  = d3.interpolateYlOrRd(maxDark);
// const _purple  = d3.interpolateRgb(_blueMax, _redMax)(0.5); // purple seam blend

// // color(t): cool-to-warm interpolator with a purple blend at the circular seam.
// //   t ∈ [0,   0.5] → YlGnBu reversed [maxDark → minLight]  (dark blue → light green)
// //   t ∈ [0.5, 1  ] → YlOrRd forward  [minLight → maxDark]  (light yellow → dark red)
// //   near t=0 and t=1: fades through purple so the angle wrap-around is smooth.
// const interpolateGnBuYlOrRd = t => {
//     const shade = t < 0.5
//         ? d3.interpolateYlGnBu(maxDark - t * 2 * (maxDark - minLight))
//         : d3.interpolateYlOrRd(minLight + (t - 0.5) * 2 * (maxDark - minLight));
//     if (t < blendZone)         return d3.interpolateRgb(_purple, shade)(t / blendZone);
//     if (t > 1 - blendZone)     return d3.interpolateRgb(shade, _purple)((t - (1 - blendZone)) / blendZone);
//     return shade;
// };





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
    // Domain covers all cluster extents: furthest center is ±5, max 3σ = 4.2 → ±9 with margin.
    const domainData = 9;
    const domainBase = 20;
    const scatterConfig = {
        colorInterpolator: interpolateGnBuYlOrRd,
        cameraLookAt:    [0, 0, 4],
        cameraDistance:  40,
        cameraAzimuth:   0,
        cameraElevation: 0.2,
        scale: {
            radius: { range: [0.01, 1], domain: [0, 1] },
            x:      { domain: [-domainData, domainData], range: [-domainBase, domainBase] },
            y:      { domain: [-domainData, domainData], range: [-domainBase, domainBase] },
        },
        ...props.scatterConfig,
    };
    scatterInstance = new ScatterPlot3D(scatterCanvas.value, scatterConfig);
    scatterInstance.setData(generateScatterAssortmentData());
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
