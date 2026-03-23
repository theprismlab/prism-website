import * as THREE from 'three';
import * as d3 from 'd3';
import { defaultConfig } from './defaultConfig.js';

/**
 * Generate an array of procedural sphere data points.
 *
 * Each point: { x, z, value, size, rgba }
 *   x     – column index (0 … cols-1)
 *   z     – row index    (0 … rows-1)
 *   value – 0‥1 normalised value driving y-position and color
 *   size  – 0‥1 independent random value driving radius
 *   rgba  – THREE.Color derived from value via colorInterpolator
 */
export function generateSpheres(configOverrides = {}) {
    const config = { ...defaultConfig, ...configOverrides };
    const { sphereCount, cols, colorInterpolator, colorDomain } = config;

    const rows = Math.ceil(sphereCount / cols);
    const colorScale = d3.scaleSequential(colorInterpolator).domain(colorDomain);

    const data = [];
    for (let i = 0; i < sphereCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        // normalised grid coordinates 0‥1
        const nx = col / (cols - 1);
        const nz = row / Math.max(rows - 1, 1);

        // 2-D sine pattern → value in 0‥1
        const value = 0.5 + 0.5 * Math.sin(nx * Math.PI * 3 + nz * Math.PI * 2);

        data.push({
            x: col,
            z: row,
            value,
            size: Math.random(),
            rgba: new THREE.Color(colorScale(value)),
        });
    }

    return data;
}
