<template>
    <ViabilityCirclesOnPaths v-if="data" :data="data" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadViabilityCSV, parseViabilityData } from './loadViabilityData.js';
import ViabilityCirclesOnPaths from './ViabilityCirclesOnPaths2.vue';

const data = ref([]);

onMounted(async () => {
    const raw = await loadViabilityCSV();
    data.value = parseViabilityData(raw);
});
</script>
