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
    cameraDistance: 200,
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
    vx: [],
    vy: [],
    vz: [],
    bobAmp: [],
    bobSpeed: [],
    bobPhase: [],
    scale: [],
    radius: [],
    bounds: null,
    floorY: null,
};
let bubblesInstancedMesh = null;
const tempObject = new THREE.Object3D();

const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    // const sampledData = props.data.filter((d, i) => i < MAX_BUBBLES);
    const sampledData = props.data.filter(d => d.x % 2 === 0); // filter every other cell line
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

        const { minX, maxY, maxX, minZ, maxZ } = bubbleState.bounds;
        const floorY = bubbleState.floorY ?? bubbleState.bounds.minY;

        for (let i = 0; i < bubbleState.count; i++) {
            const radius = bubbleState.radius[i];
            const nextX = bubbleState.x[i] + bubbleState.vx[i];
            const nextY = bubbleState.y[i] + bubbleState.vy[i] + (Math.sin(elapsed * bubbleState.bobSpeed[i] + bubbleState.bobPhase[i]) * bubbleState.bobAmp[i]);
            const nextZ = bubbleState.z[i] + bubbleState.vz[i];

            const minBubbleX = minX + radius;
            const maxBubbleX = maxX - radius;
            const minBubbleY = floorY + radius;
            const maxBubbleY = maxY - radius;
            const minBubbleZ = minZ + radius;
            const maxBubbleZ = maxZ - radius;

            if (nextX <= minBubbleX || nextX >= maxBubbleX) {
                bubbleState.vx[i] *= -1;
                bubbleState.x[i] = THREE.MathUtils.clamp(nextX, minBubbleX, maxBubbleX);
            } else {
                bubbleState.x[i] = nextX;
            }

            if (nextY <= minBubbleY || nextY >= maxBubbleY) {
                bubbleState.vy[i] *= -1;
                bubbleState.y[i] = THREE.MathUtils.clamp(nextY, minBubbleY, maxBubbleY);
            } else {
                bubbleState.y[i] = nextY;
            }

            if (nextZ <= minBubbleZ || nextZ >= maxBubbleZ) {
                bubbleState.vz[i] *= -1;
                bubbleState.z[i] = THREE.MathUtils.clamp(nextZ, minBubbleZ, maxBubbleZ);
            } else {
                bubbleState.z[i] = nextZ;
            }

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
    buildFloor();
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
    bubbleState.radius = new Array(data.length);

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
        bubbleState.radius[i] = scale * config.radius;
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
