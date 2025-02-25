<template>
<page class="mt-0">
  <page-gradient background="gradient-primary-lighten-1" >
    <v-parallax :src="`${imgPath}PRISM-website-graphics_hero-01.png`" :height="heroHeight">
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="6" lg="6" xl="5" class="d-flex justify-center flex-column">
            <h1 class="text-h1 mb-12 font-weight-bold">Revolutionize cancer drug discovery</h1>
            <p class="text-h4">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </page-gradient>

  <section class="section-padding-default">
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
          <h3 class="heading-style-h5 title">PRISM is a novel DNA barcoding technology that enables simultaneous high-throughput viability analysis of over 900 genomically characterized cell lines. 
          </h3>
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
        <v-col cols="12" xs="12" sm="12" md="5" lg="6" xl="6">
            <h3 class="title heading-style-h5">Over 150 leading academic and industry partners have trusted PRISM to transform their research.</h3>
        </v-col>
        <v-col>
          <v-row>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card elevation="1" class="fill-height pa-2">
                <v-card-text class="text-body-1">
                  <svg-icon type="mdi" :path="quoteOpenSvg" class="text-primary-lighten-3"></svg-icon>
                {{  testimonial_cards[0].text }}
                <svg-icon type="mdi" :path="quoteCloseSvg" class="text-primary-lighten-3"></svg-icon>
                </v-card-text>
                <v-card-item>
                  <v-card-subtitle>

                    {{  testimonial_cards[0].name }}<br>
                    {{  testimonial_cards[0].title }}<br>
                    {{  testimonial_cards[0].company }}
                  </v-card-subtitle>
                </v-card-item>
              </v-card>
            </v-col>
            <v-col>
              <v-card elevation="1" class="fill-height pa-2">
                <v-card-text class="text-body-1">
                  <svg-icon type="mdi" :path="quoteOpenSvg" class="text-primary-lighten-3"></svg-icon>
                  {{  testimonial_cards[1].text }}
                  <svg-icon type="mdi" :path="quoteCloseSvg" class="text-primary-lighten-3"></svg-icon>
                </v-card-text>
                <v-card-item>
                  <v-card-subtitle>
                    {{  testimonial_cards[1].name }}<br>
                    {{  testimonial_cards[1].title }}<br>
                    {{  testimonial_cards[1].company }}
                  </v-card-subtitle>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>     
  </page-gradient>

  <page-gradient background="gradient-stolen">
    <container-md>
      <div class="d-flex flex-row">
        <h3 class="text-h4 mr-6">Interested in collaborating?</h3>
        <v-btn class="" to="/screening/collaborate">Learn more</v-btn>
      </div>
    </container-md>
  </page-gradient>

  <section class="section-padding-default">
    <v-container>
      <h3 class="title heading-style-h5">Dedicated to advancing oncology research.</h3>
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
    heroHeight () {
        return this.mobile ? '80vh' : '75vh'
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