<template>
  <div>
    <page-cover-image url="src/assets/hero-desktop.png">
      <v-container :style="{minHeight: heroMinHeight, zIndex: 1}">
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="8" lg="7" xl="6">
            <h1 class="text-h1">Accelerate the understanding of cancer treatments </h1>
            <p class="text-h5">Rapid, comprehensive cancer drug-sensitivity screening enhanced by predictive modeling</p>
          </v-col>
        </v-row>
      </v-container>
    </page-cover-image>
    <page-gradient>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="10" lg="10" xl="8">
          <h2 class="text-h3">PRISM multiplexed viability screening with over 900 genomically characterized cell lines.</h2>
        </v-col>
        </v-row>

        <v-row :style="{ marginTop: ySpacer, marginBottom: ySpacer }">
          <v-col cols="12" xs="12" sm="6" md="6" lg="3" xl="3">
            <v-card class="prism-card">
              <v-card-title> 900+ cancer cell lines barcoded and pooled</v-card-title>
              <v-card-text>
                Hematopoietic and solid tumor, covering 80 cancer subtypes
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" variant="outlined" rounded> Learn more <v-icon>mdi-arrow-right-thin</v-icon></v-btn>
              </v-card-actions>
              <v-img
                :height="cardImgHeight"
                alt="prism cell lines graphic"
                src="../assets/prism-main-01-cell-lines.png"
              ></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6" lg="3" xl="3">
            <v-card class="prism-card">
              <v-card-title>Viability profile and genomic characterization</v-card-title>
              <v-card-text>
                Generate univariate and multivariate predictive models comparing PRISM viability profile with Dependency Map features
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" variant="outlined" rounded>
                  Learn more 
                  <v-icon>mdi-arrow-right-thin</v-icon>
                </v-btn>
              </v-card-actions>
              <v-img
                :height="cardImgHeight"
                alt="prism viability profile graphic"
                src="../assets/prism-main-02-viability.png"
              ></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6" lg="3" xl="3">
            <v-card class="prism-card">
              <v-card-title>Identify target and patient population of your drug</v-card-title>
              <v-card-text>
                Confirm hypothesis and establish biomarkers of sensitivity and resistance
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" variant="outlined" rounded>
                  Learn more 
                  <v-icon>mdi-arrow-right-thin</v-icon>
                </v-btn>
              </v-card-actions>
              <v-img
                :height="cardImgHeight"
                alt="prism discover graphic"
                src="../assets/prism-main-03-discover.png"
              ></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6" lg="3" xl="3">
            <v-card class="prism-card">
              <v-card-title>Explore your data on the PRISM Portal</v-card-title>
              <v-card-text>
                Securely browse and discover insights from your screening results with interactive visualizations
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" variant="outlined" rounded>
                  Learn more 
                  <v-icon>mdi-arrow-right-thin</v-icon>
                </v-btn>
              </v-card-actions>
              <v-img
                :height="cardImgHeight"
                alt="prism portal graphic"
                src="../assets/prism-main-04-portal.png"
              ></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </page-gradient>
    <page-section>
      <v-container>
        <!-- <p class="text-h3">Over <span class="primary-text">150 leading academic and industry partners</span>  have trusted PRISM to transform their research.</p> -->
        <v-row class="d-flex justify-center">
          <v-col>
            <p class="text-h3">Over <span class="primary-text">150 leading academic and industry partners</span>  have trusted PRISM to transform their research.</p>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="elevation-0 quote-card" variant="tonal" color="grey">
                <v-card-text class="text-h6 text-quote">
                “I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.”
              </v-card-text>
              <v-card-item>
                <v-card-subtitle style="color:grey" >
                  <hr class="my-2" style="border-top: 1px solid #c8ccd0">
                  Florian Muller<br>
                Head of Chemistry<br>
                Lindonlight Collective
                </v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="elevation-0 quote-card" variant="tonal" color="grey">
              <v-card-text class="text-h6 text-quote">
                “I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.”
              </v-card-text>
              <v-card-item>
                <v-card-subtitle style="color:grey" >
                  <hr class="my-2" style="border-top: 1px solid #c8ccd0">
                  Discovery Oncology Scientist<br>
                  Fortune 500<br>
                  Pharmaceutical Company
                </v-card-subtitle>
              </v-card-item>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </page-section>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      },
      beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
      },

    computed: {
      mobile () {
        return this.$vuetify.display.mobile
      },
      heroMinHeight () {
        return 'calc(70vh - 50px)' // update to include navbar?
      },
      cardImgHeight () {
        return '200px'
      },
      ySpacer () {
        return this.$vuetify.theme.themes.prismTheme.variables['y-spacer'] + 'px'
      }
    },
    methods: {
      handleResize () {
        this.setMaxCardHeight('prism-card')
        this.setMaxCardHeight('quote-card')
      },
      setMaxCardHeight (className) {
        const cards = this.$el.querySelectorAll(`.${className}`);
        cards.forEach(card => {
          card.style.height = `auto`;
        });
        let maxHeight = 0;
        cards.forEach(card => {
          const cardHeight = card.clientHeight;
          if (cardHeight > maxHeight) {
            maxHeight = cardHeight;
          }
        });
        cards.forEach(card => {
          card.style.height = `${maxHeight}px`;
        });
      }
    },
    watch: {

    }
  }
</script>

<style scoped lang="scss">
  .primary-text {
    color: var(--v-primary);
  }




.v-card-title {
  font-weight: 800;
  margin-bottom: 0.25rem;
  text-overflow: visible;
  white-space: normal;
  word-break: normal;
  word-wrap: initial;
  hyphens: none;
  line-height: 1.2em !important;
}

blockquote:before {
  content: '\0201C';
  font-size: 5rem;
  position: absolute;
  left: -1.8rem;
  top: -1rem;
  color: #c8ccd0;
}

</style>