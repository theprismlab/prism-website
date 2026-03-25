import * as d3 from 'd3';

/**
 * All tunable parameters for the viability heatmap scene.
 * Override any subset when instantiating ViabilityHeatmap.
 */
export const defaultConfig = {
    // ── Data ──
    fileName: 'BRD-K05804044-viability-heatmap.csv',
    minCellLine: 300,

    // ── Color ──
    colorInterpolator: d3.interpolateYlOrRd,
    colorDomain: [1, 0.2],

    // ── Camera ──
    fov: 25,
    cameraDistance: 25,
    cameraPosition: [0, 4.5, 25],   // [x, y, z] — z is overridden by cameraDistance
    cameraLookAt: [0, 6.5, 0],
    nearClip: 1.01,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,

    // ── Planes ──
    planeZoom: 10.8,          // heatmapZoom * 1.2, controls plane spread
    planeWidthMultiplier: 1.6,
    planeYPosition: 1,
    planeOpacityRange: [0.5, 1],

    // ── Spheres ──
    sphereXStep: 8,
    sphereZStep: 2,
    sphereBaseRadiusMultiplier: 0.018,
    sphereSizeScaleRange: [1.0, 0.3],
    sphereOpacityRange: [0.7, 0.15],
    sphereRadiusScaleRange: [1.5, 0.2],
    sphereFloatSpeedMin: 0.4,
    sphereFloatSpeedRange: 0.4,
    sphereFloatAmplitudeBase: 0.08,
    sphereFloatAmplitudeRange: 0.06,

    // ── Y-axis spread (sphere height mapping) ──
    ySpread: 12,
    ySpreadOffset: 10,
};
