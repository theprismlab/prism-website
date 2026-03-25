<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw, ref, onMounted, watch } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const clusterConfig = {
    fov: 25,
    cameraDistance: 25,
    cameraPosition: [0, 0, 0],
    cameraLookAt: [0, 0, 0],
    nearClip: 0.1,
    farClip: 500,

    directionalLightIntensity: 0.06,
    ambientLightIntensity: 0.5,

    // ── Cluster ──
    sphereCount: 100,
    clusterRadius: 7.75,
    minRadius: 0.5,
    maxRadius: 2.5,
    floatSpeedMin: 0.3,
    floatSpeedRange: 0.6,
    floatAmplitude: 0.15,
};

const props = defineProps({
    sceneConfig: { type: Object, default: () => ({}) },
    darkMode: { type: Boolean, default: false },
    shape: { type: String, default: 'sphere', validator: v => ['sphere', 'rectangle'].includes(v) },
});

const canvasEl = ref(null);
const config = { ...clusterConfig, ...props.sceneConfig };
const scene = useViabilityScene(canvasEl, config);

// ── Generate 3D cluster data ──

function generateSphereData(count, clusterRadius) {
    const data = [];
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = clusterRadius * Math.pow(Math.random(), 0.4);

        data.push({
            x: r * Math.sin(phi) * Math.cos(theta),
            y: r * Math.sin(phi) * Math.sin(theta),
            z: r * Math.cos(phi),
            size: Math.random(),
        });
    }
    return data;
}

function generateRectangleData(camera, cameraDistance, minR, maxR, depthSpread = 3) {
    // Compute visible rectangle at the camera target distance
    const vFov = (camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * camera.aspect;

    // Auto-compute count for dense packing (~85% coverage)
    const avgR = (minR + maxR) / 2;
    const avgArea = Math.PI * avgR * avgR;
  //  const count = Math.ceil((visibleWidth * visibleHeight * 0.85) / avgArea);
    const count = 60;
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            x: (Math.random() - 0.5) * visibleWidth,
            y: (Math.random() - 0.5) * visibleHeight,
            z: (Math.random() - 0.5) * depthSpread,
            size: Math.random(),
        });
    }
    return data;
}

onMounted(async () => {
    buildCluster();

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    scene.onRebuild(() => buildCluster());
});

watch(() => props.shape, () => {
    buildCluster();
});

function buildCluster() {
    const { sphereCount, clusterRadius, minRadius, maxRadius,
            floatSpeedMin, floatSpeedRange, floatAmplitude } = config;

    // Clear existing meshes
    const toRemove = scene.scene.children.filter(c => c.isMesh);
    toRemove.forEach(m => {
        scene.scene.remove(m);
        m.geometry.dispose();
        m.material.dispose();
    });

    const data = props.shape === 'rectangle'
        ? generateRectangleData(scene.camera, config.cameraDistance, minRadius, maxRadius)
        : generateSphereData(sphereCount, clusterRadius);

    if (props.darkMode) {
        scene.scene.background = new THREE.Color(0x0a0a0f);
    } else {
        scene.scene.background = null;
    }

    // Color: position-based, split warm/cool
    const xExtent = d3.extent(data, d => d.x);
    const zExtent = d3.extent(data, d => d.z);
    const xThird = xExtent[0] + (xExtent[1] - xExtent[0]) / 3;
    const xNorm = d3.scaleLinear().domain([xThird, xExtent[1]]).range([0.2, 1.1]);


    const xTwoThird = xExtent[0] + (xExtent[1] - xExtent[0]) * 2 / 3;
    //const xNorm2 = d3.scaleLinear().domain([xTwoThird, xExtent[1]]).range([1, 0]);
    const zNorm = d3.scaleLinear().domain(zExtent).range([ 1, 0.3]);
    const zNorm2 = d3.scaleLinear().domain(zExtent).range([1, 0.4]);
    const radiusScale = d3.scaleLinear().domain([0, 1]).range([minRadius, maxRadius]);
    const opacityScale = d3.scaleLinear().domain([-clusterRadius, clusterRadius]).range([0.5, 0.85]);

    const spheres = [];

    data.forEach(d => {
        const jitter = 0.85 + Math.random() * 0.3;
        const radius = radiusScale(d.size) * jitter;
        const geometry = markRaw(new THREE.SphereGeometry(radius, 24, 24));

        let sphereColor;
        if (d.x < xThird) {
            sphereColor = new THREE.Color(d3.interpolateYlGnBu(zNorm(d.z)));
         } 
         //else if (d.x > xTwoThird) {
        //     sphereColor = new THREE.Color(d3.interpolatePuRd(zNorm2(d.z)));
        // }
        else {
            sphereColor = new THREE.Color(d3.interpolateYlOrRd(xNorm(d.x)));
        }

        const material = markRaw(new THREE.MeshPhysicalMaterial({
            color: sphereColor,
            transparent: true,
            // opacity: opacityScale(d.z),
            opacity: 0.75,
            roughness: 0.25,
            metalness: 0.0,
            transmission: 0,
            //thickness: radius, // For better subsurface scattering, which means more noticeable in larger spheres
            ior: 1.0,
        }));

        const sphere = markRaw(new THREE.Mesh(geometry, material));
        const basePosition = markRaw(new THREE.Vector3(d.x, d.y, d.z));

        sphere.position.copy(basePosition);
        sphere.castShadow = true;
        sphere.userData.basePosition = basePosition;
        sphere.userData.floatPhase = Math.random() * Math.PI * 2;
        sphere.userData.floatSpeed = floatSpeedMin + Math.random() * floatSpeedRange;
        sphere.userData.floatAmplitude = floatAmplitude + Math.random() * floatAmplitude;
        sphere.userData.radius = radius;
        sphere.userData.offsetX = 0;
        sphere.userData.offsetY = 0;
        sphere.userData.offsetZ = 0;

        scene.scene.add(sphere);
        spheres.push(sphere);
    });

    scene.onAnimate((elapsed) => {
        applyFloatPosition(spheres, elapsed);
        applySoftCollision(spheres);
    });
}

function applyFloatPosition(spheres, elapsed) {
    spheres.forEach(s => {
        const { basePosition, floatPhase, floatSpeed, floatAmplitude } = s.userData;
        s.position.x = basePosition.x + Math.sin(elapsed * floatSpeed * 0.7 + floatPhase + 1.3) * floatAmplitude * 0.5 + s.userData.offsetX;
        s.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude + s.userData.offsetY;
        s.position.z = basePosition.z + Math.cos(elapsed * floatSpeed * 0.5 + floatPhase) * floatAmplitude * 0.3 + s.userData.offsetZ;
    });
}

function applySoftCollision(spheres, pushStrength = 0.15, damping = 0.95) {
    for (let i = 0; i < spheres.length; i++) {
        const a = spheres[i];
        for (let j = i + 1; j < spheres.length; j++) {
            const b = spheres[j];
            const dx = b.position.x - a.position.x;
            const dy = b.position.y - a.position.y;
            const dz = b.position.z - a.position.z;
            const distSq = dx * dx + dy * dy + dz * dz;
            const minDist = a.userData.radius + b.userData.radius;

            if (distSq < minDist * minDist && distSq > 0.0001) {
                const dist = Math.sqrt(distSq);
                const overlap = minDist - dist;
                const nx = dx / dist;
                const ny = dy / dist;
                const nz = dz / dist;
                const push = overlap * pushStrength;

                a.userData.offsetX -= nx * push;
                a.userData.offsetY -= ny * push;
                a.userData.offsetZ -= nz * push;
                b.userData.offsetX += nx * push;
                b.userData.offsetY += ny * push;
                b.userData.offsetZ += nz * push;
            }
        }
    }

    spheres.forEach(s => {
        s.userData.offsetX *= damping;
        s.userData.offsetY *= damping;
        s.userData.offsetZ *= damping;
    });
}
</script>
