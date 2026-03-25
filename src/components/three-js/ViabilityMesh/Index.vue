<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const meshConfig = {
    // ── Camera ──
    fov: 25,
    cameraDistance: 80,
    cameraPosition: [0, 35, 25],
    cameraLookAt: [0, 17.5, 0],
    nearClip: 1.01,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,

    // ── Planes / Mesh ──
    planeZoom: 1.8,
    planeYPosition: 10,
    planeOpacityRange: [0.5, 1],

    // ── Y-axis spread ──
    ySpread: 12,

    // ── Curvature ──
    meshCurveRadius: 100,   // cylinder radius — smaller = more curve, 0 = flat

    // ── Subdivision (smooth interpolation) ──
    meshSubdivisions: 4,    // subdivisions between each data point (1 = no smoothing)
};

const props = defineProps({
    data: { type: Array, required: true },
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const config = { ...meshConfig, ...props.sceneConfig };
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    buildMesh(props.data);

    await new Promise(r => requestAnimationFrame(r));
    scene.render();

    scene.onRebuild(() => buildMesh(props.data));
});

// ── Scale Computation ──

function computeScales(data) {
    const { fov, cameraDistance } = config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);
    const valueExtent = d3.extent(data, d => d.viability);

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const sceneWidth = visibleWidth;
    const planeWidth = sceneWidth / xExtent[1];
    const planeHeight = visibleHeight / Math.max(zExtent[1], 1);

    const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    const yScale = d3.scaleLinear().domain(valueExtent).range([config.ySpread, -config.ySpread]);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(config.planeOpacityRange);

    return {
        xScale, zScale, yScale, opacityScale,
        xOffset: sceneWidth / 2,
        zOffset: visibleHeight / 2,
        planeWidth, planeHeight,
    };
}

// ── Catmull-Rom helpers ──

function catmullRom(p0, p1, p2, p3, t) {
    const t2 = t * t, t3 = t2 * t;
    return 0.5 * (
        (2 * p1) +
        (-p0 + p2) * t +
        (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
        (-p0 + 3 * p1 - 3 * p2 + p3) * t3
    );
}

function sampleGrid(grid2d, rows, cols, r, c) {
    const rr = Math.max(0, Math.min(rows - 1, r));
    const cc = Math.max(0, Math.min(cols - 1, c));
    return grid2d[rr][cc];
}


function bicubicSample(grid2d, rows, cols, fr, fc) {
    const r0 = Math.floor(fr);
    const c0 = Math.floor(fc);
    const tr = fr - r0;
    const tc = fc - c0;

    // Interpolate 4 rows along columns, then interpolate the results along the row direction
    const rowVals = [];
    for (let dr = -1; dr <= 2; dr++) {
        const p0 = sampleGrid(grid2d, rows, cols, r0 + dr, c0 - 1);
        const p1 = sampleGrid(grid2d, rows, cols, r0 + dr, c0);
        const p2 = sampleGrid(grid2d, rows, cols, r0 + dr, c0 + 1);
        const p3 = sampleGrid(grid2d, rows, cols, r0 + dr, c0 + 2);
        rowVals.push(catmullRom(p0, p1, p2, p3, tc));
    }
    return catmullRom(rowVals[0], rowVals[1], rowVals[2], rowVals[3], tr);
}

// ── Mesh Creation ──

function buildMesh(data) {
    const scales = computeScales(data);
    const { xScale, zScale, yScale, xOffset, zOffset } = scales;
    const { planeZoom } = config;
    const sub = Math.max(1, config.meshSubdivisions);

    // Build a lookup: grid[z][x] = datum
    const grid = new Map();
    data.forEach(d => {
        if (!grid.has(d.z)) grid.set(d.z, new Map());
        grid.get(d.z).set(d.x, d);
    });

    const zKeys = [...grid.keys()].sort((a, b) => a - b);
    const xKeys = [...new Set(data.map(d => d.x))].sort((a, b) => a - b);
    const cols = xKeys.length;
    const rows = zKeys.length;

    // Build 2D arrays for y, r, g, b
    const yGrid = [], rGrid = [], gGrid = [], bGrid = [];
    for (let rr = 0; rr < rows; rr++) {
        const yRow = [], rRow = [], gRow = [], bRow = [];
        const rowMap = grid.get(zKeys[rr]);
        for (let cc = 0; cc < cols; cc++) {
            const d = rowMap?.get(xKeys[cc]);
            yRow.push(d ? yScale(d.viability) : 0);
            rRow.push(d ? d.rgba.r : 0.8);
            gRow.push(d ? d.rgba.g : 0.8);
            bRow.push(d ? d.rgba.b : 0.8);
        }
        yGrid.push(yRow);
        rGrid.push(rRow);
        gGrid.push(gRow);
        bGrid.push(bRow);
    }

    // Subdivided grid dimensions
    const subCols = (cols - 1) * sub + 1;
    const subRows = (rows - 1) * sub + 1;

    const positions = new Float32Array(subCols * subRows * 3);
    const colors = new Float32Array(subCols * subRows * 3);

    for (let sr = 0; sr < subRows; sr++) {
        const fr = sr / sub;                           // fractional row in original grid
        const origZ = fr / (rows - 1);                 // 0..1 normalized
        const zVal = zKeys[0] + origZ * (zKeys[zKeys.length - 1] - zKeys[0]);

        for (let sc = 0; sc < subCols; sc++) {
            const fc = sc / sub;                       // fractional col in original grid
            const origX = fc / (cols - 1);             // 0..1 normalized
            const xVal = xKeys[0] + origX * (xKeys[xKeys.length - 1] - xKeys[0]);

            const idx = sr * subCols + sc;

            const interpY = bicubicSample(yGrid, rows, cols, fr, fc);
            const interpR = Math.max(0, Math.min(1, bicubicSample(rGrid, rows, cols, fr, fc)));
            const interpG = Math.max(0, Math.min(1, bicubicSample(gGrid, rows, cols, fr, fc)));
            const interpB = Math.max(0, Math.min(1, bicubicSample(bGrid, rows, cols, fr, fc)));

            const flatX = (xScale(xVal) - xOffset) * planeZoom;
            const flatZ = (zScale(zVal) - zOffset) * planeZoom;
            const py = config.planeYPosition + interpY;

            // Cylindrical curvature
            let px, pz;
            const R = config.meshCurveRadius;
            if (R > 0) {
                const theta = flatX / R;
                px = R * Math.sin(theta);
                pz = flatZ + R * (1 - Math.cos(theta));
            } else {
                px = flatX;
                pz = flatZ;
            }

            positions[idx * 3]     = px;
            positions[idx * 3 + 1] = py;
            positions[idx * 3 + 2] = pz;

            colors[idx * 3]     = interpR;
            colors[idx * 3 + 1] = interpG;
            colors[idx * 3 + 2] = interpB;
        }
    }

    // Triangle indices
    const indices = [];
    for (let sr = 0; sr < subRows - 1; sr++) {
        for (let sc = 0; sc < subCols - 1; sc++) {
            const tl = sr * subCols + sc;
            const tr = tl + 1;
            const bl = (sr + 1) * subCols + sc;
            const br = bl + 1;
            indices.push(tl, bl, tr);
            indices.push(tr, bl, br);
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshLambertMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    scene.scene.add(mesh);
}
</script>
