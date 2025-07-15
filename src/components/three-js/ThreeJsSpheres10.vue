<template>
  <div style="position:relative; width:100vw; height:100vh;">
    <canvas id="canvasElement" style="position: absolute; width:100%; height:100%;"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'ThreeJsSpheresMorph',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      spheres: [],
      currentSequence: 0, // 0 = wave, 1 = barcode
      targetSequence: 1,
      morphProgress: 1, // 0 = start, 1 = fully morphed
      morphing: false,
      animateId: null,
      barcodePositions: null, // for barcode distribution
      barcodeColors: null,    // for barcode distribution
      autoLoopTimer: null,
      autoLoopDelay: 2200, // ms to pause at each state
    };
  },
  computed: {
    canvas() {
      return document.getElementById('canvasElement');
    },
    width() {
      return window.innerWidth;
    },
    height() {
      return window.innerHeight;
    }
  },
  mounted() {
    this.init();
    this.startAutoLoop();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    if (this.animateId) cancelAnimationFrame(this.animateId);
    if (this.autoLoopTimer) clearTimeout(this.autoLoopTimer);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (this.renderer && this.camera) {
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
      }
    },
    // Automatically loop between wave and barcode
    startAutoLoop() {
      if (this.autoLoopTimer) clearTimeout(this.autoLoopTimer);
      const next = () => {
        // If already morphing, wait
        if (this.morphing) {
          this.autoLoopTimer = setTimeout(next, 200);
          return;
        }
        // Toggle target
        const nextSeq = this.currentSequence === 0 ? 1 : 0;
        this.startMorph(nextSeq);
        // Wait for morph to finish, then pause, then morph again
        const waitForMorph = () => {
          if (this.morphing) {
            this.autoLoopTimer = setTimeout(waitForMorph, 100);
          } else {
            this.autoLoopTimer = setTimeout(next, this.autoLoopDelay);
          }
        };
        waitForMorph();
      };
      this.autoLoopTimer = setTimeout(next, this.autoLoopDelay);
    },
    // Start morphing to a sequence (0 = wave, 1 = barcode)
    startMorph(idx) {
      if (this.currentSequence !== idx) {
        // If morphing to barcode, recalculate barcode positions/colors
        if (idx === 1) {
          this.prepareBarcodeDistribution();
        }
        this.targetSequence = idx;
        this.morphProgress = 0;
        this.morphing = true;
      }
    },
// prepareBarcodeDistribution() {
//   const numGroups = 7;
//   const numRows = 50;
//   const numCols = 6;
//   const groupSize = numRows * numCols;
//   const N = numGroups * groupSize;

//   // Sort spheres by hue and split into groups
//   const hsvColors = this.spheres.map((s, i) => {
//     const color = s.userData.color.clone();
//     const hsv = {};
//     color.getHSL(hsv);
//     return { index: i, color, h: hsv.h, s: hsv.s, l: hsv.l };
//   }).sort((a, b) => a.h - b.h);

//   // Split into 7 groups
//   const colorGroups = [];
//   for (let g = 0; g < numGroups; g++) {
//     colorGroups.push(hsvColors.slice(g * groupSize, (g + 1) * groupSize));
//   }

//   // Tighter layout parameters
//   const colSpacing = 0.38;
//   const rowSpacing = 0.38;
//   const groupGap = 0.9; // smaller gap between groups
//   const totalCols = numGroups * numCols + (numGroups - 1);
//   const baseX = -((totalCols - 1) * colSpacing + (numGroups - 1) * groupGap) / 2;

//   const barcodePositions = [];
//   const barcodeColors = [];

//   for (let g = 0; g < numGroups; g++) {
//     for (let i = 0; i < colorGroups[g].length; i++) {
//       const col = Math.floor(i / numRows);
//       const row = i % numRows;
//       // Calculate x with group gap
//       const x = baseX + (g * (numCols * colSpacing + groupGap)) + col * colSpacing;
//       const y = ((numRows - 1) / 2 - row) * rowSpacing;
//       const z = 0;
//       barcodePositions[colorGroups[g][i].index] = [x, y, z];
//       barcodeColors[colorGroups[g][i].index] = colorGroups[g][i].color;
//     }
//   }

//   this.barcodePositions = barcodePositions;
//   this.barcodeColors = barcodeColors;
// },   

prepareBarcodeDistribution() {
  const numGroups = 7;
  const numRows = 50;
  // Set the number of columns for each group (customize as desired)
  const groupCols = [5, 2, 4, 3, 6, 3, 7];
  const groupSizes = groupCols.map(cols => cols * numRows);
//  const N = groupSizes.reduce((a, b) => a + b, 0);
  const N = groupCols.reduce((a, b) => a + b, 0) * numRows;

  // Sort spheres by hue and split into groups
  const hsvColors = this.spheres.map((s, i) => {
    const color = s.userData.color.clone();
    const hsv = {};
    color.getHSL(hsv);
    return { index: i, color, h: hsv.h, s: hsv.s, l: hsv.l };
  }).sort((a, b) => a.h - b.h);

  // Split into 7 groups with the specified sizes
  const colorGroups = [];
  let idx = 0;
  for (let g = 0; g < numGroups; g++) {
    colorGroups.push(hsvColors.slice(idx, idx + groupSizes[g]));
    idx += groupSizes[g];
  }

  // Layout parameters
  const colSpacing = 0.38;
  const rowSpacing = 0.38;
  const groupGap = 0.9;
  const totalCols = groupCols.reduce((a, b) => a + b, 0) + (numGroups - 1);
  const baseX = -((totalCols - 1) * colSpacing + (numGroups - 1) * groupGap) / 2;

  const barcodePositions = [];
  const barcodeColors = [];

  let colOffset = 0;
  for (let g = 0; g < numGroups; g++) {
    const nCols = groupCols[g];
    const group = colorGroups[g];
    for (let i = 0; i < group.length; i++) {
      const col = Math.floor(i / numRows);
      const row = i % numRows;
      const x = baseX + (colOffset + col) * colSpacing + g * groupGap;
      const y = ((numRows - 1) / 2 - row) * rowSpacing;
      const z = 0;
      barcodePositions[group[i].index] = [x, y, z];
      barcodeColors[group[i].index] = group[i].color;
    }
    colOffset += nCols;
  }

  this.barcodePositions = barcodePositions;
  this.barcodeColors = barcodeColors;
},
init() {
      if (this.scene) {
        this.spheres.forEach(s => this.scene.remove(s));
        this.spheres = [];
      }
      if (this.animateId) cancelAnimationFrame(this.animateId);

      const width = this.width;
      const height = this.height;
      const canvas = this.canvas;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 40);
      camera.position.z = 10;
      camera.position.y = 1;
      camera.updateProjectionMatrix();

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0xffffff, 0);

const groupCols = [5, 2, 4, 3, 6, 3, 7];
const numRows = 50;
const N = groupCols.reduce((a, b) => a + b, 0) * numRows;
  const sphereSegments = 16;
  const gridSize = Math.ceil(Math.sqrt(N));
      // Helper for random color
      function randomColor() {
        return new THREE.Color().setHSL(Math.random(), 0.7, 0.55);
      }
      // Distributions for morphing
      const distributions = [
        // 0: Grid - Gentle Sine/Cosine (wave)
        (i, t) => {
          const xi = i % gridSize;
          const zi = Math.floor(i / gridSize);
          const x = xi - gridSize / 2;
          const z = zi - gridSize / 2;
          const y = Math.sin(x * 0.3 + t * 0.00008) + Math.cos(z * 0.3 + t * 0.0008);
          return [x, y, z];
        },
        // 1: Barcode (vertical color-sorted bars)
        (i, t) => {
          // Use precomputed barcode positions
          if (this.barcodePositions && this.barcodePositions[i]) {
            return this.barcodePositions[i];
          }
          // fallback: stack in center
          return [0, i * 0.2 - 20, 0];
        }
      ];

           // Store spheres for animation
      const spheres = [];
      const t0 = Date.now();

      // Render spheres
      for (let i = 0; i < N; i++) {
        const [x, y, z] = distributions[0](i, 0);
        // const radius = Math.random() * 0.2 + 0.13;
            const radius = 0.2;
        const color = randomColor();

        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0 // Start invisible
        });

        const smallSphere = new THREE.Mesh(
          new THREE.SphereGeometry(radius, sphereSegments, sphereSegments),
          material
        );
        smallSphere.position.set(x, y, z);

        smallSphere.userData.index = i;
        smallSphere.userData.radius = radius;
        smallSphere.userData.color = color;

        scene.add(smallSphere);
        spheres.push(smallSphere);
      }

      // Prepare barcode positions/colors for morphing if needed
      if (this.currentSequence === 1) {
        this.spheres = spheres; // so prepareBarcodeDistribution can access colors
        this.prepareBarcodeDistribution();
      }

      // Animate (throttled to ~30 FPS)
      let lastFrame = 0;
      const animate = () => {
        const now = Date.now();
        if (now - lastFrame > 33) { // ~30 FPS
          const t = now - t0;
          // Morph progress
          if (this.morphing) {
            this.morphProgress += 0.02; // speed of morph
            if (this.morphProgress >= 1) {
              this.morphProgress = 1;
              this.morphing = false;
              this.currentSequence = this.targetSequence;
              // If morphing to barcode, lock in barcode positions/colors
              if (this.currentSequence === 1) {
                this.prepareBarcodeDistribution();
              }
            }
          }
          spheres.forEach((sphere, i) => {
            // Fade in
            if (sphere.material.opacity < 0.8) {
              sphere.material.opacity = Math.min(0.8, sphere.material.opacity + 0.01);
            }
            const idxA = this.currentSequence;
            const idxB = this.morphing ? this.targetSequence : this.currentSequence;
            const posA = distributions[idxA].call(this, sphere.userData.index, t);
            const posB = distributions[idxB].call(this, sphere.userData.index, t);
            const morph = this.morphing ? this.morphProgress : 1;
            const x = posA[0] * (1 - morph) + posB[0] * morph;
            const y = posA[1] * (1 - morph) + posB[1] * morph;
            const z = posA[2] * (1 - morph) + posB[2] * morph;
            sphere.position.set(x, y, z);

            // Morph color for barcode
            if ((idxA === 1 || idxB === 1) && this.barcodeColors) {
              // Color morph: from original to barcode color
              const colorA = sphere.userData.color;
              const colorB = this.barcodeColors[sphere.userData.index] || colorA;
              const r = colorA.r * (1 - morph) + colorB.r * morph;
              const g = colorA.g * (1 - morph) + colorB.g * morph;
              const b = colorA.b * (1 - morph) + colorB.b * morph;
              sphere.material.color.setRGB(r, g, b);
            }

            // Example: scale based on distance from center (or any function of x, y, z)
            const dist = Math.sqrt(x * x + y * y + z * z);
            // You can tweak the formula below for different effects
            const scale = 0.2 + 0.15 * (1 + Math.sin(dist));
            sphere.scale.set(scale, scale, scale);
          });
          renderer.render(scene, camera);
          lastFrame = now;
        }
        this.animateId = requestAnimationFrame(animate);
      };
      animate();

      // Save refs
      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
      this.spheres = spheres;
    }
  }
};
</script>
<style>
/* No extra styles needed */
</style>