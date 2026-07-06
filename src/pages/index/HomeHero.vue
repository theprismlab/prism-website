<template>
  <section id="hero-section">
    <HeroCanvas />
    <div class="hero-overlay text-center">
      <h1 class="prism-text-display-large font-weight-bold pb-4 text-shadow">
        Pioneering large-scale, cancer therapeutic mapping
      </h1>
      <h2 class="prism-text-display-small text-shadow">
        Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission
        driven.
      </h2>
    </div>
  </section>
</template>

<script>
  import HeroCanvas from './hero/HeroCanvas.vue';

  export default {
    name: 'HomeHero',
    components: {
      HeroCanvas,
    },
  };
</script>

<style scoped lang="scss">
  #hero-section > * {
    grid-area: 1 / 1;
  }
  #hero-section {
    display: grid;
    height: calc(100vh - var(--v-layout-top, 64px));
    overflow: hidden;
    margin: 0px;
  }

  .hero-overlay {
    place-self: center;
    margin-top: 80px;
    max-width: 1000px;
    padding: 0 24px;
    z-index: 1;
  }
  .text-shadow {
    text-shadow:
      0px 0px 10px rgba(255, 255, 255, 0.85),
      0px 0px 30px rgba(255, 255, 255, 0.75),
      0px 0px 60px rgba(255, 255, 255, 0.6),
      0px 0px 100px rgba(255, 255, 255, 0.35);
  }
</style>
