<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const sphereConfig = {
    // ── Camera (match ViabilityMesh) ──
    fov: 25,
    cameraDistance: 100,
    cameraPosition: [0, 16.5, 25],
    cameraLookAt: [0, 12.5, 0],
    nearClip: 1.01,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,

    // ── Layout (match ViabilityMesh) ──
    planeZoom: 10.8,
    planeYPosition: 1,
    ySpread: 12,
    meshCurveRadius: 100,

    // ── Spheres ──
    sphereRadius: 0.4,
    sphereSegments: 16,
    sphereOpacity: 0.7,
};

const props = defineProps({
    data: { type: Array, required: true },
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const config = { ...sphereConfig, ...props.sceneConfig };
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    buildSpheres(props.data);

    // OrbitControls for rotation/zoom/pan
    const controls = new OrbitControls(scene.camera, canvasEl.value);
    controls.target.set(...config.cameraLookAt);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.update();

    scene.onAnimate(() => {
        controls.update();
    });

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    scene.onRebuild(() => buildSpheres(props.data));
});

// ── Scale Computation (same as ViabilityMesh) ──

function computeScales(data) {
    const { fov, cameraDistance } = config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);
    const valueExtent = d3.extent(data, d => d.viability);

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const sceneWidth = visibleWidth;

    const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    const yScale = d3.scaleLinear().domain(valueExtent).range([config.ySpread, -config.ySpread]);
    const opacityScale = d3.scaleLinear().domain(zExtent).range([0.4, 1]);

    return {
        xScale, zScale, yScale, opacityScale,
        xOffset: sceneWidth / 2,
        zOffset: visibleHeight / 2,
    };
}

// ── Sphere Creation ──

function buildSpheres(data) {
    const { xScale, zScale, yScale, opacityScale, xOffset, zOffset } = computeScales(data);
    const { planeZoom, meshCurveRadius: R } = config;

    const geometry = new THREE.SphereGeometry(config.sphereRadius, config.sphereSegments, config.sphereSegments);

    data.forEach(d => {
        const material = new THREE.MeshStandardMaterial({
            color: d.rgba,
            transparent: true,
            opacity: opacityScale(d.z),
            roughness: 0.3,
            metalness: 0.0,
        });

        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;

        const flatX = (xScale(d.x) - xOffset) * planeZoom;
        const flatZ = (zScale(d.z) - zOffset) * planeZoom;
        const py = config.planeYPosition + yScale(d.viability);

        let px, pz;
        if (R > 0) {
            const theta = flatX / R;
            px = R * Math.sin(theta);
            pz = flatZ + R * (1 - Math.cos(theta));
        } else {
            px = flatX;
            pz = flatZ;
        }

        sphere.position.set(px, py, pz);
        scene.scene.add(sphere);
    });
}
</script>
