import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as d3 from 'd3';

// ─── Data generators ──────────────────────────────────────────────────────────

/**
 * Wave-trend scatter: points rise left-to-right.
 * Data schema: { x, y, z, radius, color, hasBarcode } — all 0–1.
 */
export function generateScatterBubblesData({
    count            = 420,
    colorNoiseScale  = 0.8,
    seed             = 42,
    barcodeZThreshold = 0.5,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x      = rand();
        const y      = Math.max(0, Math.min(1, x * 0.5 + 0.25 + randn() * 0.22));
        const z      = rand();
        const radius = Math.max(0, y * 0.8 + randn() * 0.18);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Mark top 1/3 by radius among close-z points as having a barcode
    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });

    return points;
}

/**
 * Bubbles Wave: BubblesData aesthetic (large radii, heavy color noise) but y follows
 * the WaveBurst cosine shape — high at both edges, dipping in the center.
 */
export function generateScatterBubblesWaveData({
    count             = 420,
    colorNoiseScale   = 0.8,
    seed              = 42,
    barcodeZThreshold = 0.5,
    waveAmplitude     = 0.29,   // how far edges rise above center
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x      = rand();
        // Cosine: peaks at x=0 and x=1, trough at x=0.5 — same as WaveBurst spine
        const yMean  = 0.28 + waveAmplitude * Math.cos(x * Math.PI * 2);
        const y      = Math.max(0, Math.min(1, yMean + randn() * 0.22));
        const z      = rand();
        const radius = Math.max(0, y * 0.8 + randn() * 0.18);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Volcano-shaped scatter: center x is low on y, extremes rise into two arms.
 * Data schema: { x, y, z, radius, color, hasBarcode } — all 0–1.
 */
export function generateScatterVolcanoData({
    count            = 420,
    colorNoiseScale  = 0.8,
    seed             = 42,
    barcodeZThreshold = 0.5,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        // 65% biased toward center x, 35% uniform for arm population
        const x = rand() < 0.65
            ? Math.max(0, Math.min(1, 0.5 + randn() * 0.12))
            : rand();
        const distFromCenter = Math.abs(x - 0.5) * 2;
        // y normally distributed around a rising mean — organic arm height variation
        const yMean = distFromCenter * 0.72;
        const y = Math.max(0, Math.min(1, yMean + randn() * 0.28));
        const z = rand();
        // Slight lateral fan at extremes
        const xFanned = Math.max(0, Math.min(1, x + (x < 0.5 ? -1 : 1) * distFromCenter * Math.abs(randn()) * 0.12));
        const radius  = Math.max(0, y * 0.4 + Math.abs(randn()) * (0.04 + distFromCenter * 0.35));
        const color   = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x: xFanned, y, z, radius, color, hasBarcode: false });
    }

    // Mark top 1/3 by radius among close-z points as having a barcode
    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });

    return points;
}

/**
 * Gaussian cluster: spherical blob centered at (0.5, 0.5).
 * Radius and color grow with distance from center — larger, more saturated outliers.
 */
export function generateScatterGaussianData({
    count             = 420,
    colorNoiseScale   = 0.6,
    seed              = 42,
    barcodeZThreshold = 0.5,
    spread            = 0.14,   // σ for x and y
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x = Math.max(0, Math.min(1, 0.5 + randn() * spread));
        const y = Math.max(0, Math.min(1, 0.5 + randn() * spread));
        const z = rand();
        const distFromCenter = Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2) * Math.SQRT2;
        const radius = Math.max(0, distFromCenter * 0.7 + Math.abs(randn()) * 0.12);
        const color  = Math.max(0, Math.min(1, distFromCenter + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Bimodal: two distinct clusters separated along x.
 * Left cluster sits low (y ~ 0.3), right cluster sits high (y ~ 0.7).
 */
export function generateScatterBimodalData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    spread            = 0.1,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const centers = [
        { cx: 0.25, cy: 0.3 },
        { cx: 0.75, cy: 0.7 },
    ];
    const points = [];
    for (let i = 0; i < count; i++) {
        const { cx, cy } = centers[i % 2];
        const x      = Math.max(0, Math.min(1, cx + randn() * spread));
        const y      = Math.max(0, Math.min(1, cy + randn() * spread * 1.3));
        const z      = rand();
        const radius = Math.max(0, y * 0.45 + Math.abs(randn()) * 0.15);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Spiral: two logarithmic arms winding outward from center, rising in height.
 * Points farther along the arm are taller and larger.
 */
export function generateScatterSpiralData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    turns             = 1.5,   // number of full rotations per arm
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const arm = i % 2;                          // 0 or 1 → two arms offset by π
        const t   = rand();                          // progress along arm [0, 1]
        const angle = arm * Math.PI + t * turns * 2 * Math.PI;
        const r   = t * 0.42;                        // radius grows with t
        const nx  = 0.5 + Math.cos(angle) * r + randn() * 0.03;
        const ny  = 0.5 + Math.sin(angle) * r + randn() * 0.03;
        const x   = Math.max(0, Math.min(1, nx));
        const y   = Math.max(0, Math.min(1, ny));
        const z   = rand();
        const radius = Math.max(0, t * 0.55 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, t + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Exponential: heavy density near y=0 decaying exponentially toward y=1.
 * Simulates a p-value or significance score distribution.
 */
export function generateScatterExponentialData({
    count             = 420,
    colorNoiseScale   = 0.6,
    seed              = 42,
    barcodeZThreshold = 0.5,
    lambda            = 3.5,   // decay rate — higher = more points near y=1
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x = rand();
        // Inverse CDF of exponential, clamped to [0, 1]
        const raw = -Math.log(1 - rand() * (1 - Math.exp(-lambda))) / lambda;
        const y   = Math.max(0, Math.min(1, (1 - raw) + randn() * 0.04));
        const z   = rand();
        const radius = Math.max(0, y * 0.3 + Math.abs(randn()) * 0.18);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Power law: a few very large, prominent spheres amid many tiny ones.
 * Both radius and y follow a power-law distribution — creates a dramatic hero/background effect.
 */
export function generateScatterPowerLawData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    exponent          = 2.2,   // Pareto exponent — higher = more extreme skew
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    // Inverse CDF for power law on [0, 1]: F^{-1}(u) = 1 - (1-u)^(1/α)
    const powerSample = () => 1 - Math.pow(rand(), 1 / exponent);

    const points = [];
    for (let i = 0; i < count; i++) {
        const x      = rand();
        const y      = Math.max(0, Math.min(1, (1 - powerSample()) + randn() * 0.03));
        const z      = rand();
        const radius = Math.max(0, powerSample() * 0.9 + randn() * 0.04);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Log-normal: right-skewed y — dense near the bottom, long sparse tail toward the top.
 * Rare high-y points are large; the common low-y crowd is small.
 */
export function generateScatterLogNormalData({
    count             = 420,
    colorNoiseScale   = 0.6,
    seed              = 42,
    barcodeZThreshold = 0.5,
    mu                = -0.5,   // log-space mean — lower shifts bulk toward y=0
    sigma             = 0.55,   // log-space spread — higher = longer tail
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x      = rand();
        const y      = Math.max(0, Math.min(1, Math.exp(mu + sigma * randn())));
        const z      = rand();
        const radius = Math.max(0, y * 0.6 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Chevron: inverted-V / mountain peak — base spreads at the edges, apex at center-top.
 * Larger spheres cluster near the peak.
 */
export function generateScatterChevronData({
    count             = 420,
    colorNoiseScale   = 0.6,
    seed              = 42,
    barcodeZThreshold = 0.5,
    sharpness         = 2.0,   // 1 = linear V-sides, 2 = parabolic, higher = sharper peak
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x            = rand();
        const distFromCenter = Math.abs(x - 0.5) * 2;   // 0 at x=0.5, 1 at edges
        const yMean        = Math.max(0, 1 - Math.pow(distFromCenter, sharpness));
        const y            = Math.max(0, Math.min(1, yMean + randn() * 0.1));
        const z            = rand();
        const radius       = Math.max(0, y * 0.55 + Math.abs(randn()) * 0.12);
        const color        = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Valley (inverted chevron): U-shape — edges rise high, center dips low.
 * Larger spheres cluster near the high outer edges.
 */
export function generateScatterValleyData({
    count             = 420,
    colorNoiseScale   = 0.6,
    seed              = 42,
    barcodeZThreshold = 0.5,
    sharpness         = 2.0,   // 1 = linear U-sides, 2 = parabolic, higher = sharper valley
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const half = Math.floor(count / 2);

    // Array A: pure U-curve, no x displacement
    const pointsA = [];
    for (let i = 0; i < half; i++) {
        const x              = rand();
        const distFromCenter = Math.abs(x - 0.5) * 2;
        const yMean          = Math.pow(distFromCenter, sharpness);
        const y              = Math.max(0, Math.min(1, yMean + randn() * 0.1));
        const z              = rand();
        const radius         = Math.max(0, y * 0.55 + Math.abs(randn()) * 0.12);
        const color          = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        pointsA.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Array B: same U-curve with outward x fan at the high edges
    const pointsB = [];
    for (let i = 0; i < count - half; i++) {
        const x              = rand();
        const distFromCenter = Math.abs(x - 0.5) * 1;
        const yMean          = Math.pow(distFromCenter, sharpness);
        const y              = Math.max(0, Math.min(1, yMean + randn() * 0.1));
        const xFanned        = Math.max(0, Math.min(1, x + (x < 0.5 ? -1 : 1) * distFromCenter * Math.abs(randn()) * 0.14));
        const z              = rand();
        const radius         = Math.max(0, y * 0.55 + Math.abs(randn()) * 0.12);
        const color          = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        pointsB.push({ x: xFanned, y, z, radius, color, hasBarcode: false });
    }

    const points = [...pointsA, ...pointsB];
    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Constellation: 6 tight clusters scattered at varying heights.
 * Higher clusters have larger spheres — each a distinct "star system".
 */
export function generateScatterConstellationData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    // cy controls both height and sphere size — higher cluster = bigger spheres
    const clusters = [
        { cx: 0.15, cy: 0.10, spread: 0.05 },
        { cx: 0.78, cy: 0.22, spread: 0.06 },
        { cx: 0.38, cy: 0.38, spread: 0.07 },
        { cx: 0.85, cy: 0.55, spread: 0.05 },
        { cx: 0.22, cy: 0.70, spread: 0.06 },
        { cx: 0.60, cy: 0.88, spread: 0.07 },
    ];

    const points = [];
    for (let i = 0; i < count; i++) {
        const c      = clusters[Math.floor(rand() * clusters.length)];
        const x      = Math.max(0, Math.min(1, c.cx + randn() * c.spread));
        const y      = Math.max(0, Math.min(1, c.cy + randn() * c.spread));
        const z      = rand();
        const radius = Math.max(0, c.cy * 0.7 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Sine wave: undulating pattern across x — crests near the top, troughs near the bottom.
 * Larger spheres at the peaks, smaller at the troughs.
 */
export function generateScatterSineWaveData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    periods           = 2.0,    // number of full cycles across x [0, 1]
    amplitude         = 0.35,   // half-height of wave (clamped to y [0, 1])
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x      = rand();
        const yMean  = 0.5 + amplitude * Math.sin(x * periods * Math.PI * 2);
        const y      = Math.max(0, Math.min(1, yMean + randn() * 0.07));
        const z      = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Dual sine: two overlapping sine waves at different frequencies and phases.
 * Where crests align the spheres stack tall; cancellation leaves sparse troughs.
 */
export function generateScatterDualSineData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    periods1          = 2.0,    // frequency of first wave
    periods2          = 2.0,    // frequency of second wave (slight offset creates interference)
    amplitude1        = 0.28,
    amplitude2        = 0.14,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x     = rand();
        const yMean = 0.5
            + amplitude1 * Math.sin(x * periods1 * Math.PI * 2)
            + amplitude2 * Math.sin(x * periods2 * Math.PI * 2 + 1.2);
        const y      = Math.max(0, Math.min(1, yMean + randn() * 0.06));
        const z      = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Damped sine: wave starts with high amplitude on the left, decays toward a flat line on the right.
 * Models a ringing oscillation settling to equilibrium.
 */
export function generateScatterDampedSineData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    periods           = 2.0,
    decayRate         = 4.5,    // higher = faster damping
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x        = rand();
        const envelope = Math.exp(-decayRate * x);
        const yMean    = 0.5 + 0.42 * envelope * Math.sin(x * periods * Math.PI * 2);
        const y        = Math.max(0, Math.min(1, yMean + randn() * (0.03 + envelope * 0.06)));
        const z        = rand();
        const radius   = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.1);
        const color    = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Growing sine: wave starts flat on the left and grows in amplitude toward the right.
 * Opposite of damped — a signal building up.
 */
export function generateScatterGrowingSineData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    periods           = 2.0,
    growthRate        = 3.5,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x        = rand();
        const envelope = (Math.exp(growthRate * x) - 1) / (Math.exp(growthRate) - 1);
        const yMean    = 0.5 + 0.42 * envelope * Math.sin(x * periods * Math.PI * 2);
        const y        = Math.max(0, Math.min(1, yMean + randn() * (0.03 + envelope * 0.06)));
        const z        = rand();
        const radius   = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.1);
        const color    = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Chirp: sine wave that speeds up (increases frequency) from left to right.
 * Dense tight ripples on the right, wide sweeping crests on the left.
 */
export function generateScatterChirpData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    periodsStart      = 0.5,    // frequency at x=0
    periodsEnd        = 2.0,    // frequency at x=1
    amplitude         = 0.35,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x     = rand();
        // Instantaneous phase of a linearly chirped sine
        const phase = 2 * Math.PI * (periodsStart * x + 0.5 * (periodsEnd - periodsStart) * x * x);
        const yMean = 0.5 + amplitude * Math.sin(phase);
        const y     = Math.max(0, Math.min(1, yMean + randn() * 0.07));
        const z     = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Standing wave: two sine waves travelling in opposite directions, summed.
 * Creates nodes (near-zero y) and antinodes (full-amplitude peaks) at fixed x positions.
 */
export function generateScatterStandingWaveData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    periods           = 2.0,
    amplitude         = 0.38,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    // Fixed "time" snapshot t=0.25 gives visible nodes and antinodes
    const t = 0.25;
    const points = [];
    for (let i = 0; i < count; i++) {
        const x     = rand();
        const kx    = x * periods * Math.PI * 2;
        const yMean = 0.5 + amplitude * Math.sin(kx) * Math.cos(2 * Math.PI * t);
        const y     = Math.max(0, Math.min(1, yMean + randn() * 0.055));
        const z     = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Wave Burst: cosine baseline peaks at both edges (x=0 and x=1), dips in the center,
 * with volcano-style eruption arms and a dense inner scatter cloud just inside each peak.
 */
export function generateScatterWaveBurstData({
    count             = 500,
    colorNoiseScale   = 0.85,
    seed              = 42,
    barcodeZThreshold = 0.5,
    periods           = 1.0,    // 1 = peaks at x=0 and x=1, trough at x=0.5
    waveAmplitude     = 0.18,   // how much the baseline undulates
    spineRatio        = 0.20,   // fraction: wave spine
    burstRatio        = 0.40,   // fraction: upward eruption arms
    innerRatio        = 0.40,   // fraction: dense inner scatter near each peak
    burstSpread       = 0.1,   // how far arms fan inward from each crest
    burstHeight       = 0.72,   // max additional y height of burst arms above crest
    innerSpreadX      = 0.4,   // x width of inner scatter cloud inside each peak
    innerSpreadY      = 0.32,   // y height of inner scatter cloud
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    const spineCount = Math.floor(count * spineRatio);
    const burstCount = Math.floor(count * burstRatio);
    const innerCount = count - spineCount - burstCount;

    const crests = [0.0, 1.0];
    const crestY = 0.28 + waveAmplitude;

    // Wave spine: cosine — high at edges, low in center
    for (let i = 0; i < spineCount; i++) {
        const x      = rand();
        const yBase  = 0.28 + waveAmplitude * Math.cos(x * periods * Math.PI * 2);
        const y      = Math.max(0, Math.min(1, yBase + randn() * 0.045));
        const z      = rand();
        const radius = Math.max(0, y * 0.4 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Burst arms: erupt upward from each edge crest
    for (let i = 0; i < burstCount; i++) {
        const crestX  = crests[Math.floor(rand() * crests.length)];
        const inward  = crestX === 0 ? 1 : -1;
        const t       = rand();
        const x       = Math.max(0, Math.min(1, crestX + inward * t * burstSpread + randn() * 0.025));
        const yMean   = crestY + burstHeight * t * (0.7 + rand() * 0.6);
        const y       = Math.max(0, Math.min(1, yMean + randn() * 0.06));
        const z       = rand();
        const radius  = Math.max(0, y * 0.55 + Math.abs(randn()) * 0.12);
        const color   = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Inner scatter: dense cloud just inside each peak, filling the space between
    // the crest and the center — randomised x closer to the edge, y spread around crest
    for (let i = 0; i < innerCount; i++) {
        const crestX = crests[Math.floor(rand() * crests.length)];
        const inward = crestX === 0 ? 1 : -1;
        // x: biased close to the crest, fading toward center
        const tx  = Math.pow(rand(), 0.55);   // skew toward 0 (near crest)
        const x   = Math.max(0, Math.min(1, crestX + inward * tx * innerSpreadX + randn() * 0.03));
        // y: scattered around crest height, denser near mid-range
        const y   = Math.max(0, Math.min(1, crestY + randn() * innerSpreadY));
        const z   = rand();
        const radius = Math.max(0, y * 0.48 + Math.abs(randn()) * 0.12);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Funnel: wide base at y=0, tapering to a narrow point at y=1.
 * x range collapses linearly as y rises — creates an inverted triangle density.
 */
export function generateScatterFunnelData({
    count             = 420,
    colorNoiseScale   = 0.6,
    seed              = 42,
    barcodeZThreshold = 0.5,
    flare             = 0.48,   // x half-width at y=0; shrinks to 0 at y=1
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const y    = rand();
        const half = flare * (1 - y);
        const x    = Math.max(0, Math.min(1, 0.5 + (rand() * 2 - 1) * half + randn() * 0.02));
        const z    = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.12);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Ring: points form a circular donut in 2D x-y space.
 * Spheres at the top arc are larger; bottom arc stays small.
 */
export function generateScatterRingData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    ringRadius        = 0.38,   // ring radius in [0, 1] unit space
    ringWidth         = 0.055,  // radial spread (σ)
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const angle  = rand() * Math.PI * 2;
        const r      = ringRadius + randn() * ringWidth;
        const x      = Math.max(0, Math.min(1, 0.5 + Math.cos(angle) * r));
        const y      = Math.max(0, Math.min(1, 0.5 + Math.sin(angle) * r));
        const z      = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.12);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Grid: structured lattice of clusters — points scatter tightly around each node.
 * Higher rows have larger, more saturated spheres.
 */
export function generateScatterGridData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    cols              = 7,
    rows              = 6,
    spread            = 0.035,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const col = Math.floor(rand() * cols);
        const row = Math.floor(rand() * rows);
        const cx  = (col + 0.5) / cols;
        const cy  = (row + 0.5) / rows;
        const x   = Math.max(0, Math.min(1, cx + randn() * spread));
        const y   = Math.max(0, Math.min(1, cy + randn() * spread));
        const z   = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Wings / X: two diagonal bands crossing at the center — y ≈ x and y ≈ 1-x.
 * Forms an X shape; higher-y points on each arm are larger.
 */
export function generateScatterWingsData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    bandWidth         = 0.07,   // Gaussian σ perpendicular to each diagonal
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const wing  = rand() < 0.5;   // which diagonal arm
        const t     = rand();          // position along arm [0, 1]
        const xBase = t;
        const yBase = wing ? t : 1 - t;
        const x     = Math.max(0, Math.min(1, xBase + randn() * bandWidth));
        const y     = Math.max(0, Math.min(1, yBase + randn() * bandWidth));
        const z     = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.1);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Cascade: diagonal waterfall — dense at top-left, spreading wide and sparse at bottom-right.
 * Simulates a signal degrading or dispersing across a gradient.
 */
export function generateScatterCascadeData({
    count             = 420,
    colorNoiseScale   = 0.6,
    seed              = 42,
    barcodeZThreshold = 0.5,
    slope             = 0.8,   // how steeply y falls as x increases
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x      = rand();
        const yMean  = 1 - x * slope;
        const spread = 0.04 + x * 0.2;   // widens toward the bottom-right
        const y      = Math.max(0, Math.min(1, yMean + randn() * spread));
        const z      = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.12);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Trimodal: three distinct clusters arranged in a triangle — two low, one high.
 * Top cluster has the largest spheres.
 */
export function generateScatterTrimodalData({
    count             = 420,
    colorNoiseScale   = 0.5,
    seed              = 42,
    barcodeZThreshold = 0.5,
    spread            = 0.07,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const clusters = [
        { cx: 0.2,  cy: 0.18 },
        { cx: 0.78, cy: 0.22 },
        { cx: 0.5,  cy: 0.80 },
    ];

    const points = [];
    for (let i = 0; i < count; i++) {
        const c      = clusters[i % 3];
        const x      = Math.max(0, Math.min(1, c.cx + randn() * spread));
        const y      = Math.max(0, Math.min(1, c.cy + randn() * spread));
        const z      = rand();
        const radius = Math.max(0, y * 0.5 + Math.abs(randn()) * 0.12);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Prism refraction: a tight input beam on the left fans into a rainbow spectrum on the right.
 * Color values map linearly to wavelength position (0 = red, 1 = violet) — pair this
 * generator with { colorInterpolator: d3.interpolateRainbow } on the ScatterPlot3D instance
 * to render full rainbow hues instead of the default yellow-red scale.
 */
export function generateScatterPrismData({
    count             = 420,
    seed              = 42,
    barcodeZThreshold = 0.5,
    beamRatio         = 0.22,   // fraction of points forming the input beam
    fanSpread         = 0.055,  // per-band Gaussian σ (tighter = sharper color bands)
    prismX            = 0.48,   // x position where the fan originates
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    const beamCount = Math.floor(count * beamRatio);
    const fanCount  = count - beamCount;

    // Input beam: tight horizontal band converging toward the prism
    for (let i = 0; i < beamCount; i++) {
        const x      = rand() * prismX;
        const y      = Math.max(0, Math.min(1, 0.5 + randn() * 0.035));
        const z      = rand();
        const radius = Math.max(0, 0.25 + Math.abs(randn()) * 0.08);
        const color  = 0.5;   // mid-value → neutral/white on most scales
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Refracted fan: wavelength determines y position; spread increases with x distance
    for (let i = 0; i < fanCount; i++) {
        const wavelength = rand();   // 0 = red (low y), 1 = violet (high y)
        const x = prismX + rand() * (1 - prismX);   // x ∈ [prismX, 1]
        // y converges at prismX and fans to full range at x=1
        const progress = (x - prismX) / (1 - prismX);
        const yMean    = 0.5 + (wavelength - 0.5) * progress * 0.82;
        const y        = Math.max(0, Math.min(1, yMean + randn() * fanSpread * (0.4 + progress * 0.6)));
        const z        = rand();
        const radius   = Math.max(0, 0.15 + progress * 0.35 + Math.abs(randn()) * 0.1);
        const color    = Math.max(0, Math.min(1, wavelength + randn() * 0.04));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

/**
 * Prism bent: beam enters high on the left, angles down to a dip at the prism center,
 * then the refracted fan sweeps dramatically back up and fans wide on the right.
 * Shape: high-left → low-center → high-right with full spectral spread. Pair with d3.interpolateRainbow.
 */
export function generateScatterPrismBentData({
    count             = 420,
    seed              = 42,
    barcodeZThreshold = 0.5,
    beamRatio         = 0.22,    // fraction of points forming the input beam
    fanSpread         = 0.05,    // per-band Gaussian σ
    prismX            = 0.4,     // x position of the prism (dip point)
    yEntry            = 0.78,    // beam y on the far left
    yDip              = 0.15,    // y at the prism / center dip
    yRise             = 0.95,    // arc center y at the far right
    fanWidth          = 1.1,     // spectral spread multiplier at right edge
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    const beamCount = Math.floor(count * beamRatio);
    const fanCount  = count - beamCount;

    // Input beam: angles downward from yEntry on the left to yDip at the prism
    for (let i = 0; i < beamCount; i++) {
        const x      = rand() * prismX;
        const t      = x / prismX;                                         // 0=left, 1=prism
        const yMean  = yEntry + (yDip - yEntry) * t;                       // linear descent
        const y      = Math.max(0, Math.min(1, yMean + randn() * 0.03));
        const z      = rand();
        const radius = Math.max(0, 0.22 + Math.abs(randn()) * 0.08);
        const color  = 0.5;
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Refracted fan: starts at dip, sweeps up and fans out dramatically to the right
    for (let i = 0; i < fanCount; i++) {
        const wavelength = rand();   // 0 = red, 1 = violet
        const x          = prismX + rand() * (1 - prismX);
        const progress   = (x - prismX) / (1 - prismX);   // 0 at prism, 1 at right edge

        // Arc center: from yDip at prism, quadratic rise to yRise at right
        const yCenter = yDip + (yRise - yDip) * progress * progress;
        const yMean   = yCenter + (wavelength - 0.5) * progress * fanWidth;
        const y       = Math.max(0, Math.min(1, yMean + randn() * fanSpread * (0.3 + progress * 0.7)));
        const z       = rand();
        const radius  = Math.max(0, 0.12 + progress * 0.42 + Math.abs(randn()) * 0.1);
        const color   = Math.max(0, Math.min(1, wavelength + randn() * 0.04));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    const close = points.filter(p => p.z >= barcodeZThreshold);
    close.sort((a, b) => b.radius - a.radius);
    close.slice(0, Math.ceil(close.length / 3)).forEach(p => { p.hasBarcode = true; });
    return points;
}

// ─── Default config ───────────────────────────────────────────────────────────

export const defaultConfig = {
    // ── Camera ────────────────────────────────────────────────────────────────
    fov:            25,
    cameraDistance: 25,
    // cameraPosition[1] = camera Y height. X/Z are derived from cameraAngleY.
    cameraPosition: [0, 3, 25],
    cameraLookAt:   [0, 1.5, 0],
    // Orbit angle around Y axis (radians). Positive swings the right side toward camera.
    cameraAngleY:   0,
    nearClip:       1.01,
    farClip:        200,

    // ── Lighting ──────────────────────────────────────────────────────────────
    directionalLightIntensity: 0.5,
    ambientLightIntensity:     0.5,
    enableShadows:             true,

    // ── Scales ────────────────────────────────────────────────────────────────
    // Each entry has { domain, range }. Set either to null to auto-compute at runtime.
    scale: {
        // x range is derived from the camera frustum — set range to override.
        x:       { domain: [0, 1],   range: null },
        y:       { domain: [0, 1],   range: [-2, 6] },
        z:       { domain: [0, 1],   range: [-4, 4] },
        // radius range[1] is equivalent to the old radiusMultiplier.
        radius:  { domain: [0, 1],   range: [0, 0.65] },
        // opacity domain is derived from per-frame camera distances — set domain to fix it.
        opacity: { domain: null,     range: [0.25, 0.975] },  // range: [farthest, closest]
        // color uses d3.interpolateYlOrRd; extend domain[1] to shift toward cooler tones.
        color:   { domain: [0, 1.4], range: null },
    },

    // ── Color interpolator ────────────────────────────────────────────────────
    // Set to any d3 interpolator, e.g. d3.interpolateRainbow for the prism generator.
    // null falls back to d3.interpolateYlOrRd.
    colorInterpolator: null,

    // ── Float animation ───────────────────────────────────────────────────────
    floatSpeedMin:   1.8,
    floatSpeedRange: 1.6,
    floatAmplitude:  [0.02, 0.08],  // [min, max] world units
    rotSpeedRange:   2.0,

    // ── Physics / collision ───────────────────────────────────────────────────
    collisionAvoidance: true,

    // ── Barcode stickers ──────────────────────────────────────────────────────
    // Applied to data points where hasBarcode === true.
    stickerSizeFraction: 0.8,   // fraction of sphere surface patch covered
    stickerOpacity:      0.5,
    barcodeUrl:          '/images/barcode.svg',
};

// ─── Class ────────────────────────────────────────────────────────────────────

export default class ScatterPlot3D {
    constructor(canvasEl, sceneConfig = {}) {
        if (!canvasEl) throw new Error('canvas element is required');
        this.canvas = canvasEl;
        this.config = { ...defaultConfig, ...sceneConfig };
        // Deep-merge scale sub-objects so partial overrides don't wipe sibling scales
        const baseScale = defaultConfig.scale;
        const userScale = sceneConfig.scale ?? {};
        this.config.scale = Object.fromEntries(
            Object.keys({ ...baseScale, ...userScale }).map(k => [
                k, { ...(baseScale[k] ?? {}), ...(userScale[k] ?? {}) },
            ])
        );
        this.data = [];
        this.spheres = [];
        this.environmentTexture = null;
        this.resizeObserver = null;
        this.resizeTimer = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.width = 0;
        this.height = 0;
        this.clock = new THREE.Clock();
        this.animationCallbacks = [];
        this.animationFrameId = null;
        this.barcodeTexture = null;
        this._barcodeTextureReady = false;
        this._pendingStickers = [];

        this._setupScene();
    }

    // ── Public API ────────────────────────────────────────────────────────────

    setData(data = []) {
        this.data = Array.isArray(data) ? data : [];
        this.rebuild();
    }

    rebuild() {
        this._clearSpheres();
        this._clearAnimationCallbacks();
        if (!this.data.length) {
            this.stopAnimation();
            this.render();
            return;
        }
        this._buildSpheres(this.data);
        this.render();
        this.startAnimation();
    }

    render() {
        if (!this.renderer || !this.scene || !this.camera) return;
        this.renderer.render(this.scene, this.camera);
    }

    startAnimation() {
        if (this.animationFrameId) return;
        const loop = () => {
            const elapsed = this.clock.getElapsedTime();
            this.animationCallbacks.forEach(cb => cb(elapsed));
            this.renderer.render(this.scene, this.camera);
            this.animationFrameId = requestAnimationFrame(loop);
        };
        this.animationFrameId = requestAnimationFrame(loop);
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    destroy() {
        if (this.resizeObserver) this.resizeObserver.disconnect();
        clearTimeout(this.resizeTimer);
        this.stopAnimation();
        this._clearSpheres();
        if (this.environmentTexture) this.environmentTexture.dispose();
        if (this.barcodeTexture) this.barcodeTexture.dispose();
        if (this.renderer) this.renderer.dispose();
    }

    // ── Internals ─────────────────────────────────────────────────────────────

    _setupScene() {
        const parent = this.canvas.parentElement;
        this.width  = parent?.clientWidth  || this.canvas.width  || 1;
        this.height = parent?.clientHeight || this.canvas.height || 1;

        this.scene = new THREE.Scene();

        // Camera position: orbit around lookAt point at cameraAngleY radians
        const { fov, cameraDistance, cameraPosition, cameraLookAt, cameraAngleY, nearClip, farClip } = this.config;
        this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height, nearClip, farClip);
        const angle = cameraAngleY ?? 0;
        this.camera.position.set(
            cameraLookAt[0] + Math.sin(angle) * cameraDistance,
            cameraPosition[1],
            cameraLookAt[2] + Math.cos(angle) * cameraDistance,
        );
        this.camera.lookAt(...cameraLookAt);
        this.camera.updateProjectionMatrix();

        const enableShadows = this.config.enableShadows ?? true;

        const dirLight = new THREE.DirectionalLight(0xffffff, this.config.directionalLightIntensity);
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = enableShadows;
        if (enableShadows) {
            dirLight.shadow.mapSize.width  = 2048;
            dirLight.shadow.mapSize.height = 2048;
            dirLight.shadow.camera.left   = -30;
            dirLight.shadow.camera.right  =  30;
            dirLight.shadow.camera.top    =  30;
            dirLight.shadow.camera.bottom = -30;
            dirLight.shadow.camera.near   = 0.1;
            dirLight.shadow.camera.far    = 60;
            dirLight.shadow.radius        = 8;
            dirLight.shadow.blurSamples   = 25;
        }
        this.scene.add(dirLight);
        this.scene.add(new THREE.AmbientLight(0xffffff, this.config.ambientLightIntensity));

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height, false);
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        this.renderer.shadowMap.enabled = enableShadows;
        if (enableShadows) this.renderer.shadowMap.type = THREE.VSMShadowMap;

        const pmrem = new THREE.PMREMGenerator(this.renderer);
        const roomEnv = new RoomEnvironment();
        this.environmentTexture = pmrem.fromScene(roomEnv, 0.04).texture;
        this.scene.environment = this.environmentTexture;
        roomEnv.dispose();
        pmrem.dispose();

        this._loadBarcodeTexture();
        this._setupResizeObserver();
    }

    _setupResizeObserver() {
        if (typeof ResizeObserver === 'undefined') return;
        this.resizeObserver = new ResizeObserver(() => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                const parent = this.canvas.parentElement;
                this.width  = parent?.clientWidth  || this.canvas.width  || 1;
                this.height = parent?.clientHeight || this.canvas.height || 1;
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.width, this.height, false);
                this.rebuild();
            }, 100);
        });
        requestAnimationFrame(() => {
            if (this.canvas.parentElement) this.resizeObserver.observe(this.canvas.parentElement);
        });
    }

    _buildSpheres(data) {
        const { floatSpeedMin, floatSpeedRange, floatAmplitude, rotSpeedRange } = this.config;
        const sc = this.config.scale;
        const [floatAmpMin, floatAmpMax] = floatAmplitude;

        // x range: auto-computed from frustum unless overridden via scale.x.range
        const vFov = THREE.MathUtils.degToRad(this.config.fov);
        const visibleHeight = 2 * Math.tan(vFov / 2) * this.config.cameraDistance;
        const visibleWidth  = visibleHeight * (this.width / this.height);
        const xScale = d3.scaleLinear()
            .domain(sc.x?.domain ?? [0, 1])
            .range(sc.x?.range   ?? [-visibleWidth / 2, visibleWidth / 2]);

        const yScale = d3.scaleLinear()
            .domain(sc.y?.domain ?? [0, 1])
            .range(sc.y?.range   ?? [-2, 6]);

        const zScale = d3.scaleLinear()
            .domain(sc.z?.domain ?? [0, 1])
            .range(sc.z?.range   ?? [-4, 4]);

        const colorScale = d3.scaleSequential(this.config.colorInterpolator ?? d3.interpolateYlOrRd)
            .domain(sc.color?.domain ?? [0, 1.4]);

        const radiusScale = d3.scaleLinear()
            .domain(sc.radius?.domain ?? [0, 1])
            .range(sc.radius?.range   ?? [0, 0.65]);

        // Opacity from camera distance — correct for any orbit angle
        const camPos = this.camera.position;
        const worldPositions = data.map(d => new THREE.Vector3(xScale(d.x), yScale(d.y), zScale(d.z)));
        const distances = worldPositions.map(p => p.distanceTo(camPos));
        const minDist = Math.min(...distances);
        const maxDist = Math.max(...distances);
        // opacity domain auto-computed from distances; range: [0] = farthest, [1] = closest
        const opDomain = sc.opacity?.domain ?? [minDist, maxDist];
        const opRange  = sc.opacity?.range  ?? [0.25, 0.975];
        const opacityOf = d3.scaleLinear().domain(opDomain).range([opRange[1], opRange[0]]);

        const spheres = [];

        data.forEach((d, i) => {
            const radius = radiusScale(d.radius);
            const color  = new THREE.Color(colorScale(d.color));

            const geometry = new THREE.SphereGeometry(radius, 24, 24);
            const material = new THREE.MeshStandardMaterial({
                color,
                transparent: true,
                opacity: opacityOf(distances[i]),
                roughness: 0.0,
                metalness: 0.0,
            });

            const sphere = new THREE.Mesh(geometry, material);
            sphere.castShadow = true;
            sphere.position.copy(worldPositions[i]);

            sphere.userData.basePosition    = worldPositions[i];
            sphere.userData.radius          = radius;
            sphere.userData.floatPhase      = Math.random() * Math.PI * 2;
            sphere.userData.floatPhaseX     = Math.random() * Math.PI * 2;
            sphere.userData.floatSpeed      = floatSpeedMin + Math.random() * floatSpeedRange;
            sphere.userData.floatSpeedX     = floatSpeedMin + Math.random() * floatSpeedRange;
            sphere.userData.floatAmplitude  = floatAmpMin + Math.random() * (floatAmpMax - floatAmpMin);
            sphere.userData.floatAmplitudeX = floatAmpMin + Math.random() * (floatAmpMax - floatAmpMin);
            sphere.userData.rotSpeedY       = (Math.random() - 0.5) * rotSpeedRange;
            sphere.userData.ox = 0; sphere.userData.oy = 0; sphere.userData.oz = 0;
            sphere.userData.vx = 0; sphere.userData.vy = 0; sphere.userData.vz = 0;
            sphere.userData.hasBarcode      = d.hasBarcode ?? false;

            spheres.push(sphere);
            this.scene.add(sphere);
        });

        this._addAnimationCallback((elapsed) => {
            spheres.forEach(s => {
                const { basePosition, floatPhase, floatPhaseX, floatSpeed, floatSpeedX, floatAmplitude, floatAmplitudeX } = s.userData;
                s.userData.floatX = basePosition.x + Math.sin(elapsed * floatSpeedX + floatPhaseX) * floatAmplitudeX;
                s.userData.floatY = basePosition.y + Math.sin(elapsed * floatSpeed  + floatPhase)  * floatAmplitude;
                s.userData.floatZ = basePosition.z;
            });

            if (this.config.collisionAvoidance) this._resolveCollisions(spheres);

            const damping = 0.75, springK = 0.12;
            spheres.forEach(s => {
                const ud = s.userData;
                ud.ox = (ud.ox + ud.vx) * (1 - springK);
                ud.oy = (ud.oy + ud.vy) * (1 - springK);
                ud.oz = (ud.oz + ud.vz) * (1 - springK);
                ud.vx *= damping; ud.vy *= damping; ud.vz *= damping;
                s.position.x = ud.floatX + ud.ox;
                s.position.y = ud.floatY + ud.oy;
                s.position.z = ud.floatZ + ud.oz;
                s.rotation.y = elapsed * ud.rotSpeedY;
            });
        });

        this.spheres = spheres;

        spheres
            .filter(s => s.userData.hasBarcode)
            .forEach(s => this._createBarcodeSticker(s, s.userData.radius, this.config.stickerOpacity));
    }

    _resolveCollisions(spheres) {
        for (let i = 0; i < spheres.length; i++) {
            for (let j = i + 1; j < spheres.length; j++) {
                const si = spheres[i], sj = spheres[j];
                const dx = (si.userData.floatX + si.userData.ox) - (sj.userData.floatX + sj.userData.ox);
                const dy = (si.userData.floatY + si.userData.oy) - (sj.userData.floatY + sj.userData.oy);
                const dz = (si.userData.floatZ + si.userData.oz) - (sj.userData.floatZ + sj.userData.oz);
                const distSq  = dx * dx + dy * dy + dz * dz;
                const minDist = si.userData.radius + sj.userData.radius;
                if (distSq < minDist * minDist && distSq > 1e-6) {
                    const dist = Math.sqrt(distSq);
                    const push = (minDist - dist) / dist * 0.5;
                    si.userData.vx += dx * push; si.userData.vy += dy * push; si.userData.vz += dz * push;
                    sj.userData.vx -= dx * push; sj.userData.vy -= dy * push; sj.userData.vz -= dz * push;
                }
            }
        }
    }

    _loadBarcodeTexture() {
        const { barcodeUrl } = this.config;
        if (!barcodeUrl) return;
        this.barcodeTexture = new THREE.Texture();
        this._barcodeTextureReady = false;
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512; canvas.height = 512;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 512, 512);
            // White pixels → transparent so bars show on any background
            const imageData = ctx.getImageData(0, 0, 512, 512);
            const d = imageData.data;
            for (let i = 0; i < d.length; i += 4) {
                if ((d[i] + d[i + 1] + d[i + 2]) / 3 > 180) d[i + 3] = 0;
            }
            ctx.putImageData(imageData, 0, 0);
            this.barcodeTexture.image = canvas;
            this.barcodeTexture.needsUpdate = true;
            this._barcodeTextureReady = true;
            this._pendingStickers.forEach(({ sphere, radius, opacity }) => this._attachSticker(sphere, radius, opacity));
            this._pendingStickers = [];
        };
        img.src = barcodeUrl;
    }

    _createBarcodeSticker(sphere, radius, opacity) {
        if (!this.barcodeTexture) return;
        if (this._barcodeTextureReady) {
            this._attachSticker(sphere, radius, opacity);
        } else {
            this._pendingStickers.push({ sphere, radius, opacity });
        }
    }

    _attachSticker(sphere, radius, opacity) {
        const halfAngle = this.config.stickerSizeFraction / 2;
        const geo = new THREE.SphereGeometry(
            radius * 1.005, 16, 16,
            Math.PI / 2 - halfAngle, halfAngle * 2,
            Math.PI / 2 - halfAngle, halfAngle * 2,
        );
        const mat = new THREE.MeshBasicMaterial({
            map: this.barcodeTexture,
            transparent: true,
            opacity,
            blending: THREE.NormalBlending,
            depthWrite: false,
        });
        const sticker = new THREE.Mesh(geo, mat);
        sticker.renderOrder = 1;
        sphere.add(sticker);
    }

    _addAnimationCallback(cb) { this.animationCallbacks.push(cb); }
    _clearAnimationCallbacks() { this.animationCallbacks = []; }

    _clearSpheres() {
        this.spheres.forEach(sphere => {
            this.scene.remove(sphere);
            sphere.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
        });
        this.spheres = [];
    }
}
