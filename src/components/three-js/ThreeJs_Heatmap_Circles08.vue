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
  // Use /data/ for dev, BASE_URL/data/ for prod
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
  // Group cell lines and calculate mean viability
  let cellLineGroups = d3.groups(data, d => d.ccle_name).map(d => ({
    key: d[0],
    values: d[1],
    mean: d3.mean(d[1], e => e.viability)
  }));
  cellLineGroups.sort((a, b) => d3.descending(a.mean, b.mean));

  // Map cell lines and doses to numeric indices
  let cellLineToNumber = {};
  cellLineGroups.forEach((d, i) => { cellLineToNumber[d.key] = i; });
  let doses = [...new Set(data.map(d => d.pert_dose))].sort((a, b) => b - a);
  let doseToNumber = {};
  doses.forEach((d, i) => { doseToNumber[d] = i; });

  // Define scales for x, z, color, and opacity
  const xExtent = [0, cellLineGroups.length - 1];
  const zExtent = [0, doses.length - 1];
  const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1, 0.3]);
  const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);
  const zScale = d3.scaleLinear().domain(zExtent).range([0, 4 * zExtent[1]]);
  const opacityScale = d3.scaleLinear().domain(zExtent).range([0.1, 1]);

  // Offset calculations for centering
  const xOffset = (xScale.range()[1] - xScale.range()[0]) / 2;
  const zOffset = (zScale.range()[1] - zScale.range()[0]) / 2;

  // Process data and apply scales
  data.forEach(d => {
    d.x = xScale(cellLineToNumber[d.ccle_name]) - xOffset; // Scaled x position
    d.z = zScale(doseToNumber[d.pert_dose]) - zOffset; // Scaled z position
    d.y = 0; // Fixed y position
    d.c = colorScale(d.viability); // Scaled color
    d.opacity = opacityScale(doseToNumber[d.pert_dose]); // Scaled opacity
  });

  return data;
}

function createHeatmapPlanes(heatmapData) {
  heatmapPlanes.forEach(plane => scene.remove(plane));
  heatmapPlanes = [];

  if (!heatmapData.length) return;
  const xExtent = d3.extent(heatmapData, d => d.x);
  const planeWidth = width / xExtent[1];
  const planeHeight = 4;
  heatmapData.forEach(d => {
    const geometry = new THREE.PlaneGeometry(planeWidth, 4); // Fixed plane dimensions
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(d.c), // Use scaled color from parsed data
      side: THREE.DoubleSide,
      opacity: d.opacity, // Use scaled opacity from parsed data
      transparent: true
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(d.x, d.y, d.z); // Use scaled positions from parsed data
    scene.add(plane);
    heatmapPlanes.push(plane);
  });
}
function initSpheres(heatmapData) {
  spheres.forEach(s => scene.remove(s));
  spheres = [];

  const rainbowColorScale = d3.scaleSequential(d3.interpolateRainbow).domain([0, 10]); // Rainbow color scale

  heatmapData.forEach(d => {
    const sphereGeometry = new THREE.SphereGeometry(0, 16, 16); // Start with radius 0
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(d.c), // Start with heatmap rectangle color
      transparent: true,
      opacity: 0, // Start fully transparent
      roughness: 0.5,
      metalness: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);

    // Initial position matches heatmap rectangle
    sphere.position.set(d.x, 1, d.z); // Slightly above the heatmap rectangle

    // Store user data for animation
    sphere.userData = {
      initialX: d.x,
      initialZ: d.z,
      radius: 0, // Start with radius 0
      maxRadius: Math.random() * 0.3 + 0.1, // Random maximum radius
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
    const { initialX, initialZ, speed, waveOffset, radius, maxRadius, rainbowColorScale } = sphere.userData;

    // Bubble up slowly
    sphere.position.y += speed;

    // Apply wave motion
    sphere.position.x = initialX + Math.sin(t * 0.001 + waveOffset) * 2; // Horizontal wave
    sphere.position.z = initialZ + Math.cos(t * 0.001 + waveOffset) * 2; // Depth wave

    // Gradually increase radius
    if (sphere.userData.radius < maxRadius) {
      sphere.userData.radius = Math.min(maxRadius, sphere.userData.radius + 0.01);
      sphere.geometry.dispose(); // Dispose old geometry
      sphere.geometry = new THREE.SphereGeometry(sphere.userData.radius, 16, 16); // Update geometry with new radius
    }

    // Fade in
    if (sphere.material.opacity < 0.8) {
      sphere.material.opacity = Math.min(0.8, sphere.material.opacity + 0.001);
    }

    // Change color based on height
    const normalizedHeight = Math.min(10, sphere.position.y) / 10; // Normalize height to [0, 1]
    const rainbowColor = rainbowColorScale(normalizedHeight * 10); // Map normalized height to rainbow color
    const blendedColor = d3.interpolateRgb(sphere.material.color.getHexString(), rainbowColor)(normalizedHeight);
    sphere.material.color.set(blendedColor);

    // Reset position if sphere moves too far up
    if (sphere.position.y > 20) {
      sphere.position.y = 0.3; // Reset near heatmap
      sphere.material.opacity = 0; // Reset opacity
      sphere.userData.radius = 0; // Reset radius
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

