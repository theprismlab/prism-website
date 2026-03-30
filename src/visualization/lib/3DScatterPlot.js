import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as d3 from 'd3';
/**
 * example usage:
    * import ThreeDScatterPlot from '../visualization/lib/3DScatterPlot.js';

    const canvas = document.querySelector('#scatter-canvas');
    const plot = new ThreeDScatterPlot(canvas);
    plot.setData(data);
    // optional: plot.startAnimation(); // called automatically on setData
    // later: plot.destroy();
 */

const defaultConfig = {
    // Camera
    fov: 25,
    cameraDistance: 25,
    cameraPosition: [0, 4.5, 25],
    cameraLookAt: [0, 6.5, 0],
    nearClip: 1.01,
    farClip: 200,

    // Lighting
    directionalLightIntensity: 0.5,
    ambientLightIntensity: 0.5,
    enableShadows: true,


    // Spheres
    sphereXStep: 10,
    sphereZStep: 2,
    sphereBaseRadiusMultiplier: 0.018,
    sphereSizeScaleRange: [0.3, 1.0],
    sphereOpacityRange: [0.15, 0.95],
    sphereRadiusScaleRange: [1.25, 0.2],
    sphereFloatSpeedMin: 1.8,
    sphereFloatSpeedRange: 1.6,
    sphereFloatAmplitudeBase: 0.08,
    sphereFloatAmplitudeRange: 0.06,
    sphereSmallSphereYDrop: 3,
    stickerCount: 20,
    stickerSizeFraction: 0.8,
    barcodeUrl: '/images/barcode.svg',
    collisionAvoidance: true,
    // Y-axis spread
    ySpread: 12,
    ySpreadOffset: 10,
};

export default class ThreeDScatterPlot {
    constructor(canvasEl, sceneConfig = {}) {
        if (!canvasEl) throw new Error('canvas element is required');
        this.canvas = canvasEl;
        this.config = { ...defaultConfig, ...sceneConfig };
        this.data = [];
        this.spheres = [];
        this.barcodeSpheres = [];
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

        this._setupScene();
    }

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

    // ── Internals ──

    _setupScene() {
        const parent = this.canvas.parentElement;
        this.width = parent?.clientWidth || this.canvas.width || 1;
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
            dirLight.shadow.mapSize.width = 2048;
            dirLight.shadow.mapSize.height = 2048;
            dirLight.shadow.camera.left = -30;
            dirLight.shadow.camera.right = 30;
            dirLight.shadow.camera.top = 30;
            dirLight.shadow.camera.bottom = -30;
            dirLight.shadow.camera.near = 0.1;
            dirLight.shadow.camera.far = 60;
            dirLight.shadow.radius = 8;
            dirLight.shadow.blurSamples = 25;
        }
        this.scene.add(dirLight);

        const ambLight = new THREE.AmbientLight(0xffffff, this.config.ambientLightIntensity);
        this.scene.add(ambLight);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height, false);
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        this.renderer.shadowMap.enabled = enableShadows;
        if (enableShadows) this.renderer.shadowMap.type = THREE.VSMShadowMap;

        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        const roomEnvironment = new RoomEnvironment();
        this.environmentTexture = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
        this.scene.environment = this.environmentTexture;
        roomEnvironment.dispose();
        pmremGenerator.dispose();

        this._loadBarcodeTexture();
        this._setupResizeObserver();
    }

    _setupResizeObserver() {
        if (typeof ResizeObserver === 'undefined') return;
        this.resizeObserver = new ResizeObserver(() => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                const parent = this.canvas.parentElement;
                this.width = parent?.clientWidth || this.canvas.width || 1;
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

    _computeScales(data) {
        const { fov, cameraDistance, ySpread, ySpreadOffset } = this.config;

        const zExtent = d3.extent(data, d => d.z);
        const xExtent = d3.extent(data, d => d.x);
        const colorExtent = d3.extent(data, d => d.color);
        const yExtent = d3.extent(data, d => d.y);

        const vFov = THREE.MathUtils.degToRad(fov);
        const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
        const visibleWidth = visibleHeight * (this.width / this.height);

        const sceneWidth = visibleWidth;
        const cellWidth = sceneWidth / (xExtent[1] || 1);
        const cellHeight = visibleHeight / Math.max(zExtent[1] || 0, 1);

        const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
        const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);

        const yScale = yExtent[0] !== undefined && yExtent[1] !== undefined
            ? d3.scaleLinear().domain(yExtent).range([ySpread, -ySpread + ySpreadOffset])
            : null;

        return {
            xScale, zScale, yScale,
            xOffset: sceneWidth / 2,
            zOffset: visibleHeight / 2,
            zExtent,
            cellWidth, cellHeight,
            colorExtent,
            yExtent,
        };
    }

    _buildSpheres(data) {
        const scales = this._computeScales(data);
        const { xScale, zScale, xOffset, zOffset, cellHeight, yScale, zExtent, colorExtent } = scales;
        const {
            sphereXStep, sphereZStep, sphereBaseRadiusMultiplier,
            sphereSizeScaleRange, sphereOpacityRange, sphereRadiusScaleRange,
            sphereFloatSpeedMin, sphereFloatSpeedRange,
            sphereFloatAmplitudeBase, sphereFloatAmplitudeRange,
            sphereSmallSphereYDrop,
        } = this.config;

        const baseRadius = xScale.range()[1] * sphereBaseRadiusMultiplier;
        const sampled = data.filter(d => d.x % sphereXStep === 0 && d.z % sphereZStep === 0);

        const sizeScale = d3.scaleLinear().domain(zExtent).range(sphereSizeScaleRange);
        const opacityDepthScale = d3.scaleLinear().domain(zExtent).range(sphereOpacityRange);

        const colorRadiusScale = d3.scalePow().exponent(1.5).domain(colorExtent).range(sphereRadiusScaleRange);
        const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1.75, 0]);

        const spheres = [];

        // Pre-compute radii so we can normalize by actual rendered size
        const sampledWithRadius = sampled.map(d => {
            const depthFactor = sizeScale(d.z);
            const colorFactor = colorRadiusScale(d.color);
            const randomJitter = 0.8 + Math.random() * 0.4;
            const radius = baseRadius * depthFactor * colorFactor * randomJitter;
            return { ...d, radius };
        });
        const radiusExtent = d3.extent(sampledWithRadius, d => d.radius);
        const sizeNorm = d3.scaleLinear().domain(radiusExtent).range([0, 1]);

        sampledWithRadius.forEach(d => {
            const { radius } = d;
            const sizeFactor = sizeNorm(radius); // 0 = smallest, 1 = largest
            const color = d.color ? new THREE.Color(colorScale(d.color)) : new THREE.Color('#cccccc');
            const geometry = new THREE.SphereGeometry(radius, 24, 24);
            const material = new THREE.MeshStandardMaterial({
                color: color,
                transparent: true,
                opacity: opacityDepthScale(d.z),
                roughness: 0.0,
                metalness: 0.0,
            });
            const sphere = new THREE.Mesh(geometry, material);
            const baseY = (yScale ? yScale(d.y) : d.y) + radius * 0.2 - (1 - sizeFactor) * sphereSmallSphereYDrop;
            const basePosition = new THREE.Vector3(
                xScale(d.x) - xOffset,
                baseY,
                zScale(d.z) - zOffset,
            );
            sphere.castShadow = true;
            sphere.position.copy(basePosition);
            sphere.userData.basePosition = basePosition;
            sphere.userData.floatPhase = Math.random() * Math.PI * 2;
            sphere.userData.floatPhaseX = Math.random() * Math.PI * 2;
            sphere.userData.floatSpeed = sphereFloatSpeedMin + Math.random() * sphereFloatSpeedRange;
            sphere.userData.floatSpeedX = sphereFloatSpeedMin + Math.random() * sphereFloatSpeedRange;
            sphere.userData.floatAmplitude = cellHeight * (sphereFloatAmplitudeBase + Math.random() * sphereFloatAmplitudeRange) * sizeFactor;
            sphere.userData.floatAmplitudeX = cellHeight * (sphereFloatAmplitudeBase + Math.random() * sphereFloatAmplitudeRange) * sizeFactor;
            sphere.userData.rotSpeedX = (Math.random() - 0.5) * 2.0;
            sphere.userData.rotSpeedY = (Math.random() - 0.5) * 2.0;
            sphere.userData.rotSpeedZ = (Math.random() - 0.5) * 2.0;
       //     if (radius >1) radius = 10;
            sphere.userData.radius = radius;
            sphere.userData.ox = 0; sphere.userData.oy = 0; sphere.userData.oz = 0;
            sphere.userData.vx = 0; sphere.userData.vy = 0; sphere.userData.vz = 0;
            spheres.push(sphere);
            this.scene.add(sphere);
        });

        this._addAnimationCallback((elapsed) => {
            // Step 1: compute float target positions
            spheres.forEach(s => {
                const { basePosition, floatPhase, floatPhaseX, floatSpeed, floatSpeedX, floatAmplitude, floatAmplitudeX } = s.userData;
                s.userData.floatX = basePosition.x + Math.sin(elapsed * floatSpeedX + floatPhaseX) * floatAmplitudeX;
                s.userData.floatY = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude;
                s.userData.floatZ = basePosition.z;
            });

            // Step 2: repulsion between overlapping spheres
            if (this.config.collisionAvoidance) this._resolveCollisions(spheres);

            // Step 3: integrate velocity, spring back toward float position, damp, apply
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
                s.rotation.x = elapsed * ud.rotSpeedX;
                s.rotation.y = elapsed * ud.rotSpeedY;
                s.rotation.z = elapsed * ud.rotSpeedZ;
            });
        });
    
        // Attach barcode stickers to the N largest spheres
        if (this.config.stickerCount > 0) {
            const sorted = [...spheres].sort((a, b) => b.userData.radius - a.userData.radius);
            sorted.slice(0, this.config.stickerCount).forEach(s => {
                this._createBarcodeSticker(s, s.userData.radius, s.material.opacity+ 0.4);
            });
        }

        this.spheres = spheres;
    }

    _resolveCollisions(spheres) {
        for (let i = 0; i < spheres.length; i++) {
            for (let j = i + 1; j < spheres.length; j++) {
                const si = spheres[i], sj = spheres[j];
                const dx = (si.userData.floatX + si.userData.ox) - (sj.userData.floatX + sj.userData.ox);
                const dy = (si.userData.floatY + si.userData.oy) - (sj.userData.floatY + sj.userData.oy);
                const dz = (si.userData.floatZ + si.userData.oz) - (sj.userData.floatZ + sj.userData.oz);
                const distSq = dx * dx + dy * dy + dz * dz;
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

    _addAnimationCallback(cb) {
        this.animationCallbacks.push(cb);
    }

    _clearAnimationCallbacks() {
        this.animationCallbacks = [];
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
            // Attach stickers to any spheres that were built before the image loaded
            this._pendingStickers?.forEach(({ sphere, radius, opacity }) => {
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
            this._pendingStickers = this._pendingStickers ?? [];
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

    _clearSpheres() {
        [...this.spheres, ...this.barcodeSpheres].forEach(sphere => {
            this.scene.remove(sphere);
            sphere.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
        });
        this.spheres = [];
        this.barcodeSpheres = [];
    }
}
