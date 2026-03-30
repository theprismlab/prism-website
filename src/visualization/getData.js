import * as d3 from 'd3';

const DATA_FILE = 'BRD-K05804044-viability-heatmap.csv';



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

    const cellLineToIndex = Object.fromEntries(cellLineGroups.map((g, i) => [g.key, i]));
    const doses = [...new Set(raw.map(d => d.pert_dose))].sort((a, b) => b - a);
    const doseToIndex = Object.fromEntries(doses.map((d, i) => [d, i]));

    return { cellLineToIndex, doseToIndex };
}

export function parseHeatmapData(raw) {
    const { cellLineToIndex, doseToIndex } = computeGridIndices(raw);

    return raw
        .map(d => ({
            x: cellLineToIndex[d.ccle_name],
            z: doseToIndex[d.pert_dose],
            y: 0,
            color: +d.viability,
        }))
        .filter(d => d.x !== undefined && d.z !== undefined);
}



export function parseScatterPlotData(raw) {
    const { cellLineToIndex, doseToIndex } = computeGridIndices(raw);

    return raw
        .map(d => ({
            x: cellLineToIndex[d.ccle_name],
            z: doseToIndex[d.pert_dose],
            y: +d.viability,
            color: +d.viability,
        }))
        .filter(d => d.x !== undefined && d.z !== undefined);
}