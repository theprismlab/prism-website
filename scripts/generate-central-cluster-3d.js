/**
 * Generates a synthetic central-cluster 3D dataset and writes it to
 * public/data/central-cluster-3d.json.
 *
 * Run from the project root:
 *   node scripts/generate-central-cluster-3d.js
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as d3 from 'd3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, '..');

// ── Generator (mirrors CentralCluster3D.vue) ─────────────────────────────────

function generateScatterCentralClusterData({
    count             = 800,
    cx                = 0.5,   // center x  [0, 1]
    cy                = 0.5,   // center y  [0, 1]
    sigma             = 2.2,   // std-dev controls spread
    seed              = 15,    // deterministic seed
    barcodeFraction   = 0.3,   // tag largest radii
    barcodeZThreshold = 0.2,   // eligible if z ≥ threshold
} = {}) {
    let s = seed;
    const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn2 = () => {
        const u = rand() + 1e-9, v = rand() + 1e-9; // +1e-9 guards against log(0)
        const mag = Math.sqrt(-2 * Math.log(u));
        return [mag * Math.cos(2 * Math.PI * v), mag * Math.sin(2 * Math.PI * v)];
    };

    const points = [];

    for (let i = 0; i < count; i++) {
        const [nx, ny] = randn2();
        const dx = nx * sigma;
        const dy = ny * sigma;

        const dist  = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const t = Math.min(dist / (sigma * 1.75), 1);

        const x = cx + dx;
        const y = cy + dy;

        const radius = 0.04 + 0.66 * (1 - t) + Math.abs(randn2()[0]) * 0.03;

        const z = 0.35 + (1 - t) * 0.55 + randn2()[0] * 0.05;

        const color = ((angle / (Math.PI * 2) + 1) % 1 + (rand() - 0.5) * 0.18) % 1;

        points.push({ x, y, z, radius, color, hasBarcode: false });
    }

    // Tag the largest, front-most points with barcodes.
    points
        .filter(p => p.z >= barcodeZThreshold)
        .sort((a, b) => b.radius - a.radius)
        .slice(0, Math.ceil(points.length * barcodeFraction))
        .forEach(p => { p.hasBarcode = true; });

    return points;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const data = generateScatterCentralClusterData();
const outPath = resolve(root, 'public/data/central-cluster-3d.json');
writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`✓ Wrote ${data.length} points → ${outPath}`);
