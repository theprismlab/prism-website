<template>
      <!-- Floating spheres -->
      <Spheres v-if="data.length" :data="data" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadViabilityCSV, parseViabilityData } from './loadData.js';
import Spheres from './Spheres.vue';




const data = ref([]);

onMounted(async () => {
    const raw = await loadViabilityCSV();
    data.value = parseViabilityData(raw);
});
</script>
