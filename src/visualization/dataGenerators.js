
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
 * Bubbles Wave: original Bubbles aesthetic (large radii, heavy color noise, wide scatter)
 * with y driven purely by a cosine dip — edges sit higher, center dips low.
 */
export function generateScatterBubblesWaveData({
    count             = 420,
    colorNoiseScale   = 0.8,
    seed              = 42,
    barcodeZThreshold = 0.5,
    waveAmplitude     = 0.22,   // how far edges rise above the center dip
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x      = rand();
        const yMean  = 0.5 + waveAmplitude * Math.cos(x * Math.PI * 2);  // high edges, dip center
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
 * Bubbles Wave Filled: same as BubblesWave (high edges, cosine dip at center) but the
 * top-center gap is filled — a cloud of large bubbles populates the upper-center region
 * so the top of the visualization has no empty hole.
 */
export function generateScatterBubblesWaveFilledData({
    count             = 420,
    colorNoiseScale   = 0.8,
    seed              = 42,
    barcodeZThreshold = 0.5,
    waveAmplitude     = 0.22,
    fillRatio         = 0.30,   // fraction of points used to fill the top-center gap
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    const waveCount = Math.floor(count * (1 - fillRatio));
    const fillCount = count - waveCount;

    // Wave layer: same cosine shape as BubblesWave
    for (let i = 0; i < waveCount; i++) {
        const x      = rand();
        const yMean  = 0.5 + waveAmplitude * Math.cos(x * Math.PI * 2);
        const y      = Math.max(0, Math.min(1, yMean + randn() * 0.22));
        const z      = rand();
        const radius = Math.max(0, y * 0.8 + randn() * 0.18);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Fill layer: large bubbles clustered at the top-center, filling the gap
    for (let i = 0; i < fillCount; i++) {
        const x      = Math.max(0, Math.min(1, 0.5 + randn() * 0.18));  // centered at x=0.5
        const yMean  = 0.82 + randn() * 0.1;                             // high y, near the top
        const y      = Math.max(0, Math.min(1, yMean));
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
 * Vanishing point: bubbles stream from a distant horizon toward the viewer.
 * Distant points are tiny and dense, packed near the center vanishing point.
 * As depth increases toward the viewer, bubbles fan out laterally, drift upward,
 * and grow large — hovering like clouds in the foreground.
 */
export function generateScatterVanishingPointData({
    count             = 320,
    colorNoiseScale   = 0.7,
    seed              = 42, // deterministic random sequence for consistent point generation across scenes
    barcodeZThreshold = 0.5,
    vpX               = 0.5,    // vanishing point horizontal position
    vpY               = 0.2,   // vanishing point vertical position (horizon)
    maxSpread         = 0.6,   // x σ at furthest foreground depth
    cloudRise         = 1.1,   // how far y drifts upward from VP to foreground
    depthBias         = 0.75,    // power > 1 packs most points near the distant horizon
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        // t=0: distant horizon (at VP), t=1: close foreground (cloud layer)
        // depthBias > 1 concentrates most points near the horizon
        const t = Math.pow(rand(), depthBias);

        // x: tight column at horizon, fans wide in foreground
        const xSpread = t * maxSpread;
        const x = Math.max(0, Math.min(1, vpX + randn() * (xSpread + 0.008)));

        // y: starts at horizon, clouds drift upward as they approach
        // const yMean = vpY + t * cloudRise;
        // const yNoise = 0.03 + t * 0.18;  // tighter scatter at distance, looser near viewer
        // const y = Math.max(0, Math.min(1, yMean + randn() * yNoise));

        // extra upward pull on large foreground bubbles so big circles cluster near top
        const yMean = vpY + t * cloudRise + Math.pow(t, 2.5) * 0.18;
        const yNoise = 0.03 + t * 0.14;  // tighter scatter at distance, looser near viewer
        const y = Math.max(0, Math.min(1, yMean + randn() * yNoise));

        const z = rand();

        // Radius: nearly zero at horizon, large buoyant spheres in the foreground
        const radius = Math.max(0, Math.pow(t, 1.1) * 0.88 + randn() * (0.04 + t * 0.08));

        // Color: distant points are dim/cool, foreground clouds are warm/saturated
        const color = Math.max(0, Math.min(1, t * 0.75 + (rand() - 0.5) * colorNoiseScale));

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
 * Fountain: dense small bubbles at bottom-center, fanning outward and growing as y rises.
 * x-spread is proportional to y — bottom points are tightly packed at center,
 * top points span the full width with large bubbles. y is bottom-heavy so there
 * are more points near the ground than at the crown.
 */
export function generateScatterFountainData({
    count             = 420,
    colorNoiseScale   = 0.8,
    seed              = 42,
    barcodeZThreshold = 0.5,
    maxSpread         = 0.45,   // x half-width σ at y=1; narrows to 0 at y=0
    yBias             = 1.6,    // power > 1 pushes more points toward bottom
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        // Bottom-heavy y distribution — more points near y=0
        const y      = Math.max(0, Math.min(1, Math.pow(rand(), yBias) + randn() * 0.04));
        // x-spread proportional to y — tight column at bottom, wide fan at top
        const xSpread = y * maxSpread;
        const x      = Math.max(0, Math.min(1, 0.5 + randn() * (xSpread + 0.01)));
        const z      = rand();
        // Radius grows with y — small pebbles at bottom, large bubbles at top
        const radius = Math.max(0, y * 0.82 + randn() * 0.12);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

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

/**
 * Color Clusters: N distinct groups, each with its own random hue and random position.
 * Points within a cluster share a color family and vary in radius by distance from center.
 */
export function generateScatterColorClustersData({
    count        = 420,
    clusterCount = 6,
    spread       = 0.09,   // Gaussian σ within each cluster
    seed         = 42,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    // Each cluster gets a random center and a unique hue
    const clusters = Array.from({ length: clusterCount }, () => ({
        cx:  0.1 + rand() * 0.8,
        cy:  0.1 + rand() * 0.8,
        hue: rand(),
    }));

    const points = [];
    for (let i = 0; i < count; i++) {
        const c      = clusters[i % clusterCount];
        const x      = Math.max(0, Math.min(1, c.cx + randn() * spread));
        const y      = Math.max(0, Math.min(1, c.cy + randn() * spread));
        const z      = rand();
        const dist   = Math.hypot(x - c.cx, y - c.cy);
        const radius = Math.max(0, 0.6 - dist / spread * 0.35 + Math.abs(randn()) * 0.08);
        const color  = Math.max(0, Math.min(1, c.hue + randn() * 0.04));
        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    return points;
}
