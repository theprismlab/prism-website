<script>
import * as THREE from 'three';
import { markRaw } from 'vue';

export default {
    name: 'HeatmapPlanes',
    props: {
        scene: { type: Object, required: true },
        data: { type: Array, required: true },
        scales: { type: Object, required: true },
        zoom: { type: Number, default: 0.75 },
    },
    data() {
        return { meshes: [] };
    },
    watch: {
        scales: {
            handler() { this.rebuild(); },
            deep: false,
        }
    },
    mounted() {
        this.addPlanes();
    },
    methods: {
        rebuild() {
            this.meshes.forEach(m => {
                this.scene.remove(m);
                m.geometry.dispose();
                m.material.dispose();
            });
            this.meshes = [];
            this.addPlanes();
        },
        addPlanes() {
            const { xScale, zScale, opacityScale, xOffset, zOffset, planeWidth, planeHeight, visibleHeight } = this.scales;

            // Shift planes so front row sits at the bottom of the visible area
            const zBottom = visibleHeight / 2;

            this.data.forEach(d => {
                const geometry = new THREE.PlaneGeometry(planeWidth * 1.6 * this.zoom, planeHeight * this.zoom);
                const material = new THREE.MeshLambertMaterial({
                    color: d.rgba,
                    side: THREE.DoubleSide,
                    opacity: opacityScale(d.z),
                    transparent: true,
                    depthWrite: false
                });
                const plane = new THREE.Mesh(geometry, material);
                plane.receiveShadow = true;
                plane.rotation.x = -Math.PI / 2;
                plane.position.set(
                    (xScale(d.x) - xOffset) * this.zoom,
                    -1,
                    zBottom - zScale(d.z) * this.zoom
                );
                this.scene.add(plane);
                this.meshes.push(plane);
            });
        }
    },
    render() { return null; }
};
</script>
