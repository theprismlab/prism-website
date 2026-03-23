<script setup>
import * as THREE from 'three';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    scene: { type: Object, required: true },
    data: { type: Array, required: true },
    scales: { type: Object, required: true },
    config: { type: Object, required: true },
});

const planes = ref([]);

onMounted(() => {
    const { xScale, zScale, opacityScale, xOffset, zOffset, planeWidth, planeHeight } = props.scales;
    const { planeZoom, planeWidthMultiplier, planeYPosition } = props.config;

    props.data.forEach(d => {
        const geometry = new THREE.PlaneGeometry(
            planeWidth * planeWidthMultiplier * planeZoom,
            planeHeight * planeZoom,
        );
        const material = new THREE.MeshLambertMaterial({
            color: d.rgba,
            side: THREE.DoubleSide,
            opacity: opacityScale(d.z),
            transparent: true,
            depthWrite: false,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(
            (xScale(d.x) - xOffset) * planeZoom,
            planeYPosition,
            (zScale(d.z) - zOffset) * planeZoom,
        );
        props.scene.add(plane);
        planes.value.push(plane);
    });
});

onBeforeUnmount(() => {
    planes.value.forEach(p => {
        props.scene.remove(p);
        p.geometry.dispose();
        p.material.dispose();
    });
});
</script>
