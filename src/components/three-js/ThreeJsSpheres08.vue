<template>
  <div style="position:relative; width:100vw; height:100vh;">
    <canvas id="canvasElement" style="position: absolute; width:100%; height:100%;"></canvas>
    <div style="position:absolute;top:20px;left:20px;z-index:10;">
      <button
        v-for="(name, idx) in sequenceNames"
        :key="name"
        @click="startMorph(idx)"
        :style="{
          marginRight: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          background: idx === currentSequence ? '#333' : '#eee',
          color: idx === currentSequence ? '#fff' : '#333',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }"
      >
        {{ name }}
      </button>
    </div>
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
      currentSequence: 0,
      targetSequence: 0,
      morphProgress: 1, // 0 = start, 1 = fully morphed
      morphing: false,
      sequenceNames: [
  'Grid Sine/Cosine',
  'Grid Checkerboard',
  'Grid Radial Pulse',
  'Grid Swirl',
  'Grid Rings',
  'Grid Diagonal Sweep'
      ],
      animateId: null,
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
  },
  beforeDestroy() {
    if (this.animateId) cancelAnimationFrame(this.animateId);
  },
  methods: {
    startMorph(idx) {
      if (this.currentSequence !== idx) {
        this.targetSequence = idx;
        this.morphProgress = 0;
        this.morphing = true;
      }
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

      // Math distributions for morphing
      const N = 200;
      const sphereSegments = 16;
      const gridSize = 14;

      // Helper for random color
      function randomColor() {
        return new THREE.Color(Math.random(), Math.random(), Math.random());
      }

      // Distributions for morphing
const distributions = [
  // 0: Grid - Gentle Sine/Cosine
  (i, t) => {
    const xi = i % gridSize;
    const zi = Math.floor(i / gridSize);
    const x = xi - gridSize / 2;
    const z = zi - gridSize / 2;
    const y = Math.sin(x * 0.3 + t * 0.00008) + Math.cos(z * 0.3 + t * 0.0008);
    return [x, y, z];
  },
  // 1: Grid - Checkerboard Breathing
  (i, t) => {
    const xi = i % gridSize;
    const zi = Math.floor(i / gridSize);
    const x = xi - gridSize / 2;
    const z = zi - gridSize / 2;
    const phase = ((xi + zi) % 2 === 0 ? 1 : -1);
    const y = Math.sin(x * 0.3 + t * 0.00008) * phase * Math.cos(z * 0.3 + t * 0.0008) * 0.8;
    return [x, y, z];
  },
  // 2: Grid - Radial Pulse
  (i, t) => {
    const xi = i % gridSize;
    const zi = Math.floor(i / gridSize);
    const x = xi - gridSize / 2;
    const z = zi - gridSize / 2;
    const r = Math.sqrt(x * x + z * z);
    const y = Math.sin(r - t * 0.0008) * 1.2;
    return [x, y, z];
  },
  // 3: Grid - Swirl
  (i, t) => {
    const xi = i % gridSize;
    const zi = Math.floor(i / gridSize);
    const x = xi - gridSize / 2;
    const z = zi - gridSize / 2;
    const angle = Math.atan2(z, x);
    const radius = Math.sqrt(x * x + z * z);
    const y = Math.sin(radius + t * 0.0008 + angle * 2) * 1.2;
    return [x, y, z];
  },
  // 4: Grid - Expanding Rings
  (i, t) => {
    const xi = i % gridSize;
    const zi = Math.floor(i / gridSize);
    const x = xi - gridSize / 2;
    const z = zi - gridSize / 2;
    const r = Math.sqrt(x * x + z * z);
    const y = Math.sin(r * 1.2 - t * 0.0008) * 1.2;
    return [x, y, z];
  },
  // 5: Grid - Diagonal Sweep
  (i, t) => {
    const xi = i % gridSize;
    const zi = Math.floor(i / gridSize);
    const x = xi - gridSize / 2;
    const z = zi - gridSize / 2;
    const y = Math.sin((x + z) * 0.3 + t * 0.00008) * 1.2;
    return [x, y, z];
  }
];

      // Store spheres for animation
      const spheres = [];
      const t0 = Date.now();

      // Render spheres
      for (let i = 0; i < N; i++) {
        const [x, y, z] = distributions[this.currentSequence](i, 0);
        const radius = Math.random() * 0.2;
        const sphereGeometry = new THREE.SphereGeometry(radius, sphereSegments, sphereSegments);
        const color = randomColor();

        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0 // Start invisible
        });

        const smallSphere = new THREE.Mesh(sphereGeometry, material);
        smallSphere.position.set(x, y, z);

        smallSphere.userData.index = i;
        smallSphere.userData.radius = radius;

        scene.add(smallSphere);
        spheres.push(smallSphere);
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
            }
          }
          spheres.forEach((sphere, i) => {
            // Fade in
            if (sphere.material.opacity < 0.8) {
              sphere.material.opacity = Math.min(0.8, sphere.material.opacity + 0.01);
            }
                 const idxA = this.currentSequence;
                const idxB = this.morphing ? this.targetSequence : this.currentSequence;
                const posA = distributions[idxA](sphere.userData.index, t);
                const posB = distributions[idxB](sphere.userData.index, t);
                const morph = this.morphing ? this.morphProgress : 1;
                const x = posA[0] * (1 - morph) + posB[0] * morph;
                const y = posA[1] * (1 - morph) + posB[1] * morph;
                const z = posA[2] * (1 - morph) + posB[2] * morph;
                sphere.position.set(x, y, z);

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