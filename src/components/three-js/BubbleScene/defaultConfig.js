import * as d3 from 'd3';

/**
 * Default parameters for bubble scene visualizations.
 * Override any subset via the sceneConfig prop.
 */
export const defaultConfig = {
    // ── Data ──
    fileName: 'BRD-K05804044-viability-heatmap.csv',
    minCellLine:200,

    // ── Animation ──
    // Key into the animations registry (see animations.js): 'float' | 'pulse' | 'none'
    animation: 'pulse',

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

    // ── Spheres ──
    sphereXStep: 8,
    sphereZStep: 2,
    sphereBaseRadiusMultiplier: 0.018,
    sphereSizeScaleRange: [1.0, 0.1],
    sphereOpacityRange: [0.7, 0.15],
    sphereRadiusScaleRange: [1.5, 0.2],
    pulseSpeedMin: 0.3,
    pulseSpeedRange: 0.4,
    pulseAmplitude: 0.15,

    // ── Y-axis spread (sphere height mapping) ──
    ySpread: 12,
    ySpreadOffset: 10,
};
