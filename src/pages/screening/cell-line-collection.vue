<template>
<page>
  <container-sm>
    <page-title>Cell line collection</page-title>
    <p class=text-body-1>Our cell line collection contains over 900 DNA barcoded cell lines that represent over 45 major types of cancer and the genomic diversity of existing two dimensional cell line models. We have a large number of pediatric cancer cell lines as well as over 100 hematopoietic cell lines. Our cell lines are our most important asset and we therefore take great pride in the quality of our cell set. 
      <br><br>
      </p>
      <v-row>
        <v-col cols="6" xs="6" sm="6" md="5" lg="3" xl="3"  v-for="(card, index) in cards" :key="index">
          <v-card class="pa-2 pb-5 fill-height" elevation="1">
            <v-card-title style="line-height: 1.2em !important;" class="pb-0 text-size-h2">{{card.number}}</v-card-title>
            <v-card-subtitle style="opacity: 1;" class="text-overline text-primary-accent-2 text-none font-weight-medium">{{card.caption}}</v-card-subtitle>
          </v-card>
        </v-col>  
      </v-row>
  </container-sm>

  <page-gradient class="gradient-primary section-margin-default mt-0">
    <container-sm>
      <v-row >
        <v-col>
          <v-card class="pa-2 fill-height" style="background: none;" elevation="0" >
            <v-card-item>
                <v-list dense style="background-color: transparent;">
                  <h4>All of our cell lines are: </h4>
                  <v-list-item v-for="item in checklist" :key="checklist">
                    <v-list-item-title><v-icon class="mr-4 text-success-accent-4"> mdi-check-circle</v-icon>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-card-item>
        </v-card>
        </v-col>
      </v-row>
    </container-sm>
  </page-gradient>

  <section class="section-margin-default">
    <container-sm>
      <v-row>
        <v-col>
          <h3>Cell sets in PRISM screens</h3>
          <p class="text-body-1">
            The PR1000 cell set contains the full collection of PRISM cell lines and is screened for all standard PRISM experiments. <br><br>
            This PR1000 collection is divided into two cell sets:
          </p>
          <v-card class="pa-2" elevation="0" >
            <v-card-item>

          <v-list>
            <v-list-item>
                <v-list-item-title><v-icon style="font-size: 0.6em;" class="mr-4 text-black">mdi-circle</v-icon><span class="font-weight-bold"> PR500:</span> 488 solid tumor adherent cell lines</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title><v-icon style="font-size: 0.6em;" class="mr-4 text-black">mdi-circle</v-icon><span class="font-weight-bold"> PR300+:</span>  431 hematopoietic, solid tumor, and pediatric cell lines</v-list-item-title>
              </v-list-item>
          </v-list>
            </v-card-item>
          </v-card>

          <p class="text-body-1">
            See a full annotated list of our <a class="text-button" href="https://assets.clue.io/prism/PRISM-PR2025-Cell-Line-Info_1-21-25.xlsx" target="_blank">PRISM barcoded cell lines <v-icon>mdi-download</v-icon></a>.
          </p>
        </v-col>
      </v-row>
    </container-sm>
  </section>
</page>
</template>

<script>
  export default {
    data() {
      return {
        cards: [
          {
            caption: "Cancer cell lines",
            number: "900+"
          },
          {
            caption: "Lineages",
            number: "45+"
          },
          {
            caption: "Subtypes",
            number: "80+"
          },
          {
            caption: "Hematopoietic / Pediatric",
            number: "100+"
          }
        ],
        checklist: [
          "Grown in antibiotic-free RPMI 1640 media",
          "Mycoplasma negative",
          "STR fingerprinted to verify each cell lines identity",
          "Sequence verified to confirm each cell lines’ unique 24-nucleotide barcode is correct",
          "Mixed together by doubling time into pools of 20-25 cell lines. Pools of cell lines are then frozen in Assay-ready pools so they can be easily thawed for screening."
        ]
      }
    },
  }
</script>
