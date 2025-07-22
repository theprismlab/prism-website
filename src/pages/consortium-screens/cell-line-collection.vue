<template>
<page>
  <container-sm>
    <page-title>Cell line collection</page-title>
      <p class=text-body-1>
        Our cell line collection contains over 900 DNA barcoded cell lines that represent over 45 major types of cancer and wide genomic diversity. Among them, our collection includes a significant number of pediatric cancer cell lines, as well as over 100 hematopoietic cell lines. Our cell lines are our most important asset, and we therefore take great pride in the quality of our cell lines.
      </p>
  </container-sm>

  <container-md>  
    <v-row>
      <v-col v-for="(card, index) in cellLineCards" :key="index" cols="12" xs="6" sm="6" md="3" lg="3" xl="3">
        <stat-card :index="index" :title="card.title" :subtitle="card.subtitle" :showIcon="false"></stat-card>
      </v-col>
    </v-row>
  </container-md>

  <container-sm class="mt-6 mb-12">
    <v-card class="py-6" variant="outlined" color="grey-lighten-2">
      <v-card-item>
        <v-img  style="max-width:800px; margin: auto;" :src="`${imgPath}img-kb-1.2-step-1.svg`" alt="Cell Line Collection"></v-img>
      </v-card-item>

    </v-card>
      
  </container-sm>

  <container-sm class="mt-12 mb-12">
    <h2 class="text-h3 text-black">All of our cell lines are:</h2>
      <v-list class="mt-6" style="background-color: transparent;">
        <v-list-item v-for="item in checklist" :key="checklist">
          <template v-slot:prepend>
            <v-icon class="text-success-accent-4">mdi-check</v-icon>
          </template>
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
  </container-sm>

  <container-sm class="mt-12 mb-12">
    <v-row>
      <v-col>
        <h2 class="text-h3">Cell sets in PRISM screens</h2>
        <p class="text-body-1">
          PRISM’s collection of over 900 cell lines is screened for all standard PRISM experiments and is divided into two cell sets:
        </p>
        <v-list class="mb-6" lines="auto" style="max-width:500px;">
              <v-divider/>
          <v-list-item
          title="PR2025A"
          subtitle="20 fastest pools"/>
          <v-divider/>
          <v-list-item
            title="PR2025B"  
            subtitle="20 slowest pools"/>
          <v-divider/>
          <v-list-item
          class="mt-4"
            subtitle="All 40 pools are used in our 5-day consortium screens"/>
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
</page>
</template>

<script>
  export default {
    name: "CellLineCollection",

  computed:{
    imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/" : "../../public/images/"
        },
    },
    data() {
      return {
        cellLineCards: [
        {
                    title: "900+",
                    subtitle: "Cancer cell lines",
                },
                {
                    title: "45+",
                    subtitle: "Lineages",
                },
                {
                    title: "80+",
                    subtitle: "Subtypes",
                },
                {
                    title: "100+",
                    subtitle: "Hematopoietic /<br> Pediatric",
                }
        ],
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
