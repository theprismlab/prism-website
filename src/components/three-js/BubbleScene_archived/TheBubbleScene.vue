<template>
      <Spheres v-if="data.length" :data="data" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { generateSpheres } from './generateSpheres.js';
import Spheres from './Spheres.vue';

const data = ref([]);

onMounted(() => {
    data.value = generateSpheres();
});
</script>
