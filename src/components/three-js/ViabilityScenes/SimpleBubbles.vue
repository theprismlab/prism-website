<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const config = {
    fov: 40,
    cameraPosition: [0, 0],
    cameraDistance: 80,
    cameraLookAt: [0, 0, 0],
    nearClip: 0.1,
    farClip: 1000,
    directionalLightIntensity: 1.5,
    ambientLightIntensity: 1.5,
    enableShadows: false,
};

const BUBBLE_COUNT = 120;

const PALETTE = [
    '#e05c5c', '#e07d30', '#d4b84a', '#5ab55a',
    '#4a9de0', '#7c5ce0', '#d45cb5', '#4acec8',
];

const canvasEl = ref(null);
const scene = useViabilityScene(canvasEl, config);

let meshes = [];

onMounted(async () => {
    buildBubbles();

    await new Promise(r => requestAnimationFrame(r));
    scene.render();
    scene.startAnimation();

    scene.onRebuild(() => {
        meshes = [];
        buildBubbles();
    });
});

function computeWorldBounds() {
    const vFov = THREE.MathUtils.degToRad(config.fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * config.cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);
    return { halfW: visibleWidth / 2, halfH: visibleHeight / 2, halfD: visibleHeight / 2 };
}

function buildBubbles() {
    const { halfW, halfH, halfD } = computeWorldBounds();
    const margin = 2;

    for (let i = 0; i < BUBBLE_COUNT; i++) {
        const radius = 0.4 + Math.random() * 2.6;
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];

        const geometry = new THREE.SphereGeometry(radius, 24, 24);
        const material = new THREE.MeshPhysicalMaterial({
            color,
            roughness: 0.05,
            metalness: 0.0,
            transparent: true,
            opacity: 1,
            transmission: 0.92,
            thickness: 0.35,
            ior: 1.2,
            iridescence: 0.4,
            iridescenceIOR: 1.2,
            iridescenceThicknessRange: [0, 800],
            clearcoat: 1,
            clearcoatRoughness: 0.03,
            envMapIntensity: 1.2,
            specularIntensity: 0.9,
            side: THREE.FrontSide,
            depthWrite: false,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            (Math.random() - 0.5) * 2 * (halfW - margin),
            (Math.random() - 0.5) * 2 * (halfH - margin),
            (Math.random() - 0.5) * 2 * (halfD - margin),
        );

        scene.scene.add(mesh);
        meshes.push({
            mesh,
            vy: 0.01 + Math.random() * 0.04,
            driftSpeed: 0.1 + Math.random() * 0.3,
            driftAmp: 0.5 + Math.random() * 2,
            driftPhase: Math.random() * Math.PI * 2,
            originX: mesh.position.x,
            radius,
        });
    }

    scene.onAnimate((elapsed) => {
        const { halfH } = computeWorldBounds();
        const top = halfH + 4;
        const bottom = -halfH - 4;

        for (const b of meshes) {
            b.mesh.position.y += b.vy;
            b.mesh.position.x = b.originX + Math.sin(elapsed * b.driftSpeed + b.driftPhase) * b.driftAmp;

            if (b.mesh.position.y - b.radius > top) {
                b.mesh.position.y = bottom - b.radius;
            }
        }
    });
}
</script>
