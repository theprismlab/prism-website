<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw } from 'vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    scene: { type: Object, required: true },
    data: { type: Array, required: true },
    scales: { type: Object, required: true },
    config: { type: Object, required: true },
    onAnimate: { type: Function, required: true },
});

const spheres = ref([]);
let unsubscribe = null;

onMounted(() => {
    addSpheres();
    unsubscribe = props.onAnimate(animate);
});

onBeforeUnmount(() => {
    if (unsubscribe) unsubscribe();
    spheres.value.forEach(s => {
        props.scene.remove(s);
        s.geometry.dispose();
        s.material.dispose();
    });
});

function addSpheres() {
    const { xScale, zScale, xOffset, zOffset, planeHeight, yScale, zExtent } = props.scales;
    const {
        sphereXStep, sphereZStep, sphereBaseRadiusMultiplier,
        sphereSizeScaleRange, sphereOpacityRange, sphereRadiusScaleRange,
        sphereFloatSpeedMin, sphereFloatSpeedRange,
        sphereFloatAmplitudeBase, sphereFloatAmplitudeRange,
    } = props.config;

    const baseRadius = xScale.range()[1] * sphereBaseRadiusMultiplier;
    const sampled = props.data.filter(d => d.x % sphereXStep === 0 && d.z % sphereZStep === 0);

    const sizeScale = d3.scaleLinear().domain([zExtent[0], zExtent[1]]).range(sphereSizeScaleRange);
    const opacityDepthScale = d3.scaleLinear().domain([zExtent[0], zExtent[1]]).range(sphereOpacityRange);

    const viabilityExtent = d3.extent(props.data, d => d.viability);
    const radiusScale = d3.scalePow().exponent(1).domain(viabilityExtent).range(sphereRadiusScaleRange);

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
            metalness: 0.0,
        }));
        const sphere = markRaw(new THREE.Mesh(geometry, material));
        const basePosition = markRaw(new THREE.Vector3(
            xScale(d.x) - xOffset,
            yScale(d.viability) + radius * 0.2,
            zScale(d.z) - zOffset,
        ));
        sphere.castShadow = true;
        sphere.position.copy(basePosition);
        sphere.userData.basePosition = basePosition;
        sphere.userData.floatPhase = Math.random() * Math.PI * 2;
        sphere.userData.floatSpeed = sphereFloatSpeedMin + Math.random() * sphereFloatSpeedRange;
        sphere.userData.floatAmplitude = planeHeight * (sphereFloatAmplitudeBase + Math.random() * sphereFloatAmplitudeRange) * t;
        props.scene.add(sphere);
        spheres.value.push(sphere);
    });
}

function animate(elapsed) {
    spheres.value.forEach(sphere => {
        const { basePosition, floatPhase, floatSpeed, floatAmplitude } = sphere.userData;
        sphere.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude;
    });
}
</script>
