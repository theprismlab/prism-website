<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ScatterPlotFromJSON from './plots/ScatterPlotFromJSON.js';

const canvas = ref(null);
let plot = null;

onMounted(async () => {
    plot = new ScatterPlotFromJSON(canvas.value, {
        cameraLookAt:    [0, 8, 0],
        cameraDistance:  40,
        cameraElevation: 0.06,
        radiusRange:     [0.08, 0.7],
    });
    await plot.loadJSON('/data/scatter-plot-data.json');
});

onBeforeUnmount(() => plot?.destroy());
</script>