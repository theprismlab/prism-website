<template>
    <ViabilityHeatmap v-if="heatmapData.length" :data="heatmapData" />
    <ViabilityScatterPlot v-if="scatterData.length" :data="scatterData" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadViabilityCSV, parseHeatmapData, parseScatterPlotData } from './getData.js';
import ViabilityHeatmap from './ViabilityHeatmap.vue';
import ViabilityScatterPlot from './ViabilityScatterPlot.vue';

const heatmapData = ref([]);
const scatterData = ref([]);

onMounted(async () => {
    const raw = await loadViabilityCSV();
    heatmapData.value = parseHeatmapData(raw);
    scatterData.value = parseScatterPlotData(raw);
});
</script>
