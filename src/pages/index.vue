<template>
  <page class="mt-0">
    <section style="position: relative; height: 75vh; width: 100%;">
      <ThreeJsViabilityHeatmap :key="resizeCounter"/>
      <div style="position:absolute; width: 100%; height:100%;">
        <v-container class="fill-height">
        <v-row>
          <!-- <v-col cols="12" xs="12" sm="10" md="6" lg="6" xl="5" class="d-flex justify-center flex-column"> -->
            <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
            <page-title><span class="text-h1">Revolutionize cancer drug discovery</span></page-title>
            <p class="text-h4  font-weight-medium">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</p>
          </v-col>
        </v-row>
      </v-container>
      </div>
    </section>
  
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
            <p class="text-h3 text-center">Our lab partners with researchers to reveal clinically important differences in drug behavior by screening over 900 cancer cell lines and correlating the viability results with baseline and functional genomic features </p>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
          <section-overline>Why PRISM</section-overline>
          <p class="text-body-1"> Cancer cell line models remain essential in drug development, providing a controlled system to assess potency and confirm on-target engagement. At a larger scale using PRISM, these models provide power to understand heterogeneity in drug response among cell lines harboring the targeted alteration(s), assess selectivity relative to those without target alterations, and investigate potential biomarkers associated with these responses. </p>

            <our-technology-cards></our-technology-cards>
          </v-col>
      </v-row>
    </v-container>



    <!-- <our-technology></our-technology> -->
    <our-portal></our-portal>
 

    <!-- <gradient-dark>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
            <div class="d-flex align-center justify-start">
              <h3 class="text-h4 mr-6">Interested in collaborating?</h3>
              <v-btn class="" to="/screening/collaborate">Learn more</v-btn>
            </div>
          </v-col>
          </v-row>
      </v-container>
    </gradient-dark> -->
  
    <section class="section-padding-default">
      <v-container>
        <v-row class="mt-0 mb-4">
          <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
            <section-overline>Impact</section-overline>
            <section-title>Dedicated to advancing oncology research</section-title>
            <p class="text-body-1">Working with pharmaceutical and biotech companies and academics to improve the outcome for cancer patients worldwide. </p>
            <our-impact-cards></our-impact-cards>
          </v-col>
        </v-row>
     
      </v-container>
    </section>


    <!-- <testimonials></testimonials> -->

    
    <section class="section-padding-default">
      <v-container>
        <v-row class="mt-0 mb-4">
          <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
            <section-overline>Testimonials</section-overline>
            <testimonial-cards></testimonial-cards>
          </v-col>
      </v-row>
      </v-container>
      </section>

  

  
  </page>
  </template>
  <script>
  import * as content from '@/utils/content.js'
  import SvgIcon from '@jamescoyle/vue-icon';
  // import { mdiFormatQuoteOpen } from '@mdi/js';
  // import { mdiFormatQuoteClose } from '@mdi/js';
  import OurPortal from '@/components/sections/OurPortal.vue'
  import OurTechnology from '@/components/sections/OurTechnology.vue'
  
  export default {
    components: {
      SvgIcon
    },
    data() {
      return {
        // quoteOpenSvg: mdiFormatQuoteOpen,
        // quoteCloseSvg: mdiFormatQuoteClose,
        resizeCounter: 0,
        what_is_prism_cards: [
          content.cell_lines_card,
          content.test_agents_card,
          content.viability_features_card,
          content.discover_card
        ], 
        testimonial_cards: content.testimonial_cards()
      }
    },
    created() {
      window.addEventListener("resize", this.debounce(this.onWindowResize));
  
    },
    destroyed() {
        window.removeEventListener("resize", this.onWindowResize);
    },
    computed: {
      imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/home/" : "../../public/images/home/"
        },
      mobile () {
        return this.$vuetify.display.mobile
      },
    },
    methods: {
      debounce(func){
          var timer;
          return function(event){
            if(timer) clearTimeout(timer);
            timer = setTimeout(func,100,event);
          };
        },
      onWindowResize() {
        this.resizeCounter++;
      },
    },
    watch: {
  
    }
  }
  </script>
  
  <style scoped lang="scss">


  </style>