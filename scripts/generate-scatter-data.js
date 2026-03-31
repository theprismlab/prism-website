/**
 * Generates public/data/scatter-plot-data.json from the viability CSV.
 *
 * Run from the project root:
 *   node scripts/generate-scatter-data.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as d3 from 'd3';
import { sceneConfig } from '../src/visualization/plots/scatter-scene-config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, '..');

// ── Read CSV ──────────────────────────────────────────────────────────────────

const csvPath = resolve(root, 'public/data/BRD-K05804044-viability-heatmap.csv');
const raw     = d3.csvParse(readFileSync(csvPath, 'utf8'), d => ({
    ccle_name:  d['Cell line'],
    lineage:    d['Lineage'],
    viability:  +d['Viability'],
    pert_dose:  +d['Dose'],
}));

// ── Grid indices (mirrors computeGridIndices in data-services.js) ─────────────

function computeGridIndices(raw) {
    const cellLineGroups = d3.groups(raw, d => d.ccle_name)
        .map(([key, values]) => ({ key, mean: d3.mean(values, v => v.viability) }))
        .sort((a, b) => d3.descending(a.mean, b.mean))
        .filter((g, i)=> i > 400 && i % 2 === 0) 

    const cellLineToIndex = Object.fromEntries(cellLineGroups.map((g, i) => [g.key, i]));
    const doses           = [...new Set(raw.map(d => d.pert_dose))].sort((a, b) => b - a);
    const doseToIndex     = Object.fromEntries(doses.map((d, i) => [d, i]));

    return { cellLineToIndex, doseToIndex };
}

// ── Parse scatter data (mirrors parseScatterData in data-services.js) ─────────

function parseScatterData(raw) {
    const { cellLineToIndex, doseToIndex } = computeGridIndices(raw);
    return raw
        .map(d => ({
            x:          cellLineToIndex[d.ccle_name],
            z:          doseToIndex[d.pert_dose],
            y:          d.viability,
            color:      d.viability,
            radius:     d.viability,
            viability:  Math.random()
        }))
        .filter(d => d.x !== undefined && d.z !== undefined);
}

// ── Scale and compute world positions (mirrors exportScatterPlotJSON) ─────────

const { fov, cameraDistance, referenceWidth, referenceHeight } = sceneConfig;
const sphereXStep = 4;
const sphereZStep = 2;

const data    = parseScatterData(raw);
const sampled = data.filter(d => d.x % sphereXStep === 0 && d.z % sphereZStep === 0);

const vFovRad       = (fov * Math.PI) / 180;
const visibleHeight = 2 * Math.tan(vFovRad / 2) * cameraDistance;
const visibleWidth  = visibleHeight * (referenceWidth / referenceHeight);

const xExtent        = d3.extent(data, d => d.x);
const zExtent        = d3.extent(data, d => d.z);
// const yExtent        = d3.extent(data, d => d.y).reverse();
const yExtent = [1.4, 0.1];

const colorThreshold = xExtent[0] + (xExtent[1] - xExtent[0]) / 3;




const xScale       = d3.scaleLinear().domain(xExtent).range([-visibleWidth / 1.75,  visibleWidth / 1.75]);
const zScale       = d3.scaleLinear().domain(zExtent).range([-visibleHeight / 2, visibleHeight / 2]);
const yScale       = d3.scaleLinear().domain(yExtent).range([-visibleHeight / 2, visibleHeight / 2]);
const opacityScale = d3.scaleLinear().domain(zExtent).range([0.1, 0.9]);
const xNorm        = d3.scaleLinear().domain([colorThreshold, xExtent[1]]).range([0.4, 0.85]);
const zNorm        = d3.scaleLinear().domain(zExtent).range([0.3, 0.85]);
const hasBarcode = (d)=>{
    const zMin = 5;
    const radiusMin = 0.5;
    // if d.z and d.radius are within the max and min, return true
    return d.z >= zMin && d.radius >= radiusMin;
}
const getRadius = ()=>{
    const radiusScale  = d3.scaleLinear().domain([0, 1]).range([0.1, 0.65]);
    const radiusJitter = 0.85 + Math.random();
    const radius = radiusScale(Math.random()) * radiusJitter;
    return radius;
}

const result = sampled.map(d => ({
    radius:    getRadius(),
    world: {
        x: xScale(d.x),
        y: yScale(d.y),
        z: zScale(d.z),
    },
    color:   d.x < colorThreshold
        ? d3.interpolateGnBu(zNorm(d.z))
        : d3.interpolateYlOrRd(xNorm(d.x)),
    opacity: opacityScale(d.z),
    hasBarcode: hasBarcode(d),
}));

// ── Write output ──────────────────────────────────────────────────────────────

const outPath = resolve(root, 'public/data/scatter-plot-data.json');
writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
console.log(`✓ Wrote ${result.length} points → ${outPath}`);
