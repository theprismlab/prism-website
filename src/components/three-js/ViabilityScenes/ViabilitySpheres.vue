<template>
    <canvas ref="canvasEl" style="position: absolute; width:100%; height:100%;"></canvas>
    <HeatmapSpheres
        v-if="ready"
        :scene="scene.state.scene"
        :data="heatmapData"
        :scales="scales"
        :config="config"
        :on-animate="scene.onAnimate"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';
import HeatmapSpheres from './HeatmapSpheres.vue';

const props = defineProps({
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const { config, scene, ready, heatmapData, scales } = useViabilityScene(canvasEl, props.sceneConfig);
</script>
