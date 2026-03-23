import * as d3 from 'd3';

/**
 * Default parameters for bubble scene visualizations.
 * Override any subset via the sceneConfig prop.
 */
export const defaultConfig = {
    // ── Sphere generation ──
    sphereCount: 500,              // total procedural spheres
    cols: 25,                      // spheres per row (rows = ceil(count/cols))

    // ── Animation ──
    // Key into the animations registry (see animations.js): 'float' | 'stream' | 'none' | 'wave' | 'gravity' | 'swirl'

    animation: 'groupBezier',

    // ── Color ──
    colorInterpolator: d3.interpolateTurbo,
    colorDomain: [0, 1],          // value domain mapped to interpolator

    // ── Camera ──
    fov: 50,
    cameraDistance: 100,
    cameraPosition: [0, 25, 25],
    cameraLookAt: [0, 25, 0],
    nearClip: 1.01,
    farClip: 600,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,

    // ── Scales (value 0‥1 → visual) ──
    radiusBase: 0.018,             // base radius as fraction of scene width
    radiusRange: [1.5, 0.2],      // value → radius multiplier
    depthRange: [1.0, 0.1],       // z → radius multiplier (far = smaller)
    opacityRange: [0.7, 0.15],    // z → opacity (far = transparent)
    yRange: [15, -10],              // value → y position
};
