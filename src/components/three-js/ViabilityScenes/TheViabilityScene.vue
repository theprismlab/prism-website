<template>


        <ViabilityHeatmap v-if="data.length" :data="data" />
        <ViabilityScatterPlot v-if="data.length" :data="data" />
        <!-- <BubbleCluster /> -->
        <!-- <SimpleBubbles /> -->

        <!-- <ViabilityCircles v-if="data.length" :data="data" />  -->
        <!-- <GeneratedCirclesCloud v-if="data.length" :data="data" /> -->
        <!-- <ViabilityCirclesOnPaths v-if="data.length" :data="data" /> -->
        <!-- <ViabilityMesh v-if="data.length" :data="data" />  -->
        <!-- <GeneratedCirclesOnPaths v-if="data.length" :data="data" /> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadViabilityCSV, parseViabilityData } from './loadViabilityData.js';
import ViabilityHeatmap from './ViabilityHeatmap.vue';
import ViabilityScatterPlot from './ViabilityScatterPlot02.vue';
import ViabilityCirclesOnPaths from './ViabilityCirclesOnPaths.vue';
import ViabilityCircles from './ViabilityCircles.vue';
import GeneratedCirclesCloud from './GeneratedCirclesCloud.vue';
import GeneratedCirclesOnPaths from '../GeneratedCirclesOnPaths/Index.vue';
import ViabilityMesh from './ViabilityMesh.vue';
import SimpleBubbles from './SimpleBubbles.vue';
import BubbleCluster from './BubbleCluster.vue';
const data = ref([]);

onMounted(async () => {
    const raw = await loadViabilityCSV();
    data.value = parseViabilityData(raw);
});
</script>
