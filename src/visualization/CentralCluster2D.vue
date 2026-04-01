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
 * Generates a 2-D isotropic Gaussian point cloud.
 *
 * Math overview
 * ─────────────
 * Drawing dx ~ N(0,σ) and dy ~ N(0,σ) independently gives a 2-D Gaussian
 * whose joint density is f(x,y) = (1/2πσ²) · exp(-(x²+y²)/2σ²).
 * In polar coordinates the radial distance r = √(dx²+dy²) follows a
 * Rayleigh distribution: f(r) = (r/σ²)·exp(-r²/2σ²).
 *   • Peak density is at r = σ (one std-dev from center).
 *   • ~68% of points fall within r ≤ σ, ~95% within 2σ, ~99.7% within 3σ.
 * This naturally concentrates points near the center with a smooth falloff —
 * no hard radius boundary, no separate inner/outer loops needed.
 *
 * Per-point attributes
 * ─────────────────────
 *   t       normalised radial distance: t = min(r / 3σ, 1)
 *           t≈0 at center, t=1 at the 3σ boundary (99.7% envelope).
 *   radius  linear in (1-t) so core spheres are large and edge spheres
 *           are small, plus a Gaussian noise term for organic variation.
 *   z       depth: high (front) at center, lower (back) at periphery.
 *           This makes the opacity scale push outer spheres slightly
 *           transparent, reinforcing the depth illusion.
 *   color   hue = angle/2π  so every compass direction gets a different
 *           rainbow colour, making the cloud visually radially symmetric.
 */
function generateScatterCentralClusterData({
    count             = 300,
    cx                = 0.5,   // center x  [0, 1]
    cy                = 0.5,   // center y  [0, 1]
    sigma             = 2.2,   // std-dev of the Gaussian; controls how wide the cloud spreads
    seed              = 15,    // deterministic seed for reproducible clouds
    barcodeFraction   = 0.3, // fraction of points to tag with barcodes; these will be the ones with largest radius (closest to center)
} = {}) {
    let s = seed;
    const rand   = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn2 = () => {
        const u = rand() + 1e-9, v = rand() + 1e-9;
        const mag = Math.sqrt(-2 * Math.log(u));
        return [mag * Math.cos(2 * Math.PI * v), mag * Math.sin(2 * Math.PI * v)];
    };

    const points = [];
    // Acceptance thinning makes density drop off toward the edge so the cluster dissipates.
    while (points.length < count) {
        const [nx, ny] = randn2();
        const dx = nx * sigma;
        const dy = ny * sigma;

        const dist  = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const t = Math.min(dist / (sigma * 3), 1);

        // Thin out outer points: keep probability falls quadratically with t.
        // lower values, thin more gradially; higher values, thin more aggressively.
        if (rand() > (1 - t) ** 0.05) continue;

        const x = cx + dx;
        const y = cy + dy;

        // Radius falls off with distance; small noise keeps shapes organic.
        const radius = 0.04 + 0.66 * (1 - t) + Math.abs(randn2()[0]) * 0.03;

        // Flatten to 2D: keep z constant (slight jitter to avoid z-fighting if needed).
        const z = 0;

        const color = ((angle / (Math.PI * 2) + 1) % 1 + (rand() - 0.5) * 0.18) % 1;

        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Tag a few central points (largest radii) for barcodes.
    points
        .slice()
        .sort((a, b) => b.radius - a.radius)
        .slice(0, Math.ceil(points.length * barcodeFraction))
        .forEach(p => { p.hasBarcode = true; });

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
    // These must match the generator parameters so the domain is always
    // symmetric around the cluster center, regardless of random sample outliers.
    const cx = 0.5, cy = 0.5, sigma = 2.2;
    // [cx ± 3σ] covers 99.7% of the Gaussian and is symmetric by construction,
    // so cx maps exactly to world 0 (the frustum center) every time.
    const xDomain = [cx - 3 * sigma, cx + 3 * sigma];
    const yDomain = [cy - 3 * sigma, cy + 3 * sigma];
    const domainBase = 23;
    const scatterConfig = {
        colorInterpolator: interpolateGnBuYlOrRd,
        cameraLookAt:    [0, 0, 4],
        cameraDistance:  35,
        cameraAzimuth:   0,
        cameraElevation: 0,
        scale: {
            radius: { range: [0, 1.2], domain: [0, 1] },
            x:      { domain: xDomain, range: [-domainBase, domainBase] },
            y:      { domain: yDomain, range: [-domainBase, domainBase] },
        },
        ...props.scatterConfig,
    };
    scatterInstance = new ScatterPlot3D(scatterCanvas.value, scatterConfig);
    scatterInstance.setData(generateScatterCentralClusterData({ cx, cy, sigma }));
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
