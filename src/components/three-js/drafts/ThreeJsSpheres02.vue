<template>
  <canvas id="canvasElement" style="position: absolute; width:100%; height:100%;"></canvas>
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
  methods: {
    init() {
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

      // Helper: color interpolation
      function interpolateColor(x) {
        const t = (x + 1) * 0.2 + 0.3;
        const color = d3.interpolatePlasma(t);
        return new THREE.Color(color);
      }

    function randomColor() {
        return new THREE.Color(Math.random(), Math.random(), Math.random());
    }

      // Store spheres for animation
      const spheres = [];

// Define bounding box for the spheres
const BOUNDS = 6; // half-width/height/depth of the box

// Render spheres
for (let i = 0; i < 600; i++) {
  const x = generateNormalDistribution(0, 3);
  const y = generateNormalDistribution(0, 3);
  const z = generateNormalDistribution(0, 3);
  const radius = Math.random() * 0.2;
  const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
  const color = randomColor();

  const smallSphere = new THREE.Mesh(
    sphereGeometry,
    new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8
    })
  );
  smallSphere.position.set(x, y + 1, z);

  // Give each sphere a random velocity
  smallSphere.userData.velocity = new THREE.Vector3(
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.02
  );

  // Store radius for boundary checks
  smallSphere.userData.radius = radius;

  scene.add(smallSphere);
  spheres.push(smallSphere);
}

// Animation loop with boundary bounce
function animate() {
  spheres.forEach(sphere => {
    sphere.position.add(sphere.userData.velocity);

    // Bounce off the bounding box
    ['x', 'y', 'z'].forEach(axis => {
      if (sphere.position[axis] > BOUNDS - sphere.userData.radius) {
        sphere.position[axis] = BOUNDS - sphere.userData.radius;
        sphere.userData.velocity[axis] *= -1;
      }
      if (sphere.position[axis] < -BOUNDS + sphere.userData.radius) {
        sphere.position[axis] = -BOUNDS + sphere.userData.radius;
        sphere.userData.velocity[axis] *= -1;
      }
    });
  });
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

    //   // Render spheres
    //   for (let i = 0; i < 600; i++) {
    //     const x = generateNormalDistribution(0, 3);
    //     const y = generateNormalDistribution(0, 3);
    //     const z = generateNormalDistribution(0, 3);
    //     const radius = Math.random() * 0.2;
    //     const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
    //      const color = randomColor();

    //     const smallSphere = new THREE.Mesh(
    //       sphereGeometry,
    //       new THREE.MeshBasicMaterial({
    //         color: color,
    //         transparent: true,
    //         opacity: 0.8
    //       })
    //     );
    //     smallSphere.position.set(x, y + 1, z);

    //     // Give each sphere a random velocity
    //     smallSphere.userData.velocity = new THREE.Vector3(
    //       (Math.random() - 0.5) * 0.01,
    //       (Math.random() - 0.5) * 0.01,
    //       (Math.random() - 0.5) * 0.01
    //     );

    //     scene.add(smallSphere);
    //     spheres.push(smallSphere);
    //   }

    //   // Animation loop
    //   function animate() {
    //     spheres.forEach(sphere => {
    //       sphere.position.add(sphere.userData.velocity);
    //     });
    //     renderer.render(scene, camera);
    //     requestAnimationFrame(animate);
    //   }
    //   animate();

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