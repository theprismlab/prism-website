<template>
<page>
  <container-sm>
    <h2 class="title">Cell line collection</h2>
      <p class=text-body-1>Our cell line collection contains over 900 DNA barcoded cell lines that represent over 45 major types of cancer and the genomic diversity of existing two dimensional cell line models. We have a large number of pediatric cancer cell lines as well as over 100 hematopoietic cell lines. Our cell lines are our most important asset and we therefore take great pride in the quality of our cell set. 
      </p>
    <page-section>
      <v-row>
        <v-col cols="6" xs="6" sm="6" md="5" lg="3" xl="3"  v-for="card in cards" :key="card.suptitle">
          <v-card class="pa-2 fill-height" elevation="1">
            <v-card-text style="line-height: 1em !important;" class="mb-0 pb-0  text-size-h2">{{card.number}}</v-card-text>
            <v-card-title class="mt-0  pt-0 text-overline text-primary">{{card.suptitle}}</v-card-title>
          </v-card>
        </v-col>  
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-2 fill-height" elevation="0" >
            <v-card-item>
                <v-list dense style="background-color: transparent;">
                  <v-list-subheader class="text-overline">Cell line collection</v-list-subheader>
                  <v-list-item v-for="item in checklist" :key="checklist">
                 
                    <v-list-item-title><v-icon class="mr-4 text-success"> mdi-check-circle</v-icon>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-card-item>
         </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Cell sets in PRISM screens</h3>
          <p class="text-body-1">
            The PR1000 cell set contains the full collection of PRISM cell lines and is screened for all standard PRISM experiments. <br><br>
            This PR1000 collection is divided into two cell sets:
           <v-list>
            <v-list-item>
                <v-list-item-subtitle>PR500: 488 solid tumor adherent cell lines</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>PR300+: 431 hematopoietic, solid tumor, and pediatric cell lines</v-list-item-subtitle>
              </v-list-item>
           </v-list>

          </p>
        </v-col>
      </v-row>

    </page-section>
  </container-sm>
</page>
</template>

<script>
  export default {
    data() {
      return {
        cards: [
          {
            suptitle: "Cancer cell lines",
            number: "900+"
          },
          {
            suptitle: "Lineages",
            number: "45+"
          },
          {
            suptitle: "Subtypes",
            number: "80+"
          },
          {
            suptitle: "Hematopoietic / Pediatric",
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
