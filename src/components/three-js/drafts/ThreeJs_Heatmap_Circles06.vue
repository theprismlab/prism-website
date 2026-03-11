<template>

    <canvas ref="canvas" style="position:absolute; width:100vw; height:100vh;"></canvas>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import * as d3 from 'd3';

const HEATMAP_CSV = "BRD-K05804044-viability-heatmap.csv";
const canvas = ref(null);

let scene, camera, renderer, animateId;
let heatmapPlanes = [];
let spheres = [];
let t0 = 0;
let width = window.innerWidth;
let height = window.innerHeight;

// --- THREE.JS SHARED SETUP ---
function initThreeJs() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, width / height, 1.01, 200);
  camera.position.set(0, 5, 25);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  light.castShadow = true;
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  canvas.value.width = width;
  canvas.value.height = height;

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true
  });
  renderer.setSize(width, height, false);
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
}

// --- HEATMAP LOGIC ---
async function loadHeatmapData() {
  const path = import.meta.env.PROD ? import.meta.env.BASE_URL + "data/" : "/data/";
  const data = await d3.csv(`${path}${HEATMAP_CSV}`, d => ({
    ccle_name: d["Cell line"],
    viability: +d["Viability"],
    pert_dose: +d["Dose"]
  }));
  const parsed = parseHeatmapData(data);
  createHeatmapPlanes(parsed);
  initSpheres(parsed); // Pass heatmap data to sphere initialization
}

function parseHeatmapData(data) {
  const heatmapColorScale = d3.scaleSequential(d3.interpolateViridis).domain([0, 1]); // Heatmap color scale
  return data.map((d, i) => ({
    x: (i % 10) - 5, // Example grid layout (adjust as needed)
    z: Math.floor(i / 10) - 5, // Example grid layout (adjust as needed)
    color: heatmapColorScale(d.viability),
    viability: d.viability,
    dose: d.pert_dose
  }));
}

function createHeatmapPlanes(heatmapData) {
  heatmapData.forEach(d => {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(d.color),
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(d.x, 0, d.z);
    scene.add(plane);
    heatmapPlanes.push(plane);
  });
}

// --- SPHERE LOGIC ---
function initSpheres(heatmapData) {
  spheres.forEach(s => scene.remove(s));
  spheres = [];

  const rainbowColorScale = d3.scaleSequential(d3.interpolateRainbow).domain([0, 10]); // Rainbow color scale

  heatmapData.forEach(d => {
    const radius = Math.random() * 0.3 + 0.1; // Random radius
    const sphereGeometry = new THREE.SphereGeometry(radius, 16, 16);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(d.color), // Start with heatmap rectangle color
      transparent: true,
      opacity: 0, // Start fully transparent
      roughness: 0.5,
      metalness: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);

    // Initial position matches heatmap rectangle
    sphere.position.set(d.x, 0.1, d.z); // Slightly above the heatmap rectangle

    // Store user data for animation
    sphere.userData = {
      initialX: d.x,
      initialZ: d.z,
      radius,
      speed: Math.random() * 0.02 + 0.01, // Random speed
      waveOffset: Math.random() * Math.PI * 2, // Random wave offset
      viability: d.viability, // Store viability for color transition
      rainbowColorScale
    };

    scene.add(sphere);
    spheres.push(sphere);
  });
}

function updateSpheres(t) {
  spheres.forEach(sphere => {
    const { initialX, initialZ, speed, waveOffset, viability, rainbowColorScale } = sphere.userData;

    // Bubble up slowly
    sphere.position.y += speed;

    // Apply wave motion
    sphere.position.x = initialX + Math.sin(t * 0.001 + waveOffset) * 2; // Horizontal wave
    sphere.position.z = initialZ + Math.cos(t * 0.001 + waveOffset) * 2; // Depth wave

    // Fade in
    if (sphere.material.opacity < 0.8) {
      sphere.material.opacity = Math.min(0.8, sphere.material.opacity + 0.01);
    }

    // Change color based on height
    const normalizedHeight = Math.min(10, sphere.position.y) / 10; // Normalize height to [0, 1]
    const rainbowColor = rainbowColorScale(normalizedHeight * 10); // Map normalized height to rainbow color
    const blendedColor = d3.interpolateRgb(sphere.material.color.getHexString(), rainbowColor)(normalizedHeight);
    sphere.material.color.set(blendedColor);

    // Reset position if sphere moves too far up
    if (sphere.position.y > 10) {
      sphere.position.y = 0.1; // Reset near heatmap
      sphere.material.opacity = 0; // Reset opacity
      sphere.userData.waveOffset = Math.random() * Math.PI * 2; // Reset wave offset
    }
  });
}

// --- ANIMATION LOOP ---
function animate() {
  const t = Date.now() - t0;
  updateSpheres(t);
  renderer.render(scene, camera);
  animateId = requestAnimationFrame(animate);
}

// --- LIFECYCLE ---
onMounted(async () => {
  width = window.innerWidth;
  height = window.innerHeight;
  initThreeJs();
  await loadHeatmapData();
  animate();
  window.addEventListener('resize', onWindowResize);
});

onBeforeUnmount(() => {
  if (animateId) cancelAnimationFrame(animateId);
  window.removeEventListener('resize', onWindowResize);
  if (renderer) renderer.dispose?.();
});

function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  canvas.value.width = width;
  canvas.value.height = height;
  renderer.setSize(width, height, false);
}
</script>

