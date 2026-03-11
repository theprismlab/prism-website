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
            yWrapMin: 0,
            yWrapMax: 0,
            yWrapSpan: 0,
            yFadeHeight: 0,
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
            this.camera = markRaw(new THREE.PerspectiveCamera(30, this.width / this.height, 1.01, 200));
            this.camera.position.set(0, 6, 45);
          //  this.camera.lookAt(0, 0, 0);
            this.camera.aspect = this.width / this.height;
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

         //   window.addEventListener('resize', this.onWindowResize);
        },
        renderScene() {
            const zExtent = d3.extent(this.heatmapData, d => d.z);
            const xExtent = d3.extent(this.heatmapData, d => d.x);
            const planeWidth = this.width / xExtent[1];
            const planeHeight = 4;

            const xScale = d3.scaleLinear().domain(xExtent).range([0, this.width]);
            const zScale = d3.scaleLinear().domain(zExtent).range([0, planeHeight * zExtent[1]]);
            const opacityScale = d3.scaleLinear().domain(zExtent).range([0.1, 1]);
            // Map viability to vertical space (0 => high, 1 => low).
            const yScale = d3
                .scaleLinear()
                .domain([0, 1])
                .range([planeHeight * 6, planeHeight]);

            const xOffset = (xScale.range()[1] - xScale.range()[0]) / 2;
            const zOffset = (zScale.range()[1] - zScale.range()[0]) / 2;

            this.yWrapMin = planeHeight;
            this.yWrapMax = planeHeight * 6;
            this.yWrapSpan = this.yWrapMax - this.yWrapMin;
            this.yFadeHeight = planeHeight * 1.5;

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
            const zExtent = d3.extent(this.heatmapData, d => {
                const x = xScale(d.x) - xOffset;
                const y = yScale(d.viability) + sphereRadius * 0.2;
                const z = zScale(d.z) - zOffset;
                return new THREE.Vector3(x, y, z).z;
            });
            const zOpacityScale = d3
                .scalePow()
                .exponent(1.8)
                .domain(zExtent[0] === zExtent[1] ? [0, 1] : zExtent)
                .range([0.9, 0.05]);
            const zSizeScale = d3
                .scaleLinear()
                .domain(zExtent[0] === zExtent[1] ? [0, 1] : zExtent)
                .range([1.25, 0.7]);
            if (!this.spheres) {
                this.spheres = [];
            }

            this.heatmapData.forEach(d => {
                const basePosition = markRaw(new THREE.Vector3(
                    xScale(d.x) - xOffset,
                    yScale(d.viability) + sphereRadius * 0.2,
                    zScale(d.z) - zOffset
                ));
                const material = markRaw(new THREE.MeshStandardMaterial({
                    color: d.rgba,
                    transparent: true,
                    opacity: zOpacityScale(basePosition.z),
                    roughness: 0.0,
                    metalness: 0.0
                }));
                const sphere = markRaw(new THREE.Mesh(geometry, material));
                const yMin = planeHeight;
                const yMax = planeHeight * 6;
                const yNormalized = (basePosition.y - yMin) / (yMax - yMin);
                const sizeScale = 0.55 + Math.max(0, Math.min(1, yNormalized)) * 0.45;
                const zSizeMultiplier = zSizeScale(basePosition.z);
                sphere.scale.setScalar(sizeScale * zSizeMultiplier);
                sphere.position.copy(basePosition);
                sphere.userData.basePosition = basePosition;
                sphere.userData.material = material;
                sphere.userData.minY = sphereRadius;
                sphere.userData.opacityScale = zOpacityScale;
                sphere.userData.floatPhase = Math.random() * Math.PI * 2;
                sphere.userData.floatSpeed = 0.2 + Math.random() * 0.2;
                sphere.userData.floatAmplitude = planeHeight * (0.03 + Math.random() * 0.02);
                sphere.userData.waveSpeed = 0.25 + Math.random() * 0.12;
                sphere.userData.riseSpeed = 0.7 + Math.random() * 0.4;
                sphere.userData.riseOffset = Math.random() * this.yWrapSpan;
                sphere.userData.driftAmplitude = planeHeight * (0.12 + Math.random() * 0.08);
                sphere.userData.driftSpeedX = 0.15 + Math.random() * 0.2;
                sphere.userData.driftSpeedZ = 0.12 + Math.random() * 0.18;
                sphere.userData.driftPhaseX = Math.random() * Math.PI * 2;
                sphere.userData.driftPhaseZ = Math.random() * Math.PI * 2;
                this.scene.add(sphere);
                this.spheres.push(sphere);
            });
        },
        startAnimation() {
            if (this.animationFrameId) {
                return;
            }
            const animate = () => {
                const delta = this.clock.getDelta();
                const elapsed = this.clock.elapsedTime;

                this.spheres.forEach(sphere => {
                    const {
                        basePosition,
                        floatPhase,
                        floatSpeed,
                        floatAmplitude,
                        waveSpeed,
                        material,
                        opacityScale,
                        riseSpeed,
                        riseOffset,
                        driftAmplitude,
                        driftSpeedX,
                        driftSpeedZ,
                        driftPhaseX,
                        driftPhaseZ
                    } = sphere.userData;
                    // Layer a slow wave across X/Z to keep motion cohesive.
                    const waveFrequency = 0.06;
                    const waveAmplitude = 1.1;
                    const horizontalWaveAmplitude = 0.5;
                    const wavePhase = basePosition.x * waveFrequency - elapsed * waveSpeed;
                    const waveY =
                        Math.sin(wavePhase * 2) +
                        Math.sin(wavePhase * 2 + 0.8) * 0.35;
                    const waveX = Math.sin(wavePhase);
                    const waveZ = 0;
                    const driftX = Math.sin(elapsed * driftSpeedX + driftPhaseX) * driftAmplitude;
                    const driftZ = Math.cos(elapsed * driftSpeedZ + driftPhaseZ) * driftAmplitude;
                    const floatingY =
                        basePosition.y +
                        Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude +
                        waveY * waveAmplitude;
                    sphere.userData.riseOffset += riseSpeed * delta;
                    let nextY = floatingY + sphere.userData.riseOffset;
                    if (nextY > this.yWrapMax) {
                        sphere.userData.riseOffset -= this.yWrapSpan;
                        nextY -= this.yWrapSpan;
                    }
                    sphere.position.y = nextY;
                    sphere.position.x = basePosition.x + waveX * horizontalWaveAmplitude + driftX;
                    sphere.position.z = basePosition.z + waveZ * horizontalWaveAmplitude + driftZ;
                    if (material && opacityScale) {
                        const fadeFactor = Math.min(
                            1,
                            Math.max(0, (sphere.position.y - this.yWrapMin) / this.yFadeHeight)
                        );
                        material.opacity = opacityScale(sphere.position.z) * fadeFactor;
                    }
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
