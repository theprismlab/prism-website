<template>
  <page>
    <HomeHero></HomeHero>

    <page-section width="default" background="multi-focal-cool">
      <p class="prism-text-display-small text-center">
        Our lab partners with researchers to
        <span class="text-gradient-blue"
          >reveal clinically important differences in drug behavior</span
        >
        by screening over 900 cancer cell lines and correlating the viability results with baseline
        and functional genomic features
      </p>
    </page-section>

    <page-section width="wide">
      <p class="prism-text-body-large prism-measure prism-measure--center">
        Cancer cell line models remain essential in drug development, providing a controlled system
        to assess potency and confirm on-target engagement. At a larger scale using PRISM, these
        models provide power to
        <span class="text-gradient-blue">understand heterogeneity</span> in drug response among cell
        lines harboring the targeted alteration(s), assess
        <span class="text-gradient-blue"
          >selectivity relative to those without target alterations, and investigate potential
          biomarkers associated with these responses</span
        >.
      </p>
      <HomeOverviewCards class="mt-4"></HomeOverviewCards>
    </page-section>

    <page-section width="wide" background="blue-indigo-dark">
      <HomePortal></HomePortal>
    </page-section>

    <!-- Showcase sections with display headings get the band rhythm (96px apart). -->
    <page-section width="default" :padding="12">
      <h2 class="prism-text-overline text-amber-accent-4 mb-2 text-center">Impact</h2>
      <h3 class="prism-text-display-large mb-8 text-center">
        Dedicated to advancing oncology research
      </h3>
      <p class="prism-text-body-large text-center prism-measure prism-measure--center">
        Working with pharmaceutical and biotech companies and academics to improve the outcome for
        cancer patients worldwide.
      </p>
      <HomeImpactCards class="mt-4"></HomeImpactCards>
    </page-section>

    <page-section width="default" :padding="12">
      <h2 class="prism-text-overline text-amber-accent-4 mb-2 text-center">Testimonials</h2>
      <h3 class="prism-text-display-large text-center">What our collaborators say</h3>
      <HomeTestimonialCards class="mt-4"></HomeTestimonialCards>
    </page-section>
  </page>
</template>
<script>
  import HomeHero from '@/pages/index/HomeHero.vue';
  import { ASSET_BASE } from '@/utils/assets';
  import HomeOverviewCards from '@/pages/index/HomeOverviewCards.vue';
  import HomeTestimonialCards from '@/pages/index/HomeTestimonialCards.vue';
  import HomeImpactCards from '@/pages/index/HomeImpactCards.vue';
  import HomePortal from '@/pages/index/HomePortal.vue';
  export default {
    components: {
      HomeHero,
      HomePortal,
      HomeOverviewCards,
      HomeTestimonialCards,
      HomeImpactCards,
    },
    computed: {
      imgPath() {
        return ASSET_BASE;
      },
      mobile() {
        return this.$vuetify.display.mobile;
      },
    },
  };
</script>
