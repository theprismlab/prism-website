<template>
  <page>
    <app-container>
      <prism-page-title>Cell line collection</prism-page-title>
      <p class="text-body-1">
        Our cell line collection contains over 900 DNA barcoded cell lines that represent over 45
        major types of cancer and wide genomic diversity. Among them, our collection includes a
        significant number of pediatric cancer cell lines, as well as over 100 hematopoietic cell
        lines. Our cell lines are our most important asset, and we therefore take great pride in the
        quality of our cell lines.
      </p>
    </app-container>

      <app-container wide>
        <cell-line-stats />
      </app-container>

    <page-section background="muted" :padding="10">
      <app-container>
        <section-overline class="text-center">Methodology</section-overline>
        <h2 class="prism-text-h3 text-center">Cell line barcoding and pooling workflow</h2>
        <p class="prism-text-body-1 text-center mx-auto mb-8" style="max-width: 560px">
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

    <app-container class="mb-12">
      <v-card class="checklist-card" elevation="0">
        <h2 class="prism-text-h3 mb-0">All of our cell lines are:</h2>
        <v-list class="mt-2 checklist-list">
          <v-list-item v-for="item in checklist" :key="item">
            <template v-slot:prepend>
              <v-icon class="text-success-accent-4 mr-1">mdi-check-circle-outline</v-icon>
            </template>
            <v-list-item-title class="text-wrap">{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </app-container>

    <app-container class="mt-12 mb-12">
      <h2 class="prism-text-h3">Cell sets in PRISM screens</h2>
      <p class="prism-text-body-1">
        PRISM’s collection of over 900 cell lines is screened for all standard PRISM experiments and
        is divided into two cell sets:
      </p>
      <v-list class="mb-6" lines="auto" style="max-width: 500px">
        <v-list-item title="PR2025A" subtitle="20 fastest pools" />
        <v-divider />
        <v-list-item title="PR2025B" subtitle="20 slowest pools" />

        <v-list-item
          class="mt-4"
          subtitle="All 40 pools are used in our 5-day consortium screens"
        />
      </v-list>

      <p class="prism-text-body-1">
        See a full annotated list of our
        <a
          href="https://assets.clue.io/prism/PRISM-PR2025-Cell-Line-Info_1-21-25.xlsx"
          target="_blank"
          >PRISM barcoded cell lines <v-icon size="small">mdi-download</v-icon> </a
        >.
      </p>
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
</style>
