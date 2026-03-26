import * as THREE from 'three';
import * as d3 from 'd3';

// ── Config ────────────────────────────────────────────────────────────────────

const HEATMAP_CONFIG = {
    // worldScale uniformly multiplies both plane sizes and positions,
    // expanding the grid to fill (and overflow) the visible area
    worldScale: 10.8,
    planeYPosition: 0, // 1 was default, but lowering it helps with occlusion of spheres by planes at the front edge of the grid
    planeOpacityRange: [1, 1],
};

// ── Scales ────────────────────────────────────────────────────────────────────

function computeScales(data, scene) {
    const { fov, cameraDistance } = scene.config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const xScale = d3.scaleLinear().domain(xExtent).range([0, visibleWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(HEATMAP_CONFIG.planeOpacityRange);
    // domain is inverted: viability 1 → light (yellow), 0.2 → dark (red)
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1, 0.2]);

    // per-cell dimensions derived from the scale: one domain unit → one cell width/height
    const planeWidth  = xScale(xExtent[0] + 1) - xScale(xExtent[0]);
    const planeHeight = zScale(zExtent[0] + 1) - zScale(zExtent[0]);

    return {
        xScale, zScale, opacityScale, colorScale,
        xOffset: visibleWidth / 2,
        zOffset: visibleHeight / 2,
        planeWidth, planeHeight,
    };
}

// ── Layer Builder ─────────────────────────────────────────────────────────────

export function buildHeatmapLayer(scene, data) {
    const { worldScale, planeYPosition } = HEATMAP_CONFIG;
    const { xScale, zScale, opacityScale, colorScale, xOffset, zOffset, planeWidth, planeHeight } = computeScales(data, scene);

    data.forEach(d => {
        const geometry = new THREE.PlaneGeometry(
            planeWidth * worldScale,
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
