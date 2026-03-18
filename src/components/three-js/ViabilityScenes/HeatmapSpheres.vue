<script>
import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw } from 'vue';

export default {
    name: 'HeatmapSpheres',
    props: {
        scene: { type: Object, required: true },
        data: { type: Array, required: true },
        scales: { type: Object, required: true },
        xStep: { type: Number, default: 8 },
        zStep: { type: Number, default: 2 },
        onAnimate: { type: Function, required: true },
    },
    data() {
        return {
            spheres: [],
        };
    },
    watch: {
        scales: {
            handler() { this.rebuild(); },
            deep: false,
        }
    },
    mounted() {
        this.addSpheres();
        this.onAnimate(this.animate);
    },
    methods: {
        rebuild() {
            this.spheres.forEach(s => {
                this.scene.remove(s);
                s.geometry.dispose();
                s.material.dispose();
            });
            this.spheres = [];
            this.addSpheres();
        },
        addSpheres() {
            const { xScale, zScale, xOffset, zOffset, planeHeight, yScale, zExtent } = this.scales;
            const baseRadius = xScale.range()[1] * 0.018;

            const sampled = this.data.filter(d => d.x % this.xStep === 0 && d.z % this.zStep === 0);

            const sizeScale = d3.scaleLinear().domain([zExtent[0], zExtent[1]]).range([1.0, 0.3]);
            const opacityDepthScale = d3.scaleLinear().domain([zExtent[0], zExtent[1]]).range([0.7, 0.15]);

            const viabilityExtent = d3.extent(this.data, d => d.viability);
            const radiusScale = d3.scalePow().exponent(1).domain(viabilityExtent).range([1.5, 0.2]);

            sampled.forEach(d => {
                const t = sizeScale(d.z);
                const randomJitter = 0.8 + Math.random() * 0.4;
                const radius = baseRadius * t * radiusScale(d.viability) * randomJitter;
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
        animate(elapsed) {
            this.spheres.forEach(sphere => {
                const { basePosition, floatPhase, floatSpeed, floatAmplitude } = sphere.userData;
                sphere.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude;
            });
        }
    },
    render() { return null; }
};
</script>
