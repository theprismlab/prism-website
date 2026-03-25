/**
 * Generates pre-computed bubble cluster data for consistent layouts.
 * Run with: node scripts/generate-bubble-cluster-data.js
 *
 * Outputs: public/data/bubble-cluster.json
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
    sphereCount: 100,
    clusterRadius: 7.75,
    minRadius: 0.5,
    maxRadius: 2.5,
};

function generateSphereData(count, clusterRadius) {
    const data = [];
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = clusterRadius * Math.pow(Math.random(), 0.4);

        const size = Math.random();
        const jitter = 0.85 + Math.random() * 0.3;

        data.push({
            x: round(r * Math.sin(phi) * Math.cos(theta)),
            y: round(r * Math.sin(phi) * Math.sin(theta)),
            z: round(r * Math.cos(phi)),
            size: round(size),
            jitter: round(jitter),
        });
    }
    return data;
}

function round(v) {
    return Math.round(v * 10000) / 10000;
}

const sphereData = generateSphereData(config.sphereCount, config.clusterRadius);

const output = {
    config,
    spheres: sphereData,
};

const outPath = resolve(__dirname, '../public/data/bubble-cluster.json');
writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Wrote ${sphereData.length} spheres to ${outPath}`);
