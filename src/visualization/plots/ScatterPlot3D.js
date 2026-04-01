import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as d3 from 'd3';
import { BarcodeStickerManager } from '../barcodeTextures.js';



// ─── Default config ───────────────────────────────────────────────────────────

export const defaultConfig = {
    // ── Camera ────────────────────────────────────────────────────────────────
    // Camera position is computed in spherical coordinates relative to cameraLookAt:
    //
    //   x = lookAt.x + distance · cos(elevation) · sin(azimuth)
    //   y = lookAt.y + distance · sin(elevation)
    //   z = lookAt.z + distance · cos(elevation) · cos(azimuth)
    //
    // Adjust these three values to position the camera:
    fov:              25,
    cameraDistance:   25,    // how far the camera sits from cameraLookAt (zoom)
    cameraAzimuth:    0,     // horizontal orbit around Y axis, radians (alias: cameraAngleY)
    cameraElevation:  0.06,  // vertical tilt above horizontal, radians (0 = eye-level, π/2 = top-down)
    cameraLookAt:     [0, 1.5, 0], // world-space point the camera always looks at
    nearClip:         1.01,
    farClip:          200,

    // ── Lighting ──────────────────────────────────────────────────────────────
    directionalLightIntensity: 0.5,
    ambientLightIntensity:     0.5,
    enableShadows:             true,

    // ── Scales ────────────────────────────────────────────────────────────────
    // Each entry has { domain, range }. null = auto-compute at runtime (see _computeScales).
    scale: {},

    // ── Color interpolator ────────────────────────────────────────────────────
    // Set to any d3 interpolator, e.g. d3.interpolateRainbow for the prism generator.
    // null falls back to d3.interpolateYlOrRd.
    colorInterpolator: null,

    // ── Float animation ───────────────────────────────────────────────────────
    floatSpeedMin:   1.8,
    floatSpeedRange: 1.6,
    floatAmplitude:  [0.02, 0.08],  // [min, max] world units
    rotSpeedRange:   2.0,

    // ── Physics / collision ───────────────────────────────────────────────────
    collisionAvoidance: true,

    // ── Barcode stickers ──────────────────────────────────────────────────────
    // Applied to data points where hasBarcode === true.
    stickerSizeFraction: 0.8,   // fraction of sphere surface patch covered
    stickerOpacity:      0.5,

    barcodeVariants:     [
        '/images/barcodes/barcode-01.svg',
        '/images/barcodes/barcode-02.svg',
        '/images/barcodes/barcode-03.svg',
        '/images/barcodes/barcode-04.svg',
        '/images/barcodes/barcode-05.svg',
        '/images/barcodes/barcode-06.svg',
        '/images/barcodes/barcode-07.svg',
        '/images/barcodes/barcode-08.svg',
        '/images/barcodes/barcode-09.svg',
    ],
};

// ─── Class ────────────────────────────────────────────────────────────────────

export default class ScatterPlot3D {
    constructor(canvasEl, sceneConfig = {}) {
        console.log('ScatterPlot3D config:', sceneConfig);
        if (!canvasEl) throw new Error('canvas element is required');
        this.canvas = canvasEl;
        this.config = { ...defaultConfig, ...sceneConfig };
        // Deep-merge scale sub-objects so partial overrides don't wipe sibling scales
        const baseScale = defaultConfig.scale;
        const userScale = sceneConfig.scale ?? {};
        this.config.scale = Object.fromEntries(
            Object.keys({ ...baseScale, ...userScale }).map(k => [
                k, { ...(baseScale[k] ?? {}), ...(userScale[k] ?? {}) },
            ])
        );
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
        this.barcodeManager = new BarcodeStickerManager({
            stickerSizeFraction: this.config.stickerSizeFraction,
            barcodeVariants:     this.config.barcodeVariants,
            barcodeUrl:          this.config.barcodeUrl,
        });

        this._setupScene();
    }

    // ── Public API ────────────────────────────────────────────────────────────

    setData(data = []) {
        this.data = Array.isArray(data) ? data : [];
        console.log('ScatterPlot3D data set:', this.data);  
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
        if (this.barcodeManager) this.barcodeManager.dispose();
        if (this.renderer) this.renderer.dispose();
    }

    // ── Internals ─────────────────────────────────────────────────────────────

    _setupScene() {
        const parent = this.canvas.parentElement;
        this.width  = parent?.clientWidth  || this.canvas.width  || 1;
        this.height = parent?.clientHeight || this.canvas.height || 1;

        this.scene = new THREE.Scene();

        // Camera position in spherical coordinates relative to cameraLookAt:
        //   azimuth  — horizontal orbit around Y axis
        //   elevation — tilt above the horizontal plane (positive = camera above lookAt)
        const { fov, cameraDistance, cameraLookAt, nearClip, farClip } = this.config;
        // Support legacy cameraAngleY as an alias for cameraAzimuth
        const azimuth   = this.config.cameraAzimuth ?? this.config.cameraAngleY ?? 0;
        const elevation = this.config.cameraElevation ?? 0;
        this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height, nearClip, farClip);
        this.camera.position.set(
            cameraLookAt[0] + cameraDistance * Math.cos(elevation) * Math.sin(azimuth),
            cameraLookAt[1] + cameraDistance * Math.sin(elevation),
            cameraLookAt[2] + cameraDistance * Math.cos(elevation) * Math.cos(azimuth),
        );
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
    _computeScales(data) {
        const sc = this.config.scale ?? {};

        // ── x: maps to visible frustum width ─────────────────────────────────
        const vFov = THREE.MathUtils.degToRad(this.config.fov);
        const visibleHeight = 2 * Math.tan(vFov / 2) * this.config.cameraDistance;
        const visibleWidth  = visibleHeight * (this.width / this.height);
        const xScale = d3.scaleLinear()
            .domain(sc.x?.domain ?? d3.extent(data, d => d.x))
            .range(sc.x?.range   ?? [-visibleWidth / 2, visibleWidth / 2]);

        // ── y: world height ───────────────────────────────────────────────────
        const yScale = d3.scaleLinear()
            .domain(sc.y?.domain ?? d3.extent(data, d => d.y))
            .range(sc.y?.range   ?? [-2, 6]);

        // ── z: depth ──────────────────────────────────────────────────────────
        const zScale = d3.scaleLinear()
            .domain(sc.z?.domain ?? d3.extent(data, d => d.z))
            .range(sc.z?.range   ?? [-4, 4]);

        // ── color ─────────────────────────────────────────────────────────────
        const colorScale = d3.scaleSequential(this.config.colorInterpolator ?? d3.interpolateYlOrRd)
            .domain(sc.color?.domain ?? d3.extent(data, d => d.color));

        // ── radius ────────────────────────────────────────────────────────────
        const radiusScale = d3.scaleLinear()
            .domain(sc.radius?.domain ?? d3.extent(data, d => d.radius))
            .range(sc.radius?.range   ?? [0, 0.65]);

        // ── opacity: derived from camera distance ─────────────────────────────
        const camPos = this.camera.position;
        const worldPositions = data.map(d => new THREE.Vector3(xScale(d.x), yScale(d.y), zScale(d.z)));
        const distances = worldPositions.map(p => p.distanceTo(camPos));
        const opDomain = sc.opacity?.domain ?? [Math.min(...distances), Math.max(...distances)];
        const opRange  = sc.opacity?.range  ?? [0.25, 0.975];
        const opacityOf = d3.scaleLinear().domain(opDomain).range([opRange[1], opRange[0]]);

        return { xScale, yScale, zScale, colorScale, radiusScale, opacityOf, worldPositions, distances };
    }

    _buildSpheres(data) {
        const { floatSpeedMin, floatSpeedRange, floatAmplitude, rotSpeedRange } = this.config;
        const [floatAmpMin, floatAmpMax] = floatAmplitude;

        const { xScale, yScale, zScale, colorScale, radiusScale, opacityOf, worldPositions, distances } =
            this._computeScales(data);

        const spheres = [];

        data.forEach((d, i) => {
            const radius = radiusScale(d.radius);
            const color  = new THREE.Color(colorScale(d.color));

            const geometry = new THREE.SphereGeometry(radius, 24, 24);
            const material = new THREE.MeshStandardMaterial({
                color,
                transparent: true,
                opacity: opacityOf(distances[i]),
                roughness: 0.0,
                metalness: 0.0,
            });

            const sphere = new THREE.Mesh(geometry, material);
            sphere.castShadow = true;
            sphere.position.copy(worldPositions[i]);

            sphere.userData.basePosition    = worldPositions[i];
            sphere.userData.radius          = radius;
            sphere.userData.floatPhase      = Math.random() * Math.PI * 2;
            sphere.userData.floatPhaseX     = Math.random() * Math.PI * 2;
            sphere.userData.floatSpeed      = floatSpeedMin + Math.random() * floatSpeedRange;
            sphere.userData.floatSpeedX     = floatSpeedMin + Math.random() * floatSpeedRange;
            sphere.userData.floatAmplitude  = floatAmpMin + Math.random() * (floatAmpMax - floatAmpMin);
            sphere.userData.floatAmplitudeX = floatAmpMin + Math.random() * (floatAmpMax - floatAmpMin);
            sphere.userData.rotSpeedY       = (Math.random() - 0.5) * rotSpeedRange;
            sphere.userData.ox = 0; sphere.userData.oy = 0; sphere.userData.oz = 0;
            sphere.userData.vx = 0; sphere.userData.vy = 0; sphere.userData.vz = 0;
            sphere.userData.hasBarcode      = d.hasBarcode ?? false;
            sphere.userData.barcodeVariant  = d.barcodeVariant; // optional per-point override

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
                s.rotation.y = elapsed * ud.rotSpeedY;
            });
        });

        this.spheres = spheres;

        spheres
            .filter(s => s.userData.hasBarcode)
            .forEach(s => this.barcodeManager.attachSticker(
                s,
                s.userData.radius,
                this.config.stickerOpacity,
                s.userData.barcodeVariant,
            ));
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
    // _createCustomColorScale(){
    //     return colorScale = (x, z) => {
    //         if (x < 0.5) return new THREE.Color(d3.interpolateGnBu(zNorm(z)));
    //         return new THREE.Color(d3.interpolateYlOrRd(xNorm(x)));
    //     };
    // }
}
