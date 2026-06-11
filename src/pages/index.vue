<template>
  <page class="mt-0 pt-0">
    <HomeHero></HomeHero>
    <container-sm>
      <p class="prism-text-h3 text-center">
        Our lab partners with researchers to reveal clinically important differences in drug
        behavior by screening over 900 cancer cell lines and correlating the viability results with
        baseline and functional genomic features
      </p>
    </container-sm>
    <container-sm>
      <p class="prism-text-body-1">
        Cancer cell line models remain essential in drug development, providing a controlled system
        to assess potency and confirm on-target engagement. At a larger scale using PRISM, these
        models provide power to <span class="text-emphasize">understand heterogeneity</span> in drug
        response among cell lines harboring the targeted alteration(s), assess
        <span class="text-emphasize"
          >selectivity relative to those without target alterations, and investigate potential
          biomarkers associated with these responses</span
        >.
      </p>
    </container-sm>

    <page-section background="muted">
      <container-md>
        <HomeOverviewCards></HomeOverviewCards>
      </container-md>
    </page-section>

    <page-section background="gradient" :padding="8">
      <container-md>
        <our-portal></our-portal>
      </container-md>
    </page-section>

    <container-sm class="my-12">
      <section-overline>Impact</section-overline>
      <prism-section-title>Dedicated to advancing oncology research</prism-section-title>
      <p class="prism-text-body-1">
        Working with pharmaceutical and biotech companies and academics to improve the outcome for
        cancer patients worldwide.
      </p>
      <HomeImpactCards></HomeImpactCards>
    </container-sm>

    <container-sm class="my-12">
      <section-overline>Testimonials</section-overline>
      <HomeTestimonialCards></HomeTestimonialCards>
    </container-sm>
  </page>
</template>
<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiHexagonMultiple } from '@mdi/js';
  import { mdiFileDocumentMultipleOutline } from '@mdi/js';
  import { mdiAccountGroup } from '@mdi/js';
  import HomeHero from '../components/sections/HomeHero.vue';
  import { ASSET_BASE } from '@/utils/assets';
  import HomeOverviewCards from '@/components/sections/HomeOverviewCards.vue';
  import HomeTestimonialCards from '@/components/sections/HomeTestimonialCards.vue';
  import HomeImpactCards from '@/components/sections/HomeImpactCards.vue';
  export default {
    components: {
      SvgIcon,
      HomeHero,
      HomeOverviewCards,
      HomeTestimonialCards,
      HomeImpactCards,
    },
    data() {
      return {
        resizeCounter: 0,
        ourImpactCards: [
          {
            title: '200+',
            subtitle: 'Academic and industry partners',
            icon: {
              path: mdiAccountGroup,
              color: 'white',
              backgroundColor: 'var(--v-red-accent-2)',
              size: 54,
              borderRadius: '50%',
            },
          },
          {
            title: '7,000+',
            subtitle: 'Compounds screened in over 500 cell lines',
            icon: {
              path: mdiHexagonMultiple,
              color: 'white',
              backgroundColor: 'var(--v-secondary-accent-4)',
              size: 54,
              borderRadius: '50%',
            },
          },
          {
            title: '50+',
            subtitle: 'Publications in high-impact journals',
            icon: {
              path: mdiFileDocumentMultipleOutline,
              color: 'white',
              // backgroundColor: "var(--v-teal-accent-4)",
              backgroundColor: 'var(--v-indigo-accent-2)',
              size: 54,
              borderRadius: '50%',
            },
          },
        ],
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

<style scoped lang="scss">
  .hero-section {
    display: grid;
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
  .text-hero {
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 1);
  }
  .text-xl {
    font-size: 4.25rem;
    line-height: 1.1em;
  }
  /* xs */
  @media (max-width: 600px) {
    .text-xl {
      font-size: 3.5rem;
    }
  }
</style>
