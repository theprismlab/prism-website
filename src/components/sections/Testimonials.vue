<template>
    <section>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="5">
            <section-overline>Testimonials</section-overline>
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
    </section>
  </template>
<script>

import * as content from '@/utils/content.js'

export default {
    name: "Testimonials",
    props: {    
     image: {
        type: String,
        required: true
    },
    },
    data(){
        return {
          testimonial_cards: content.testimonial_cards()
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
</style>

