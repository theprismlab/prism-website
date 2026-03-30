<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw, ref, onMounted } from 'vue';
import { useViabilityScene } from '../useViabilityScene.js';

const sphereConfig = {
    // ── Camera ──
    fov: 25,
    cameraDistance: 25,
    cameraPosition: [0, 4.5, 25],
    cameraLookAt: [0, 6.5, 0],
    nearClip: 1.01,
    farClip: 200,

    // ── Lighting ──
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 0.5,

    // ── Planes ──
    planeZoom: 10.8,

    // ── Spheres ──
    sphereXStep: 8,
    sphereZStep: 2,
    sphereBaseRadiusMultiplier: 0.013,
    sphereSizeScaleRange: [0.3, 1.0],   // low-z = far = small, high-z = close = large
    sphereOpacityRange: [0.8, 0.8],
    sphereRadiusScaleRange: [1.5, 0.2],
    sphereFloatSpeedMin: 0.4,
    sphereFloatSpeedRange: 0.4,
    sphereFloatAmplitudeBase: 0.08,
    sphereFloatAmplitudeRange: 0.06,

    // ── Y-axis spread ──
    ySpread: 14,
    ySpreadOffset: 10,

    // ── Radius ──
    yRadiusMultiplier: 1.0,   // extra scale applied proportional to normalized viability (0 = off)

    // ── Barcodes ──
    barcodeUrl: '/images/barcode.svg',
    stickerOpacity: 0.5,
    stickerSizeFraction: 0.8,
};

const props = defineProps({
    data: { type: Array, required: true },
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const config = { ...sphereConfig, ...props.sceneConfig };
const scene = useViabilityScene(canvasEl, config);

onMounted(async () => {
    loadBarcodeTexture();
    buildSpheres(props.data);

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    scene.onRebuild(() => buildSpheres(props.data));
});

// ── Barcode stickers ──────────────────────────────────────────────────────────

let barcodeTexture = null;
let barcodeTextureReady = false;
const pendingStickers = [];

function loadBarcodeTexture() {
    const { barcodeUrl } = config;
    if (!barcodeUrl) return;
    barcodeTexture = new THREE.Texture();
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 512;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 512, 512);
        // White pixels → transparent so bars show on any background
        const imageData = ctx.getImageData(0, 0, 512, 512);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
            if ((d[i] + d[i + 1] + d[i + 2]) / 3 > 180) d[i + 3] = 0;
        }
        ctx.putImageData(imageData, 0, 0);
        barcodeTexture.image = canvas;
        barcodeTexture.needsUpdate = true;
        barcodeTextureReady = true;
        pendingStickers.forEach(({ sphere, radius }) => attachSticker(sphere, radius));
        pendingStickers.length = 0;
    };
    img.src = barcodeUrl;
}

function createBarcodeSticker(sphere, radius) {
    if (!barcodeTexture) return;
    if (barcodeTextureReady) {
        attachSticker(sphere, radius);
    } else {
        pendingStickers.push({ sphere, radius });
    }
}

function attachSticker(sphere, radius) {
    const { stickerSizeFraction, stickerOpacity } = config;
    const halfAngle = stickerSizeFraction / 2;
    const geo = new THREE.SphereGeometry(
        radius * 1.005, 16, 16,
        Math.PI / 2 - halfAngle, halfAngle * 2,
        Math.PI / 2 - halfAngle, halfAngle * 2,
    );
    const mat = new THREE.MeshBasicMaterial({
        map: barcodeTexture,
        transparent: true,
        opacity: stickerOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
    });
    const sticker = new THREE.Mesh(geo, mat);
    sticker.renderOrder = 1;
    sphere.add(sticker);
}

// ── Scale Computation ──────────────────────────────────────────────────────────

function computeScales(data) {
    const { fov, cameraDistance, ySpread, ySpreadOffset } = config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);

    const sceneWidth = visibleWidth;
    const cellWidth = sceneWidth / xExtent[1];
    const cellHeight = visibleHeight / Math.max(zExtent[1], 1);

    const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.viability))
        .range([ySpread, -ySpread + ySpreadOffset]);

    return markRaw({
        xScale, zScale, yScale,
        xOffset: sceneWidth / 2,
        zOffset: visibleHeight / 2,
        xExtent, zExtent,
        cellWidth, cellHeight,
    });
}

// ── Sphere Creation & Animation ──

function buildSpheres(data) {
    const scales = computeScales(data);
    const { xScale, zScale, xOffset, zOffset, cellHeight, yScale, zExtent } = scales;
    const {
        sphereXStep, sphereZStep, sphereBaseRadiusMultiplier,
        sphereSizeScaleRange, sphereOpacityRange, sphereRadiusScaleRange,
        sphereFloatSpeedMin, sphereFloatSpeedRange,
        sphereFloatAmplitudeBase, sphereFloatAmplitudeRange,
    } = config;

    const baseRadius = xScale.range()[1] * sphereBaseRadiusMultiplier;
    const sampled = data.filter(d => d.x % sphereXStep === 0 && d.z % sphereZStep === 0);

    const sizeScale = d3.scaleLinear().domain(zExtent).range(sphereSizeScaleRange);
    const opacityDepthScale = d3.scaleLinear().domain(zExtent).range(sphereOpacityRange);

    const viabilityExtent = d3.extent(data, d => d.viability);
    const radiusScale = d3.scalePow().exponent(1).domain(viabilityExtent).range(sphereRadiusScaleRange);

    const spheres = [];

    sampled.forEach(d => {
        const t = sizeScale(d.z);
        const randomJitter = 0.8 + Math.random() * 0.4;
        const viabilityNorm = viabilityExtent[1] > viabilityExtent[0]
            ? (d.viability - viabilityExtent[0]) / (viabilityExtent[1] - viabilityExtent[0])
            : 0.5;
        const yBoost = 1 + config.yRadiusMultiplier * (1 - viabilityNorm);
        const radius = baseRadius * t * radiusScale(d.viability) * randomJitter * yBoost;
        const geometry = markRaw(new THREE.SphereGeometry(radius, 24, 24));
        const material = markRaw(new THREE.MeshStandardMaterial({
            color: d.rgba,
            transparent: true,
            opacity: opacityDepthScale(d.z),
            roughness: 0.0,
            metalness: 0.0,
        }));
        const sphere = markRaw(new THREE.Mesh(geometry, material));
        const basePosition = markRaw(new THREE.Vector3(
            xScale(d.x) - xOffset,
            yScale(d.viability) + radius * 0.2,
            zScale(d.z) - zOffset,
        ));
        sphere.castShadow = true;
        sphere.position.copy(basePosition);
        sphere.userData.basePosition = basePosition;
        sphere.userData.radius = radius;
        sphere.userData.sourceZ = d.z;
        sphere.userData.floatPhase = Math.random() * Math.PI * 2;
        sphere.userData.floatSpeed = sphereFloatSpeedMin + Math.random() * sphereFloatSpeedRange;
        sphere.userData.floatAmplitude = cellHeight * (sphereFloatAmplitudeBase + Math.random() * sphereFloatAmplitudeRange) * t;
        scene.scene.add(sphere);
        spheres.push(sphere);
    });

    scene.onAnimate((elapsed) => {
        spheres.forEach(s => {
            const { basePosition, floatPhase, floatSpeed, floatAmplitude } = s.userData;
            s.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude;
        });
    });

    // Barcodes: top 1/3 by radius among the close-z (high z-index) half of spheres
    const zMid = (zExtent[0] + zExtent[1]) / 2;
    const closeSpheresWithRadius = spheres
        .filter(s => s.userData.sourceZ >= zMid)
        .map(s => ({ sphere: s, radius: s.userData.radius }));
    closeSpheresWithRadius.sort((a, b) => b.radius - a.radius);
    closeSpheresWithRadius
        .slice(0, Math.ceil(closeSpheresWithRadius.length / 4))
        .forEach(({ sphere, radius }) => createBarcodeSticker(sphere, radius));
}
</script>
