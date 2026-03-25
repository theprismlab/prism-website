<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const config = {
    fov: 40,
    cameraPosition: [0, 0],
    cameraDistance: 200,
    cameraLookAt: [0, 0, 0],
    nearClip: 0.1,
    farClip: 1000,
    directionalLightIntensity: 1.5,
    ambientLightIntensity: 1.5,
    enableShadows: false,
    radius: 0.5,
    segments: 18,
};

const props = defineProps({
    data: { type: Array, required: true },
});

const MAX_BUBBLES = 500;
const bubbleState = {
    count: 0,
    x: [],
    y: [],
    z: [],
    vx: [],
    vy: [],
    vz: [],
    bobAmp: [],
    bobSpeed: [],
    bobPhase: [],
    scale: [],
    bounds: null,
};
let bubblesInstancedMesh = null;
const tempObject = new THREE.Object3D();

const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    const sampledData = props.data.filter((d, i) => i < MAX_BUBBLES);
    buildCircles(sampledData);
    registerBubbleAnimation();

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    scene.onRebuild(() => {
        buildCircles(sampledData);
        registerBubbleAnimation();
    });
});

function computeScales(data) {
    const vFov = THREE.MathUtils.degToRad(config.fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * config.cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const radiusScale = d3.scaleSqrt()
        .domain(d3.extent(data, d => +d.viability))
        .range([0.5, 3]);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.x))
        .range([-visibleWidth / 2, visibleWidth / 2]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.viability))
        .range([-visibleHeight / 2, visibleHeight / 2]);

    const zScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.z))
        .range([-visibleHeight / 2, visibleHeight / 2]);

    return { xScale, yScale, zScale, radiusScale };
}

function computeWorldBounds() {
    const vFov = THREE.MathUtils.degToRad(config.fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * config.cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);
    const visibleDepth = visibleHeight;

    return {
        minX: -visibleWidth / 2,
        maxX: visibleWidth / 2,
        minY: -visibleHeight / 2,
        maxY: visibleHeight / 2,
        minZ: -visibleDepth / 2,
        maxZ: visibleDepth / 2,
    };
}

function wrapValue(value, min, max) {
    const span = max - min;
    if (value > max) return min + ((value - max) % span);
    if (value < min) return max - ((min - value) % span);
    return value;
}

function registerBubbleAnimation() {
    scene.onAnimate((elapsed) => {
        if (!bubblesInstancedMesh || !bubbleState.bounds) return;

        const { minX, maxX, minY, maxY, minZ, maxZ } = bubbleState.bounds;

        for (let i = 0; i < bubbleState.count; i++) {
            bubbleState.x[i] = wrapValue(bubbleState.x[i] + bubbleState.vx[i], minX, maxX);
            bubbleState.y[i] = wrapValue(
                bubbleState.y[i] + bubbleState.vy[i] + (Math.sin(elapsed * bubbleState.bobSpeed[i] + bubbleState.bobPhase[i]) * bubbleState.bobAmp[i]),
                minY,
                maxY,
            );
            bubbleState.z[i] = wrapValue(bubbleState.z[i] + bubbleState.vz[i], minZ, maxZ);

            const s = bubbleState.scale[i];
            tempObject.position.set(bubbleState.x[i], bubbleState.y[i], bubbleState.z[i]);
            tempObject.scale.set(s, s, s);
            tempObject.updateMatrix();
            bubblesInstancedMesh.setMatrixAt(i, tempObject.matrix);
        }

        bubblesInstancedMesh.instanceMatrix.needsUpdate = true;
    });
}

function buildCircles(data) {
    const { xScale, yScale, zScale, radiusScale } = computeScales(data);
    bubbleState.bounds = computeWorldBounds();
    bubbleState.count = data.length;
    bubbleState.x = new Array(data.length);
    bubbleState.y = new Array(data.length);
    bubbleState.z = new Array(data.length);
    bubbleState.vx = new Array(data.length);
    bubbleState.vy = new Array(data.length);
    bubbleState.vz = new Array(data.length);
    bubbleState.bobAmp = new Array(data.length);
    bubbleState.bobSpeed = new Array(data.length);
    bubbleState.bobPhase = new Array(data.length);
    bubbleState.scale = new Array(data.length);

    const geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);
    const material = new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.05,
        metalness: 0.0,
        transparent: true,
        opacity: 1,
        transmission: 0.92,
        thickness: 0.35,
        ior: 1.2,
        iridescence: 0.4,
        iridescenceIOR: 1.2,
        iridescenceThicknessRange: [0, 800],
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        envMapIntensity: 1.2,
        specularIntensity: 0.9,
        side: THREE.FrontSide,
        depthWrite: false,
    });

    bubblesInstancedMesh = new THREE.InstancedMesh(geometry, material, data.length);
    bubblesInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    data.forEach((d, i) => {
        const scale = radiusScale(d.viability);
        bubbleState.scale[i] = scale;
        bubbleState.x[i] = xScale(d.x);
        bubbleState.y[i] = yScale(d.viability);
        bubbleState.z[i] = zScale(d.z);
        bubbleState.vx[i] = (Math.random() - 0.5) * 0.02;
        bubbleState.vy[i] = 0.008 + Math.random() * 0.02;
        bubbleState.vz[i] = (Math.random() - 0.5) * 0.02;
        bubbleState.bobAmp[i] = 0.002 + Math.random() * 0.006;
        bubbleState.bobSpeed[i] = 0.5 + Math.random() * 0.8;
        bubbleState.bobPhase[i] = Math.random() * Math.PI * 2;

        tempObject.position.set(bubbleState.x[i], bubbleState.y[i], bubbleState.z[i]);
        tempObject.scale.set(scale, scale, scale);
        tempObject.updateMatrix();
        bubblesInstancedMesh.setMatrixAt(i, tempObject.matrix);
    });

    scene.scene.add(bubblesInstancedMesh);
}
</script>
