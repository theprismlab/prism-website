<template>
    <canvas ref="canvasEl" style="position: absolute; width:100%; height:100%;"></canvas>
    <PlaneLayer
        v-if="ready"
        :scene="scene.state.scene"
        :data="heatmapData"
        :scales="scales"
        :config="config"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';
import PlaneLayer from './PlaneLayer.vue';

const props = defineProps({
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const { config, scene, ready, heatmapData, scales } = useViabilityScene(canvasEl, props.sceneConfig);
</script>
