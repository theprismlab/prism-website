<template>
    <ViabilityHeatmap v-if="data.length" :data="data" />
    <ViabilityScatterPlot v-if="data.length" :data="data" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadViabilityCSV, parseViabilityData } from './loadViabilityData.js';
import ViabilityHeatmap from './ViabilityHeatmap.vue';
import ViabilityScatterPlot from './ViabilityScatterPlot.vue';

const data = ref([]);

onMounted(async () => {
    const raw = await loadViabilityCSV();
    data.value = parseViabilityData(raw);
});
</script>
