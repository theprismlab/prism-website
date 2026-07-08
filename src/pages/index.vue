<template>
  <page class="mt-0 pt-0">
    <HomeHero></HomeHero>

    <page-section background="multi-focal-cool" :padding="16">
      <app-container>
        <p class="prism-text-display-small text-center">
          Our lab partners with researchers to
          <span class="text-gradient-blue"
            >reveal clinically important differences in drug behavior</span
          >
          by screening over 900 cancer cell lines and correlating the viability results with
          baseline and functional genomic features
        </p>
      </app-container>
    </page-section>

    <app-container wide class="my-10">
      <p class="prism-text-body-large" style="max-width: 720px; margin: auto">
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
    </app-container>

    <page-section background="blue-indigo-dark">
      <app-container wide>
        <HomePortal></HomePortal>
      </app-container>
    </page-section>

    <app-container class="my-10">
      <h2 class="prism-text-overline text-amber-accent-4 mb-2 text-center">Impact</h2>
      <h3 class="prism-text-display-large mb-8 text-center">
        Dedicated to advancing oncology research
      </h3>
      <p class="prism-text-body-large text-center" style="max-width: 720px; margin: auto">
        Working with pharmaceutical and biotech companies and academics to improve the outcome for
        cancer patients worldwide.
      </p>
      <HomeImpactCards class="mt-4"></HomeImpactCards>
    </app-container>

    <app-container class="my-10">
      <h2 class="prism-text-overline text-amber-accent-4 mb-2 text-center">Testimonials</h2>
      <h3 class="prism-text-display-large text-center">What our collaborators say</h3>
      <HomeTestimonialCards class="mt-4"></HomeTestimonialCards>
    </app-container>
  </page>
</template>
<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import HomeHero from '@/pages/index/HomeHero.vue';
  import { ASSET_BASE } from '@/utils/assets';
  import HomeOverviewCards from '@/pages/index/HomeOverviewCards.vue';
  import HomeTestimonialCards from '@/pages/index/HomeTestimonialCards.vue';
  import HomeImpactCards from '@/pages/index/HomeImpactCards.vue';
  import HomePortal from '@/pages/index/HomePortal.vue';
  export default {
    components: {
      SvgIcon,
      HomeHero,
      HomePortal,
      HomeOverviewCards,
      HomeTestimonialCards,
      HomeImpactCards,
    },
    data() {
      return {
        resizeCounter: 0,
      };
    },
    created() {
      window.addEventListener('resize', this.debounce(this.onWindowResize));
    },
    destroyed() {
      window.removeEventListener('resize', this.onWindowResize);
    },
    computed: {
      imgPath() {
        return ASSET_BASE;
      },
      mobile() {
        return this.$vuetify.display.mobile;
      },
    },
    methods: {
      debounce(func) {
        var timer;
        return function (event) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(func, 100, event);
        };
      },
      onWindowResize() {
        this.resizeCounter++;
      },
    },
    watch: {},
  };
</script>
