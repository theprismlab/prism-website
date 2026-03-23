import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { defaultConfig } from './defaultConfig.js';
import { loadViabilityData } from './loadViabilityData.js';
import { computeScales } from './computeScales.js';
import { useHeatmapScene } from './useHeatmapScene.js';

/**
 * Shared setup for any viability visualization.
 * Handles: canvas init, data loading, scale computation, resize, animation lifecycle.
 */
export function useViabilityScene(canvasEl, sceneConfig = {}) {
    const config = { ...defaultConfig, ...sceneConfig };
    const scene = useHeatmapScene(config);

    const ready = ref(false);
    const heatmapData = ref([]);
    const scales = ref(null);

    let resizeObserver = null;
    let resizeTimer = null;

    function recomputeScales() {
        scales.value = computeScales(
            heatmapData.value, config, scene.state.width, scene.state.height,
        );
    }

    onMounted(async () => {
        const canvas = canvasEl.value;
        scene.init(canvas);

        heatmapData.value = await loadViabilityData(config);
        recomputeScales();
        ready.value = true;

        await new Promise(r => requestAnimationFrame(r));
        scene.render();
        scene.startAnimation();

        resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(async () => {
                ready.value = false;
                scene.resize();
                recomputeScales();
                await nextTick();
                ready.value = true;
            }, 100);
        });
        requestAnimationFrame(() => {
            resizeObserver.observe(canvas.parentElement);
        });
    });

    onBeforeUnmount(() => {
        scene.stopAnimation();
        if (resizeObserver) resizeObserver.disconnect();
        clearTimeout(resizeTimer);
    });

    return { config, scene, ready, heatmapData, scales };
}
