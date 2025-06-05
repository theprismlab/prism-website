<template>
<page>
  <container-sm>
    <page-title>Cell line collection</page-title>
      <p class=text-body-1>
        Our cell line collection contains over 900 DNA barcoded cell lines that represent over 45 major types of cancer and wide genomic diversity. Among them, our collection includes a significant number of pediatric cancer cell lines, as well as over 100 hematopoietic cell lines. Our cell lines are our most important asset, and we therefore take great pride in the quality of our cell lines.
      </p>
      <v-row>
         <v-col cols="6" xs="6" sm="6" md="5" lg="3" xl="3"  v-for="(card, index) in cards" :key="index">
          <v-card class="pa-2 fill-height" style="background: none;" elevation="0" variant="outlined" color="primary-accent-2">
            <v-card-item class="d-flex flex-column justify-center"> 
              <h2 style="line-height: 1.2em !important;" class="text-h2 font-weight-bold">{{card.number}}</h2>
              <h3 style="opacity: 1; line-height: 1.4em !important;" class="text-overline text-primary-accent-2 text-none font-weight-medium" v-html="card.caption"></h3>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
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
      <!-- <v-row >
        <v-col>
          <v-card class="pa-2 fill-height" style="background: none;" elevation="0" >
            <v-card-item>
              <v-card-title>All of our cell lines are:</v-card-title>

                <v-list style="background-color: transparent;">
                  <v-list-item v-for="item in checklist" :key="checklist">
                    <template v-slot:prepend>
                      <v-icon class="text-success-accent-4"> mdi-check-circle</v-icon>
                    </template>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-card-item>
        </v-card>
        </v-col>
      </v-row> -->
    </container-sm>
  </page-gradient>

  <section class="section-margin-default">
    <container-sm>
      <v-row>
        <v-col>
          <h2 class="text-h3">Cell sets in PRISM screens</h2>
          <p class="text-body-1">
            The PR1000 cell set contains the full collection of PRISM cell lines and is screened for all standard PRISM experiments. 
          This PR1000 collection is divided into two cell sets:
          </p>
              <v-list class="mb-6" lines="auto">
                <v-list-item
                title="PR500"
                subtitle="488 solid tumor adherent cell lines"
                >
                </v-list-item>
                <v-list-item
                  title="PR300+"  
                  subtitle="431 hematopoietic, solid tumor, and pediatric cell lines"
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
            caption: "Hematopoietic /<br> Pediatric",
            number: "100+"
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
