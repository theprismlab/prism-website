<template>
  <page class="mt-0 pt-0">
    <HomeHero></HomeHero>

    <page-section background="multi-focal-cool" :padding="16">
      <app-container>
        <p class="prism-text-display-medium text-center">
          Our lab partners with researchers to
          <span class="text-gradient-blue"
            >reveal clinically important differences in drug behavior</span
          >
          by screening over 900 cancer cell lines and correlating the viability results with
          baseline and functional genomic features
        </p>
      </app-container>
    </page-section>

    <app-container class="my-12">
      <p class="prism-text-body-xlarge" style="max-width: 720px; margin: auto">
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
    </app-container>

    <app-container wide class="my-12">
      <HomeOverviewCards></HomeOverviewCards>
    </app-container>

    <page-section background="gradient">
      <app-container wide>
        <HomePortal></HomePortal>
      </app-container>
    </page-section>

    <page-section class="my-12" :padding="0">
      <app-container>
        <section-overline class="text-center">Impact</section-overline>
        <prism-section-title class="text-center"
          >Dedicated to advancing oncology research</prism-section-title
        >
        <p class="prism-text-body-1 text-center">
          Working with pharmaceutical and biotech companies and academics to improve the outcome for
          cancer patients worldwide.
        </p>
        <HomeImpactCards></HomeImpactCards>
      </app-container>
    </page-section>

    <page-section class="my-12" :padding="0">
      <app-container>
        <section-overline class="text-center">Testimonials</section-overline>
        <HomeTestimonialCards class="pt-8"></HomeTestimonialCards>
      </app-container>
    </page-section>
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
