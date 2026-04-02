<template>
    <div>
        <section class="hero-section">
            <div class="hero-heatmap">
            <HeatmapScatter></HeatmapScatter>  
            </div>
            <div class="hero-overlay text-center">
                <h1 class="text-hero text-h1 pb-4">Pioneering large-scale, cancer therapeutic mapping</h1>
                <h2 class="text-hero text-h3">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</h2>
            </div>
        </section>
    </div>
</template>

<script>
import HeatmapScatter from '@/visualization/HeatmapScatter.vue';


export default {
    name: 'hero-heatmap-scatter',
    components: {
        HeatmapScatter,
    },
}
</script>

<style scoped lang="scss">
.hero-section {
  display: grid;
  margin-bottom: 100px;
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
  margin-top: 80px;
  max-width: 1000px;
  padding: 0 24px;
  z-index: 1;
}
.text-hero {
  text-shadow:
    0px 0px 10px rgba(255, 255, 255, 1),
    0px 0px 30px rgba(255, 255, 255, 0.85),
    0px 0px 60px rgba(255, 255, 255, 0.6),
    0px 0px 100px rgba(255, 255, 255, 0.35);
}
.text-h1 {
  font-size: 4.25rem !important;
  line-height: 1.1em !important;
  font-weight: 900 !important;
}
@media (max-width: 600px) {
  .text-h1 {
    font-size: 3.5rem;
  }
}
</style>
