<template>
  <div>
    <div class="bg-hero" style="position: relative;">
      <v-container fluid :style="{paddingTop: heroPadding, minHeight: heroMinHeight, zIndex: 1}">
        <v-row>
          <v-col cols="12" xs="12" sm="8" md="7" lg="7" xl="7">
            <h1 class="text-h1">Accelerate the understanding of cancer treatments </h1>
            <p class="text-h5">Rapid, comprehensive cancer drug-sensitivity screening enhanced by predictive modeling</p>
          </v-col>
        </v-row>
      </v-container>
    </div>
   
    <div class="bg-gradient" style="position: relative;">
      <v-container fluid>
        <h2 class="text-h3">PRISM multiplexed viability screening with over 900 genomically characterized cell lines.</h2>
        <v-row>
            <v-col cols="auto" xs="12" sm="12" md="3" lg="3" xl="3">
              <v-card :style="{ minHeight: cardHeight + 'px' }">
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
                  <v-btn class="text-subtitle-1" color="primary" variant="outlined" rounded> Learn more <v-icon>mdi-arrow-right-thin</v-icon></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="auto" xs="12" sm="12" md="3" lg="3" xl="3">
              <v-card :style="{ minHeight: cardHeight + 'px' }">
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
                  <v-btn class="text-subtitle-1" color="primary" variant="outlined" rounded>
                    Learn more 
                    <v-icon>mdi-arrow-right-thin</v-icon>
                </v-btn>
              </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="auto" xs="12" sm="12" md="3" lg="3" xl="3">
              <v-card :style="{ height: cardHeight + 'px' }">
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
                  <v-btn class="text-subtitle-1" color="primary" variant="outlined" rounded>
                    Learn more 
                    <v-icon>mdi-arrow-right-thin</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="auto" xs="12" sm="12" md="3" lg="3" xl="3">
              <v-card :style="{ height: cardHeight + 'px' }">
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
    </div>
    <v-container fluid class="container-basic">
      <p class="text-h3">Over <span class="primary-text">150 leading academic and industry partners</span>  have trusted PRISM to transform their research.</p>
    </v-container>


  </div>
</template>
<script>
  export default {
    mounted () {
      console.log(this.$vuetify.display.mobile)
      console.log(this.$vuetify.theme.themes.light.colors.primary)
      console.log(this.$vuetify.theme.themes.light)
    },
    computed: {
      mobile () {
        return this.$vuetify.display.mobile
      },
      heroPadding () {
        return this.mobile ? '64px' : '64px'
      },
      heroMinHeight () {
        return 'calc(75vh - 30px)' // update to include navbar?
       // return this.mobile ? 'calc(90vh - 64px)' : 'calc(90vh - 64px)' // this is arbitrary but will be adjusted
      },
      cardHeight () {
        return 500;
     //   return this.mobile ? 200 : 300
        // let heights = Array.from(document.querySelectorAll('.v-card')).map(card => card.clientHeight);
        // return Math.max(...heights);
      }
    }
  }
</script>

<style scoped lang="scss">
  .primary-text {
    color: var(--v-primary);
  }
  .bg-hero {
    width: 100%;
    background: url( '../assets/hero-desktop.png') no-repeat center center;
    background-size: cover;
  }
  .bg-gradient {
    width: 100%;
    min-height: 70vh;
    background: linear-gradient(300deg, rgba(190, 219, 255, .02), rgba(190, 219, 255, .5));
  }
 .v-container{
    width:80%;
    padding-top:64px;
    padding-bottom:64px;
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