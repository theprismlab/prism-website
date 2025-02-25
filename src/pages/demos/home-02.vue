<template>
<page class="mt-0">

  <section style="position: relative; height: 75vh; width: 100%;">
    <ThreeJsViabilityHeatmap :key="resizeCounter"/>
    <div style="position:absolute; width: 100%; height:100%;">
      <v-container class="fill-height">
      <v-row>
        <v-col cols="12" xs="12" sm="10" md="6" lg="6" xl="5" class="d-flex justify-center flex-column">
          <page-title>Revolutionize cancer drug discovery</page-title>
          <p class="text-h4  font-weight-medium">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</p>
        </v-col>
      </v-row>
    </v-container>
    </div>
  </section>

  <section>
    <v-container>
      <v-row class="mt-0 mb-8">
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
          <section-overline>Our Technology</section-overline>
          <section-title>PRISM is a novel DNA barcoding technology</section-title>
          <p class="text-body-1">Large-scale cancer cell line screening is critical to oncology drug discovery and development to better understand how drugs work. Traditional phenotypic screening tests only one cell line at a time, using a lot of resources to generate data for a small subset of cell lines, resulting in an incomplete understanding of your drug.
          <br><br>
          PRISM barcoding technology enables simultaneous high-throughput viability analysis of over 900 genomically characterized cell lines. Our extensive cell line collection captures the diversity of human cancers to provide a comprehensive evaluation of oncology drug candidates.
          </p>
        </v-col>
      </v-row>
    
      <v-row class="d-flex justify-center">
        <v-col v-for="card in what_is_prism_cards" cols="10" xs="10" sm="6" md="3" lg="3" xl="3">
          <VerticalCard
            :title="card.title"
            :subtitle="card.subtitle"
            :image="`${imgPath}${card.image}`"
            :action="card.action"
          >
          </VerticalCard>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <page-gradient class="section-padding-default" background="gradient-primary">
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="5">
          <section-overline>Our Collaborators</section-overline>
          <section-title>Over 150 leading academic and industry partners</section-title>
          <p>We are excited to collaborate with you to advance the understanding of cancer therapeutics and accelerate the drug discovery process. 
          </p>
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
  </page-gradient>

  <page-gradient background="gradient-stolen">
    <v-container>
      <div class="d-flex flex-row">
        <h3 class="text-h4 mr-6">Interested in collaborating?</h3>
        <v-btn class="" to="/screening/collaborate">Learn more</v-btn>
      </div>
    </v-container>
  </page-gradient>

  <section class="section-padding-default">
    <v-container>
      <v-row class="mt-0 mb-8">
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
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
      what_is_prism_cards: content.what_is_prism_cards(), 
      testimonial_cards: content.testimonial_cards(),
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
.tech-hero_text {
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
}
</style>