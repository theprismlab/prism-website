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
        .filter(g=> g.mean < 0.8 && g.mean > 0.6); // filter out cell lines with very high or low viability to focus on more interesting patterns. 

    const cellLineToMean = Object.fromEntries(cellLineGroups.map(g => [g.key, g.mean]));
    const cellLineToIndex = Object.fromEntries(cellLineGroups.map((g, i) => [g.key, i]));
    const doses = [...new Set(raw.map(d => d.pert_dose))].sort((a, b) => b - a);
    const doseToIndex = Object.fromEntries(doses.map((d, i) => [d, i]));

    return { cellLineToIndex, doseToIndex, cellLineToMean };
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



export function parseScatterData(raw) {
    const { cellLineToIndex, doseToIndex } = computeGridIndices(raw);

    let scatterData = raw.filter((d,i)=> i % 5 === 0   )
        .map(d => ({
            x: cellLineToIndex[d.ccle_name] , // jittered x for better visibility`
            //x: Math.random(), // jittered x for better visibility
            z: doseToIndex[d.pert_dose], // jittered z for better visibility
            y: +d.viability,
            color: +d.viability,
            radius: +d.viability,
            hasBarcode: true,
        }))
     .filter((d, i) => d.x !== undefined && d.z !== undefined  ); // downsample for performance
    return scatterData;
}



/**
 * Loads, transforms, and downloads all deterministic scatter plot data as JSON.
 *
 * Replicates the full pipeline from buildScatterLayer / computeScales using a
 * fixed reference viewport so world positions are stable and reproducible.
 *
 * Note: per-point sphere radius and float phase are random at render time
 * and are intentionally excluded.  The y world position also omits the
 * `radius * 0.2` nudge that buildScatterLayer adds, for the same reason.
 *
 * @param {object} options
 * @param {number} options.referenceWidth    Reference viewport width  (default 1920)
 * @param {number} options.referenceHeight   Reference viewport height (default 1080)
 * @param {number} options.fov               Camera vertical FOV in degrees (default 25)
 * @param {number} options.cameraDistance    Camera distance from look-at (default 25)
 * @param {number} options.sphereXStep       Cell-line sampling stride (default 4)
 * @param {number} options.sphereZStep       Dose sampling stride      (default 2)
 * @param {boolean} options.download         Trigger browser file download (default true)
 * @returns {Promise<object[]>}              The exported point array
 */
export async function exportScatterPlotJSON({
    referenceWidth  = 1920,
    referenceHeight = 1080,
    fov             = 25,
    cameraDistance  = 25,
    sphereXStep     = 4,
    sphereZStep     = 2,
    download        = true,
} = {}) {
    const raw     = await loadViabilityCSV();
    const data    = parseScatterData(raw);
    const sampled = data.filter(d => d.x % sphereXStep === 0 && d.z % sphereZStep === 0);

    // Replicate computeScales from ScatterLayer.js at the reference viewport.
    // visibleHeight = 2 * tan(fov/2) * cameraDistance  (standard view-frustum formula).
    const vFovRad       = (fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFovRad / 2) * cameraDistance;
    const visibleWidth  = visibleHeight * (referenceWidth / referenceHeight);

    // Extents are computed from the full (non-sampled) data, matching ScatterLayer.
    const xExtent         = d3.extent(data, d => d.x);
    const zExtent         = d3.extent(data, d => d.z);
    const viabilityExtent = d3.extent(data, d => d.y);
    const colorThreshold  = xExtent[0] + (xExtent[1] - xExtent[0]) / 3;

    const halfSpread   = visibleHeight * 1.75 / 2;
    const centerOffset = visibleHeight * 0.5;

    const xScale       = d3.scaleLinear().domain(xExtent).range([0, visibleWidth]);
    const zScale       = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    // Viability → world y: high viability maps to high y (matching ScatterLayer yScale).
    const yScale       = d3.scaleLinear().domain(viabilityExtent).range([centerOffset + halfSpread, centerOffset - halfSpread]);
    const opacityScale = d3.scaleLinear().domain(zExtent).range([0.25, 0.95]);
    const xNorm        = d3.scaleLinear().domain([colorThreshold, xExtent[1]]).range([0.4, 0.85]);
    const zNorm        = d3.scaleLinear().domain(zExtent).range([0.3, 0.85]);
    const xOffset      = visibleWidth  / 2;
    const zOffset      = visibleHeight / 2;

    const result = sampled.map(d => ({
        world: {
            x: xScale(d.x) - xOffset,
            y: yScale(d.y),        // excludes random radius*0.2 nudge
            z: zScale(d.z) - zOffset,
        },
        color:   d.x < colorThreshold
            ? d3.interpolateGnBu(zNorm(d.z))
            : d3.interpolateYlOrRd(xNorm(d.x)),
        opacity: opacityScale(d.z),
    }));

    if (download) {
        const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = 'scatter-plot-data.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    return result;
}