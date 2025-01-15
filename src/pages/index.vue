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
        <h2 class="text-h3">PRISM multiplexed viability screening with over 900 genomically characterized cell lines.</h2>
    
        <v-row :style="{ marginTop: ySpacer, marginBottom: ySpacer }">
          <v-col>
            <v-card>
              <v-card-title> 900+ cancer cell lines barcoded and pooled</v-card-title>
              <v-card-text>
                Hematopoietic and solid tumor, covering 80 cancer subtypes
              </v-card-text>
              <v-img
                height="220"
                alt="prism cell lines graphic"
                src="../assets/prism-main-01-cell-lines.png"
              ></v-img>
              <v-card-actions>
                <v-btn color="primary" variant="outlined" rounded> Learn more <v-icon>mdi-arrow-right-thin</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>Viability profile and genomic characterization</v-card-title>
              <v-card-text>
                Generate univariate and multivariate predictive models comparing PRISM viability profile with Dependency Map features
              </v-card-text>
              <v-img
                height="220"
                alt="prism viability profile graphic"
                src="../assets/prism-main-02-viability.png"
              ></v-img>
              <v-card-actions>
                <v-btn color="primary" variant="outlined" rounded>
                  Learn more 
                  <v-icon>mdi-arrow-right-thin</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>Identify target and patient population of your drug</v-card-title>
              <v-card-text>
                Confirm hypothesis and establish biomarkers of sensitivity and resistance
              </v-card-text>
              <v-img
                height="220"
                alt="prism discover graphic"
                src="../assets/prism-main-03-discover.png"
              ></v-img>
              <v-card-actions>
                <v-btn color="primary" variant="outlined" rounded>
                  Learn more 
                  <v-icon>mdi-arrow-right-thin</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>Explore your data on the PRISM Portal</v-card-title>
              <v-card-text>
                Securely browse and discover insights from your screening results with interactive visualizations
              </v-card-text>
              <v-img
                height="220"
                alt="prism portal graphic"
                src="../assets/prism-main-04-portal.png"
              ></v-img>
              <v-card-actions>
                <v-btn color="primary" variant="outlined" rounded>
                  Learn more 
                  <v-icon>mdi-arrow-right-thin</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </page-gradient>
    <page-section>
      <v-container>
        <p class="text-h3">Over <span class="primary-text">150 leading academic and industry partners</span>  have trusted PRISM to transform their research.</p>
      </v-container>
    </page-section>
  </div>
</template>
<script>
  export default {
    mounted () {
      console.log(this.$vuetify.display.mobile)
      console.log(this.$vuetify.theme.themes.light.colors.primary)
      console.log(this.$vuetify.theme.themes.prismTheme.variables)
      this.setMaxCardHeight()
    },
    computed: {
      mobile () {
        return this.$vuetify.display.mobile
      },
      heroMinHeight () {
        return 'calc(70vh - 50px)' // update to include navbar?
      },
      ySpacer () {
        return this.$vuetify.theme.themes.prismTheme.variables['y-spacer'] + 'px'
      }
    },
    methods: {
      setMaxCardHeight () {
        const cards = this.$el.querySelectorAll('.v-card');
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
  }
</script>

<style scoped lang="scss">
  .primary-text {
    color: var(--v-primary);
  }


 .v-container{
    width:80%;
    max-width:1900px;
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
</style>