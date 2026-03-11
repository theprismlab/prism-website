<template>
  <div style="position:relative; width:100vw; height:100vh;">
    <canvas id="canvasElement" style="position: absolute; width:100%; height:100%;"></canvas>

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

      function randomColor() {
        return new THREE.Color(Math.random(), Math.random(), Math.random());
      }


      // Distribution functions
      const N = 600;
      const gridSize = 24;
      const distribution =  (i, t) => {
          const xi = i % gridSize;
          const zi = Math.floor(i / gridSize);
          const x = xi - gridSize / 2;
          const z = zi - gridSize / 2;
          const y = Math.sin(x * 0.5 + t * 0.001) + Math.cos(z * 0.5 + t * 0.001);
          return [x, y, z];
        };

      // Store spheres for animation
      const spheres = [];
      const t0 = Date.now();

      // Render spheres
      for (let i = 0; i < N; i++) {
        const [x, y, z] = distribution(i, 0);
        const radius = Math.random() * 0.2;
        const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
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
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        );
        smallSphere.userData.radius = radius;
        smallSphere.userData.index = i;

        scene.add(smallSphere);
        spheres.push(smallSphere);
      }

      // Animate
      const animate = () => {
        const t = Date.now() - t0;
        spheres.forEach((sphere, i) => {
          // Fade in
            if (sphere.material.opacity < 0.8) {
              sphere.material.opacity = Math.min(0.8, sphere.material.opacity + 0.01);
            }
            // Wave/helix: update position by formula
            const [x, y, z] = distribution(sphere.userData.index, t);
            sphere.position.set(x, y, z);
    
        });
        renderer.render(scene, camera);
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