<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw, ref, onMounted } from 'vue';
import { useBubbleScene } from './useBubbleScene.js';
import { animations } from './animations.js';

const props = defineProps({
    data: { type: Array, required: true },
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const bubble = useBubbleScene(canvasEl, props.sceneConfig);
const { config } = bubble;

onMounted(async () => {
    buildSpheres(props.data);

    await new Promise(r => requestAnimationFrame(r));
    bubble.render();
    bubble.startAnimation();

    bubble.onRebuild(() => buildSpheres(props.data));
});

// ── Scale Computation ──

function computeScales(data) {
    const { fov, cameraDistance } = config;

    const xExtent = d3.extent(data, d => d.x);
    const zExtent = d3.extent(data, d => d.z);
    const viabilityExtent = d3.extent(data, d => d.viability);

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (bubble.width.value / bubble.height.value);
    const cellHeight = visibleHeight / Math.max(zExtent[1], 1);

    const xScale = d3.scaleLinear().domain(xExtent).range([0, visibleWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    const yScale = d3.scaleLinear().domain(viabilityExtent).range(config.yRange);
    const radiusScale = d3.scaleLinear().domain(viabilityExtent).range(config.radiusRange);
    const depthScale = d3.scaleLinear().domain(zExtent).range(config.depthRange);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(config.opacityRange);

    return markRaw({
        xScale, zScale, yScale, radiusScale, depthScale, opacityScale,
        xOffset: visibleWidth / 2,
        zOffset: visibleHeight / 2,
        baseRadius: visibleWidth * config.radiusBase,
        cellHeight,
    });
}

// ── Sphere Creation & Animation ──

function buildSpheres(data) {
    const scales = computeScales(data);
    const {
        xScale, zScale, yScale, radiusScale, depthScale, opacityScale,
        xOffset, zOffset, baseRadius, cellHeight,
    } = scales;

    const anim = animations[config.animation] ?? animations.float;
    const sampled = data.filter(d => d.x % config.xStep === 0 && d.z % config.zStep === 0);
    const spheres = [];

    sampled.forEach(d => {
        const jitter = 0.8 + Math.random() * 0.4;
        const radius = baseRadius * depthScale(d.z) * radiusScale(d.viability) * jitter;

        const geometry = markRaw(new THREE.SphereGeometry(radius, 24, 24));
        const material = markRaw(new THREE.MeshStandardMaterial({
            color: d.rgba,
            transparent: true,
            opacity: opacityScale(d.z),
            roughness: 0.0,
            metalness: 0.0,
        }));
        const sphere = markRaw(new THREE.Mesh(geometry, material));
        const basePosition = markRaw(new THREE.Vector3(
            xScale(d.x) - xOffset,
            yScale(d.viability),
            zScale(d.z) - zOffset,
        ));
        sphere.castShadow = true;
        sphere.position.copy(basePosition);
        sphere.userData.basePosition = basePosition;
        anim.init(sphere, { d, config, cellHeight, depthScale });
        bubble.scene.add(sphere);
        spheres.push(sphere);
    });

    bubble.onAnimate((elapsed) => {
        spheres.forEach(s => anim.animate(s, elapsed));
    });
}
</script>
