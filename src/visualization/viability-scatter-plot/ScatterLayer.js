import * as THREE from 'three';
import * as d3 from 'd3';

// ── Config ────────────────────────────────────────────────────────────────────

const SPHERE_CONFIG = {
    sphereXStep: 4, // sample every Nth cell line index to reduce sphere count
    sphereZStep: 2, // sample every Nth dose index
    sphereOpacityRange: [0.25, 0.95],
    sphereRadiusScaleRange: [0.1, 0.65],
    sphereRadiusScaleDomain: [0, 1], // matches Math.random() input
    sphereFloatSpeedMin: 0.4,
    sphereFloatSpeedRange: 0.9,
    sphereFloatAmplitudeBase: 0.18,
    sphereFloatAmplitudeRange: 0.18,

    // Only attach a barcode sticker to spheres whose radius exceeds this value.
    // sphereRadiusScaleRange is [0.1, 0.9] (before jitter), so 0.55 targets the larger ~40%.
    stickerMinRadius: 0.8,
    stickerMinDepth: -20, // only attach stickers to spheres representing doses above this threshold to avoid cluttering the low-dose region
    // Sticker side length as a fraction of sphere radius (square aspect ratio maintained).
    // 0.8 → sticker spans 80% of the radius on each side (≈ halfAngle 0.4 rad, ~23° arc).
    stickerSizeFraction: 0.8,

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

// ── Sticker ───────────────────────────────────────────────────────────────────

/**
 * Creates a spherical-cap barcode sticker and attaches it to the given sphere mesh.
 * @param {THREE.Mesh} sphere - Parent sphere to attach the sticker to.
 * @param {number} radius - Radius of the parent sphere.
 * @param {THREE.Texture} texture - Pre-loaded barcode texture.
 * @param {number} halfAngle - Arc half-angle of the cap (radians).
 * @param {number} opacity - Should match the parent sphere's opacity so they fade together.
 */
function createBarcodeSticker(sphere, radius, texture, halfAngle, opacity) {
    const stickerGeo = new THREE.SphereGeometry(
        radius * 1.005,
        16, 16,
        Math.PI / 2 - halfAngle,   // phiStart:   centre cap on +z face
        halfAngle * 2,             // phiLength
        Math.PI / 2 - halfAngle,   // thetaStart: centre on equator
        halfAngle * 2,             // thetaLength
    );
    // THREE.SphereGeometry already outputs normalized [0,1] UVs across the cap — no remap needed.

    const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity,
        // make layer style additive
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const sticker = new THREE.Mesh(stickerGeo, mat);
    sticker.renderOrder = 1;
    sphere.add(sticker);
}

// ── Layer Builder ─────────────────────────────────────────────────────────────

export function buildScatterLayer(scene, data) {
    const {
        sphereXStep, sphereZStep,
        sphereFloatSpeedMin, sphereFloatSpeedRange,
        sphereFloatAmplitudeBase, sphereFloatAmplitudeRange,
    } = SPHERE_CONFIG;

    const { xScale, zScale, yScale, radiusScale, opacityScale, colorScale, xOffset, zOffset, cellHeight } = computeScales(data, scene);

    // halfAngle = stickerSizeFraction / 2 because arc_length = radius × angle
    // → angle = (radius × fraction / 2) / radius = fraction / 2 (constant, independent of radius)
    // This ensures all stickers are square and their physical size scales with sphere radius.
    const stickerHalfAngle = SPHERE_CONFIG.stickerSizeFraction / 2;

    // Rasterize the SVG to a canvas so alpha is preserved correctly at a fixed resolution.
    // Setting src on a bare <img> with an SVG gives browsers a tiny default size;
    // drawing to a canvas lets us force 512×512 and correctly capture the alpha channel.
    const barcodeTexture = new THREE.Texture();
    const svgImg = new Image();
    svgImg.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        canvas.getContext('2d').drawImage(svgImg, 0, 0, 512, 512);
        barcodeTexture.image = canvas;
        barcodeTexture.needsUpdate = true;
    };
    svgImg.src = '/images/barcode.svg';

    const sampled = data.filter(d => d.x % sphereXStep === 0 && d.z % sphereZStep === 0);
    const spheres = [];

    sampled.forEach(d => {
        const radiusJitter = 0.85 + Math.random();
        const radius = radiusScale(Math.random()) * radiusJitter;
        const sphereColor = colorScale(d.x, d.z);

        const sphereOpacity = opacityScale(d.z);
        const geometry = new THREE.SphereGeometry(radius, 24, 24);
        const material = new THREE.MeshStandardMaterial({
            color: sphereColor,
            emissive: sphereColor,
            emissiveIntensity: 0.008,
            transparent: true,
            opacity: sphereOpacity,
            roughness: 0.35,
            metalness: 0.0,
            envMapIntensity: 0.4,
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;
        if (radius >= SPHERE_CONFIG.stickerMinRadius && d.z > SPHERE_CONFIG.stickerMinDepth) {
            createBarcodeSticker(sphere, radius, barcodeTexture, stickerHalfAngle, sphereOpacity*2);
        }

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
