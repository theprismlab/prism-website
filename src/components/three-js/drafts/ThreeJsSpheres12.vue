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
      morphProgress: 1,
      morphing: false,
      animateId: null,
      barcodePositions: null,
      barcodeColors: null,
      autoLoopTimer: null,
      autoLoopDelay: 20,
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
    // Resize handler for responsiveness
    handleResize() {
  if (this.renderer && this.perspectiveCamera && this.orthoCamera) {
    this.renderer.setSize(this.width, this.height);
    const aspect = this.width / this.height;
    this.perspectiveCamera.aspect = aspect;
    this.perspectiveCamera.updateProjectionMatrix();
    this.viewWidth = 30;
    this.viewHeight = this.viewWidth / aspect;
    this.orthoCamera.left = -this.viewWidth / 2;
    this.orthoCamera.right = this.viewWidth / 2;
    this.orthoCamera.top = this.viewHeight / 2;
    this.orthoCamera.bottom = -this.viewHeight / 2;
    this.orthoCamera.updateProjectionMatrix();
  }
    },
    // Loop between wave and barcode
    startAutoLoop() {
      if (this.autoLoopTimer) clearTimeout(this.autoLoopTimer);
      const next = () => {
        if (this.morphing) {
          this.autoLoopTimer = setTimeout(next, 200);
          return;
        }
        const nextSeq = this.currentSequence === 0 ? 1 : 0;
        this.startMorph(nextSeq);
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
    // Start morphing to a sequence
    startMorph(idx) {
      if (this.currentSequence !== idx) {
        if (idx === 1) {
          this.prepareBarcodeDistribution();
        }
        this.targetSequence = idx;
        this.morphProgress = 0;
        this.morphing = true;
      }
    },
    // Compute barcode positions/colors for morphing
    prepareBarcodeDistribution() {
      const numGroups = 7;
      const numRows = 50;
      const groupCols = [5, 2, 4, 3, 6, 3, 7];
      const groupSizes = groupCols.map(cols => cols * numRows);
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

      // Layout parameters for barcode
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
    // Main initialization
    init() {
      if (this.scene) {
        this.spheres.forEach(s => this.scene.remove(s));
        this.spheres = [];
      }
      if (this.animateId) cancelAnimationFrame(this.animateId);

      const width = this.width;
      const height = this.height;
      const canvas = this.canvas;

      // --- Camera: always orthographic for round circles ---
      const aspect = width / height;
   
   // --- Perspective camera for wave ---
    const perspectiveCamera = new THREE.PerspectiveCamera(70, aspect, 0.01, 40);
    perspectiveCamera.position.z = 10;
    perspectiveCamera.position.y = 1;
    perspectiveCamera.lookAt(0, 0, 0);

    // --- Orthographic camera for barcode ---
    this.viewWidth = 30;
    this.viewHeight = this.viewWidth / aspect;
    const orthoCamera = new THREE.OrthographicCamera(
    -this.viewWidth / 2, this.viewWidth / 2,
    this.viewHeight / 2, -this.viewHeight / 2,
    0.01, 40
    );
    orthoCamera.position.z = 10;
    orthoCamera.position.y = 0;
    orthoCamera.lookAt(0, 0, 0);

    // --- Save both cameras for later use ---
    this.perspectiveCamera = perspectiveCamera;
    this.orthoCamera = orthoCamera;

  // --- Scene ---
  const scene = new THREE.Scene();
      // --- Renderer ---
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0xffffff, 0);

      // --- Sphere and grid setup ---
      const groupCols = [5, 2, 4, 3, 6, 3, 7];
      const numRows = 50;
      const N = groupCols.reduce((a, b) => a + b, 0) * numRows;
      const sphereSegments = 16;
      const waveGridSize = Math.ceil(Math.sqrt(N)); // Square grid for wave

      // Helper for random color
      function randomColor() {
        return new THREE.Color().setHSL(Math.random(), 0.7, 0.55);
      }

      // --- Distributions for morphing ---
      const distributions = [
        // 0: Wave (square grid)
        (i, t) => {
          const xi = i % waveGridSize;
          const zi = Math.floor(i / waveGridSize);
          const x = xi - waveGridSize / 2;
          const z = zi - waveGridSize / 2;
          const y = Math.sin(x * 0.3 + t * 0.00008) + Math.cos(z * 0.3 + t * 0.0008);
          return [x, y, z];
        },
        // 1: Barcode (custom grid)
        (i, t) => {
          if (this.barcodePositions && this.barcodePositions[i]) {
            return this.barcodePositions[i];
          }
          return [0, i * 0.2 - 20, 0];
        }
      ];

      // --- Create spheres ---
      const spheres = [];
      const t0 = Date.now();
      for (let i = 0; i < N; i++) {
        const [x, y, z] = distributions[0](i, 0);
        const radius = 0.2;
        const color = randomColor();
        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0
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

      // --- Prepare barcode positions/colors if needed ---
      if (this.currentSequence === 1) {
        this.spheres = spheres;
        this.prepareBarcodeDistribution();
      }

      // --- Animation loop ---
      let lastFrame = 0;
      const animate = () => {
        const now = Date.now();
        if (now - lastFrame > 33) {
          const t = now - t0;
          // Morph progress
          if (this.morphing) {
            this.morphProgress += 0.02;
            if (this.morphProgress >= 1) {
              this.morphProgress = 1;
              this.morphing = false;
              this.currentSequence = this.targetSequence;
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
            // Morph positions
            const idxA = this.currentSequence;
            const idxB = this.morphing ? this.targetSequence : this.currentSequence;
            const morph = this.morphing ? this.morphProgress : 1;    
            const posA = distributions[idxA].call(this, sphere.userData.index, t);
            const posB = distributions[idxB].call(this, sphere.userData.index, t);
       


            const x = posA[0] * (1 - morph) + posB[0] * morph;
            const y = posA[1] * (1 - morph) + posB[1] * morph;
            const z = posA[2] * (1 - morph) + posB[2] * morph;
            sphere.position.set(x, y, z);

          // Use perspective for wave, ortho for barcode, crossfade if morphing
            let camera;
            if ((idxA === 0 && morph < 0.5) || (idxB === 0 && morph >= 0.5)) {
            camera = this.perspectiveCamera;
            camera.aspect = this.width / this.height;
            camera.updateProjectionMatrix();
            } else {
            camera = this.orthoCamera;
            this.orthoCamera.left = -this.viewWidth / 2;
            this.orthoCamera.right = this.viewWidth / 2;
            this.orthoCamera.top = this.viewHeight / 2;
            this.orthoCamera.bottom = -this.viewHeight / 2;
            this.orthoCamera.updateProjectionMatrix();
            }

            renderer.render(scene, camera);

            // Optional: scale effect
            const dist = Math.sqrt(x * x + y * y + z * z);
            const scale = 0.2 + 0.15 * (1 + Math.sin(dist));
            sphere.scale.set(scale, scale, scale);
          });
          lastFrame = now;
        }
        this.animateId = requestAnimationFrame(animate);
      };
      animate();

      // --- Save refs for later use ---
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