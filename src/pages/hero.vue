<template>
    <div>
        <section class="hero-section">
        <div class="hero-heatmap">
            <TheViabilityScatterPlotScene></TheViabilityScatterPlotScene>
        </div>
        <div class="hero-overlay text-center">
                <h1 class="text-hero text-xl mb-12 pb-4">Pioneering large-scale, cancer therapeutic mapping</h1>
                <h2 class="text-hero text-h3">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</h2>
        </div>
        </section>
        <section class="hero-section">
        <div class="hero-heatmap">
            <TheViabilityHeatmapScatterPlotColorScene></TheViabilityHeatmapScatterPlotColorScene>
        </div>
        <div class="hero-overlay text-center">
                <h1 class="text-hero text-xl mb-12 pb-4">Pioneering large-scale, cancer therapeutic mapping</h1>
                <h2 class="text-hero text-h3">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</h2>
        </div>
        </section>
        <section class="hero-section">
        <div class="hero-heatmap">
            <TheViabilityHeatmapScatterPlotScene></TheViabilityHeatmapScatterPlotScene>
        </div>
        <div class="hero-overlay text-center">
                <h1 class="text-hero text-xl mb-12 pb-4">Pioneering large-scale, cancer therapeutic mapping</h1>
                <h2 class="text-hero text-h3">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</h2>
        </div>
        </section>
        <section class="hero-section">
          <div class="hero-heatmap">
              <ThreeJsTemplate></ThreeJsTemplate>
          </div>
          <div class="hero-overlay text-center">
                  <h1 class="text-hero text-xl mb-12 pb-4">Pioneering large-scale, cancer therapeutic mapping</h1>
                  <h2 class="text-hero text-h3">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</h2>
          </div>
        </section>
    </div>
</template>

<script>
import TheViabilityScatterPlotScene from '../visualization/viability-scatter-plot/TheViabilityScatterPlotScene.vue';
import TheViabilityHeatmapScatterPlotScene from '../visualization/viability-heatmap-scatter-plot/TheViabilityHeatmapScatterPlotScene.vue';
import TheViabilityHeatmapScatterPlotColorScene from '../visualization/viability-heatmap-scatter-plot-color/TheViabilityHeatmapScatterPlotColorScene.vue';
import ThreeJsTemplate from '@/visualization/ThreeJsTemplate.vue';

export default {
    name: 'Hero',
    components: {
        TheViabilityScatterPlotScene,
        TheViabilityHeatmapScatterPlotScene,
        TheViabilityHeatmapScatterPlotColorScene,
        ThreeJsTemplate,
    }
}
</script>

  <style scoped lang="scss">
.hero-section {
  display: grid;
  margin-bottom:100px;
  border-bottom: 15px solid black;
  border-top: 15px solid black;
  // height: calc(100vh - var(--v-layout-top, 64px) - var(--v-banner-height, 0px));
   // height: calc(100vh - var(--v-layout-top, 64px) - var(--v-banner-height, 0px));
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
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 1);
}
.text-xl{
  font-size: 4.25rem;
  line-height: 1.1em;
}
      /* xs */
      @media (max-width: 600px) {
     
        .text-xl{
          font-size: 3.5rem;
        }
      }

  </style>