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

    // Planes
    planeZoom: 10.8,

    // Spheres
    sphereXStep: 8,
    sphereZStep: 2,
    sphereBaseRadiusMultiplier: 0.018,
    sphereSizeScaleRange: [1.0, 0.3],
    sphereOpacityRange: [0.7, 0.15],
    sphereRadiusScaleRange: [1.5, 0.2],
    sphereFloatSpeedMin: 0.4,
    sphereFloatSpeedRange: 0.4,
    sphereFloatAmplitudeBase: 0.08,
    sphereFloatAmplitudeRange: 0.06,

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
        } = this.config;

        const baseRadius = xScale.range()[1] * sphereBaseRadiusMultiplier;
        const sampled = data.filter(d => d.x % sphereXStep === 0 && d.z % sphereZStep === 0);

        const sizeScale = d3.scaleLinear().domain(zExtent).range(sphereSizeScaleRange);
        const opacityDepthScale = d3.scaleLinear().domain(zExtent).range(sphereOpacityRange);

        const radiusScale = d3.scalePow().exponent(1).domain(colorExtent).range(sphereRadiusScaleRange);
        const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain(colorExtent);

        const spheres = [];

        sampled.forEach(d => {
            const t = sizeScale(d.z);
            const randomJitter = 0.8 + Math.random() * 0.4;
            const radius = baseRadius * t * radiusScale(d.color) * randomJitter;
            const geometry = new THREE.SphereGeometry(radius, 24, 24);
            const material = new THREE.MeshStandardMaterial({
                color: d.color ? new THREE.Color(colorScale(d.color)) : new THREE.Color('#cccccc'),
                transparent: true,
                opacity: opacityDepthScale(d.z),
                roughness: 0.0,
                metalness: 0.0,
            });
            const sphere = new THREE.Mesh(geometry, material);
            const baseY = yScale ? yScale(d.y) : d.y;
            const basePosition = new THREE.Vector3(
                xScale(d.x) - xOffset,
                baseY + radius * 0.2,
                zScale(d.z) - zOffset,
            );
            sphere.castShadow = true;
            sphere.position.copy(basePosition);
            sphere.userData.basePosition = basePosition;
            sphere.userData.floatPhase = Math.random() * Math.PI * 2;
            sphere.userData.floatSpeed = sphereFloatSpeedMin + Math.random() * sphereFloatSpeedRange;
            sphere.userData.floatAmplitude = cellHeight * (sphereFloatAmplitudeBase + Math.random() * sphereFloatAmplitudeRange) * t;
            spheres.push(sphere);
            this.scene.add(sphere);
        });

        this._addAnimationCallback((elapsed) => {
            spheres.forEach(s => {
                const { basePosition, floatPhase, floatSpeed, floatAmplitude } = s.userData;
                s.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude;
            });
        });

        this.spheres = spheres;
    }

    _addAnimationCallback(cb) {
        this.animationCallbacks.push(cb);
    }

    _clearAnimationCallbacks() {
        this.animationCallbacks = [];
    }

    _clearSpheres() {
        this.spheres.forEach(sphere => {
            this.scene.remove(sphere);
            if (sphere.geometry) sphere.geometry.dispose();
            if (sphere.material) sphere.material.dispose();
        });
        this.spheres = [];
    }
}
