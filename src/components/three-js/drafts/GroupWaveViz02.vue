<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;" />
</template>

<script setup>
/**
 * Self-contained groupWave visualisation.
 * Renders 500 procedurally-generated colour spheres travelling along
 * harmonic wave paths grouped by value, with depth variation.
 *
 * Drop into any container — it fills the parent 100 %.
 */
import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw, ref, onMounted, onBeforeUnmount } from 'vue';

// ── Config ─────────────────────────────────────────────────────
const CONFIG = {
    sphereCount: 500,
    cols: 25,
    colorInterpolator: d3.interpolateTurbo,
    colorDomain: [0, 1],
    fov: 50,
    cameraDistance: 100,
    cameraPosition: [0, 25],
    cameraLookAt: [0, 25, 0],
    nearClip: 1.01,
    farClip: 600,
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,
    radiusBase: 0.018,
    radiusRange: [1.5, 0.2],
    depthRange: [1.0, 0.1],
    opacityRange: [0.7, 0.15],
};

const NUM_GROUPS = 5;
const NUM_HARMONICS = 3;

// ── Template ref ───────────────────────────────────────────────
const canvasEl = ref(null);

// ── Scene state ────────────────────────────────────────────────
let scene, camera, renderer, clock;
let lights = [];
let animationFrameId = null;
let resizeObserver = null;
let resizeTimer = null;
const spheres = [];
const pathLines = [];

// ── Procedural data generation ─────────────────────────────────
function generateSpheres() {
    const { sphereCount, cols, colorInterpolator, colorDomain } = CONFIG;
    const rows = Math.ceil(sphereCount / cols);
    const colorScale = d3.scaleSequential(colorInterpolator).domain(colorDomain);
    const data = [];
    for (let i = 0; i < sphereCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const nx = col / (cols - 1);
        const nz = row / Math.max(rows - 1, 1);
        const value = 0.5 + 0.5 * Math.sin(nx * Math.PI * 3 + nz * Math.PI * 2);
        data.push({
            x: col,
            z: row,
            value,
            size: Math.random(),
            rgba: new THREE.Color(colorScale(value)),
        });
    }
    return data;
}

// ── Deterministic per-group random ─────────────────────────────
function groupRand(groupIdx, salt) {
    const x = Math.sin(groupIdx * 127.1 + salt * 311.7) * 43758.5453;
    return x - Math.floor(x);
}

// ── Shared harmonic tables ─────────────────────────────────────
function groupHarmonics(group, viewH) {
    const gr = (salt) => groupRand(group, salt);
    const depthMul = 1.0 + gr(50) * 4.0;
    const yAmpScale = viewH / 25;
    const yWaves = [];
    const zWaves = [];
    for (let i = 0; i < NUM_HARMONICS; i++) {
        const h = i + 1;
        yWaves.push({
            amp: (1.5 + gr(10 + i * 2) * 3.0) / h * yAmpScale,
            freq: (1.5 + gr(11 + i * 2) * 2.5) * h,
            phase: 0,
        });
        zWaves.push({
            amp: (1.0 + gr(20 + i * 2) * 2.5) / h * depthMul,
            freq: (1.0 + gr(21 + i * 2) * 3.0) * h,
            phase: 0,
        });
    }
    return { yWaves, zWaves, depthMul };
}

// ── Scale helpers ──────────────────────────────────────────────
function computeScales(data, viewW, viewH) {
    const xExtent = d3.extent(data, d => d.x);
    const zExtent = d3.extent(data, d => d.z);

    return markRaw({
        xScale: d3.scaleLinear().domain(xExtent).range([0, viewW]),
        zScale: d3.scaleLinear().domain(zExtent).range([0, viewH]),
        sizeScale: d3.scaleLinear().domain([0, 1]).range(CONFIG.radiusRange),
        depthScale: d3.scaleLinear().domain(zExtent).range(CONFIG.depthRange),
        opacityScale: d3.scaleLinear().domain(zExtent).range(CONFIG.opacityRange),
        xOffset: viewW / 2,
        zOffset: viewH / 2,
        baseRadius: viewW * CONFIG.radiusBase,
    });
}

// ── Build path lines per group ─────────────────────────────────
function buildPaths(sceneWidth, sceneHeight) {
    const hw = sceneWidth / 2;
    const hh = sceneHeight / 2;
    const segments =   100;

    for (let g = 0; g < NUM_GROUPS; g++) {
        const gr = (salt) => groupRand(g, salt);
        const { yWaves, zWaves, depthMul } = groupHarmonics(g, sceneHeight);
        const baseY = (gr(0) - 0.5) * sceneHeight * 0.8;
        const baseZ = (gr(1) - 0.5) * hh * 1.2 * depthMul;

        const points = [];
        for (let s = 0; s <= segments; s++) {
            const t = s / segments;
            const px = -hw + t * sceneWidth;
            let py = baseY;
            for (let i = 0; i < yWaves.length; i++) {
                py += Math.sin(t * Math.PI * 2 * yWaves[i].freq + yWaves[i].phase) * yWaves[i].amp;
            }
            let pz = baseZ;
            for (let i = 0; i < zWaves.length; i++) {
                pz += Math.sin(t * Math.PI * 2 * zWaves[i].freq + zWaves[i].phase) * zWaves[i].amp;
            }
            points.push(new THREE.Vector3(px, py, pz));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const midValue = (g + 0.5) / NUM_GROUPS;
        const color = new THREE.Color(CONFIG.colorInterpolator(midValue));
        const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        pathLines.push(line);
    }
}

// ── Init animation per sphere ──────────────────────────────────
function initSphereAnim(sphere, d, sceneWidth, sceneHeight) {
    const hw = sceneWidth / 2;
    const hh = sceneHeight / 2;

    const group = Math.min(Math.floor(d.value * NUM_GROUPS), NUM_GROUPS - 1);
    const gr = (salt) => groupRand(group, salt);
    const { depthMul } = groupHarmonics(group, sceneHeight);

    const groupBaseY = (gr(0) - 0.5) * sceneHeight * 0.8;
    const groupBaseZ = (gr(1) - 0.5) * hh * 1.2 * depthMul;

    const yWaves = [];
    const zWaves = [];
    const yAmpScale = sceneHeight / 25;
    for (let i = 0; i < NUM_HARMONICS; i++) {
        const harmonic = i + 1;
        yWaves.push({
            amp: (1.5 + gr(10 + i * 2) * 3.0) / harmonic * yAmpScale * (0.9 + Math.random() * 0.2),
            freq: (1.5 + gr(11 + i * 2) * 2.5) * harmonic * (0.95 + Math.random() * 0.1),
            phase: Math.random() * Math.PI * 2,
        });
        zWaves.push({
            amp: (1.0 + gr(20 + i * 2) * 2.5) / harmonic * depthMul * (0.9 + Math.random() * 0.2),
            freq: (1.0 + gr(21 + i * 2) * 3.0) * harmonic * (0.95 + Math.random() * 0.1),
            phase: Math.random() * Math.PI * 2,
        });
    }

    sphere.userData.xMin = -hw;
    sphere.userData.xRange = sceneWidth;
    sphere.userData.xSpeed = 1.0 + Math.random() * 10.0;
    sphere.userData.baseY = groupBaseY + (Math.random() - 0.5) * sceneHeight * 0.08;
    sphere.userData.baseZ = groupBaseZ + (Math.random() - 0.5) * hh * 0.06 * depthMul;
    sphere.userData.yWaves = yWaves;
    sphere.userData.zWaves = zWaves;
}

// ── Per-frame animation ────────────────────────────────────────
function animateSphere(sphere, elapsed) {
    const u = sphere.userData;
    let x = u.xMin + elapsed * u.xSpeed;
    x = u.xMin + ((x - u.xMin) % u.xRange + u.xRange) % u.xRange;
    sphere.position.x = x;

    const t = (x - u.xMin) / u.xRange;

    let y = u.baseY;
    for (let i = 0; i < u.yWaves.length; i++) {
        const w = u.yWaves[i];
        y += Math.sin(t * Math.PI * 2 * w.freq + w.phase) * w.amp;
    }
    sphere.position.y = y;

    let z = u.baseZ;
    for (let i = 0; i < u.zWaves.length; i++) {
        const w = u.zWaves[i];
        z += Math.sin(t * Math.PI * 2 * w.freq + w.phase) * w.amp;
    }
    sphere.position.z = z;
}

// ── Build all spheres ──────────────────────────────────────────
function buildScene(data, viewW, viewH) {
    // Clear previous
    clearScene();

    const scales = computeScales(data, viewW, viewH);
    const { xScale, zScale, sizeScale, depthScale, opacityScale, xOffset, zOffset, baseRadius } = scales;
    const sceneWidth = xOffset * 2;
    const sceneHeight = zOffset * 2;

    data.forEach(d => {
        const jitter = 0.8 + Math.random() * 0.4;
        const radius = baseRadius * depthScale(d.z) * sizeScale(d.size) * jitter;

        const geometry = markRaw(new THREE.SphereGeometry(radius, 24, 24));
        const material = markRaw(new THREE.MeshStandardMaterial({
            color: d.rgba,
            transparent: true,
            opacity: opacityScale(d.z),
            roughness: 0.0,
            metalness: 0.0,
        }));
        const sphere = markRaw(new THREE.Mesh(geometry, material));
        sphere.castShadow = true;
        sphere.position.set(xScale(d.x) - xOffset, 0, zScale(d.z) - zOffset);
        initSphereAnim(sphere, d, sceneWidth, sceneHeight);
        scene.add(sphere);
        spheres.push(sphere);
    });

    buildPaths(sceneWidth, sceneHeight);
}

// ── Cleanup helpers ────────────────────────────────────────────
function clearScene() {
    const keep = new Set(lights);
    keep.add(camera);
    scene.children.filter(c => !keep.has(c)).forEach(c => {
        scene.remove(c);
        if (c.geometry) c.geometry.dispose();
        if (c.material) c.material.dispose();
    });
    spheres.length = 0;
    pathLines.length = 0;
}

// ── Lifecycle ──────────────────────────────────────────────────
onMounted(() => {
    const canvas = canvasEl.value;
    const parent = canvas.parentElement;
    const w = parent.clientWidth;
    const h = parent.clientHeight;

    // Scene
    scene = markRaw(new THREE.Scene());

    // Camera
    camera = markRaw(new THREE.PerspectiveCamera(CONFIG.fov, w / h, CONFIG.nearClip, CONFIG.farClip));
    const [cx, cy] = CONFIG.cameraPosition;
    camera.position.set(cx, cy, CONFIG.cameraDistance);
    camera.lookAt(...CONFIG.cameraLookAt);
    camera.updateProjectionMatrix();

    // Lights
    const dirLight = markRaw(new THREE.DirectionalLight(0xffffff, CONFIG.directionalLightIntensity));
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.camera.left = -30;
    dirLight.shadow.camera.right = 30;
    dirLight.shadow.camera.top = 30;
    dirLight.shadow.camera.bottom = -30;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 60;
    dirLight.shadow.radius = 8;
    dirLight.shadow.blurSamples = 25;
    scene.add(dirLight);

    const ambLight = markRaw(new THREE.AmbientLight(0xffffff, CONFIG.ambientLightIntensity));
    scene.add(ambLight);
    lights = [dirLight, ambLight];

    // Renderer
    renderer = markRaw(new THREE.WebGLRenderer({ canvas, antialias: true }));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;

    clock = markRaw(new THREE.Clock());

    // Visible-area calculation
    const vFov = THREE.MathUtils.degToRad(CONFIG.fov);
    const viewH = 2 * Math.tan(vFov / 2) * CONFIG.cameraDistance;
    const viewW = viewH * (w / h);

    // Build spheres
    const data = generateSpheres();
    buildScene(data, viewW, viewH);

    // Animation loop
    const loop = () => {
        const elapsed = clock.getElapsedTime();
        spheres.forEach(s => animateSphere(s, elapsed));
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    // Resize handling
    resizeObserver = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const pw = parent.clientWidth;
            const ph = parent.clientHeight;
            camera.aspect = pw / ph;
            camera.updateProjectionMatrix();
            renderer.setSize(pw, ph, false);

            const newViewH = 2 * Math.tan(vFov / 2) * CONFIG.cameraDistance;
            const newViewW = newViewH * (pw / ph);
            buildScene(data, newViewW, newViewH);
        }, 100);
    });
    requestAnimationFrame(() => resizeObserver.observe(parent));
});

onBeforeUnmount(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (resizeObserver) resizeObserver.disconnect();
    clearTimeout(resizeTimer);
});
</script>
