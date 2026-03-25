import * as THREE from 'three';
import { markRaw, ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * Generic Three.js scene composable — no built-in lighting.
 * Handles: scene/camera/renderer setup, animation loop, resize, cleanup.
 * The consumer is responsible for adding its own lights.
 *
 * Usage:
 *   const scene = useDefaultScene(canvasEl, config);
 *   onMounted(async () => {
 *       scene.scene.add(myLight);
 *       scene.scene.add(mesh);
 *       scene.onAnimate(myCallback);
 *       scene.render();
 *       scene.startAnimation();
 *       scene.onRebuild(() => { // recreate meshes + lights after resize });
 *   });
 */
export function useDefaultScene(canvasEl, config = {}) {
    const width = ref(0);
    const height = ref(0);

    let scene, camera, renderer, clock;
    let canvas = null;
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
        // Remove everything except the camera
        scene.children
            .filter(c => c !== camera)
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

        renderer = markRaw(new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }));
        renderer.setSize(width.value, height.value, false);
        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(window.devicePixelRatio);

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
