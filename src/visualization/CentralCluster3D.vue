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
    count             = 800,
    cx                = 0.5,   // center x  [0, 1]
    cy                = 0.5,   // center y  [0, 1]
    sigma             = 2.2,  // std-dev of the Gaussian; controls how wide the cloud spreads
    seed              = 15, // 5, 14,15, 18
    barcodeFraction   = 0.3, // fraction of points to tag with barcodes; these will be the ones with largest radius (closest to center)
    barcodeZThreshold = 0.2, // points with z ≥ this are eligible for barcodes; lower = more barcodes but more likely to overlap
} = {}) {
    let s = seed;
    // Simple LCG (linear congruential generator) for deterministic, seedable pseudo-random numbers.
    // Same seed → same cloud every render; change seed to get a different layout.
    const rand   = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };

    // Box-Muller transform: converts two uniform U(0,1) samples (u, v) into
    // two independent standard normals N(0,1).
    //   magnitude = √(-2 ln u)   ← Rayleigh-distributed
    //   [cos(2πv), sin(2πv)]     ← uniform direction on unit circle
    // Multiplying magnitude × direction gives (X, Y) ~ N(0,1) independently.
    const randn2 = () => {
        const u = rand() + 1e-9, v = rand() + 1e-9; // +1e-9 guards against log(0)
        const mag = Math.sqrt(-2 * Math.log(u));
        return [mag * Math.cos(2 * Math.PI * v), mag * Math.sin(2 * Math.PI * v)];
    };

    const points = [];

    for (let i = 0; i < count; i++) {
        // Draw two independent N(0,1) samples and scale by σ → N(0, σ)
        const [nx, ny] = randn2();
        const dx = nx * sigma;  // x-offset from center in data space
        const dy = ny * sigma;  // y-offset from center in data space

        const dist  = Math.sqrt(dx * dx + dy * dy); // Euclidean distance from center (Rayleigh distributed)
        const angle = Math.atan2(dy, dx);            // direction in [-π, π]

        // t ∈ [0, 1]: fraction of the 3σ radius.
        // t ≈ 0 → very close to center (large, opaque, front)
        // t = 1 → at or beyond the 3σ envelope (small, semi-transparent, back)
        const t = Math.min(dist / (sigma * 1.75), 1);

        const x = cx + dx;
        const y = cy + dy;

        // Sphere radius: starts at 0.70 (center) and falls linearly to 0.08 (edge).
        // The floor of 0.08 ensures outer spheres remain visible.
        // abs(randn2()[0]) * 0.03 adds a small positive noise for organic variation.
        const radius = 0.04 + 0.66 * (1 - t) + Math.abs(randn2()[0]) * 0.03;

        // Depth (z): maps to [0.35, 0.90] in data space, then to [0, 8] world units.
        // Center points (t≈0) → z≈0.90 (front); edge points (t=1) → z≈0.35 (back).
        // Small noise keeps the depth layer from looking perfectly uniform.
        const z = 0.35 + (1 - t) * 0.55 + randn2()[0] * 0.05;

        // Color hue = angle mapped to [0, 1].
        // atan2 returns [-π, π] → dividing by 2π and adding 1 shifts to [0, 1] with no negatives.
        // rand() * 0.18 adds ~±18% hue jitter per point so nearby spheres vary in shade
        // while still preserving the overall cool/warm directional gradient.
        const color = ((angle / (Math.PI * 2) + 1) % 1 + (rand() - 0.5) * 0.18) % 1;

        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Tag the largest, closest points with barcodes (purely cosmetic).
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
            radius: { range: [0.01, 1], domain: [0, 1] },
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
