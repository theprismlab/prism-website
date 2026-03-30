import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as d3 from 'd3';



/**
 * Generates scatter plot data shaped like a volcano plot.
 * Points near the center (x≈0.5) are low on y (not significant), while points
 * far left or far right rise high on y (significant hits), forming two arms.
 *
 * Data schema per point: same as generateScatterData (x, y, z, radius, color, hasBarcode).
 */
export function generateScatterVolcanoData({
    count            = 420,
    colorNoiseScale  = 0.8,
    seed             = 42,
    barcodeZThreshold = 0.5,
} = {}) {
    let s = seed;
    const rand  = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        // 65% of points biased toward center x → dense bottom cluster
        // 35% uniform → populates the arms at the extremes
        const x = rand() < 0.65
            ? Math.max(0, Math.min(1, 0.5 + randn() * 0.12))
            : rand();
        // Distance from center: 0 at x=0.5, 1 at x=0 or x=1
        const distFromCenter = Math.abs(x - 0.5) * 2;
        // y is normally distributed around a mean that rises with distance.
        // Fixed sigma (0.28) gives organic spread at every height — no flat ceiling.
        const yMean = distFromCenter * 0.72;
        const y = Math.max(0, Math.min(1, yMean + randn() * 0.28));
        const z = rand();
        // Fan x outward at the extremes so arms spread laterally too
        const xFanned = Math.max(0, Math.min(1, x + (x < 0.5 ? -1 : 1) * distFromCenter * Math.abs(randn()) * 0.12));
        // Mix of sizes throughout the arms; y contributes less so small circles appear everywhere
        const radius = Math.max(0, y * 0.4 + Math.abs(randn()) * (0.04 + distFromCenter * 0.35));
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x: xFanned, y, z, radius, color, hasBarcode: false });
    }

    // Mark top 1/3 by radius among close-z points as having a barcode
    const closePoints = points.filter(p => p.z >= barcodeZThreshold);
    closePoints.sort((a, b) => b.radius - a.radius);
    const topCount = Math.ceil(closePoints.length / 3);
    closePoints.slice(0, topCount).forEach(p => { p.hasBarcode = true; });

    return points;
}

// ─── Default config ───────────────────────────────────────────────────────────

const defaultConfig = {
    // Camera
    fov:            25,
    cameraDistance: 28,
    cameraPosition: [0, 6.5, 25],
    cameraLookAt:   [0, 2.5, 0],
    nearClip:       1.01,
    farClip:        200,

    // Lighting
    directionalLightIntensity: 0.5,
    ambientLightIntensity:     0.5,
    enableShadows:             true,

    // Scene layout — all in world (Three.js) units
    // x is computed from the camera frustum at runtime so it fills the viewport at any aspect ratio
    zRange:     [-8, 4],   // world z for data.z [0, 1]  (4 = closer, -4 = farther)
    yRange:     [0, 7],   // world y for data.y [0, 1]  (intentional vertical margin)

    // Sphere sizing: data.radius (0–1) × radiusMultiplier = world-unit radius
    radiusMultiplier: 0.75,

    // Opacity from depth (data.z 0–1 → opacity)
    opacityRange: [0.15, 0.975],

    // Float animation
    floatSpeedMin:   1.8,
    floatSpeedRange: 1.6,
    floatAmplitude:  [0.02, 0.08],  // [min, max]

    // Rotation speed multiplier (random ± this)
    rotSpeedRange: 2.0,

    // Collision avoidance
    collisionAvoidance: true,

    // Camera orbit angle around Y axis (radians) — positive = right arm comes forward
    cameraAngleY: 0,

    // Barcode stickers — applied to data points with hasBarcode: true
    stickerSizeFraction: 0.8,
    barcodeUrl: '/images/barcode.svg',
};

// ─── Class ────────────────────────────────────────────────────────────────────

export default class ScatterVolcano3D {
    constructor(canvasEl, sceneConfig = {}) {
        if (!canvasEl) throw new Error('canvas element is required');
        this.canvas = canvasEl;
        this.config = { ...defaultConfig, ...sceneConfig };
        this.data = [];
        this.spheres = [];
        this.environmentTexture = null;
        this.resizeObserver = null;
        this.resizeTimer = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.width = 0;
        this.height = 0;
        this.clock = new THREE.Clock();
        this.animationCallbacks = [];
        this.animationFrameId = null;
        this.barcodeTexture = null;
        this._barcodeTextureReady = false;
        this._pendingStickers = [];

        this._setupScene();
    }

    // ── Public API ────────────────────────────────────────────────────────────

    setData(data = []) {
        this.data = Array.isArray(data) ? data : [];
        this.rebuild();
    }

    rebuild() {
        this._clearSpheres();
        this._clearAnimationCallbacks();
        if (!this.data.length) {
            this.stopAnimation();
            this.render();
            return;
        }
        this._buildSpheres(this.data);
        this.render();
        this.startAnimation();
    }

    render() {
        if (!this.renderer || !this.scene || !this.camera) return;
        this.renderer.render(this.scene, this.camera);
    }

    startAnimation() {
        if (this.animationFrameId) return;
        const loop = () => {
            const elapsed = this.clock.getElapsedTime();
            this.animationCallbacks.forEach(cb => cb(elapsed));
            this.renderer.render(this.scene, this.camera);
            this.animationFrameId = requestAnimationFrame(loop);
        };
        this.animationFrameId = requestAnimationFrame(loop);
    }

    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    destroy() {
        if (this.resizeObserver) this.resizeObserver.disconnect();
        clearTimeout(this.resizeTimer);
        this.stopAnimation();
        this._clearSpheres();
        if (this.environmentTexture) this.environmentTexture.dispose();
        if (this.barcodeTexture) this.barcodeTexture.dispose();
        if (this.renderer) this.renderer.dispose();
    }

    // ── Internals ─────────────────────────────────────────────────────────────

    _setupScene() {
        const parent = this.canvas.parentElement;
        this.width  = parent?.clientWidth  || this.canvas.width  || 1;
        this.height = parent?.clientHeight || this.canvas.height || 1;

        this.scene = new THREE.Scene();

        const { fov, cameraDistance, cameraPosition, cameraLookAt, nearClip, farClip } = this.config;
        this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height, nearClip, farClip);
        const angle = this.config.cameraAngleY ?? 0;
        const cy = cameraPosition[1];
        const cx = cameraLookAt[0] + Math.sin(angle) * cameraDistance;
        const cz = cameraLookAt[2] + Math.cos(angle) * cameraDistance;
        this.camera.position.set(cx, cy, cz);
        this.camera.lookAt(...cameraLookAt);
        this.camera.updateProjectionMatrix();

        const enableShadows = this.config.enableShadows ?? true;

        const dirLight = new THREE.DirectionalLight(0xffffff, this.config.directionalLightIntensity);
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = enableShadows;
        if (enableShadows) {
            dirLight.shadow.mapSize.width  = 2048;
            dirLight.shadow.mapSize.height = 2048;
            dirLight.shadow.camera.left   = -30;
            dirLight.shadow.camera.right  =  30;
            dirLight.shadow.camera.top    =  30;
            dirLight.shadow.camera.bottom = -30;
            dirLight.shadow.camera.near   = 0.1;
            dirLight.shadow.camera.far    = 60;
            dirLight.shadow.radius        = 8;
            dirLight.shadow.blurSamples   = 25;
        }
        this.scene.add(dirLight);
        this.scene.add(new THREE.AmbientLight(0xffffff, this.config.ambientLightIntensity));

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height, false);
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        this.renderer.shadowMap.enabled = enableShadows;
        if (enableShadows) this.renderer.shadowMap.type = THREE.VSMShadowMap;

        const pmrem = new THREE.PMREMGenerator(this.renderer);
        const roomEnv = new RoomEnvironment();
        this.environmentTexture = pmrem.fromScene(roomEnv, 0.04).texture;
        this.scene.environment = this.environmentTexture;
        roomEnv.dispose();
        pmrem.dispose();

        this._loadBarcodeTexture();
        this._setupResizeObserver();
    }

    _setupResizeObserver() {
        if (typeof ResizeObserver === 'undefined') return;
        this.resizeObserver = new ResizeObserver(() => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                const parent = this.canvas.parentElement;
                this.width  = parent?.clientWidth  || this.canvas.width  || 1;
                this.height = parent?.clientHeight || this.canvas.height || 1;
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.width, this.height, false);
                this.rebuild();
            }, 100);
        });
        requestAnimationFrame(() => {
            if (this.canvas.parentElement) this.resizeObserver.observe(this.canvas.parentElement);
        });
    }

    /**
     * Builds Three.js sphere meshes from data.
     *
     * Because radius and color are pre-normalized (0–1) in the data, the only
     * scales needed here are simple linear maps from the 0–1 data domain to
     * world coordinates / color values.
     */
    _buildSpheres(data) {
        const {
            zRange, yRange,
            radiusMultiplier, opacityRange,
            floatSpeedMin, floatSpeedRange, floatAmplitude,
            rotSpeedRange,
        } = this.config;

        const [floatAmpMin, floatAmpMax] = floatAmplitude;

        // Compute visible x-width from the camera frustum so it adapts to any aspect ratio
        const vFov = THREE.MathUtils.degToRad(this.config.fov);
        const visibleHeight = 2 * Math.tan(vFov / 2) * this.config.cameraDistance;
        const visibleWidth  = visibleHeight * (this.width / this.height);

        // Simple linear scales — no domain clamping needed since data is 0–1
        const xScale      = d3.scaleLinear().domain([0, 1]).range([-visibleWidth / 2, visibleWidth / 2]);
        const yScale      = d3.scaleLinear().domain([0, 1]).range(yRange);
        const zScale      = d3.scaleLinear().domain([0, 1]).range(zRange);
        const colorScale  = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, 1.4]);

        // Pre-compute world positions so we can measure camera distance for opacity
        const camPos = this.camera.position;
        const worldPositions = data.map(d => new THREE.Vector3(xScale(d.x), yScale(d.y), zScale(d.z)));
        const distances = worldPositions.map(p => p.distanceTo(camPos));
        const minDist = Math.min(...distances);
        const maxDist = Math.max(...distances);
        // Normalize distance to 0–1 where 1 = closest to camera
        const distNorm = d3.scaleLinear().domain([minDist, maxDist]).range([1, 0]);
        // Combine camera-distance factor (50%) and data z-depth factor (50%), then map to opacityRange
        const opacityScale = (dist, dataZ) => {
            const closeness = distNorm(dist) * 0.5 + dataZ * 0.5;
            return opacityRange[0] + closeness * (opacityRange[1] - opacityRange[0]);
        };

        const spheres = [];

        data.forEach((d, i) => {
            const radius = d.radius * radiusMultiplier;
            const color  = new THREE.Color(colorScale(d.color));

            const geometry = new THREE.SphereGeometry(radius, 24, 24);
            const material = new THREE.MeshStandardMaterial({
                color,
                transparent: true,
                opacity: opacityScale(distances[i], d.z),
                roughness: 0.0,
                metalness: 0.0,
            });

            const sphere = new THREE.Mesh(geometry, material);
            sphere.castShadow = true;

            const basePosition = worldPositions[i];
            sphere.position.copy(basePosition);

            sphere.userData.basePosition   = basePosition;
            sphere.userData.radius         = radius;
            sphere.userData.floatPhase     = Math.random() * Math.PI * 2;
            sphere.userData.floatPhaseX    = Math.random() * Math.PI * 2;
            sphere.userData.floatSpeed     = floatSpeedMin + Math.random() * floatSpeedRange;
            sphere.userData.floatSpeedX    = floatSpeedMin + Math.random() * floatSpeedRange;
            sphere.userData.floatAmplitude = floatAmpMin + Math.random() * (floatAmpMax - floatAmpMin);
            sphere.userData.floatAmplitudeX = floatAmpMin + Math.random() * (floatAmpMax - floatAmpMin);
            sphere.userData.rotSpeedY = (Math.random() - 0.5) * rotSpeedRange;
            sphere.userData.ox = 0; sphere.userData.oy = 0; sphere.userData.oz = 0;
            sphere.userData.vx = 0; sphere.userData.vy = 0; sphere.userData.vz = 0;
            sphere.userData.dataZ = d.z;
            sphere.userData.hasBarcode = d.hasBarcode ?? false;

            spheres.push(sphere);
            this.scene.add(sphere);
        });

        this._addAnimationCallback((elapsed) => {
            // Step 1: compute float target positions
            spheres.forEach(s => {
                const { basePosition, floatPhase, floatPhaseX, floatSpeed, floatSpeedX, floatAmplitude, floatAmplitudeX } = s.userData;
                s.userData.floatX = basePosition.x + Math.sin(elapsed * floatSpeedX + floatPhaseX) * floatAmplitudeX;
                s.userData.floatY = basePosition.y + Math.sin(elapsed * floatSpeed  + floatPhase)  * floatAmplitude;
                s.userData.floatZ = basePosition.z;
            });

            // Step 2: repulsion between overlapping spheres
            if (this.config.collisionAvoidance) this._resolveCollisions(spheres);

            // Step 3: integrate, spring back, damp, apply
            const damping = 0.75;
            const springK = 0.12;
            spheres.forEach(s => {
                const ud = s.userData;
                ud.ox = (ud.ox + ud.vx) * (1 - springK);
                ud.oy = (ud.oy + ud.vy) * (1 - springK);
                ud.oz = (ud.oz + ud.vz) * (1 - springK);
                ud.vx *= damping; ud.vy *= damping; ud.vz *= damping;
                s.position.x = ud.floatX + ud.ox;
                s.position.y = ud.floatY + ud.oy;
                s.position.z = ud.floatZ + ud.oz;
                s.rotation.y = elapsed * ud.rotSpeedY;
            });
        });

        this.spheres = spheres;

        // Attach barcode stickers to spheres flagged in the data
        spheres
            .filter(s => s.userData.hasBarcode)
            .forEach(s => this._createBarcodeSticker(s, s.userData.radius, 0.5));
    }

    _resolveCollisions(spheres) {
        for (let i = 0; i < spheres.length; i++) {
            for (let j = i + 1; j < spheres.length; j++) {
                const si = spheres[i], sj = spheres[j];
                const dx = (si.userData.floatX + si.userData.ox) - (sj.userData.floatX + sj.userData.ox);
                const dy = (si.userData.floatY + si.userData.oy) - (sj.userData.floatY + sj.userData.oy);
                const dz = (si.userData.floatZ + si.userData.oz) - (sj.userData.floatZ + sj.userData.oz);
                const distSq  = dx * dx + dy * dy + dz * dz;
                const minDist = si.userData.radius + sj.userData.radius;
                if (distSq < minDist * minDist && distSq > 1e-6) {
                    const dist = Math.sqrt(distSq);
                    const push = (minDist - dist) / dist * 0.5;
                    si.userData.vx += dx * push; si.userData.vy += dy * push; si.userData.vz += dz * push;
                    sj.userData.vx -= dx * push; sj.userData.vy -= dy * push; sj.userData.vz -= dz * push;
                }
            }
        }
    }

    _loadBarcodeTexture() {
        const { barcodeUrl } = this.config;
        if (!barcodeUrl) return;
        this.barcodeTexture = new THREE.Texture();
        this._barcodeTextureReady = false;
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 512, 512);
            // Convert near-white pixels to transparent so the barcode works on any background
            const imageData = ctx.getImageData(0, 0, 512, 512);
            const d = imageData.data;
            for (let i = 0; i < d.length; i += 4) {
                const brightness = (d[i] + d[i + 1] + d[i + 2]) / 3;
                d[i + 3] = brightness > 180 ? 0 : d[i + 3]; // white → transparent
            }
            ctx.putImageData(imageData, 0, 0);
            this.barcodeTexture.image = canvas;
            this.barcodeTexture.needsUpdate = true;
            this._barcodeTextureReady = true;
            this._pendingStickers.forEach(({ sphere, radius, opacity }) => {
                this._attachSticker(sphere, radius, opacity);
            });
            this._pendingStickers = [];
        };
        img.src = barcodeUrl;
    }

    _createBarcodeSticker(sphere, radius, opacity) {
        if (!this.barcodeTexture) return;
        if (this._barcodeTextureReady) {
            this._attachSticker(sphere, radius, opacity);
        } else {
            this._pendingStickers.push({ sphere, radius, opacity });
        }
    }

    _attachSticker(sphere, radius, opacity) {
        const halfAngle = this.config.stickerSizeFraction / 2;
        const geo = new THREE.SphereGeometry(
            radius * 1.005, 16, 16,
            Math.PI / 2 - halfAngle, halfAngle * 2,
            Math.PI / 2 - halfAngle, halfAngle * 2,
        );
        const mat = new THREE.MeshBasicMaterial({
            map: this.barcodeTexture,
            transparent: true,
            opacity,
            blending: THREE.NormalBlending,
            depthWrite: false,
        });
        const sticker = new THREE.Mesh(geo, mat);
        sticker.renderOrder = 1;
        sphere.add(sticker);
    }

    _addAnimationCallback(cb) { this.animationCallbacks.push(cb); }
    _clearAnimationCallbacks() { this.animationCallbacks = []; }

    _clearSpheres() {
        this.spheres.forEach(sphere => {
            this.scene.remove(sphere);
            sphere.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
        });
        this.spheres = [];
    }
}
