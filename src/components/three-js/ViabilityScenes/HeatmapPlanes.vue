<script>
import * as THREE from 'three';
import { markRaw } from 'vue';

export default {
    name: 'HeatmapPlanes',
    props: {
        scene: { type: Object, required: true },
        data: { type: Array, required: true },
        scales: { type: Object, required: true },
        zoom: { type: Number, default: 1.75 },
    },
    data() {
        return { planes: [] };
    },
    mounted() {
        this.addPlanes(); // normal perspective planes

    },
    beforeUnmount() {
        this.planes.forEach(p => { this.scene.remove(p); p.geometry.dispose(); p.material.dispose(); });
    },
    methods: {
        addPlanes() {
            const { xScale, zScale, opacityScale, xOffset, zOffset, planeWidth, planeHeight } = this.scales;

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
                    (zScale(d.z) - zOffset) * this.zoom
                );
                this.scene.add(plane);
                this.planes.push(plane);
            });
        }
    },
    render() { return null; }
};
</script>
