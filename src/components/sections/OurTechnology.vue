<template>
    <section>
      <v-container>
        <v-row class="mt-0 mb-8">
          <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
            <section-overline>Our Technology</section-overline>
            <section-title>PRISM is a novel DNA barcoding technology</section-title>
            <p class="text-body-1">PRISM barcoding technology enables simultaneous high-throughput viability analysis of over 900 genomically characterized cell lines.</p>
          </v-col>
        </v-row>
  
        <v-row class="d-flex justify-center mt-0 mb-8">
          <v-col v-for="card in cards" cols="10" xs="10" sm="6" md="5" lg="3" xl="3">
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
  </template>
<script>

import * as content from '@/utils/content.js'

export default {
    name: "OurTechnology",
    props: {    
     image: {
        type: String,
        required: true
    },
    },
    data(){
        return {
            cards: content.our_technology_cards()
        }
    },
    computed: {
        imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/home/" : "../../public/images/home/"
        },
    },
    mounted(){

    }
}
</script>
<style scoped>
p{
    max-width: 500px;
}
      /* xxl  */
      @media (min-width:  2560px) {

      }
      /* xl */
      @media (min-width: 1920px) and (max-width: 2560px) {
  
      }
      /* lg */
      @media (min-width: 1280px) and (max-width: 1920px) {

      }
        /* md */
      @media (min-width: 960px) and (max-width: 1280px) {


      
      }
  
      /* sm */
      @media (min-width: 600px) and (max-width: 960px) {

      }
      /* xs */
      @media (max-width: 600px) {
      
      }
</style>

