<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const heatmapConfig = {
    // ── Camera ──
    fov: 25,
    cameraDistance: 25,
    cameraPosition: [0, 4.5], // [x, y] only — z is set by cameraDistance
    cameraLookAt: [0, 6.5, 0],
    nearClip: 0.1,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,

    // ── Planes ──
    // worldScale uniformly multiplies both plane sizes and positions,
    // expanding the grid to fill the visible area
    worldScale: 10.8,
    planeWidthMultiplier: 1.6, // planes overlap slightly in x to avoid gaps
    planeYPosition: 1,
    planeOpacityRange: [0.5, 1],
};

const props = defineProps({
    data: { type: Array, required: true },
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const config = { ...heatmapConfig, ...props.sceneConfig };
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    buildPlanes(props.data);

    await new Promise(r => requestAnimationFrame(r));
    scene.render();

    scene.onRebuild(() => buildPlanes(props.data));
});

// ── Scale Computation ──

function computeScales(data) {
    const { fov, cameraDistance } = config;

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
    const opacityScale = d3.scaleLinear().domain(zExtent).range(config.planeOpacityRange);
    // domain is inverted: viability 1 → light (yellow), 0.2 → dark (red)
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1, 0.2]);

    return {
        xScale, zScale, opacityScale, colorScale,
        xOffset: visibleWidth / 2,
        zOffset: visibleHeight / 2,
        planeWidth, planeHeight,
    };
}

// ── Plane Creation ──

function buildPlanes(data) {
    const scales = computeScales(data);
    const { xScale, zScale, opacityScale, colorScale, xOffset, zOffset, planeWidth, planeHeight } = scales;
    const { worldScale, planeWidthMultiplier, planeYPosition } = config;

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
</script>
