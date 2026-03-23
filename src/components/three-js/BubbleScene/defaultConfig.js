import * as d3 from 'd3';

/**
 * Default parameters for bubble scene visualizations.
 * Override any subset via the sceneConfig prop.
 */
export const defaultConfig = {
    // ── Data ──
    fileName: 'BRD-K05804044-viability-heatmap.csv',
    minCellLine: 200,

    // ── Animation ──
    // Key into the animations registry (see animations.js): 'float' | 'wave' | 'none'
    animation: 'wave',

    // ── Color ──
    colorInterpolator: d3.interpolateTurbo,
    colorDomain: [1, 0.2],

    // ── Camera ──
    fov: 25,
    cameraDistance: 50,
    cameraPosition: [0, 5, 25],
    cameraLookAt: [0, 5, 0],
    nearClip: 1.01,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,

    // ── Sampling ──
    xStep: 8,                      // keep every Nth cell line
    zStep: 2,                      // keep every Nth dose

    // ── Scales (data → visual) ──
    radiusBase: 0.018,             // base radius as fraction of scene width
    radiusRange: [1.5, 0.2],      // viability → radius multiplier on base
    depthRange: [1.0, 0.1],       // z → radius multiplier (far = smaller)
    opacityRange: [0.7, 0.15],    // z → opacity (far = transparent)
    yRange: [12, -2],             // viability → y position

    // ── Float animation ──
    floatSpeed: [0.4, 0.4],       // [min, randomRange] per sphere
    floatAmplitude: [0.08, 0.06], // [base, randomRange] scaled by cellHeight & depth

    // ── Wave animation ──
    waveSpeed: 1.5,                // wave propagation speed
    waveAmplitude: 0.5,            // wave peak height
    waveLength: 6.0,               // spatial wavelength (higher = broader wave)
};
