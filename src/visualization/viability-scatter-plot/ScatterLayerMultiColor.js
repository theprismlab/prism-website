import * as THREE from 'three';
import * as d3 from 'd3';

// ── Config ────────────────────────────────────────────────────────────────────

const SPHERE_CONFIG = {
    sphereXStep: 4, // sample every Nth cell line index to reduce sphere count
    sphereZStep: 2, // sample every Nth dose index
    sphereOpacityRange: [0.25, 0.95],
    sphereRadiusScaleRange: [0.1, 0.9],
    sphereRadiusScaleDomain: [0, 1], // matches Math.random() input
    sphereFloatSpeedMin: 0.4,
    sphereFloatSpeedRange: 0.9,
    sphereFloatAmplitudeBase: 0.18,
    sphereFloatAmplitudeRange: 0.18,

    // Y-axis spread expressed as fractions of visible screen height
    ySpreadFraction: 1.75,        // total y range = 1.5× visible screen height
    ySpreadCenterFraction: .5, // center of the range sits 15% above screen center
    // yScale maps viability [0→1] to world y: high viability → high y position
};

// ── Scales ────────────────────────────────────────────────────────────────────

function computeScales(data, scene) {
    const { fov, cameraDistance } = scene.config;
    const { ySpreadFraction, ySpreadCenterFraction } = SPHERE_CONFIG;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);
    const viabilityExtent = d3.extent(data, d => d.value);

    // colorThreshold splits cell lines into two color schemes:
    // low-index (sensitive) lines → YlGnBu by dose; high-index → YlOrRd by position
    const colorThreshold = xExtent[0] + (xExtent[1] - xExtent[0]) / 3;

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (scene.width.value / scene.height.value);
    const cellHeight = visibleHeight / Math.max(zExtent[1], 1);

    const halfSpread = visibleHeight * ySpreadFraction / 2;
    const centerOffset = visibleHeight * ySpreadCenterFraction;

    const xScale = d3.scaleLinear().domain(xExtent).range([0, visibleWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    const yScale = d3.scaleLinear().domain(viabilityExtent).range([centerOffset + halfSpread, centerOffset - halfSpread]);
    const radiusScale = d3.scaleLinear().domain(SPHERE_CONFIG.sphereRadiusScaleDomain).range(SPHERE_CONFIG.sphereRadiusScaleRange);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(SPHERE_CONFIG.sphereOpacityRange);
    const xNorm = d3.scaleLinear().domain([colorThreshold, xExtent[1]]).range([0.4, 0.85]);
    const zNorm = d3.scaleLinear().domain(zExtent).range([0.3, 0.85]);

    const colorScale = (x, z) => {
        if (x < colorThreshold) return new THREE.Color(d3.interpolateGnBu(zNorm(z)));
        return new THREE.Color(d3.interpolateYlOrRd(xNorm(x)));
    };

    return {
        xScale, zScale, yScale, radiusScale, opacityScale, colorScale,
        xOffset: visibleWidth / 2,
        zOffset: visibleHeight / 2,
        cellHeight,
    };
}

// ── Animation ─────────────────────────────────────────────────────────────────

function applyFloatPosition(spheres, elapsed) {
    spheres.forEach(s => {
        const { basePosition, floatPhase, floatSpeed, floatAmplitude } = s.userData;
        s.position.x = basePosition.x + Math.sin(elapsed * floatSpeed * 0.7 + floatPhase + 1.3) * floatAmplitude * 0.5 + s.userData.offsetX;
        s.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude + s.userData.offsetY;
        s.position.z = basePosition.z + Math.cos(elapsed * floatSpeed * 0.5 + floatPhase) * floatAmplitude * 0.3 + s.userData.offsetZ;
    });
}

/**
 * Soft sphere-sphere collision detection & response.
 * Overlapping pairs accumulate a small push on each sphere's offset,
 * then all offsets are damped toward zero so spheres drift back
 * to their data-driven base positions.
 */
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

    // Decay offsets so spheres gradually return to their data-driven base positions
    spheres.forEach(s => {
        s.userData.offsetX *= damping;
        s.userData.offsetY *= damping;
        s.userData.offsetZ *= damping;
    });
}

// ── Layer Builder ─────────────────────────────────────────────────────────────

export function buildScatterLayer(scene, data) {
    const {
        sphereXStep, sphereZStep,
        sphereFloatSpeedMin, sphereFloatSpeedRange,
        sphereFloatAmplitudeBase, sphereFloatAmplitudeRange,
    } = SPHERE_CONFIG;

    const { xScale, zScale, yScale, radiusScale, opacityScale, colorScale, xOffset, zOffset, cellHeight } = computeScales(data, scene);

    const sampled = data.filter(d => d.x % sphereXStep === 0 && d.z % sphereZStep === 0);
    const spheres = [];

    sampled.forEach(d => {
        const radiusJitter = 0.85 + Math.random();
        const radius = radiusScale(Math.random()) * radiusJitter;
        const sphereColor = colorScale(d.x, d.z);

        const geometry = new THREE.SphereGeometry(radius, 24, 24);
        const material = new THREE.MeshStandardMaterial({
            color: sphereColor,
            emissive: sphereColor,
            emissiveIntensity: 0.008,  // subtle self-glow; raise toward 1 to brighten
            transparent: true,
            opacity: opacityScale(d.z),
            roughness: 0.35,           // higher = softer highlights, less reflective
            metalness: 0.0,
            envMapIntensity: 0.4,     // reduce IBL contribution
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;

        const basePosition = new THREE.Vector3(
            xScale(d.x) - xOffset,
            yScale(d.value) + radius * 0.2,
            zScale(d.z) - zOffset,
        );
        sphere.position.copy(basePosition);
        sphere.userData.basePosition = basePosition;
        sphere.userData.floatPhase = Math.random() * Math.PI * 2;
        sphere.userData.floatSpeed = sphereFloatSpeedMin + Math.random() * sphereFloatSpeedRange;
        sphere.userData.floatAmplitude = cellHeight * (sphereFloatAmplitudeBase + Math.random() * sphereFloatAmplitudeRange);
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
