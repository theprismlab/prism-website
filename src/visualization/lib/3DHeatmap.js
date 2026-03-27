import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as d3 from 'd3';
/**
 * 
 example usage:
    import ThreeDHeatmap from './3DHeatmap.js';

    const canvas = document.querySelector('#heatmap-canvas');
    const heatmap = new ThreeDHeatmap(canvas);
    heatmap.setData(dataArray); // each item needs x, z, rgba

    later: heatmap.destroy();
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
    ambientLightIntensity: 2.5,
    enableShadows: true,

    // Planes
    planeZoom: 10.8,
    planeWidthMultiplier: 1.6,
    planeYPosition: 1,
    planeOpacityRange: [0.5, 1],
};

export default class ThreeDHeatmap {
    constructor(canvasEl, sceneConfig = {}) {
        if (!canvasEl) throw new Error('canvas element is required');
        this.canvas = canvasEl;
        this.config = { ...defaultConfig, ...sceneConfig };
        this.data = [];
        this.planes = [];
        this.environmentTexture = null;
        this.resizeObserver = null;
        this.resizeTimer = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.width = 0;
        this.height = 0;

        this._setupScene();
    }

    setData(data = []) {
        this.data = Array.isArray(data) ? data : [];
        this.rebuild();
    }

    rebuild() {
        this._clearPlanes();
        if (!this.data.length) return;
        this._buildPlanes(this.data);
        // Defer to the next frame to avoid rendering before layout settles
        requestAnimationFrame(() => this.render());
    }

    render() {
        if (!this.renderer || !this.scene || !this.camera) return;
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.resizeObserver) this.resizeObserver.disconnect();
        clearTimeout(this.resizeTimer);
        this._clearPlanes();
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
        const { fov, cameraDistance } = this.config;

        const zExtent = d3.extent(data, d => d.z);
        const xExtent = d3.extent(data, d => d.x);

        const vFov = THREE.MathUtils.degToRad(fov);
        const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
        const visibleWidth = visibleHeight * (this.width / this.height);

        const sceneWidth = visibleWidth;
        const planeWidth = sceneWidth / (xExtent[1] || 1);
        const planeHeight = visibleHeight / Math.max(zExtent[1] || 0, 1);

        const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
        const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
        const opacityScale = d3.scaleLinear().domain(zExtent).range(this.config.planeOpacityRange);

        return {
            xScale, zScale, opacityScale,
            xOffset: sceneWidth / 2,
            zOffset: visibleHeight / 2,
            planeWidth, planeHeight,
        };
    }

    _buildPlanes(data) {
        const scales = this._computeScales(data);
        const { xScale, zScale, opacityScale, xOffset, zOffset, planeWidth, planeHeight } = scales;
        const { planeZoom, planeWidthMultiplier, planeYPosition } = this.config;

        data.forEach(d => {
            const geometry = new THREE.PlaneGeometry(
                planeWidth * planeWidthMultiplier * planeZoom,
                planeHeight * planeZoom,
            );
            const material = new THREE.MeshLambertMaterial({
                color: d.rgba,
                side: THREE.DoubleSide,
                opacity: opacityScale(d.z),
                transparent: true,
                depthWrite: false,
            });
            const plane = new THREE.Mesh(geometry, material);
            plane.receiveShadow = true;
            plane.rotation.x = -Math.PI / 2;
            plane.position.set(
                (xScale(d.x) - xOffset) * planeZoom,
                planeYPosition,
                (zScale(d.z) - zOffset) * planeZoom,
            );
            this.planes.push(plane);
            this.scene.add(plane);
        });
    }

    _clearPlanes() {
        this.planes.forEach(plane => {
            this.scene.remove(plane);
            if (plane.geometry) plane.geometry.dispose();
            if (plane.material) plane.material.dispose();
        });
        this.planes = [];
    }
}
