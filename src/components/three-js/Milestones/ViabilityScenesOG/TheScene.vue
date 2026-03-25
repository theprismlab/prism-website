<template>

        <!-- Heatmap planes -->
        <ViabilityHeatmap />

        <!-- Floating spheres -->
        <ViabilitySpheres/>
</template>

<script setup>
  import ViabilityHeatmap from '@/components/three-js/ViabilityScenes/ViabilityHeatmap.vue';
  import ViabilitySpheres from '@/components/three-js/ViabilityScenes/ViabilitySpheres.vue';
</script>
