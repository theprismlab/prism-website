import * as THREE from 'three';
import * as d3 from 'd3';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { sceneConfig } from './scatter-scene-config.js';

// ─── Default config ───────────────────────────────────────────────────────────

const defaultConfig = {
    // ── Camera — values come from scatter-scene-config.js ─────────────────────
    ...sceneConfig,

    // ── Lighting ──────────────────────────────────────────────────────────────
    directionalLightIntensity: 0.5,
    ambientLightIntensity:     1.5,
    enableShadows:             false,  // off by default — large datasets are heavy


    // ── Float animation ───────────────────────────────────────────────────────
    floatSpeedMin:   1.2,
    floatSpeedRange: 1.0,
    floatAmplitude:  [0.04, 0.14],  // [min, max] world units

    // ── Physics / collision ───────────────────────────────────────────────────
    collisionAvoidance: true,

    // ── Screen scaling ────────────────────────────────────────────────────────
    // When true, re-scales the pre-baked X world positions to match the actual
    // canvas aspect ratio vs the reference aspect (referenceWidth/referenceHeight).
    // Y (viability) and Z (depth) are aspect-independent and are never rescaled.
    // Re-runs automatically on resize.
    scaleToScreen: false,

    // ── Barcode stickers ──────────────────────────────────────────────────────
    // Applied to points where `hasBarcode === true` in the JSON (if present).
    stickerSizeFraction: 0.8,
    stickerOpacity:      0.5,
    barcodeUrl:          '/images/barcode.svg',
};

// ─── Class ────────────────────────────────────────────────────────────────────

/**
 * Renders a 3D scatter plot from a pre-computed JSON data file.
 *
 * Unlike ScatterPlot3D (which maps raw data through d3 scales), this class
 * expects world-space positions and CSS color strings already baked into the
 * JSON, matching the output of `exportScatterPlotJSON()` in getData.js:
 *
 *   {
 *     world:      { x, y, z }  — world-space position, used directly
 *     color:      "rgb(r,g,b)" — CSS color string, applied as sphere material
 *     opacity:    0…1          — pre-computed opacity
 *     viability:  number       — used to derive sphere radius (lower → bigger)
 *     ccle_name:  string       — metadata, stored in userData for tooltips etc.
 *     lineage:    string
 *     pert_dose:  number
 *     hasBarcode: boolean      — optional; attaches barcode sticker if true
 *   }
 *
 * Usage:
 *   const plot = new ScatterPlotFromJSON(canvasEl, config);
 *   await plot.loadJSON('/data/scatter-plot-data.json');
 *   // — or provide data directly —
 *   plot.setData(myArray);
 */
export default class ScatterPlotFromJSON {
    constructor(canvasEl, sceneConfig = {}) {
        if (!canvasEl) throw new Error('canvas element is required');
        this.canvas = canvasEl;
        this.config = { ...defaultConfig, ...sceneConfig };
        this.data   = [];
        this.spheres = [];
        this.environmentTexture = null;
        this.resizeObserver = null;
        this.resizeTimer    = null;
        this.scene    = null;
        this.camera   = null;
        this.renderer = null;
        this.width  = 0;
        this.height = 0;
        this.clock  = new THREE.Clock();
        this.animationCallbacks = [];
        this.animationFrameId  = null;
        this.barcodeTexture       = null;
        this._barcodeTextureReady = false;
        this._pendingStickers     = [];

        this._setupScene();
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Fetch the JSON from `url`, parse it, and render.
     * @param {string} url
     */
    async loadJSON(url) {
        const res  = await fetch(url);
        const data = await res.json();
        this.setData(data);
    }

    /** Provide data directly (array matching the JSON schema above). */
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

        const { fov, cameraDistance, cameraLookAt, nearClip, farClip } = this.config;
        const azimuth   = this.config.cameraAzimuth   ?? 0;
        const elevation = this.config.cameraElevation ?? 0;

        this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height, nearClip, farClip);
        this.camera.position.set(
            cameraLookAt[0] + cameraDistance * Math.cos(elevation) * Math.sin(azimuth),
            cameraLookAt[1] + cameraDistance * Math.sin(elevation),
            cameraLookAt[2] + cameraDistance * Math.cos(elevation) * Math.cos(azimuth),
        );
        this.camera.lookAt(...cameraLookAt);
        this.camera.updateProjectionMatrix();

        const dirLight = new THREE.DirectionalLight(0xffffff, this.config.directionalLightIntensity);
        dirLight.position.set(5, 10, 5);
        this.scene.add(dirLight);
        this.scene.add(new THREE.AmbientLight(0xffffff, this.config.ambientLightIntensity));

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height, false);
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        const pmrem   = new THREE.PMREMGenerator(this.renderer);
        const roomEnv = new RoomEnvironment();
        this.environmentTexture = pmrem.fromScene(roomEnv, 0.04).texture;
        this.scene.environment  = this.environmentTexture;
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

    _buildSpheres(data) {
        const { floatSpeedMin, floatSpeedRange, floatAmplitude } = this.config;
        const [floatAmpMin, floatAmpMax] = floatAmplitude;

        // When scaleToScreen is true, rescale the baked X positions to the
        // actual canvas aspect ratio.  Y and Z are aspect-independent.
        let xFactor = 1;
        let yFactor = 1;

        if (this.config.scaleToScreen) {
            const { referenceWidth, referenceHeight } = this.config;
            xFactor = (this.width / this.height) / (referenceWidth / referenceHeight);
            yFactor = (this.height / this.width) / (referenceHeight / referenceWidth);
        }

        const spheres = [];

        data.forEach(d => {
            const radius  = d.radius;
            const color   = new THREE.Color(d.color);   // CSS "rgb(r,g,b)" accepted directly
            const opacity = d.opacity ?? 0.8;

            const geometry = new THREE.SphereGeometry(radius, 20, 20); 
            const material = new THREE.MeshStandardMaterial({
                color,
                emissive:          color,
                emissiveIntensity: 0.05,
                transparent:       true,
                opacity,
                roughness:         0.15,
                metalness:         0.0,
            });

            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(d.world.x * xFactor, d.world.y * yFactor, d.world.z);

            // Store base position and animation parameters
            sphere.userData.basePosition    = sphere.position.clone();
            sphere.userData.radius          = radius;
            sphere.userData.floatPhase      = Math.random() * Math.PI * 2;
            sphere.userData.floatPhaseX     = Math.random() * Math.PI * 2;
            sphere.userData.floatSpeed      = floatSpeedMin + Math.random() * floatSpeedRange;
            sphere.userData.floatSpeedX     = floatSpeedMin + Math.random() * floatSpeedRange;
            sphere.userData.floatAmplitude  = floatAmpMin + Math.random() * (floatAmpMax - floatAmpMin);
            sphere.userData.floatAmplitudeX = floatAmpMin + Math.random() * (floatAmpMax - floatAmpMin);
            sphere.userData.ox = 0; sphere.userData.oy = 0; sphere.userData.oz = 0;
            sphere.userData.vx = 0; sphere.userData.vy = 0; sphere.userData.vz = 0;
            // Metadata — available if you want tooltips / click interactions
         
            sphere.userData.hasBarcode = d.hasBarcode ?? false;

            spheres.push(sphere);
            this.scene.add(sphere);
        });

        this._addAnimationCallback((elapsed) => {
            spheres.forEach(s => {
                const { basePosition, floatPhase, floatPhaseX, floatSpeed, floatSpeedX, floatAmplitude, floatAmplitudeX } = s.userData;
                s.userData.floatX = basePosition.x + Math.sin(elapsed * floatSpeedX + floatPhaseX) * floatAmplitudeX;
                s.userData.floatY = basePosition.y + Math.sin(elapsed * floatSpeed  + floatPhase)  * floatAmplitude;
                s.userData.floatZ = basePosition.z;
            });

            if (this.config.collisionAvoidance) this._resolveCollisions(spheres);

            const damping = 0.75, springK = 0.12;
            spheres.forEach(s => {
                const ud = s.userData;
                ud.ox = (ud.ox + ud.vx) * (1 - springK);
                ud.oy = (ud.oy + ud.vy) * (1 - springK);
                ud.oz = (ud.oz + ud.vz) * (1 - springK);
                ud.vx *= damping; ud.vy *= damping; ud.vz *= damping;
                s.position.x = ud.floatX + ud.ox;
                s.position.y = ud.floatY + ud.oy;
                s.position.z = ud.floatZ + ud.oz;
            });
        });

        this.spheres = spheres;

        spheres
            .filter(s => s.userData.hasBarcode)
            .forEach(s => this._createBarcodeSticker(s, s.userData.radius, this.config.stickerOpacity));
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
        this.barcodeTexture       = new THREE.Texture();
        this._barcodeTextureReady = false;
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width  = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 512, 512);
            const imageData = ctx.getImageData(0, 0, 512, 512);
            const px = imageData.data;
            for (let i = 0; i < px.length; i += 4) {
                if ((px[i] + px[i + 1] + px[i + 2]) / 3 > 180) px[i + 3] = 0;
            }
            ctx.putImageData(imageData, 0, 0);
            this.barcodeTexture.image       = canvas;
            this.barcodeTexture.needsUpdate = true;
            this._barcodeTextureReady       = true;
            this._pendingStickers.forEach(({ sphere, radius, opacity }) =>
                this._attachSticker(sphere, radius, opacity));
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
            map:         this.barcodeTexture,
            transparent: true,
            opacity,
            blending:    THREE.NormalBlending,
            depthWrite:  false,
        });
        const sticker = new THREE.Mesh(geo, mat);
        sticker.renderOrder = 1;
        sphere.add(sticker);
    }

    _addAnimationCallback(cb)  { this.animationCallbacks.push(cb); }
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
