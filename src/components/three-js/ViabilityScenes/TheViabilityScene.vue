<template>

        <!-- Heatmap planes -->
        <!-- <ViabilityHeatmap v-if="data.length" :data="data" /> -->

        <!-- Mesh -->
        <ViabilityGridSpheres v-if="data.length" :data="data" />

        <!-- Floating spheres -->
        <!-- <ViabilitySpheres v-if="data.length" :data="data" /> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadViabilityCSV, parseViabilityData } from './loadViabilityData.js';
import ViabilityHeatmap from './ViabilityHeatmap.vue';
import ViabilitySpheres from './ViabilitySpheres.vue';
import ViabilityGridSpheres from './ViabilityGridSpheres.vue';

const data = ref([]);

onMounted(async () => {
    const raw = await loadViabilityCSV();
    data.value = parseViabilityData(raw);
});
</script>
