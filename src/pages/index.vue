<template>
  <page class="mt-0">
  
    <section style="position: relative; height: 75vh; width: 100%;">
      <ThreeJsViabilityHeatmap :key="resizeCounter"/>
      <div style="position:absolute; width: 100%; height:100%;">
        <v-container class="fill-height">
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="6" lg="6" xl="5" class="d-flex justify-center flex-column">
            <page-title><span class="text-h1">Revolutionize cancer drug discovery</span></page-title>
            <p class="text-h4  font-weight-medium">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</p>
          </v-col>
        </v-row>
      </v-container>
      </div>
    </section>
  
    <our-technology/>
    <our-portal/>
    <testimonials/>
    <!-- <page-gradient class="section-padding-default" background="gradient-primary">
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="5">
            <section-overline>Testimonials</section-overline>
            <section-title>We are excited to collaborate with you</section-title>
          </v-col>
          <v-col>
            <v-row>
                <v-col cols="12" md="10" lg="12" xl="12">
                  <v-list style="background: transparent; "lines="auto">
                   <v-list-item v-for="each in testimonial_cards">
                      <v-list-item-title class="font-weight-medium">
                        <svg-icon type="mdi" :path="quoteOpenSvg" class="text-primary-lighten-3"></svg-icon>
                        {{each.text}}
                        <svg-icon type="mdi" :path="quoteCloseSvg" class="text-primary-lighten-3"></svg-icon>
                      </v-list-item-title>
                      <v-list-item-subtitle class="pt-2 text-black text-opacity-1">
                        {{each.name}}<br>
                        {{each.title}}<br>
                        {{each.company}}
                      </v-list-item-subtitle>
                      <v-divider class="mt-4 mb-4"></v-divider>
                    </v-list-item>
                  </v-list>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>     
    </page-gradient> -->
  
    <gradient-dark>
      <v-container>
        <div class="d-flex flex-row">
          <h3 class="text-h4 mr-6">Interested in collaborating?</h3>
          <v-btn class="" to="/screening/collaborate">Learn more</v-btn>
        </div>
      </v-container>
    </gradient-dark>
  
    <section class="section-padding-default">
      <v-container>
        <v-row class="mt-0 mb-8">
          <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="5">
            <section-overline>Our Impact</section-overline>
            <section-title>Dedicated to advancing oncology research</section-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="each in prism_impact_cards" :key="each.value" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="pa-4 pb-8 fill-height" max-width="600px" elevation="1">
              <v-card-title style="line-height: 1.2em !important;" class="pb-0 text-size-h2">{{each.value}}</v-card-title>
              <v-card-subtitle style="opacity: 1;" class="text-overline text-primary text-none font-weight-medium">{{each.caption}}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  
  </page>
  </template>
  <script>
  import * as content from '@/utils/content.js'
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiFormatQuoteOpen } from '@mdi/js';
  import { mdiFormatQuoteClose } from '@mdi/js';
  import OurPortal from '@/components/sections/OurPortal.vue'
  import OurTechnology from '@/components/sections/OurTechnology.vue'
  
  export default {
    components: {
      SvgIcon
    },
    data() {
      return {
        quoteOpenSvg: mdiFormatQuoteOpen,
        quoteCloseSvg: mdiFormatQuoteClose,
        resizeCounter: 0,
        prism_impact_cards: content.prism_impact_cards(),
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