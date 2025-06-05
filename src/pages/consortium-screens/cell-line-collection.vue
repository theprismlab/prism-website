<template>
<page>
  
  <container-sm>
    <page-title>Cell line collection</page-title>
      <p class=text-body-1>
        Our cell line collection contains over 900 DNA barcoded cell lines that represent over 45 major types of cancer and wide genomic diversity. Among them, our collection includes a significant number of pediatric cancer cell lines, as well as over 100 hematopoietic cell lines. Our cell lines are our most important asset, and we therefore take great pride in the quality of our cell lines.
      </p>
      <cell-line-collection-cards></cell-line-collection-cards>
      <v-row>
        <v-col>

        </v-col>
      </v-row>
  </container-sm>

  <page-gradient class="gradient-primary section-margin-default mt-0">
    <container-sm>
      <h2 class="text-h3">All of our cell lines are:</h2>
        <v-list style="background-color: transparent;">
          <v-list-item v-for="item in checklist" :key="checklist">
            <template v-slot:prepend>
              <v-icon class="text-success-accent-4"> mdi-check-circle</v-icon>
            </template>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
    </container-sm>
  </page-gradient>

  <section class="section-margin-default">
    <container-sm>
      <v-row>
        <v-col>
          <h2 class="text-h3">Cell sets in PRISM screens</h2>
          <p class="text-body-1">
            PRISM’s collection of over 900 cell lines is screened for all standard PRISM experiments and is divided into two cell sets:
          </p>
              <v-list class="mb-6" lines="auto">
                <v-list-item
                title="PR2025A"
                subtitle="20 fastest pools"
                >
                <!-- <template v-slot:prepend>
                  <v-icon class="text-success-accent-4"> mdi-numeric-1-circle</v-icon>
                </template> -->
                </v-list-item>
                <v-list-item
                  title="PR2025B"  
                  subtitle="20 slowest pools"
                >
                </v-list-item>
                <v-list-item
                  subtitle="All 40 pools are used in our 5-day consortium screens"
                >
                </v-list-item>
            </v-list>
          <p class="text-body-1">
            See a full annotated list of our 
            <icon-link
              icon="mdi-download"
              href="https://assets.clue.io/prism/PRISM-PR2025-Cell-Line-Info_1-21-25.xlsx"
              target="_blank"
              text="PRISM barcoded cell lines"
            />.
          </p>
        </v-col>
      </v-row>
    </container-sm>
  </section>
</page>
</template>

<script>
// import SvgIcon from '@jamescoyle/vue-icon';
// import { mdiNumeric1Circle } from '@mdi/js';

  export default {
    name: "CellLineCollection",
  //   components: {
  //   SvgIcon
  // },
    data() {
      return {
        // mdiNumeric1CirclePath: mdiNumeric1Circle,
        checklist: [
          "Grown in antibiotic-free RPMI 1640 media",
          "Mycoplasma negative",
          "STR fingerprinted to verify each cell line's identity",
          "Mixed by doubling time into pools of 20-25 cell lines. Pools of cell lines are then frozen in Assay-ready pools so they can be easily thawed for screening"
        ]
      }
    },
  }
</script>
