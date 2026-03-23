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


//  cameraPosition: [12.34, -54.87]
//  cameraDistance: 48.48
//  cameraLookAt: [0.00, 18.00, 0.00]

// cameraPosition: [63.21, -106.74]
// cameraDistance: 111.84
// cameraLookAt: [0.00, 18.00, 0.00]



import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as d3 from 'd3';
import { markRaw, ref, onMounted, onBeforeUnmount } from 'vue';

// ── Config ─────────────────────────────────────────────────────
const CONFIG = {
    sphereCount: 600,              // more spheres to fill wide 16:9 canvas
    cols: 30,                      // wider grid (30 cols × 20 rows)
    colorInterpolator: d3.interpolateTurbo,
    colorDomain: [0, 1],
    fov: 45,                       // tighter FOV for less distortion on wide screens
    // cameraDistance: 110,           // pull back slightly for wider coverage
    // cameraPosition: [0, 20],       // lower eye for more dramatic depth
    // cameraLookAt: [0, 18, 0],     // look slightly below center
    cameraPosition: [63.21, -106.74],
    cameraDistance: 111.84,
    cameraLookAt: [0.00, 18.00, 0.00],
    nearClip: 0.5,
    farClip: 800,
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 2.5,
    radiusBase: 0.012,             // slightly larger base for QHD clarity
    radiusRange: [1.6, 0.1],     // wider size variation
    depthRange: [1, 0.1],
    opacityRange: [0.8, 0.1],     // crisper foreground, softer background
};

const NUM_GROUPS = 12;

// ── Template ref ───────────────────────────────────────────────
const canvasEl = ref(null);

// ── Scene state ────────────────────────────────────────────────
let scene, camera, renderer, clock, controls;
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
        const value = i / (sphereCount - 1);  // uniform 0‥1 for even group coverage
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

// ── Shared wave parameters per group ───────────────────────────
// Each group gets one clean sine on y and one on z with distinct
// frequencies, producing smooth Lissajous-like curves.
// viewH = visible frustum height, viewW = visible frustum width.
function groupWaveParams(group, viewH, viewW) {
    const gr = (salt) => groupRand(group, salt);
    const depthMul = 1.0 + gr(50) * 4.0;

    // y amplitude: fraction of half-height so peaks stay on screen
    const maxYAmp = (viewH / 2) * 0.35;
    const yAmp = maxYAmp * (0.4 + gr(10) * 0.6);

    // z amplitude scaled by depth multiplier
    const maxZAmp = (viewH / 2) * 0.3;
    const zAmp = maxZAmp * (0.3 + gr(20) * 0.7) * depthMul;

    return {
        yAmp,
        yFreq: 1.0 + gr(11) * 2.0,
        yPhase: gr(12) * Math.PI * 2,
        zAmp,
        zFreq: 1.0 + gr(21) * 2.0,
        zPhase: gr(22) * Math.PI * 2,
        depthMul,
    };
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

// ── Evaluate a path at parameter t (0‥1) ──────────────────────
function evalPath(baseY, baseZ, wp, t) {
    // exponential decay: full amplitude at t=0, ~15% at t=1
    const envelope = Math.exp(-t * 2.0);
    const y = baseY + Math.sin(t * Math.PI * 2 * wp.yFreq + wp.yPhase) * wp.yAmp * envelope;
    const z = baseZ + Math.sin(t * Math.PI * 2 * wp.zFreq + wp.zPhase) * wp.zAmp * envelope;
    return { y, z };
}

// ── Group baseline for a given group index ─────────────────────
function groupBaseline(g, sceneWidth, sceneHeight) {
    const hh = sceneHeight / 2;
    const wp = groupWaveParams(g, sceneHeight, sceneWidth);

    // Evenly distribute baselines across the visible height
    // with a small deterministic offset so they don't look gridded
    const gr = (salt) => groupRand(g, salt);
    const slot = (g + 0.5) / NUM_GROUPS;           // 0‥1 evenly spaced
    const jitter = (gr(0) - 0.5) * 0.06;           // ±3% of height
    const baseY = (slot + jitter - 0.5) * sceneHeight * 0.9;

    // z baseline: spread across depth
    const baseZ = (gr(1) - 0.5) * hh * 0.8 * wp.depthMul;

    return { baseY, baseZ, wp };
}

// ── Build path lines per group ─────────────────────────────────
function buildPaths(sceneWidth, sceneHeight) {
    const hw = sceneWidth / 2;
    const segments = 100;

    for (let g = 0; g < NUM_GROUPS; g++) {
        const { baseY, baseZ, wp } = groupBaseline(g, sceneWidth, sceneHeight);

        const points = [];
        for (let s = 0; s <= segments; s++) {
            const t = s / segments;
            const px = -hw + t * sceneWidth;
            const { y: py, z: pz } = evalPath(baseY, baseZ, wp, t);
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
    const { baseY, baseZ, wp } = groupBaseline(group, sceneWidth, sceneHeight);

    // per-sphere: small baseline jitter + shared group wave params
    sphere.userData.xMin = -hw;
    sphere.userData.xRange = sceneWidth;
    sphere.userData.xSpeed = 1.0 + Math.random() * 10.0;
    sphere.userData.xOffset = Math.random() * sceneWidth;  // stagger start positions
    sphere.userData.baseY = baseY + (Math.random() - 0.5) * sceneHeight * 0.08;
    sphere.userData.baseZ = baseZ + (Math.random() - 0.5) * hh * 0.06 * wp.depthMul;
    sphere.userData.baseOpacity = sphere.material.opacity;
    sphere.userData.wp = wp;
}

// ── Per-frame animation ────────────────────────────────────────
function animateSphere(sphere, elapsed) {
    const u = sphere.userData;

    // advance x left→right, wrap when past right edge
    let x = u.xMin + ((elapsed * u.xSpeed + u.xOffset) % u.xRange + u.xRange) % u.xRange;
    sphere.position.x = x;

    const t = (x - u.xMin) / u.xRange;   // 0 at left, 1 at right
    const { y, z } = evalPath(u.baseY, u.baseZ, u.wp, t);
    sphere.position.y = y;
    sphere.position.z = z;

    // fade in on the left 10%, fade out on the right 10%
    const fadeIn  = Math.min(t / 0.1, 1.0);
    const fadeOut = Math.min((1.0 - t) / 0.1, 1.0);
    const opacity = u.baseOpacity * fadeIn * fadeOut;
    sphere.material.opacity = opacity;
    sphere.visible = opacity > 0.005;
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

    // Orbit controls — drag to rotate, scroll to zoom, right-drag to pan
    controls = new OrbitControls(camera, canvas);
    controls.target.set(...CONFIG.cameraLookAt);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 20;
    controls.maxDistance = 400;
    controls.update();

    // Log camera state when user interacts
    controls.addEventListener('end', () => {
        const p = camera.position;
        const t = controls.target;
        console.log(`cameraPosition: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}]`);
        console.log(`cameraDistance: ${p.z.toFixed(2)}`);
        console.log(`cameraLookAt: [${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}]`);
    });

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
        controls.update();
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
    if (controls) controls.dispose();
    if (resizeObserver) resizeObserver.disconnect();
    clearTimeout(resizeTimer);
});
</script>
