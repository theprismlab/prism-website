<template>
    <canvas ref="canvasEl" style="position: absolute; width: 100%; height: 100%;"></canvas>
</template>

<script setup>
import * as THREE from 'three';
import { ref, onMounted } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';

const config = {
    fov: 30,
    cameraPosition: [0, 0],
    cameraDistance:30,
    cameraLookAt: [0, 0, 0],
    nearClip: 0.1,
    farClip: 100,
    directionalLightIntensity: 0,
    ambientLightIntensity: 30,
    enableShadows: false,
    // 'drift' | 'bounce'
    animationMode: 'bounce',
    baseSpeed: 0.3,
};

const BUBBLE_COUNT = 50;
const MAX_DEPTH = 10;

const PALETTE = [
    '#af0225', '#d31121', '#f36c3e', '#ffc700','#80b642', '#b1c640', '#459497', '#70c4c8', '#00a9d1', '#006db0', '#694888', '#b0388f', '#ea9036', '#daa864',
    // '#2979ff', '#82b1ff', '#bbdefb'
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
    return { halfW: visibleWidth / 2, halfH: visibleHeight / 2, halfD: MAX_DEPTH / 2 };
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
            opacity: 0.6,
            transmission: 0.92,
            thickness: 0.035,
            ior: 1.0,
            iridescence: 0.0,
            iridescenceIOR: 0.2,
            iridescenceThicknessRange: [0, 100],
            clearcoat: 1,
            clearcoatRoughness: 0.03,
            envMapIntensity: 0.0,
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
            vx: (Math.random() - 0.5) * 0.02 * config.baseSpeed,
            vy: (0.003 + Math.random() * 0.015) * config.baseSpeed,
            vz: (Math.random() - 0.5) * 0.02 * config.baseSpeed,
            driftSpeed: (0.04 + Math.random() * 0.12) * config.baseSpeed,
            driftAmp: 0.3 + Math.random() * 1.2,
            driftPhase: Math.random() * Math.PI * 2,
            originX: mesh.position.x,
            radius,
        });
    }

    scene.onAnimate((elapsed) => {
        if (config.animationMode === 'drift') {
            animateDrift(elapsed);
        } else {
            animateBounce();
        }
    });
}

function animateDrift(elapsed) {
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
}

function animateBounce() {
    const { halfW, halfH, halfD } = computeWorldBounds();

    // Move and bounce off walls
    for (const b of meshes) {
        b.mesh.position.x += b.vx;
        b.mesh.position.y += b.vy;
        b.mesh.position.z += b.vz;

        if (b.mesh.position.x + b.radius > halfW)  { b.mesh.position.x = halfW - b.radius;  b.vx *= -1; }
        if (b.mesh.position.x - b.radius < -halfW) { b.mesh.position.x = -halfW + b.radius; b.vx *= -1; }
        if (b.mesh.position.y + b.radius > halfH)  { b.mesh.position.y = halfH - b.radius;  b.vy *= -1; }
        if (b.mesh.position.y - b.radius < -halfH) { b.mesh.position.y = -halfH + b.radius; b.vy *= -1; }
        if (b.mesh.position.z + b.radius > halfD)  { b.mesh.position.z = halfD - b.radius;  b.vz *= -1; }
        if (b.mesh.position.z - b.radius < -halfD) { b.mesh.position.z = -halfD + b.radius; b.vz *= -1; }
    }

    // Sphere-sphere collision detection & response
    for (let i = 0; i < meshes.length; i++) {
        const a = meshes[i];
        for (let j = i + 1; j < meshes.length; j++) {
            const b = meshes[j];
            const dx = b.mesh.position.x - a.mesh.position.x;
            const dy = b.mesh.position.y - a.mesh.position.y;
            const dz = b.mesh.position.z - a.mesh.position.z;
            const distSq = dx * dx + dy * dy + dz * dz;
            const minDist = a.radius + b.radius;

            if (distSq < minDist * minDist && distSq > 0.0001) {
                const dist = Math.sqrt(distSq);
                const nx = dx / dist;
                const ny = dy / dist;
                const nz = dz / dist;

                // Separate overlapping bubbles
                const overlap = (minDist - dist) * 0.5;
                a.mesh.position.x -= nx * overlap;
                a.mesh.position.y -= ny * overlap;
                a.mesh.position.z -= nz * overlap;
                b.mesh.position.x += nx * overlap;
                b.mesh.position.y += ny * overlap;
                b.mesh.position.z += nz * overlap;

                // Elastic velocity swap along collision normal
                const dvx = a.vx - b.vx;
                const dvy = a.vy - b.vy;
                const dvz = a.vz - b.vz;
                const dot = dvx * nx + dvy * ny + dvz * nz;

                if (dot > 0) {
                    const massA = a.radius * a.radius * a.radius;
                    const massB = b.radius * b.radius * b.radius;
                    const totalMass = massA + massB;
                    const impulseA = (2 * massB / totalMass) * dot;
                    const impulseB = (2 * massA / totalMass) * dot;

                    a.vx -= impulseA * nx;
                    a.vy -= impulseA * ny;
                    a.vz -= impulseA * nz;
                    b.vx += impulseB * nx;
                    b.vy += impulseB * ny;
                    b.vz += impulseB * nz;
                }
            }
        }
    }
}
</script>
