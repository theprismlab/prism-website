<template>
  <div style="position:relative; width:100vw; height:100vh;">
    <canvas id="canvasElement" style="position: absolute; width:100%; height:100%;"></canvas>
    <div style="position:absolute;top:20px;left:20px;z-index:10;">
      <button
        v-for="(name, idx) in distributionNames"
        :key="name"
        @click="setDistribution(idx)"
        :style="{
          marginRight: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          background: idx === currentDistribution ? '#333' : '#eee',
          color: idx === currentDistribution ? '#fff' : '#333',
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
import * as d3 from 'd3';

export default {
  name: 'ThreeJsSpheres',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      spheres: [],
      currentDistribution: 0,
      distributionNames: [
        'Random Normal',
        'Sine Wave',
        'Radial Wave',
        'Grid Waves',
        'Helix'
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
    setDistribution(idx) {
      if (this.currentDistribution !== idx) {
        this.currentDistribution = idx;
        this.init();
      }
    },
    init() {
      // Clean up previous scene if any
      if (this.scene) {
        this.spheres.forEach(s => this.scene.remove(s));
        this.spheres = [];
      }
      if (this.animateId) cancelAnimationFrame(this.animateId);

      const width = this.width;
      const height = this.height;
      const canvas = this.canvas;

      // Set up scene, camera, renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 40);
      camera.position.z = 10;
      camera.position.y = 1;
      camera.updateProjectionMatrix();

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0xffffff, 0);

      // Helper: normal distribution
      function generateNormalDistribution(mean, stdDev) {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return mean + stdDev * Math.sqrt(-1.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      }
      function randomColor() {
        return new THREE.Color(Math.random(), Math.random(), Math.random());
      }

      // Bounds
      const BOUNDS_X = width / 2;
      const BOUNDS_Y = height / 2;
      const BOUNDS_Z = 6;

      // Distribution functions
      const N = 200; // Lowered for performance
      const sphereSegments = 16; // Lowered for performance
      const gridSize = 14;
      const distributions = [
        // 0: Random Normal
        (i, t) => [
          generateNormalDistribution(0, 3),
          generateNormalDistribution(0, 3),
          generateNormalDistribution(0, 3)
        ],
        // 1: Sine Wave
        (i, t) => {
          const x = i * 0.2 - 20;
          const y = Math.sin(x * 0.3 + t * 0.0003) * 2;
          const z = Math.cos(x * 0.2 + t * 0.0003) * 2;
          return [x * 0.1, y, z];
        },
        // 2: Radial Wave
        (i, t) => {
          const angle = (i / N) * Math.PI * 2;
          const radius = 5 + Math.sin(angle * 4 + t * 0.0003) * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle * 2 + t * 0.0003) * 2;
          const z = Math.sin(angle) * radius;
          return [x, y, z];
        },
        // 3: Grid Waves
        (i, t) => {
          const xi = i % gridSize;
          const zi = Math.floor(i / gridSize);
          const x = xi - gridSize / 2;
          const z = zi - gridSize / 2;
          const y = Math.sin(x * 0.5 + t * 0.0003) + Math.cos(z * 0.5 + t * 0.0003);
          return [x, y, z];
        },
        // 4: Helix
        (i, t) => {
          const tt = i * 0.1 + t * 0.0003;
          const x = Math.cos(tt) * 5;
          const y = tt - 15;
          const z = Math.sin(tt) * 5;
          return [x, y, z];
        }
      ];

      // Store spheres for animation
      const spheres = [];
      const t0 = Date.now();

      // Render spheres
      for (let i = 0; i < N; i++) {
        const [x, y, z] = distributions[this.currentDistribution](i, 0);
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

        // No random velocity for wave patterns, but keep for random normal
        smallSphere.userData.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002
        );
        smallSphere.userData.radius = radius;
        smallSphere.userData.index = i;

        scene.add(smallSphere);
        spheres.push(smallSphere);
      }

      // Animate (throttled to ~30 FPS)
      let lastFrame = 0;
      const animate = () => {
        const now = Date.now();
        if (now - lastFrame > 33) { // ~30 FPS
          const t = now - t0;
          spheres.forEach((sphere, i) => {
            // Fade in
            if (sphere.material.opacity < 0.8) {
              sphere.material.opacity = Math.min(0.8, sphere.material.opacity + 0.01);
            }
            // Update position based on distribution
            if (this.currentDistribution === 0) {
              // Random normal: move with velocity, reset if out of bounds
              sphere.position.add(sphere.userData.velocity);
              if (
                Math.abs(sphere.position.x) > BOUNDS_X ||
                Math.abs(sphere.position.y) > BOUNDS_Y ||
                Math.abs(sphere.position.z) > BOUNDS_Z
              ) {
                sphere.position.set(0, 0, 0);
                sphere.userData.velocity.set(
                  (Math.random() - 0.5) * 0.002,
                  (Math.random() - 0.5) * 0.002,
                  (Math.random() - 0.5) * 0.002
                );
                sphere.material.color = randomColor();
                sphere.material.opacity = 0;
              }
            } else {
              // Wave/helix: update position by formula
              const [x, y, z] = distributions[this.currentDistribution](sphere.userData.index, t);
              sphere.position.set(x, y, z);
            }
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