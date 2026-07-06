<template>
  <page>
    <app-container narrow>
      <prism-page-title>Cell line collection</prism-page-title>
      <p class="prism-text-body-large">
        Our cell line collection contains over 900 DNA barcoded cell lines that represent over 45
        major types of cancer and wide genomic diversity. Among them, our collection includes a
        significant number of pediatric cancer cell lines, as well as over 100 hematopoietic cell
        lines. Our cell lines are our most important asset, and we therefore take great pride in the
        quality of our cell lines.
      </p>
    </app-container>

    <page-section>
      <app-container wide>
        <cell-line-stats />
      </app-container>
    </page-section>

    <page-section background="muted" :padding="10">
      <app-container class="text-center">
        <section-overline>Methodology</section-overline>
        <prism-section-title>Cell line barcoding and pooling workflow</prism-section-title>
        <p class="prism-text-body-large mx-auto mb-8" style="max-width: 560px">
          Each cell line is individually DNA-barcoded, quality-controlled, and mixed by doubling
          time into pools for use in high-throughput PRISM screens.
        </p>
        <v-img
          eager
          style="max-width: 800px; margin: auto"
          :src="`${imgPath}img-kb-1.2-step-1.svg`"
          alt="Cell line barcoding and pooling workflow diagram"
        ></v-img>
      </app-container>
    </page-section>

    <app-container narrow class="my-6">
      <prism-section-title>All of our cell lines are:</prism-section-title>
      <v-list class="mt-2 checklist-list">
        <v-list-item v-for="item in checklist" :key="item">
          <template v-slot:prepend>
            <v-icon class="text-teal-accent-4 mr-1">mdi-check-circle-outline</v-icon>
          </template>
          <v-list-item-title class="text-wrap">{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </app-container>

    <app-container narrow class="my-6">
      <prism-section-title>Cell sets in PRISM screens</prism-section-title>
      <p class="prism-text-body-large">
        PRISM’s collection of over 900 cell lines is screened for all standard PRISM experiments and
        is divided into two cell sets:
      </p>

      <v-row class="my-6" style="max-width: 420px">
        <v-col cols="6">
          <div class="cell-set-card">
            <div class="prism-text-title-large">PR2025A</div>
            <div class="prism-text-body-large text-medium-emphasis">20 fastest pools</div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="cell-set-card">
            <div class="prism-text-title-large">PR2025B</div>
            <div class="prism-text-body-large text-medium-emphasis">20 slowest pools</div>
          </div>
        </v-col>
      </v-row>
      <p class="prism-text-body-large text-medium-emphasis mb-4">
        All 40 pools are used in our 5-day consortium screens
      </p>
      <v-btn
        variant="outlined"
        color="primary"
        rounded
        href="https://assets.clue.io/prism/PRISM-PR2025-Cell-Line-Info_1-21-25.xlsx"
        target="_blank"
        prepend-icon="mdi-download"
        >PRISM barcoded cell lines</v-btn
      >
    </app-container>
  </page>
</template>

<script>
  import { ASSET_BASE } from '@/utils/assets';
  import CellLineStats from './cell-line-collection/CellLineStats.vue';

  export default {
    name: 'CellLineCollection',
    components: { CellLineStats },
    computed: {
      imgPath() {
        return ASSET_BASE;
      },
    },
    data() {
      return {
        checklist: [
          'Grown in antibiotic-free RPMI 1640 media',
          'Mycoplasma negative',
          "STR fingerprinted to verify each cell line's identity",
          'Mixed by doubling time into pools of 20-25 cell lines. Pools of cell lines are then frozen in Assay-ready pools so they can be easily thawed for screening',
        ],
      };
    },
  };
</script>

<style scoped>
  .checklist-card {
    background: color-mix(in srgb, var(--v-success-accent-4) 6%, white);
    border: 1px solid color-mix(in srgb, var(--v-success-accent-4) 20%, white);
    border-left: 4px solid var(--v-success-accent-4);
    border-radius: 12px;
    padding: 28px 32px;
  }

  .checklist-list {
    background: transparent !important;
  }

  .cell-set-card {
    border-left: 3px solid #e0e0e0;
    border-radius: 0px;
    padding: 16px 20px;
    background: #fcfcfc;
  }

  .cell-set-name {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--v-grey-darken-2);
    margin-bottom: 4px;
  }

  .cell-set-detail {
    font-size: 1rem;
    color: var(--v-grey-darken-1);
  }
</style>
