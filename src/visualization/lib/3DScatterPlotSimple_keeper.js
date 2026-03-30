import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as d3 from 'd3';

/**
 * Generates scatter plot data with pre-computed radius and color so the plot
 * class needs no complex scaling logic — just linear maps from 0–1 values to
 * world coordinates.
 *
 * Data schema per point:
 *   x      — 0–1  horizontal position
 *   y      — 0–1  vertical position  (increases naturally with z + noise)
 *   z      — 0–1  depth (0 = far from camera, 1 = closest to camera)
 *   radius — 0–1  pre-normalized sphere size (increases with z and y)
 *   color  — 0–1  heat value for color scale  (increases with z and y)
 */
export function generateScatterData({
    count          = 420,
    colorNoiseScale = 0.8,   // ± noise added to color (which is y-based)
    seed           = 42,
} = {}) {
    // Minimal seeded PRNG for reproducibility (Park-Miller LCG)
    let s = seed;
    const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    // Box-Muller normal distribution (mean=0, stddev=1)
    const randn = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

    const points = [];
    for (let i = 0; i < count; i++) {
        const x = rand();
        // Wave trend + wide normal scatter so outliers (small circles high up) are possible
        const y = Math.max(0, Math.min(1, x * 0.5 + 0.25 + randn() * 0.22));
        const z = rand();
        // Radius: y-based with normal noise — allows small circles at any height
        const radius = Math.max(0, y * 0.8 + randn() * 0.18);
        const color  = Math.max(0, Math.min(1, y + (rand() - 0.5) * colorNoiseScale));
        points.push({ x, y, z, radius, color });
    }
    return points;
}

// ─── Default config ───────────────────────────────────────────────────────────

const defaultConfig = {
    // Camera
    fov:            25,
    cameraDistance: 25,
    cameraPosition: [0, 3, 25],
    cameraLookAt:   [0, 1.5, 0],
    nearClip:       1.01,
    farClip:        200,

    // Lighting
    directionalLightIntensity: 0.5,
    ambientLightIntensity:     0.5,
    enableShadows:             true,

    // Scene layout — all in world (Three.js) units
    // x is computed from the camera frustum at runtime so it fills the viewport at any aspect ratio
    zRange:     [-4, 4],   // world z for data.z [0, 1]  (4 = closer, -4 = farther)
    yRange:     [-2, 6],   // world y for data.y [0, 1]  (intentional vertical margin)

    // Sphere sizing: data.radius (0–1) × radiusMultiplier = world-unit radius
    radiusMultiplier: 0.65,

    // Opacity from depth (data.z 0–1 → opacity)
    opacityRange: [0.25, 0.95],

    // Float animation
    floatSpeedMin:   1.8,
    floatSpeedRange: 1.6,
    floatAmplitude:  [0.02, 0.08],  // [min, max]

    // Rotation speed multiplier (random ± this)
    rotSpeedRange: 2.0,

    // Collision avoidance
    collisionAvoidance: true,

    // Barcode stickers — applied to spheres where radius AND z both exceed thresholds
    stickerRadiusThreshold: 0.5,  // world-unit radius minimum
    stickerZThreshold: 0.5,       // data z minimum (0–1)
    stickerSizeFraction: 0.8,
    barcodeUrl: '/images/barcode.svg',
};

// ─── Class ────────────────────────────────────────────────────────────────────

export default class ThreeDScatterPlotSimple {
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
        const [cx, cy] = cameraPosition;
        this.camera.position.set(cx, cy, cameraDistance);
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
        const opacityScale = d3.scaleLinear().domain([0, 1]).range(opacityRange);
        const colorScale  = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, 1.4]);

        const spheres = [];

        data.forEach(d => {
            const radius = d.radius * radiusMultiplier;
            const color  = new THREE.Color(colorScale(d.color));

            const geometry = new THREE.SphereGeometry(radius, 24, 24);
            const material = new THREE.MeshStandardMaterial({
                color,
                transparent: true,
                opacity: opacityScale(d.z),
                roughness: 0.0,
                metalness: 0.0,
            });

            const sphere = new THREE.Mesh(geometry, material);
            sphere.castShadow = true;

            const basePosition = new THREE.Vector3(xScale(d.x), yScale(d.y), zScale(d.z));
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

        // Attach barcode stickers to spheres exceeding both the radius and z thresholds
        const { stickerRadiusThreshold, stickerZThreshold } = this.config;
        spheres
            .filter(s => s.userData.radius >= stickerRadiusThreshold && s.userData.dataZ >= stickerZThreshold)
            .forEach(s => {
                this._createBarcodeSticker(s, s.userData.radius, 1);
            });
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
            canvas.getContext('2d').drawImage(img, 0, 0, 512, 512);
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
            blending: THREE.AdditiveBlending,
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
