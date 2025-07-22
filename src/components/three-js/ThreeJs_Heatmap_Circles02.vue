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
let sphereDistribution = null;
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

  // Set canvas size attributes to match renderer
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
}

function parseHeatmapData(data) {
  let cellLineGroups = d3.groups(data, d => d.ccle_name).map(d => ({
    key: d[0],
    values: d[1],
    mean: d3.mean(d[1], e => e.viability)
  }));
  cellLineGroups.sort((a, b) => d3.descending(a.mean, b.mean));
  let cellLineToNumber = {};
  cellLineGroups.forEach((d, i) => { cellLineToNumber[d.key] = i; });
  let doses = [...new Set(data.map(d => d.pert_dose))].sort((a, b) => b - a);
  let doseToNumber = {};
  doses.forEach((d, i) => { doseToNumber[d] = i; });
  const minV = d3.min(data, d => d.viability);
  const maxV = d3.max(data, d => d.viability);
  const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1, 0.3]);
  //.domain([minV, maxV]);
  data.forEach(d => {
    d.x = cellLineToNumber[d.ccle_name];
    d.z = doseToNumber[d.pert_dose];
    d.y = 0;
    d.c = colorScale(d.viability);
    d.rgba = d.c;
  });
  return data;
}

// function createHeatmapPlanes(heatmapData) {
//   // Remove old planes if any
//   heatmapPlanes.forEach(plane => scene.remove(plane));
//   heatmapPlanes = [];

//   if (!heatmapData.length) return;

//   const zExtent = d3.extent(heatmapData, d => d.z);
//   const xExtent = d3.extent(heatmapData, d => d.x);
//   const planeWidth = 0.7;
//   const planeHeight = 0.7;

//   const xScale = d3.scaleLinear().domain(xExtent).range([-10, 10]);
//   const zScale = d3.scaleLinear().domain(zExtent).range([-5, 5]);
//   const opacityScale = d3.scaleLinear().domain(zExtent).range([0.1, 1]);

//   heatmapData.forEach(d => {
//     const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
//     const material = new THREE.MeshBasicMaterial({
//       color: new THREE.Color(d.rgba),
//       side: THREE.DoubleSide,
//       opacity: opacityScale(d.z),
//       transparent: true
//     });
//     const plane = new THREE.Mesh(geometry, material);
//     plane.rotation.x = -Math.PI / 2;
//     plane.position.set(xScale(d.x), d.y, zScale(d.z));
//     scene.add(plane);
//     heatmapPlanes.push(plane);
//   });
// }

function createHeatmapPlanes(heatmapData) {
  heatmapPlanes.forEach(plane => scene.remove(plane));
  heatmapPlanes = [];

  if (!heatmapData.length) return;

  const zExtent = d3.extent(heatmapData, d => d.z);
  const xExtent = d3.extent(heatmapData, d => d.x);
  const planeWidth = width / xExtent[1];
  const planeHeight = 4;

  const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);
  const zScale = d3.scaleLinear().domain(zExtent).range([0, planeHeight * zExtent[1]]);
  const opacityScale = d3.scaleLinear().domain(zExtent).range([0.1, 1]);

  const xOffset = (xScale.range()[1] - xScale.range()[0]) / 2;
  const zOffset = (zScale.range()[1] - zScale.range()[0]) / 2;

  heatmapData.forEach(d => {
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(d.c), // Use d.c directly as in the context file
      side: THREE.DoubleSide,
      opacity: opacityScale(d.z),
      transparent: true
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(xScale(d.x) - xOffset, d.y, zScale(d.z) - zOffset);
    scene.add(plane);
    heatmapPlanes.push(plane);
  });
}

// --- SPHERE WAVES LOGIC ---
// function initSpheres() {
//   spheres.forEach(s => scene.remove(s));
//   spheres = [];

//   const N = 600;
//   const gridSize = 24;
//   const randomColor = () => new THREE.Color(Math.random(), Math.random(), Math.random());

//   sphereDistribution = (i, t) => {
//     const xi = i % gridSize;
//     const zi = Math.floor(i / gridSize);
//     const x = xi - gridSize / 2;
//     const z = zi - gridSize / 2;
//     const y = Math.sin(x * 0.5 + t * 0.001) + Math.cos(z * 0.5 + t * 0.001);
//     return [x, y, z];
//   };

//   for (let i = 0; i < N; i++) {
//     const [x, y, z] = sphereDistribution(i, 0);
//     const radius = Math.random() * 0.2 + 0.1;
//     const sphereGeometry = new THREE.SphereGeometry(radius, 16, 16);
//     const color = randomColor();
//     const material = new THREE.MeshBasicMaterial({
//       color: color,
//       transparent: true,
//       opacity: 0 // Start invisible
//     });
//     const sphere = new THREE.Mesh(sphereGeometry, material);
//     sphere.position.set(x, y, z);
//     sphere.userData = {
//       index: i,
//       radius,
//     };
//     scene.add(sphere);
//     spheres.push(sphere);
//   }
//   t0 = Date.now();
// }

// ...existing code...

// function initSpheres() {
//   spheres.forEach(s => scene.remove(s));
//   spheres = [];

//   const N = 600;
//   const gridSize = 24;
//   const randomColor = () => new THREE.Color(Math.random(), Math.random(), Math.random());

//   // Choose a z-depth for the sphere grid (e.g., z = 0)
//   const sphereZ = 0;

//   // Calculate frustum size at z = sphereZ
//   const fov = camera.fov * (Math.PI / 180);
//   const camZ = camera.position.z - sphereZ;
//   const frustumHeight = 2 * Math.tan(fov / 2) * camZ;
//   const frustumWidth = frustumHeight * camera.aspect;

//   // Map grid to frustum
//   sphereDistribution = (i, t) => {
//     const xi = i % gridSize;
//     const zi = Math.floor(i / gridSize);

//     // Map xi, zi to [-frustumWidth/2, frustumWidth/2] and [-frustumHeight/2, frustumHeight/2]
//     const x = (xi / (gridSize - 1)) * frustumWidth - frustumWidth / 2;
//     const z = (zi / (gridSize - 1)) * frustumHeight - frustumHeight / 2;

//     // Wave function
//     const y = Math.sin(xi * 0.5 + t * 0.001) + Math.cos(zi * 0.5 + t * 0.001) + 6;
//    //const y = Math.sin((xi + zi) * 0.3 + t * 0.002) * 1.5;
  
//   return [x, y, z];
//   };

//   for (let i = 0; i < N; i++) {
//     const [x, y, z] = sphereDistribution(i, 0);
//     const radius = Math.random() * 0.2 + 0.1;
//     const sphereGeometry = new THREE.SphereGeometry(radius, 16, 16);
//     const color = randomColor();
//     const material = new THREE.MeshBasicMaterial({
//       color: color,
//       transparent: true,
//       opacity: 0 // Start invisible
//     });
//     const sphere = new THREE.Mesh(sphereGeometry, material);
//     sphere.position.set(x, y, z);
//     sphere.userData = {
//       index: i,
//       radius,
//     };
//     scene.add(sphere);
//     spheres.push(sphere);
//   }
//   t0 = Date.now();
// }
function initSpheres() {
  spheres.forEach(s => scene.remove(s));
  spheres = [];

  const N = 600;
  const gridSize = 24;
  const randomColor = () => new THREE.Color(Math.random(), Math.random(), Math.random());

  // Choose a z-depth for the sphere grid (e.g., z = 0)
  const sphereZ = 0;

  // Calculate frustum size at z = sphereZ
  const fov = camera.fov * (Math.PI / 180);
  const camZ = camera.position.z - sphereZ;
  const frustumHeight = 2 * Math.tan(fov / 2) * camZ;
  const frustumWidth = frustumHeight * camera.aspect;

  // Map grid to frustum
  sphereDistribution = (i, t) => {
    const xi = i % gridSize;
    const zi = Math.floor(i / gridSize);

    // Map xi, zi to [-frustumWidth/2, frustumWidth/2] and [-frustumHeight/2, frustumHeight/2]
    const x = (xi / (gridSize - 1)) * frustumWidth - frustumWidth / 2;
    const z = (zi / (gridSize - 1)) * frustumHeight - frustumHeight / 2;

    // Wave function
    const y = Math.sin(xi * 0.5 + t * 0.001) + Math.cos(zi * 0.5 + t * 0.001) + 6;
   //const y = Math.sin((xi + zi) * 0.3 + t * 0.002) * 1.5;
  
  return [x, y, z];
  };

  for (let i = 0; i < N; i++) {
    const [x, y, z] = sphereDistribution(i, 0);
    const radius = Math.random() * 0.2 + 0.1;
    const sphereGeometry = new THREE.SphereGeometry(radius, 16, 16);
    const color = randomColor();
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0 // Start invisible
    });
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.set(x, y, z);
    sphere.userData = {
      index: i,
      radius,
    };
    scene.add(sphere);
    spheres.push(sphere);
  }
  t0 = Date.now();
}

// ...existing code...

function updateSpheres(t) {
  spheres.forEach((sphere, i) => {
    // Fade in
    if (sphere.material.opacity < 0.8) {
      sphere.material.opacity = Math.min(0.8, sphere.material.opacity + 0.01);
    }
    // Wave/helix: update position by formula
    const [x, y, z] = sphereDistribution(sphere.userData.index, t);
    sphere.position.set(x, y, z);
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
  initSpheres();
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

<style scoped>
/* No extra styles needed */
</style>