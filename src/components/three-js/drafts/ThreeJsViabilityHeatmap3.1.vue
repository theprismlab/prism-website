<template>
    <canvas id="viability-heatmap-canvas" style="position: absolute; width:100%; height:100%;"></canvas>
</template>

<script>
import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw } from 'vue';
const fileName = "BRD-K05804044-viability-heatmap.csv";

export default {
    name: 'ThreeJsViabilityHeatmap2',
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
            spheres: [],
            clock: null,
            animationFrameId: null,
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
            this.renderScene();
            this.startAnimation();
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
            this.scene = markRaw(new THREE.Scene());

            const aspect = this.width / this.height;
            const fov = 30;
            const cameraZ = 30;

            this.camera = markRaw(new THREE.PerspectiveCamera(fov, aspect, 0.1, 200));
            this.camera.position.set(0, 6, cameraZ);
            this.camera.updateProjectionMatrix();

            // Calculate visible frustum at y=0 (scene ground plane)
            const dist = cameraZ - 0; // distance from camera to y=0 plane along z
            const vFov = THREE.MathUtils.degToRad(fov);
            this.visibleHeight = 2 * Math.tan(vFov / 2) * dist;
            this.visibleWidth = this.visibleHeight * aspect;

            this.light = markRaw(new THREE.DirectionalLight(0xffffff, 1));
            this.light.position.set(5, 5, 5);
            this.light.castShadow = true;
            this.scene.add(this.light);

            this.ambientLight = markRaw(new THREE.AmbientLight('rgb(255, 255, 255)', 2));
            this.scene.add(this.ambientLight);

            this.renderer = markRaw(new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true }));
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(0xffffff, 0);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.shadowMap.enabled = true;

            this.clock = markRaw(new THREE.Clock());
        },
        renderScene() {
            const zExtent = d3.extent(this.heatmapData, d => d.z);
            const xExtent = d3.extent(this.heatmapData, d => d.x);
            const planeWidth = this.width / xExtent[1];
            const planeHeight = 4;

            const xScale = d3.scaleLinear().domain(xExtent).range([0, this.width]);
            const zScale = d3.scaleLinear().domain(zExtent).range([0, planeHeight * zExtent[1]]);
            const opacityScale = d3.scaleLinear().domain(zExtent).range([0.1, 1]);
            const yScale = d3
                .scaleLinear()
                .domain(d3.extent(this.heatmapData, d => d.viability))
                .range([planeHeight * 4, -planeHeight*4]);

            const xOffset = (xScale.range()[1] - xScale.range()[0]) / 2;
            const zOffset = (zScale.range()[1] - zScale.range()[0]) / 2;

            this.heatmapData.forEach(d => {
                const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
                const material = new THREE.MeshBasicMaterial({ color: d.rgba, side: THREE.DoubleSide, opacity: opacityScale(d.z), transparent: true });
                const plane = new THREE.Mesh(geometry, material);
                plane.rotation.x = -Math.PI / 2;
                plane.position.set(xScale(d.x) - xOffset, d.y, zScale(d.z) - zOffset);
                this.scene.add(plane);
            });

            this.renderScatterPoints({
                xScale,
                zScale,
                xOffset,
                zOffset,
                planeHeight,
                yScale
            });

            this.renderer.render(this.scene, this.camera);
        },
        renderScatterPoints({ xScale, zScale, xOffset, zOffset, planeHeight, yScale }) {
            const sphereRadius = planeHeight * 0.18;
            const geometry = markRaw(new THREE.SphereGeometry(sphereRadius, 32, 32));
            if (!this.spheres) {
                this.spheres = [];
            }

            this.heatmapData.forEach(d => {
                const material = markRaw(new THREE.MeshStandardMaterial({
                    color: d.rgba,
                    transparent: true,
                    opacity: 0.6,
                    roughness: 0.0,
                    metalness: 0.0
                }));
                const sphere = markRaw(new THREE.Mesh(geometry, material));
                const basePosition = markRaw(new THREE.Vector3(
                    xScale(d.x) - xOffset,
                    yScale(d.viability) + sphereRadius * 0.2,
                    zScale(d.z) - zOffset
                ));
                sphere.position.copy(basePosition);
                sphere.userData.basePosition = basePosition;
                sphere.userData.floatPhase = Math.random() * Math.PI * 2;
                sphere.userData.floatSpeed = 0.4 + Math.random() * 0.4;
                sphere.userData.floatAmplitude = planeHeight * (0.08 + Math.random() * 0.06);
                this.scene.add(sphere);
                this.spheres.push(sphere);
            });
        },
        startAnimation() {
            if (this.animationFrameId) {
                return;
            }
            const animate = () => {
                const elapsed = this.clock.getElapsedTime();

                this.spheres.forEach(sphere => {
                    const { basePosition, floatPhase, floatSpeed, floatAmplitude } = sphere.userData;
                    sphere.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude;
                });

                this.renderer.render(this.scene, this.camera);
                this.animationFrameId = requestAnimationFrame(animate);
            };

            this.animationFrameId = requestAnimationFrame(animate);
        }
    },
    beforeUnmount() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
};
</script>
<style>
/* Add any necessary styles here */
</style>
