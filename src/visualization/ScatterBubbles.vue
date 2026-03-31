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
    count             = 700,
    cx                = 0.5,   // center x  [0, 1]
    cy                = 0.5,   // center y  [0, 1]
    sigma             = 0.7,  // std-dev of the Gaussian; controls how wide the cloud spreads
    seed              = 18, // 5, 14,15
    barcodeFraction   = 0.12,
    barcodeZThreshold = 0.5,
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
        const t = Math.min(dist / (sigma * 3), 1);

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
        // The small rand() term nudges adjacent points slightly apart in hue.
        const color = ((angle / (Math.PI * 2) + 1) % 1 + rand() * 0.06) % 1;

        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Tag the largest, closest points with barcodes (purely cosmetic).
    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length * barcodeFraction)).forEach(p => { p.hasBarcode = true; });

    return points;
}

function initPlot() {
    // These must match the generator parameters so the domain is always
    // symmetric around the cluster center, regardless of random sample outliers.
    const cx = 0.5, cy = 0.5, sigma = 1.1;
    // [cx ± 3σ] covers 99.7% of the Gaussian and is symmetric by construction,
    // so cx maps exactly to world 0 (the frustum center) every time.
    const xDomain = [cx - 3 * sigma, cx + 3 * sigma];
    const yDomain = [cy - 3 * sigma, cy + 3 * sigma];

    const scatterConfig = {
        colorInterpolator: d3.interpolateRainbow,
        cameraLookAt:    [0, 0, 4],
        cameraDistance:  25,
        cameraAzimuth:   0,
        cameraElevation: 0,
        scale: {
            radius: { range: [0.04, 0.75] },
            x:      { domain: xDomain, range: [-9, 9] },
            y:      { domain: yDomain, range: [-9, 9] },
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
