<template>
    <canvas id="viability-heatmap-canvas" style="position: absolute; width:100%; height:100%;"></canvas>
</template>

<script>
import * as THREE from 'three';
import * as d3 from 'd3';
const fileName = "BRD-K05804044-viability-heatmap.csv";
export default {
  name: 'ThreeJsDemo02',
  props: {
    windowSize: Object
  },
  data() {
    return {
      heatmapData: [],
      width: undefined,
      height: undefined,
      canvas: null,
      scene: null,
      camera: null,
      renderer: null,
      light: null,
      ambientLight: null,
      planes: [],
      spheres: [],
      xScale: null,
      zScale: null,
      xOffset: 0,
      zOffset: 0,
      planeWidth: 1,
      planeHeight: 4,
      opacityScale: null,
    };
  },
  computed: {
    path() {
      return import.meta.env.PROD ? import.meta.env.BASE_URL + "data/" : "../../public/data/";
    },
  },
  async mounted() {
    this.canvas = document.getElementById('viability-heatmap-canvas');
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    await this.loadData();
    window.addEventListener('resize', this.onWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    async loadData() {
      const data = await d3.csv(`${this.path}${fileName}`, d => ({
        ccle_name: d["Cell line"],
        viability: +d["Viability"],
        pert_dose: +d["Dose"]
      }));
      this.heatmapData = this.parseHeatmapData(data);
      this.initThreeJs();
      this.createHeatmap();
      this.createSpheres();
      this.renderer.render(this.scene, this.camera);
    },
    parseHeatmapData(data) {
      let cellLineGroups = d3.groups(data, d => d.ccle_name).map(d => ({
        key: d[0],
        values: d[1],
        mean: d3.mean(d[1], e => e.viability)
      }));

      cellLineGroups.sort((a, b) => d3.descending(a.mean, b.mean));

      let cellLineToNumber = {};
      cellLineGroups.forEach((d, i) => {
        cellLineToNumber[d.key] = i;
      });

      let doses = [...new Set(data.map(d => d.pert_dose))].sort((a, b) => b - a);
      let doseToNumber = {};
      doses.forEach((d, i) => {
        doseToNumber[d] = i;
      });

      const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1, 0.2]);

      data.forEach(d => {
        d.x = cellLineToNumber[d.ccle_name];
        d.z = doseToNumber[d.pert_dose];
        d.y = 0;
        d.c = colorScale(d.viability);
        d.rgba = new THREE.Color(d.c);
      });

      return data;
    },
    initThreeJs() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1.01, 200);
      this.camera.position.set(0, 5, 25);
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();

      this.light = new THREE.DirectionalLight(0xffffff, 1);
      this.light.position.set(5, 5, 5);
      this.light.castShadow = true;
      this.scene.add(this.light);

      this.ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 2);
      this.scene.add(this.ambientLight);

      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
      this.renderer.setSize(this.width, this.height);
      this.renderer.setClearColor(0xffffff, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.shadowMap.enabled = true;

      // Prepare scales for both planes and spheres
      const zExtent = d3.extent(this.heatmapData, d => d.z);
      const xExtent = d3.extent(this.heatmapData, d => d.x);
      this.planeWidth = this.width / (xExtent[1] + 1);
      this.planeHeight = 4;
      this.xScale = d3.scaleLinear().domain(xExtent).range([0, this.width]);
      this.zScale = d3.scaleLinear().domain(zExtent).range([0, this.planeHeight * (zExtent[1] + 1)]);
      this.opacityScale = d3.scaleLinear().domain(zExtent).range([0.1, 1]);
      this.xOffset = (this.xScale.range()[1] - this.xScale.range()[0]) / 2;
      this.zOffset = (this.zScale.range()[1] - this.zScale.range()[0]) / 2;
    },
    createHeatmap() {
      // Remove old planes if any
      this.planes.forEach(plane => this.scene.remove(plane));
      this.planes = [];
      this.heatmapData.forEach(d => {
        const geometry = new THREE.PlaneGeometry(this.planeWidth, this.planeHeight);
        const material = new THREE.MeshBasicMaterial({
          color: d.rgba,
          side: THREE.DoubleSide,
          opacity: this.opacityScale(d.z),
          transparent: true
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(
          this.xScale(d.x) - this.xOffset,
          d.y,
          this.zScale(d.z) - this.zOffset
        );
        this.scene.add(plane);
        this.planes.push(plane);
      });
    },
    createSpheres() {
      // Remove old spheres if any
      this.spheres.forEach(sphereObj => this.scene.remove(sphereObj.mesh));
      this.spheres = [];
      this.heatmapData.forEach(d => {
        const geometry = new THREE.SphereGeometry(0.1, 32, 32);
        const material = new THREE.MeshStandardMaterial({
          color: d.rgba,
          transparent: true,
          opacity: 0.8
        });
        const sphere = new THREE.Mesh(geometry, material);
        // Place at final position and scale
        const targetY = 4 + Math.random() * 4;
        const targetScale = 0.8 + Math.random() * 0.7;
        sphere.position.set(
          this.xScale(d.x) - this.xOffset,
          targetY,
          this.zScale(d.z) - this.zOffset
        );
        sphere.scale.set(targetScale, targetScale, targetScale);
        this.scene.add(sphere);
        this.spheres.push({ mesh: sphere });
      });
    },
    onWindowResize() {
      this.width = this.canvas.clientWidth;
      this.height = this.canvas.clientHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      // Recompute scales and reposition objects
      this.initThreeJs();
      this.createHeatmap();
      this.createSpheres();
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
<style>
/* Add any necessary styles here */
</style>