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
    cameraElevation: 0.06, // vertical orbit around X axis (radians)
    cameraLookAt:    [0, 20.5, 0], // world coords to look at (also the center of the scatter plot)
    nearClip:        0.1,
    farClip:         200,

    // Reference canvas dimensions for baking X-axis spread.
    // Only used by generate-scatter-data.js; the renderer uses the actual canvas size.
    referenceWidth:  1920,
    referenceHeight: 1080,
};
