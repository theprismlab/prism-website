/**
 * Single source of truth for scene dimensions shared between:
 *   - scripts/generate-scatter-data.js   (bakes world positions into JSON)
 *   - src/visualization/plots/ScatterPlotFromJSON.js  (renders from that JSON)
 *
 * If you change fov, cameraDistance, or cameraLookAt here, re-run:
 *   node scripts/generate-scatter-data.js
 */

export const sceneConfig = {
    fov:             25,
    cameraDistance:  25,
    cameraAzimuth:   0, // horizontal orbit around Y axis (radians)
    cameraElevation: 0.0, // vertical orbit around X axis (radians)
    cameraLookAt:    [0, 6.5, 0], // world coords to look at — equals visibleHeight * ySpreadCenterFraction
    nearClip:        0.1,
    farClip:         200,

    // Y-cloud layout — mirrors ScatterLayer.js SPHERE_CONFIG
    ySpreadFraction:       1.5, // total y range as multiple of visible screen height
    ySpreadCenterFraction: 0.25,  // where the cloud center sits (0.5 = screen center)

    // Reference canvas dimensions for baking X-axis spread.
    // Only used by generate-scatter-data.js; the renderer uses the actual canvas size.
    referenceWidth:  1920,
    referenceHeight: 1080,
};
