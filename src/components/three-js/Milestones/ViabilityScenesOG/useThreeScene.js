import * as THREE from 'three';
import { markRaw, reactive, ref } from 'vue';

/**
 * Composable that owns the Three.js scene, camera, renderer, and animation loop.
 * Does NOT load data or compute scales — those are handled externally.
 */
export function useThreeScene(config) {
    const { fov, cameraDistance, cameraPosition, cameraLookAt, nearClip, farClip,
            directionalLightIntensity, ambientLightIntensity } = config;

    const state = reactive({
        width: 0,
        height: 0,
        scene: null,
        camera: null,
        renderer: null,
        clock: null,
    });

    const animationCallbacks = ref([]);
    let animationFrameId = null;
    let canvas = null;
    let lights = [];

    function init(canvasEl) {
        canvas = canvasEl;
        const parent = canvas.parentElement;
        state.width = parent.clientWidth;
        state.height = parent.clientHeight;

        state.scene = markRaw(new THREE.Scene());

        state.camera = markRaw(new THREE.PerspectiveCamera(
            fov, state.width / state.height, nearClip, farClip,
        ));
        const [cx, cy] = cameraPosition;
        state.camera.position.set(cx, cy, cameraDistance);
        state.camera.lookAt(...cameraLookAt);
        state.camera.updateProjectionMatrix();

        const dirLight = markRaw(new THREE.DirectionalLight(0xffffff, directionalLightIntensity));
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = true;
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
        state.scene.add(dirLight);

        const ambLight = markRaw(new THREE.AmbientLight(0xffffff, ambientLightIntensity));
        state.scene.add(ambLight);

        lights = [dirLight, ambLight];

        state.renderer = markRaw(new THREE.WebGLRenderer({ canvas, antialias: true }));
        state.renderer.setSize(state.width, state.height, false);
        state.renderer.setClearColor(0xffffff, 0);
        state.renderer.setPixelRatio(window.devicePixelRatio);
        state.renderer.shadowMap.enabled = true;
        state.renderer.shadowMap.type = THREE.VSMShadowMap;

        state.clock = markRaw(new THREE.Clock());
    }

    function onAnimate(callback) {
        animationCallbacks.value.push(callback);
        return () => {
            animationCallbacks.value = animationCallbacks.value.filter(cb => cb !== callback);
        };
    }

    function startAnimation() {
        if (animationFrameId) return;
        const animate = () => {
            const elapsed = state.clock.getElapsedTime();
            animationCallbacks.value.forEach(cb => cb(elapsed));
            state.renderer.render(state.scene, state.camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
    }

    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    function render() {
        state.renderer.render(state.scene, state.camera);
    }

    /** Resize renderer + camera. Returns new { width, height } for scale recomputation. */
    function resize() {
        if (!canvas || !state.renderer) return null;
        const parent = canvas.parentElement;
        state.width = parent.clientWidth;
        state.height = parent.clientHeight;
        state.camera.aspect = state.width / state.height;
        state.camera.updateProjectionMatrix();
        state.renderer.setSize(state.width, state.height, false);
        clearMeshes();
        return { width: state.width, height: state.height };
    }

    function clearMeshes() {
        const keep = new Set(lights);
        keep.add(state.camera);
        state.scene.children
            .filter(c => !keep.has(c))
            .forEach(c => {
                state.scene.remove(c);
                if (c.geometry) c.geometry.dispose();
                if (c.material) c.material.dispose();
            });
        animationCallbacks.value = [];
    }

    return { state, init, onAnimate, startAnimation, stopAnimation, render, resize, clearMeshes };
}
