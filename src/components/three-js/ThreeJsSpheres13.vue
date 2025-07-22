<template>
  <div style="position:relative; width:100vw; height:100vh;">
    <canvas ref="canvas" style="position: absolute; width:100%; height:100%;"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';

const NUM_GROUPS = 7;
const NUM_ROWS = 50;
const GROUP_COLS = [5, 2, 4, 3, 6, 3, 7];
const COL_SPACING = 0.38;
const ROW_SPACING = 0.38;
const GROUP_GAP = 0.9;
const SPHERE_RADIUS = 0.2;
const SPHERE_SEGMENTS = 16;
const WAVE_OPACITY = 0.8;
const AUTOLOOP_DELAY = 2200;

export default {
  name: 'ThreeJsSpheresMorph',
  data() {
    return {
      scene: null,
      renderer: null,
      spheres: [],
      morphing: false,
      morphProgress: 1,
      currentSeq: 0, // 0 = wave, 1 = barcode
      targetSeq: 1,
      barcodePositions: [],
      animateId: null,
      autoLoopTimer: null,
      viewWidth: 30,
      viewHeight: 16,
    };
  },
  mounted() {
    this.init();
    window.addEventListener('resize', this.handleResize);
    this.startAutoLoop();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animateId);
    clearTimeout(this.autoLoopTimer);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      const w = window.innerWidth, h = window.innerHeight, aspect = w / h;
      this.renderer.setSize(w, h);
      this.perspCam.aspect = aspect;
      this.perspCam.updateProjectionMatrix();
      this.viewHeight = this.viewWidth / aspect;
this.orthoCam.left = -this.viewWidth/2;
this.orthoCam.right = this.viewWidth/2;
this.orthoCam.top = this.viewHeight/2;
this.orthoCam.bottom = -this.viewHeight/2;
      this.orthoCam.updateProjectionMatrix();
    },
    startAutoLoop() {
      const loop = () => {
        if (this.morphing) return this.autoLoopTimer = setTimeout(loop, 200);
        this.startMorph(this.currentSeq ? 0 : 1);
        const wait = () => {
          if (this.morphing) return this.autoLoopTimer = setTimeout(wait, 100);
          this.autoLoopTimer = setTimeout(loop, AUTOLOOP_DELAY);
        };
        wait();
      };
      this.autoLoopTimer = setTimeout(loop, AUTOLOOP_DELAY);
    },
    startMorph(idx) {
      if (this.currentSeq === idx) return;
      if (idx === 1) this.prepareBarcode();
      this.targetSeq = idx;
      this.morphProgress = 0;
      this.morphing = true;
    },
    prepareBarcode() {
      // Sort spheres by hue, split into groups, assign barcode positions
      const N = this.spheres.length;
      const groupSizes = GROUP_COLS.map(c => c * NUM_ROWS);
      const sorted = this.spheres.map((s, i) => {
        const hsv = {}; s.userData.color.getHSL(hsv);
        return { i, color: s.userData.color, h: hsv.h };
      }).sort((a, b) => a.h - b.h);
      let idx = 0, colOffset = 0, positions = Array(N);
      const totalCols = GROUP_COLS.reduce((a, b) => a + b, 0) + NUM_GROUPS - 1;
      const baseX = -((totalCols-1)*COL_SPACING + (NUM_GROUPS-1)*GROUP_GAP)/2;
      for (let g = 0; g < NUM_GROUPS; g++) {
        for (let n = 0; n < groupSizes[g]; n++) {
          const col = Math.floor(n / NUM_ROWS), row = n % NUM_ROWS;
          const x = baseX + (colOffset+col)*COL_SPACING + g*GROUP_GAP;
          const y = ((NUM_ROWS-1)/2 - row)*ROW_SPACING;
          positions[sorted[idx].i] = [x, y, 0];
          idx++;
        }
        colOffset += GROUP_COLS[g];
      }
      this.barcodePositions = positions;
    },
    init() {
      // Setup scene, renderer, cameras
      const w = window.innerWidth, h = window.innerHeight, aspect = w/h;
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas, antialias: true });
      this.renderer.setSize(w, h);
      this.renderer.setClearColor(0xffffff, 0);

      // Cameras
      this.perspCam = new THREE.PerspectiveCamera(70, aspect, 0.01, 40);
      this.perspCam.position.set(0, 1, 10); this.perspCam.lookAt(0,0,0);
      this.viewHeight = this.viewWidth / aspect;
      this.orthoCam = new THREE.OrthographicCamera(
        -this.viewWidth/2, this.viewWidth/2, this.viewHeight/2, -this.viewHeight/2, 0.01, 40
      );
      this.orthoCam.position.set(0, 0, 10); this.orthoCam.lookAt(0,0,0);

      // Spheres
      const N = GROUP_COLS.reduce((a,b)=>a+b,0)*NUM_ROWS;
      this.spheres = [];
      for (let i=0; i<N; i++) {
        const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.55);
        const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 });
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(SPHERE_RADIUS, SPHERE_SEGMENTS, SPHERE_SEGMENTS), mat
        );
        mesh.userData = { color };
        this.scene.add(mesh);
        this.spheres.push(mesh);
      }
      if (this.currentSeq === 1) this.prepareBarcode();
      this.animate();
    },
    animate() {
      const N = this.spheres.length, t0 = Date.now();
      const waveGrid = Math.ceil(Math.sqrt(N));
      const getWave = (i, t) => {
        const xi = i % waveGrid, zi = Math.floor(i / waveGrid);
        const x = xi - waveGrid/2, z = zi - waveGrid/2;
        const y = Math.sin(x*0.3 + t*0.00008) + Math.cos(z*0.3 + t*0.0008);
        return [x, y, z];
      };
      const getBarcode = i => this.barcodePositions[i] || [0, i*0.2-20, 0];

      const render = () => {
        const t = Date.now() - t0;
        // Morph progress
        if (this.morphing) {
          this.morphProgress += 0.02;
          if (this.morphProgress >= 1) {
            this.morphProgress = 1;
            this.morphing = false;
            this.currentSeq = this.targetSeq;
            if (this.currentSeq === 1) this.prepareBarcode();
          }
        }
        // Interpolate positions
        for (let i=0; i<N; i++) {
          const a = this.currentSeq, b = this.morphing ? this.targetSeq : this.currentSeq;
          const m = this.morphing ? this.morphProgress : 1;
          const posA = a ? getBarcode(i) : getWave(i, t);
          const posB = b ? getBarcode(i) : getWave(i, t);
          const x = posA[0]*(1-m) + posB[0]*m;
          const y = posA[1]*(1-m) + posB[1]*m;
          const z = posA[2]*(1-m) + posB[2]*m;
          const s = this.spheres[i];
          s.position.set(x, y, z);
          if (s.material.opacity < WAVE_OPACITY) s.material.opacity += 0.01;
          // Optional: scale effect
          const dist = Math.sqrt(x*x + y*y + z*z);
          const scale = 0.2 + 0.15 * (1 + Math.sin(dist));
          s.scale.set(scale, scale, scale);
        }
        // Camera selection
        const morph = this.morphing ? this.morphProgress : 1;
        const cam = ((this.currentSeq===0 && morph<0.5)||(this.targetSeq===0 && morph<0.5))
          ? this.perspCam : this.orthoCam;
        this.renderer.render(this.scene, cam);
        this.animateId = requestAnimationFrame(render);
      };
      render();
    }
  }
};
</script>
<style>
/* No extra styles needed */
</style>