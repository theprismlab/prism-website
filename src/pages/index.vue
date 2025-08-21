<template>
  <page class="mt-0">
    <section style="position: relative; height: 85vh; width: 100%;">
      <ThreeJsViabilityHeatmap :key="resizeCounter"/>

      <!-- <ThreeJsSpheres10/> -->

      <div style="position:absolute; width: 100%; height:100%;">
        <v-container class="fill-height pt-10">
          <v-row justify="center" align="top" style="height:100%; width:100%;">
          <div style="max-width:1000px;"class="text-center">

                <h1 class="text-xl mb-12 pb-4">Pioneering large-scale, cancer therapeutic mapping</h1>
                <h2 class="text-h3">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</h2>
          
          </div>
             

          </v-row>
        </v-container>
      </div>
    </section>

      <container-xs>
           <p class="text-h3 text-center">Our lab partners with researchers to reveal clinically important differences in drug behavior by screening over 900 cancer cell lines and correlating the viability results with baseline and functional genomic features </p>
      </container-xs>
      <container-xs>
          <p class="text-body-1"> 
              Cancer cell line models remain essential in drug development, providing a controlled system to assess potency and confirm on-target engagement. At a larger scale using PRISM, these models provide power to <span class="text-emphasize">understand heterogeneity</span> in drug response among cell lines harboring the targeted alteration(s), assess <span class="text-emphasize">selectivity relative to those without target alterations, and investigate potential biomarkers associated with these responses</span>.
            </p>
      </container-xs>
      
      <MainVisual></MainVisual>
      <our-portal></our-portal>

      <container-xs class="my-12">
        <section-overline>Impact</section-overline>
        <section-title>Dedicated to advancing oncology research</section-title>
        <p class="text-body-1">Working with pharmaceutical and biotech companies and academics to improve the outcome for cancer patients worldwide. </p>
        <v-row class="mt-12">
          <v-col v-for="(card, index) in ourImpactCards" :key="card.title" cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
              <stat-card :index="index" :title="card.title" :subtitle="card.subtitle" :icon="card.icon"></stat-card>
          </v-col>
        </v-row>
      </container-xs>

      <container-xs class="my-12">
        <section-overline>Testimonials</section-overline>
        <v-row class="mt-6 mb-6">  
          <v-col v-for="(card, index) in testimonialCards" :key="index" cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
              <testimonial-card :index="index" :card="card"></testimonial-card>
          </v-col>
        </v-row>
      </container-xs>  
  </page>
  </template>
  <script>
  import * as content from '@/utils/content.js'
  import SvgIcon from '@jamescoyle/vue-icon';
  // import { mdiFormatQuoteOpen } from '@mdi/js';
  // import { mdiFormatQuoteClose } from '@mdi/js';
  import OurPortal from '@/components/sections/OurPortal.vue'


import { mdiHexagonMultiple } from '@mdi/js';
import { mdiFileMultipleOutline } from '@mdi/js';
import { mdiAccountGroup } from '@mdi/js';
  
  export default {
    components: {
      SvgIcon
    },
    data() {
      return {
        resizeCounter: 0,
        ourImpactCards: [
            {
              title: "150+",
              subtitle: "Academic and industry partners",
              icon: {
                path: mdiAccountGroup,
                color: "white",
                backgroundColor: "var(--v-red-accent-2)",
                size: 54,
                borderRadius: "50%"
              },
            },
            {
              title: "7,000+",
              subtitle: "Compounds screened in over 500 cell lines",
              icon: {
                path: mdiHexagonMultiple,
                color: "white",
                backgroundColor: "var(--v-secondary-accent-4)",
                size: 54,
                borderRadius: "50%"
              },
            },
            {
              title: "40+",
              subtitle: "Publications in high-impact journals",
              icon: {
                path: mdiFileMultipleOutline,
                color: "white",
                backgroundColor: "var(--v-teal-accent-4)",
                size: 54,
                borderRadius: "50%"
              }
            },
        ],
        testimonialCards: [
          {
              quote: "I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.",
              author: "Florian Muller",
              company: "Head of Chemistry<br>Lindonlight Collective"

          },
          {
              quote: "The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our research process.",
              author: "Discovery Oncology Scientist",
              company: "Fortune 500<br>Pharmaceutical Company"
          }
        ]
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

.text-xl{
  font-size: 4.25rem;
  line-height: 1.1em;
}
      /* xs */
      @media (max-width: 600px) {
     
        .text-xl{
          font-size: 3.5rem;
        }
      }

  </style>