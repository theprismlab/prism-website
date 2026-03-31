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
    cameraDistance:  18,
    cameraAzimuth:   0,
    cameraElevation: 0.06,
    cameraLookAt:    [0, 8, 0],
    nearClip:        0.1,
    farClip:         200,

    // Reference canvas dimensions for baking X-axis spread.
    // Only used by generate-scatter-data.js; the renderer uses the actual canvas size.
    referenceWidth:  1920,
    referenceHeight: 1080,
};
