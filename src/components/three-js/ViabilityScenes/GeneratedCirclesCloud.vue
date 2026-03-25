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
    cameraDistance: 70,
    cameraLookAt: [0, 0, 0],
    nearClip: 0.1,
    farClip: 1000,
    directionalLightIntensity: 1.5,
    ambientLightIntensity: 1.5,
    enableShadows: false,
    radius: 0.5,
    segments: 18,
    floorYOffset: 6,
    floorOpacity: 0.18,
    floorColor: '#7fb3ff',
    floorOutlineColor: '#d7e8ff',
    // 'categorical' | 'rainbow' | 'position'
    colorScale: 'rainbow',
};

const props = defineProps({
    data: { type: Array, required: true },
});

const CATEGORY_COLORS = [
    '#e05c5c', // red
    '#e07d30', // orange
    '#d4b84a', // yellow
    '#5ab55a', // green
    '#4a9de0', // blue
    '#7c5ce0', // violet
    '#d45cb5', // pink
    '#4acec8', // teal
];

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
    colorIndex: [],
    bounds: null,
    floorY: null,
    maxRise: 0,
};
let bubblesInstancedMesh = null;
let animateUnsubscribe = null;
const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

function getBubbleColor(index, riseProgress) {
    if (config.colorScale === 'rainbow') {
        const t = (riseProgress + bubbleState.colorIndex[index] / CATEGORY_COLORS.length) % 1;
        return tempColor.setStyle(d3.interpolateRainbow(t));
    }
    if (config.colorScale === 'position') {
        const bounds = bubbleState.bounds;
        const normX = (bubbleState.x[index] - bounds.minX) / (bounds.maxX - bounds.minX || 1);
        const normZ = (bubbleState.z[index] - bounds.minZ) / (bounds.maxZ - bounds.minZ || 1);
        const t = (normX * 0.4 + riseProgress * 0.4 + normZ * 0.2) % 1;
        return tempColor.setStyle(d3.interpolateYlOrRd(t+-0.1));
    }
    return tempColor.setStyle(CATEGORY_COLORS[bubbleState.colorIndex[index]]);
}

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

    const radiusScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 4]);

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
    if (animateUnsubscribe) animateUnsubscribe();
    animateUnsubscribe = scene.onAnimate((elapsed) => {
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

            getBubbleColor(i, riseProgress);
            bubblesInstancedMesh.setColorAt(i, tempColor);
        }

        bubblesInstancedMesh.instanceMatrix.needsUpdate = true;
        if (bubblesInstancedMesh.instanceColor) bubblesInstancedMesh.instanceColor.needsUpdate = true;
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
    bubbleState.colorIndex[index] = Math.floor(Math.random() * CATEGORY_COLORS.length);
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
    bubbleState.colorIndex = new Array(count);
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

        // Stagger initial Y positions across the full rise range for consistent flow
        bubbleState.y[i] = bubbleState.floorY + Math.random() * (bubbleState.maxRise - bubbleState.floorY);

        const riseProgress = (bubbleState.y[i] - bubbleState.floorY) / Math.max(1, bubbleState.maxRise - bubbleState.floorY);
        const s = bubbleState.scale[i] * riseProgress * bubbleState.radiusNoise[i];
        tempObject.position.set(bubbleState.x[i], bubbleState.y[i], bubbleState.z[i]);
        tempObject.scale.set(s, s, s);
        tempObject.updateMatrix();
        bubblesInstancedMesh.setMatrixAt(i, tempObject.matrix);

        getBubbleColor(i, riseProgress);
        bubblesInstancedMesh.setColorAt(i, tempColor);
    }

    scene.scene.add(bubblesInstancedMesh);
}
</script>
