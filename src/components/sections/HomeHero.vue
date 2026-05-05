<template>
    <div>
        <section class="hero-section">
            <div class="hero-heatmap">
                <DynamicSpread  />
            </div>
            <div class="hero-overlay text-center">
                <h1 class="text-hero text-h1 pb-4">Pioneering large-scale, cancer therapeutic mapping</h1>
                <h2 class="text-h3">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</h2>
            </div>
        </section>
    </div>
</template>

<script>
import DynamicSpread from '@/visualization/DynamicSpread.vue';

export default {
    name: 'HomeHero',
    components: {
        DynamicSpread,
    },
    
}
</script>

<style scoped lang="scss">
// .text-h3{
//   font-weight: 900 !important;
//   color: white;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: inline;
//   padding: 0.25em 0.5em;
//   line-height: 1.6em;
// }
.text-h3 {
  font-weight: 900 !important;
  background:
    /* Tight bright core for legibility */
    radial-gradient(
      ellipse 45% 55% at center,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.65) 45%,
      rgba(255, 255, 255, 0.15) 75%,
      rgba(255, 255, 255, 0) 100%
    ),
    /* Soft mid halo */
      radial-gradient(
        ellipse 80% 90% at center,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.12) 55%,
        rgba(255, 255, 255, 0) 100%
      ),
    /* Wide outer atmospheric glow */
      radial-gradient(
        ellipse 110% 140% at center,
        rgba(255, 255, 255, 0.12) 0%,
        rgba(255, 255, 255, 0.05) 60%,
        rgba(255, 255, 255, 0) 100%
      );
  display: inline-block;
  padding: 0.5em 0.5em;
  line-height: 1.6em;
}
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
