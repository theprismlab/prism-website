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
            const fov = 35;

            this.camera = markRaw(new THREE.PerspectiveCamera(fov, aspect, 0.1, 300));
            this.camera.position.set(0, 35, 30);
            this.camera.lookAt(0, 0, -10);
            this.camera.updateProjectionMatrix();

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
        // Raycast from NDC screen coordinate to the y=0 ground plane
        screenToGround(ndcX, ndcY) {
            const near = new THREE.Vector3(ndcX, ndcY, -1).unproject(this.camera);
            const far = new THREE.Vector3(ndcX, ndcY, 1).unproject(this.camera);
            const dir = far.clone().sub(near).normalize();
            const t = -near.y / dir.y;
            return near.clone().add(dir.clone().multiplyScalar(t));
        },
        renderScene() {
            const zExtent = d3.extent(this.heatmapData, d => d.z);
            const xExtent = d3.extent(this.heatmapData, d => d.x);

            // Project viewport edges onto y=0 ground plane
            // With camera looking down, bottom of screen = farthest ground point
            // Back row (far) at bottom of viewport (NDC y = -1)
            // Front row (near) at 1/3 up from bottom (NDC y = -0.333)
            const farLeft = this.screenToGround(-1, -1);
            const farRight = this.screenToGround(1, -1);
            const nearLeft = this.screenToGround(-1, -0.333);
            const nearRight = this.screenToGround(1, -0.333);

            // Far edge width fills the canvas exactly
            const sceneWidth = farRight.x - farLeft.x;
            const farZ = (farLeft.z + farRight.z) / 2;
            const nearZ = (nearLeft.z + nearRight.z) / 2;
            const sceneDepth = nearZ - farZ;

            const planeWidth = sceneWidth / xExtent[1];
            const planeHeight = sceneDepth / Math.max(zExtent[1], 1);

            const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
            const zScale = d3.scaleLinear().domain(zExtent).range([0, sceneDepth]);
            const opacityScale = d3.scaleLinear().domain(zExtent).range([0.1, 1]);
            const yScale = d3
                .scaleLinear()
                .domain(d3.extent(this.heatmapData, d => d.viability))
                .range([planeHeight * 4, -planeHeight * 4]);

            const xOffset = sceneWidth / 2;

            this.heatmapData.forEach(d => {
                const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
                const material = new THREE.MeshBasicMaterial({ color: d.rgba, side: THREE.DoubleSide, opacity: opacityScale(d.z), transparent: true });
                const plane = new THREE.Mesh(geometry, material);
                plane.rotation.x = -Math.PI / 2;
                plane.position.set(xScale(d.x) - xOffset, 0, farZ + zScale(d.z));
                this.scene.add(plane);
            });

            this.renderScatterPoints({
                xScale,
                zScale,
                xOffset,
                farZ,
                planeHeight,
                yScale,
                zExtent
            });

            this.renderer.render(this.scene, this.camera);
        },
        renderScatterPoints({ xScale, zScale, xOffset, farZ, planeHeight, yScale, zExtent }) {
            const baseRadius = planeHeight * 0.18;
            if (!this.spheres) {
                this.spheres = [];
            }

            // Sample every Nth cell line and every Mth dose to reduce sphere count
            const xStep = 3;
            const zStep = 2;

            const sampled = this.heatmapData.filter(d => d.x % xStep === 0 && d.z % zStep === 0);

            // Scales for depth-based attenuation: far rows get smaller and lighter
            const sizeScale = d3.scaleLinear().domain([zExtent[0], zExtent[1]]).range([1.0, 0.3]);
            const opacityDepthScale = d3.scaleLinear().domain([zExtent[0], zExtent[1]]).range([0.7, 0.15]);

            sampled.forEach(d => {
                const t = sizeScale(d.z);
                const radius = baseRadius * t;
                const geometry = markRaw(new THREE.SphereGeometry(radius, 24, 24));
                const material = markRaw(new THREE.MeshStandardMaterial({
                    color: d.rgba,
                    transparent: true,
                    opacity: opacityDepthScale(d.z),
                    roughness: 0.0,
                    metalness: 0.0
                }));
                const sphere = markRaw(new THREE.Mesh(geometry, material));
                const basePosition = markRaw(new THREE.Vector3(
                    xScale(d.x) - xOffset,
                    yScale(d.viability) + radius * 0.2,
                    farZ + zScale(d.z)
                ));
                sphere.position.copy(basePosition);
                sphere.userData.basePosition = basePosition;
                sphere.userData.floatPhase = Math.random() * Math.PI * 2;
                sphere.userData.floatSpeed = 0.4 + Math.random() * 0.4;
                sphere.userData.floatAmplitude = planeHeight * (0.08 + Math.random() * 0.06) * t;
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
