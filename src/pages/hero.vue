<template>
    <div>
        <section class="hero-section">
            <div class="hero-heatmap">
                <TheViabilityHeatmapScatterPlotScene v-if="activeScene === 0"></TheViabilityHeatmapScatterPlotScene>
                <HeatmapScatterBubbles v-else-if="activeScene === 1"></HeatmapScatterBubbles>
                            <ViabilityScatterBubbles v-else-if="activeScene === 2"></ViabilityScatterBubbles>

            </div>
            <div class="hero-overlay text-center">
                <h1 class="text-hero text-xl mb-12 pb-4">Pioneering large-scale, cancer therapeutic mapping</h1>
                <h2 class="text-hero text-h3">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</h2>
            </div>
            <div class="scene-switcher">
                <button
                    v-for="(label, i) in sceneLabels"
                    :key="i"
                    class="scene-btn"
                    :class="{ active: activeScene === i }"
                    @click="activeScene = i"
                >{{ label }}</button>
            </div>
        </section>
    </div>
</template>

<script>
import TheViabilityHeatmapScatterPlotScene from '../visualization/viability-heatmap-scatter-plot/TheViabilityHeatmapScatterPlotScene.vue';
import HeatmapScatterBubbles from '@/visualization/HeatmapScatterBubbles.vue';
import ViabilityScatterBubbles from '../visualization/viability-scatter-plot/ViabilityScatterBubbles.vue';

export default {
    name: 'Hero',
    components: {
        TheViabilityHeatmapScatterPlotScene,
        HeatmapScatterBubbles,
        ViabilityScatterBubbles,  
    },
    data() {
        return {
            activeScene: 0,
            sceneLabels: ['Heatmap Bubbles 1', 'Heatmap Bubbles 2', 'Bubbles'],
        };
    },
}
</script>

  <style scoped lang="scss">
.hero-section {
  display: grid;
  margin-bottom:100px;
  border-bottom: 15px solid black;
  border-top: 15px solid black;
    height: calc(100dvh - var(--v-layout-top, 64px));
  overflow: hidden;
  > * {
    grid-area: 1 / 1;
  }
}
.hero-heatmap {
  position: relative;
  width: 100%;
  height: 100%;
}
.hero-overlay {
  place-self: center;
  max-width: 1000px;
  padding: 0 24px;
  z-index: 1;
}
.text-hero{
  text-shadow:
    0px 0px 10px rgba(255, 255, 255, 1),
    0px 0px 30px rgba(255, 255, 255, 0.85),
    0px 0px 60px rgba(255, 255, 255, 0.6),
    0px 0px 100px rgba(255, 255, 255, 0.35);
}
.text-xl{
  font-size: 4.25rem;
  line-height: 1.1em;
}
.scene-switcher {
  place-self: end end;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  z-index: 2;
  margin-bottom:100px;
}
.scene-btn {
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 0.8rem;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background 0.2s, border-color 0.2s;
  &:hover {
    background: rgba(0, 0, 0, 0.65);
  }
  &.active {
    background: rgba(0, 0, 0, 0.75);
    border-color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
  }
}
      /* xs */
      @media (max-width: 600px) {
        .text-xl{
          font-size: 3.5rem;
        }
      }

  </style>