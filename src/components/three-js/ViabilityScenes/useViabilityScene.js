import * as THREE from 'three';
import { markRaw, ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * Three.js scene composable for viability visualizations (heatmap + spheres).
 * Handles: scene/camera/renderer setup, animation loop, resize, cleanup.
 *
 * Each visualization's onMounted runs after this composable's onMounted,
 * so `scene` and `camera` are available when the viz accesses them.
 *
 * Usage:
 *   const scene = useViabilityScene(canvasEl, overrides);
 *   onMounted(async () => {
 *       // load data, create meshes...
 *       scene.scene.add(mesh);
 *       scene.onAnimate(myCallback);
 *       scene.render();
 *       scene.startAnimation();
 *       scene.onRebuild(() => { // recreate meshes after resize });
 *   });
 */
export function useViabilityScene(canvasEl, config = {}) {
    const width = ref(0);
    const height = ref(0);

    let scene, camera, renderer, clock;
    let canvas = null;
    let lights = [];
    let animationFrameId = null;
    let animationCallbacks = [];
    const rebuildCallbacks = [];
    let resizeObserver = null;
    let resizeTimer = null;

    function onAnimate(cb) {
        animationCallbacks.push(cb);
        return () => { animationCallbacks = animationCallbacks.filter(c => c !== cb); };
    }

    function onRebuild(cb) {
        rebuildCallbacks.push(cb);
    }

    function render() {
        renderer.render(scene, camera);
    }

    function startAnimation() {
        if (animationFrameId) return;
        const loop = () => {
            const elapsed = clock.getElapsedTime();
            animationCallbacks.forEach(cb => cb(elapsed));
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(loop);
        };
        animationFrameId = requestAnimationFrame(loop);
    }

    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    function clearMeshes() {
        const keep = new Set(lights);
        keep.add(camera);
        scene.children
            .filter(c => !keep.has(c))
            .forEach(c => {
                scene.remove(c);
                if (c.geometry) c.geometry.dispose();
                if (c.material) c.material.dispose();
            });
        animationCallbacks = [];
    }

    onMounted(() => {
        canvas = canvasEl.value;
        const parent = canvas.parentElement;
        width.value = parent.clientWidth;
        height.value = parent.clientHeight;

        scene = markRaw(new THREE.Scene());

        camera = markRaw(new THREE.PerspectiveCamera(
            config.fov, width.value / height.value, config.nearClip, config.farClip,
        ));
        const [cx, cy] = config.cameraPosition;
        camera.position.set(cx, cy, config.cameraDistance);
        camera.lookAt(...config.cameraLookAt);
        camera.updateProjectionMatrix();

        const dirLight = markRaw(new THREE.DirectionalLight(0xffffff, config.directionalLightIntensity));
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
        scene.add(dirLight);

        const ambLight = markRaw(new THREE.AmbientLight(0xffffff, config.ambientLightIntensity));
        scene.add(ambLight);
        lights = [dirLight, ambLight];

        renderer = markRaw(new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }));
        renderer.setSize(width.value, height.value, false);
        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;

        clock = markRaw(new THREE.Clock());

        resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const parent = canvas.parentElement;
                width.value = parent.clientWidth;
                height.value = parent.clientHeight;
                camera.aspect = width.value / height.value;
                camera.updateProjectionMatrix();
                renderer.setSize(width.value, height.value, false);
                clearMeshes();
                rebuildCallbacks.forEach(cb => cb());
                render();
            }, 100);
        });
        requestAnimationFrame(() => {
            resizeObserver.observe(canvas.parentElement);
        });
    });

    onBeforeUnmount(() => {
        stopAnimation();
        if (resizeObserver) resizeObserver.disconnect();
        clearTimeout(resizeTimer);
    });

    return {
        config,
        width,
        height,
        get scene() { return scene; },
        get camera() { return camera; },
        onAnimate,
        onRebuild,
        render,
        startAnimation,
    };
}
