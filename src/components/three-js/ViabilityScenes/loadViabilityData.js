import * as THREE from 'three';
import * as d3 from 'd3';
import { defaultConfig } from './defaultConfig.js';

const basePath = import.meta.env.PROD
    ? import.meta.env.BASE_URL + 'data/'
    : '../../public/data/';

export async function loadViabilityCSV(configOverrides = {}) {
    const config = { ...defaultConfig, ...configOverrides };

    return d3.csv(`${basePath}${config.fileName}`, d => ({
        ccle_name: d['Cell line'],
        viability: +d['Viability'],
        pert_dose: +d['Dose'],
    }));
}

export function parseViabilityData(raw, configOverrides = {}) {
    const config = { ...defaultConfig, ...configOverrides };

    const cellLineGroups = d3.groups(raw, d => d.ccle_name)
        .map(([key, values]) => ({ key, mean: d3.mean(values, v => v.viability) }))
        .sort((a, b) => d3.descending(a.mean, b.mean));
    const cellLineToIndex = Object.fromEntries(cellLineGroups.map((g, i) => [g.key, i]));

    const doses = [...new Set(raw.map(d => d.pert_dose))].sort((a, b) => b - a);
    const doseToIndex = Object.fromEntries(doses.map((d, i) => [d, i]));

    const colorScale = d3.scaleSequential(config.colorInterpolator).domain(config.colorDomain);

    raw.forEach(d => {
        d.x = cellLineToIndex[d.ccle_name];
        d.z = doseToIndex[d.pert_dose];
        d.y = 0;
        d.c = colorScale(d.viability);
        d.rgba = new THREE.Color(d.c);
        d.value = d.viability; // for easier access in mesh generation
    });

    return raw.filter(d => d.x > config.minCellLine);
}
