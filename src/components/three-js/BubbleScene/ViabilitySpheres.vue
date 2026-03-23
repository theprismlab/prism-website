<template>
    <canvas ref="canvasEl" style="position: absolute; width:100%; height:100%;"></canvas>
    <SphereLayer
        v-if="ready"
        :scene="scene.state.scene"
        :data="data"
        :scales="scales"
        :config="config"
        :on-animate="scene.onAnimate"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useViabilityScene } from './useViabilityScene.js';
import SphereLayer from './SphereLayer.vue';

const props = defineProps({
    sceneConfig: { type: Object, default: () => ({}) },
});

const canvasEl = ref(null);
const { config, scene, ready, data, scales } = useViabilityScene(canvasEl, props.sceneConfig);
</script>
