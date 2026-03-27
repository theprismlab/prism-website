import * as d3 from 'd3';

const DATA_FILE = 'BRD-K05804044-viability-heatmap.csv';

// Maximum number of cell lines to include, ranked by descending mean viability.
// Cell lines beyond this rank are excluded (low viability, visually uninteresting).
const MAX_CELL_LINES = 400;

// Explicit cell line exclusions by ccle_name. Add names here to remove specific
// lines regardless of their viability ranking.
const EXCLUDED_CELL_LINES = new Set([
    // e.g. 'A375_SKIN', 'HELA_CERVIX'
]);

const basePath = import.meta.env.PROD
    ? import.meta.env.BASE_URL + 'data/'
    : '../../public/data/';

export async function loadViabilityCSV() {
    return d3.csv(`${basePath}${DATA_FILE}`, d => ({
        ccle_name: d['Cell line'],
        lineage: d['Lineage'],
        viability: +d['Viability'],
        pert_dose: +d['Dose'],
    }));
}

function computeGridIndices(raw) {
    const cellLineGroups = d3.groups(raw, d => d.ccle_name)
        .map(([key, values]) => ({ key, mean: d3.mean(values, v => v.viability) }))
        .sort((a, b) => d3.descending(a.mean, b.mean))
        .filter((g, i)=> i > MAX_CELL_LINES && i % 2 === 0) // filter out low-ranking cell lines and keep Nth
        // .filter(g => !EXCLUDED_CELL_LINES.has(g.key))
        // .slice(0, MAX_CELL_LINES);

    const cellLineToIndex = Object.fromEntries(cellLineGroups.map((g, i) => [g.key, i]));

    const doses = [...new Set(raw.map(d => d.pert_dose))].sort((a, b) => b - a);
    const doseToIndex = Object.fromEntries(doses.map((d, i) => [d, i]));

    return { cellLineToIndex, doseToIndex };
}

export function parseHeatmapData(raw) {
    const { cellLineToIndex, doseToIndex } = computeGridIndices(raw);

    return raw
        .map(d => ({
            ccle_name: d.ccle_name,
            viability: d.viability,
            pert_dose: d.pert_dose,
            x: cellLineToIndex[d.ccle_name],
            z: doseToIndex[d.pert_dose],
            y: 0,
        }))
        .filter(d => d.x !== undefined)
        .sort((a, b) => d3.ascending(a.pert_dose, b.pert_dose));
}

export function parseScatterPlotData(raw) {
    const { cellLineToIndex, doseToIndex } = computeGridIndices(raw);

    return raw
        .map(d => ({
            ccle_name: d.ccle_name,
            lineage: d.lineage,
            viability: d.viability,
            pert_dose: d.pert_dose,
            x: cellLineToIndex[d.ccle_name],
            z: doseToIndex[d.pert_dose],
            value: d.viability,
            radius: d.viability,
        }))
        .filter(d => d.x !== undefined)
        .sort((a, b) => d3.ascending(a.pert_dose, b.pert_dose));
}