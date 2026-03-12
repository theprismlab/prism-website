<template>
    <canvas id="canvasElement" style="position: absolute; width:100%; height:100%;"></canvas>
</template>

<script>
import * as THREE from 'three';
import * as d3 from 'd3';
const fileName = "BRD-K05804044-viability-heatmap.csv";

export default {
    name: 'ThreeJsDemo02',
    reactive() {
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
        };
    },
    computed: {
        path() {
            return import.meta.env.PROD ? import.meta.env.BASE_URL + "data/" : "../../public/data/";
        },
    },
    async mounted() {
        this.canvas = document.getElementById('canvasElement');
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        await this.loadData();
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
        //   window.addEventListener('resize', this.onWindowResize);
            this.renderScene();
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

         //   window.addEventListener('resize', this.onWindowResize);
        },
        onWindowResize() {
            this.width = this.canvas.clientWidth;
            this.height = this.canvas.clientHeight;

            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);

         //   this.renderScene();
        },
        renderScene() {
            const zExtent = d3.extent(this.heatmapData, d => d.z);
            const xExtent = d3.extent(this.heatmapData, d => d.x);
            const planeWidth = this.width / xExtent[1];
            const planeHeight = 4;

            const xScale = d3.scaleLinear().domain(xExtent).range([0, this.width]);
            const zScale = d3.scaleLinear().domain(zExtent).range([0, planeHeight * zExtent[1]]);

            const xOffset = (xScale.range()[1] - xScale.range()[0]) / 2;
            const zOffset = (zScale.range()[1] - zScale.range()[0]) / 2;

            this.heatmapData.forEach(d => {
                const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
                const material = new THREE.MeshBasicMaterial({ color: d.rgba, side: THREE.DoubleSide, opacity: 1 });
                const plane = new THREE.Mesh(geometry, material);
                plane.rotation.x = -Math.PI / 2;
                plane.position.set(xScale(d.x) - xOffset, d.y, zScale(d.z) - zOffset);
                this.scene.add(plane);
            });

            this.renderer.render(this.scene, this.camera);
        }
    },
    // beforeDestroy() {
    //     window.removeEventListener('resize', this.onWindowResize);
    // }
};
</script>

<style>
/* Add any necessary styles here */
</style>
