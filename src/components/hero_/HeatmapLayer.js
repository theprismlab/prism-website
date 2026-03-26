import * as THREE from 'three';
import * as d3 from 'd3';

// ── Config ────────────────────────────────────────────────────────────────────

const HEATMAP_CONFIG = {
    // worldScale uniformly multiplies both plane sizes and positions,
    // expanding the grid to fill (and overflow) the visible area
    worldScale: 10.8,
    planeWidthMultiplier: 1.6, // planes overlap slightly in x to avoid gaps
    planeYPosition: 1,
    planeOpacityRange: [0.5, 1],
};

// ── Scales ────────────────────────────────────────────────────────────────────

function computeScales(data, scene) {
    const { fov, cameraDistance } = scene.config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    // per-cell dimensions before worldScale is applied
    const planeWidth = visibleWidth / xExtent[1];
    const planeHeight = visibleHeight / Math.max(zExtent[1], 1);

    const xScale = d3.scaleLinear().domain(xExtent).range([0, visibleWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(HEATMAP_CONFIG.planeOpacityRange);
    // domain is inverted: viability 1 → light (yellow), 0.2 → dark (red)
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1, 0.2]);

    return {
        xScale, zScale, opacityScale, colorScale,
        xOffset: visibleWidth / 2,
        zOffset: visibleHeight / 2,
        planeWidth, planeHeight,
    };
}

// ── Layer Builder ─────────────────────────────────────────────────────────────

export function buildHeatmapLayer(scene, data) {
    const { worldScale, planeWidthMultiplier, planeYPosition } = HEATMAP_CONFIG;
    const { xScale, zScale, opacityScale, colorScale, xOffset, zOffset, planeWidth, planeHeight } = computeScales(data, scene);

    data.forEach(d => {
        const geometry = new THREE.PlaneGeometry(
            planeWidth * planeWidthMultiplier * worldScale,
            planeHeight * worldScale,
        );
        const material = new THREE.MeshLambertMaterial({
            color: new THREE.Color(colorScale(d.viability)),
            side: THREE.DoubleSide,
            opacity: opacityScale(d.z),
            transparent: true,
            depthWrite: false,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(
            (xScale(d.x) - xOffset) * worldScale,
            planeYPosition,
            (zScale(d.z) - zOffset) * worldScale,
        );
        scene.scene.add(plane);
    });
}
