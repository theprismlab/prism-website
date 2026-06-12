<template>
  <page>
    <container-sm>
      <prism-page-title>Cell line collection</prism-page-title>
      <p class="text-body-1">
        Our cell line collection contains over 900 DNA barcoded cell lines that represent over 45
        major types of cancer and wide genomic diversity. Among them, our collection includes a
        significant number of pediatric cancer cell lines, as well as over 100 hematopoietic cell
        lines. Our cell lines are our most important asset, and we therefore take great pride in the
        quality of our cell lines.
      </p>
    </container-sm>

    <page-section background="tinted" :padding="6">
      <container-md>
        <cell-line-stats />
      </container-md>
    </page-section>

    <container-sm class="mt-6 mb-12">
      <v-img
        eager
        style="max-width: 800px; margin: auto"
        :src="`${imgPath}img-kb-1.2-step-1.svg`"
        alt="Cell Line Collection"
      ></v-img>
    </container-sm>

    <container-sm class="mb-12">
      <h2 class="prism-text-h3 text-black">All of our cell lines are:</h2>
      <v-list class="mt-6" style="background-color: transparent">
        <v-list-item v-for="item in checklist" :key="checklist">
          <template v-slot:prepend>
            <v-icon class="text-success-accent-4">mdi-check</v-icon>
          </template>
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </container-sm>

    <container-sm class="mt-12 mb-12">
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
    </container-sm>
  </page>
</template>

<script>
  import { ASSET_BASE } from '@/utils/assets';
  import CellLineStats from '@/components/sections/CellLineStats.vue';

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

<style scoped></style>
