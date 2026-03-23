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
            cameraZoom: 35,
            fov: 35
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

            cellLineGroups.sort((a, b) => d3.descending(a.mean, b.mean))

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
            
            return data.filter(d=> d.x > 300);
        },
        initThreeJs() {
            this.scene = markRaw(new THREE.Scene());
            this.camera = markRaw(new THREE.PerspectiveCamera(this.fov, this.width / this.height, 1.01, 200));
            this.camera.position.set(0, 6, this.cameraZoom);
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();

            this.light = markRaw(new THREE.DirectionalLight(0xffffff, 0.5));
            this.light.position.set(5, 10, 5);
            this.light.castShadow = true;
            this.light.shadow.mapSize.width = 2048;
            this.light.shadow.mapSize.height = 2048;
            this.light.shadow.camera.left = -30;
            this.light.shadow.camera.right = 30;
            this.light.shadow.camera.top = 30;
            this.light.shadow.camera.bottom = -30;
            this.light.shadow.camera.near = 0.1;
            this.light.shadow.camera.far = 60;
            this.light.shadow.radius = 8;
            this.light.shadow.blurSamples = 25;
            this.light.shadow.opacity = 0.15;
            this.light.shadow.camera.far = 60;
            this.scene.add(this.light);

            this.ambientLight = markRaw(new THREE.AmbientLight('rgb(255, 255, 255)', 2.5));
            this.scene.add(this.ambientLight);

            this.renderer = markRaw(new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true }));
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(0xffffff, 0);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.VSMShadowMap;

            this.clock = markRaw(new THREE.Clock());
        },
        renderScene() {
            const zExtent = d3.extent(this.heatmapData, d => d.z);
            const xExtent = d3.extent(this.heatmapData, d => d.x);

            // Calculate visible frustum at z=0
            const cameraZ = this.cameraZoom;
            const vFov = THREE.MathUtils.degToRad(this.fov);
            const visibleHeight = 2 * Math.tan(vFov / 2) * cameraZ;
            const visibleWidth = visibleHeight * (this.width / this.height);

            const sceneWidth = visibleWidth;
            const planeWidth = sceneWidth / xExtent[1];
            const planeHeight = visibleHeight / Math.max(zExtent[1], 1);

            const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
            const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
            const opacityScale = d3.scaleLinear().domain(zExtent).range([0.5, 1]);
            const ySpread = 16;
            const yScale = d3
                .scaleLinear()
                .domain(d3.extent(this.heatmapData, d => d.viability))
                .range([ySpread, -ySpread+8]);

            const xOffset = sceneWidth / 2;
            const zOffset = visibleHeight / 2;

            this.heatmapData.forEach(d => {
                const geometry = new THREE.PlaneGeometry(planeWidth*1.6, planeHeight);
                const material = new THREE.MeshLambertMaterial({ color: d.rgba, side: THREE.DoubleSide, opacity: opacityScale(d.z), transparent: true, depthWrite: false });
                const plane = new THREE.Mesh(geometry, material);
                plane.receiveShadow = true;
                plane.rotation.x = -Math.PI / 2;
                plane.position.set(xScale(d.x) - xOffset, -1, zScale(d.z) - zOffset);
                this.scene.add(plane);
            });

            this.renderScatterPoints({
                xScale,
                zScale,
                xOffset,
                zOffset,
                planeHeight,
                yScale,
                zExtent,
                xExtent
            });

            this.renderer.render(this.scene, this.camera);
        },
        renderScatterPoints({ xScale, zScale, xOffset, zOffset, planeHeight, yScale, zExtent, xExtent }) {
           // const baseRadius = planeHeight * 0.18;
            const baseRadius = xScale.range()[1] * 0.018;
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

            // Viability-based radius scale: lower viability → larger sphere
            const viabilityExtent = d3.extent(this.heatmapData, d => d.viability);
            const radiusScale = d3.scaleLinear().domain(viabilityExtent).range([1.5, 0.4]);

            sampled.forEach(d => {
                const t = sizeScale(d.z);
                const radius = baseRadius * t * radiusScale(d.viability);
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
                    zScale(d.z) - zOffset
                ));
                sphere.castShadow = true;
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
