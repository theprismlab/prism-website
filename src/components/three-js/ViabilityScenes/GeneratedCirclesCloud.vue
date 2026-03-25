<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const config = {
    fov: 50,
    cameraPosition: [0, 0],
    cameraDistance: 100,
    cameraLookAt: [0, 0, 0],
    nearClip: 0.1,
    farClip: 2000,
    directionalLightIntensity: 1.5,
    ambientLightIntensity: 1.5,
    enableShadows: false,
    radius: 0.5,
    segments: 18,
    floorYOffset: 6,
    floorOpacity: 0.18,
    floorColor: '#7fb3ff',
    floorOutlineColor: '#d7e8ff',
};

const props = defineProps({
    data: { type: Array, required: true },
});

const MAX_BUBBLES = 5000;
const bubbleState = {
    count: 0,
    x: [],
    y: [],
    z: [],
    vy: [],
    originX: [],
    originZ: [],
    driftAmpX: [],
    driftAmpZ: [],
    driftSpeedX: [],
    driftSpeedZ: [],
    driftPhaseX: [],
    driftPhaseZ: [],
    scale: [],
    radiusNoise: [],
    bounds: null,
    floorY: null,
    maxRise: 0,
};
let bubblesInstancedMesh = null;
const tempObject = new THREE.Object3D();

const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    const particleCount = Math.min(props.data.length, MAX_BUBBLES);
    buildCircles(particleCount);
    registerBubbleAnimation();

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    scene.onRebuild(() => {
        buildCircles(particleCount);
        registerBubbleAnimation();
    });
});

function computeGeneratedScales() {
    const bounds = computeWorldBounds();
    const margin = config.radius * 6;
    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([bounds.minX + margin, bounds.maxX - margin]);

    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([bubbleState.floorY ?? bounds.minY, bounds.maxY - margin]);

    const zScale = d3.scaleLinear()
        .domain([0, 1])
        .range([bounds.minZ + margin, bounds.maxZ - margin]);

    const radiusScale = d3.scaleSqrt()
        .domain([0, 1])
        .range([0, 3.2]);

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

function buildFloor() {
    const bounds = computeWorldBounds();
    const floorWidth = bounds.maxX - bounds.minX;
    const floorDepth = bounds.maxZ - bounds.minZ;
    const floorY = bounds.minY + config.floorYOffset;
    bubbleState.floorY = floorY;

    const floorGeometry = new THREE.PlaneGeometry(floorWidth, floorDepth);
    const floorMaterial = new THREE.MeshLambertMaterial({
        color: config.floorColor,
        transparent: true,
        opacity: config.floorOpacity,
        side: THREE.DoubleSide,
        depthWrite: false,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, floorY, 0);
    scene.scene.add(floor);

    const outlineGeometry = new THREE.EdgesGeometry(floorGeometry);
    const outlineMaterial = new THREE.LineBasicMaterial({
        color: config.floorOutlineColor,
        transparent: true,
        opacity: 0.8,
    });
    const outline = new THREE.LineSegments(outlineGeometry, outlineMaterial);
    outline.rotation.x = -Math.PI / 2;
    outline.position.set(0, floorY + 0.02, 0);
    scene.scene.add(outline);
}

function registerBubbleAnimation() {
    scene.onAnimate((elapsed) => {
        if (!bubblesInstancedMesh || !bubbleState.bounds) return;

        const floorY = bubbleState.floorY ?? bubbleState.bounds.minY;

        for (let i = 0; i < bubbleState.count; i++) {
            bubbleState.y[i] += bubbleState.vy[i];

            if (bubbleState.y[i] > bubbleState.maxRise) {
                respawnBubble(i);
            }

            bubbleState.x[i] = bubbleState.originX[i]
                + Math.sin(elapsed * bubbleState.driftSpeedX[i] + bubbleState.driftPhaseX[i]) * bubbleState.driftAmpX[i];
            bubbleState.z[i] = bubbleState.originZ[i]
                + Math.cos(elapsed * bubbleState.driftSpeedZ[i] + bubbleState.driftPhaseZ[i]) * bubbleState.driftAmpZ[i];

            const riseProgress = THREE.MathUtils.clamp(
                (bubbleState.y[i] - floorY) / Math.max(1, bubbleState.maxRise - floorY),
                0,
                1,
            );
            const s = bubbleState.scale[i] * riseProgress * bubbleState.radiusNoise[i];
            tempObject.position.set(bubbleState.x[i], bubbleState.y[i], bubbleState.z[i]);
            tempObject.scale.set(s, s, s);
            tempObject.updateMatrix();
            bubblesInstancedMesh.setMatrixAt(i, tempObject.matrix);
        }

        bubblesInstancedMesh.instanceMatrix.needsUpdate = true;
    });
}

function respawnBubble(index) {
    const { xScale, zScale } = computeGeneratedScales();
    const floorY = bubbleState.floorY ?? bubbleState.bounds.minY;

    bubbleState.originX[index] = xScale(Math.random());
    bubbleState.originZ[index] = zScale(Math.random());
    bubbleState.x[index] = bubbleState.originX[index];
    bubbleState.y[index] = floorY;
    bubbleState.z[index] = bubbleState.originZ[index];
    bubbleState.vy[index] = 0.05 + Math.random() * 0.08;
    bubbleState.driftAmpX[index] = 1 + Math.random() * 6;
    bubbleState.driftAmpZ[index] = 1 + Math.random() * 6;
    bubbleState.driftSpeedX[index] = 0.08 + Math.random() * 0.28;
    bubbleState.driftSpeedZ[index] = 0.08 + Math.random() * 0.28;
    bubbleState.driftPhaseX[index] = Math.random() * Math.PI * 2;
    bubbleState.driftPhaseZ[index] = Math.random() * Math.PI * 2;
    bubbleState.radiusNoise[index] = 0.7 + Math.random() * 0.7;
}

function buildCircles(count) {
    buildFloor();
    bubbleState.bounds = computeWorldBounds();
    bubbleState.count = count;
    bubbleState.x = new Array(count);
    bubbleState.y = new Array(count);
    bubbleState.z = new Array(count);
    bubbleState.vy = new Array(count);
    bubbleState.originX = new Array(count);
    bubbleState.originZ = new Array(count);
    bubbleState.driftAmpX = new Array(count);
    bubbleState.driftAmpZ = new Array(count);
    bubbleState.driftSpeedX = new Array(count);
    bubbleState.driftSpeedZ = new Array(count);
    bubbleState.driftPhaseX = new Array(count);
    bubbleState.driftPhaseZ = new Array(count);
    bubbleState.scale = new Array(count);
    bubbleState.radiusNoise = new Array(count);
    bubbleState.maxRise = bubbleState.bounds.maxY - (config.radius * 6);

    const { radiusScale } = computeGeneratedScales();

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

    bubblesInstancedMesh = new THREE.InstancedMesh(geometry, material, count);
    bubblesInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    for (let i = 0; i < count; i++) {
        bubbleState.scale[i] = radiusScale(Math.random());
        respawnBubble(i);

        tempObject.position.set(bubbleState.x[i], bubbleState.y[i], bubbleState.z[i]);
        tempObject.scale.set(0, 0, 0);
        tempObject.updateMatrix();
        bubblesInstancedMesh.setMatrixAt(i, tempObject.matrix);
    }

    scene.scene.add(bubblesInstancedMesh);
}
</script>
