import * as THREE from 'three';
import * as d3 from 'd3';

const basePath = import.meta.env.PROD
    ? import.meta.env.BASE_URL + 'data/'
    : '../../public/data/';

/**
 * Load and parse the viability heatmap CSV.
 * Returns a flat array of data points with computed x, z, color fields.
 */
export async function loadHeatmapData(config) {
    const { fileName, minCellLine } = config;

    const raw = await d3.csv(`${basePath}${fileName}`, d => ({
        ccle_name: d['Cell line'],
        viability: +d['Viability'],
        pert_dose: +d['Dose'],
    }));

    // Map cell lines to sequential numbers (sorted by descending mean viability)
    const cellLineGroups = d3.groups(raw, d => d.ccle_name)
        .map(([key, values]) => ({ key, mean: d3.mean(values, v => v.viability) }))
        .sort((a, b) => d3.descending(a.mean, b.mean));

    const cellLineToIndex = Object.fromEntries(cellLineGroups.map((g, i) => [g.key, i]));

    // Map doses to sequential numbers
    const doses = [...new Set(raw.map(d => d.pert_dose))].sort((a, b) => b - a);
    const doseToIndex = Object.fromEntries(doses.map((d, i) => [d, i]));

    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1, 0.2]);

    raw.forEach(d => {
        d.x = cellLineToIndex[d.ccle_name];
        d.z = doseToIndex[d.pert_dose];
        d.y = 0;
        d.c = colorScale(d.viability);
        d.rgba = new THREE.Color(d.c);
    });

    return raw.filter(d => d.x > minCellLine);
}
