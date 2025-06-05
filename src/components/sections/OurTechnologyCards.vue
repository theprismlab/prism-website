<template>
    <!-- <v-row class="d-flex justify-center">
        <v-col v-for="card in cards" cols="10" xs="10" sm="6" md="6" lg="6" xl="6">
            <v-card class="fill-height align-center justify-center"  elevation="0" style="max-width:350px">
                <v-img class="card-image" alt="" :src="`${imgPath}${card.image}`"></v-img>
                <h3 class="v-card-title text-h5 font-weight-bold" v-html="card.title"></h3>
                <h4 class="v-card-subtitle" v-html="card.subtitle"></h4>
                <p v-if="card.text" class="v-card-text" v-html="card.text"></p>
                <v-card-actions v-if="card.action">
                    <v-btn class="position-absolute ms-auto" 
                        style="left: 12px; bottom: 8px;" 
                        size="small" 
                        color="primary" 
                        variant="text" 
                        rounded
                        :href="card.action.url"
                        v-html="card.action.text"
                        :target="card.action.target"
                        >
                    </v-btn>
                </v-card-actions> 
            </v-card>
        </v-col>
    </v-row> -->
    <v-row v-for="row in rows" class="d-flex justify-center">
        <v-col v-for="card in row.cards" cols="10" xs="10" sm="6" md="6" lg="6" xl="6">
            <v-card class="fill-height align-center justify-center"  elevation="0" style="max-width:350px">
                <v-img class="card-image" alt="" :src="`${imgPath}${card.image}`"></v-img>
                <h3 class="v-card-title text-h5 font-weight-bold" v-html="card.title"></h3>
                <h4 class="v-card-subtitle" v-html="card.subtitle"></h4>
                <p v-if="card.text" class="v-card-text" v-html="card.text"></p>
                <v-card-actions v-if="card.action">
                    <v-btn class="position-absolute ms-auto" 
                        style="left: 12px; bottom: 8px;" 
                        size="small" 
                        color="primary" 
                        variant="text" 
                        rounded
                        :href="card.action.url"
                        v-html="card.action.text"
                        :target="card.action.target"
                        >
                    </v-btn>
                </v-card-actions> 
            </v-card>
        </v-col>
    </v-row>
</template>
<script>

import * as content from '@/utils/content.js'

export default {
    name: "OurTechnologyCards",
    props: {    
     image: {
        type: String,
        required: true
    },
    },
    data(){
        return {
            rows: [
                { 
                    cards: [
                        {
                            title: '900+ genomically diverse barcoded and pooled cell lines',
                            subtitle: 'Hematopoietic and solid tumor, covering 80 cancer subtypes',
                            // image: '2025 PRISM Graphics - cell lines.png',
                            action: {
                            text: 'Learn more',
                            url: '/consortium-screens/cell-line-collection',
                            target: '_self'
                            }
                        },
                        {
                            title: '150K+ unique baseline genetic and functional genomic features ',
                            subtitle: 'Features from the Dependency Map are correlated with the PRISM viability profile using univariate and multivariate predictive models',
                            // image: '2025 PRISM Graphics - viability-features.png',
                            action: {
                            text: 'Learn more',
                            url: 'https://depmap.org/portal/',
                            target: '_blank'
                            }
                        }
                    ]
            },
            { 
                cards: [
                {
                    title: 'Data Analysis',
                    subtitle: '',
                    // image: '2025 PRISM Graphics - cell lines.png',
                    // action: {
                    // text: 'Learn more',
                    // url: '/consortium-screens/cell-line-collection',
                    // target: '_self'
                    // }
                },
                {
                    title: 'Identify target and patient population of your drug',
                    subtitle: 'Confirm hypothesis and establish biomarkers of sensitivity and resistance',
                    // image: '2025 PRISM Graphics - viability-features.png',
                    action: {
                    text: 'Learn more',
                        url: '/consortium-screens/data-analysis',
                        target: '_self'
                    }
                }
            ]
            }
        ],
            // cards: [
            // {
            //     title: '900+ genomically diverse barcoded and pooled cell lines',
            //     subtitle: 'Hematopoietic and solid tumor, covering 80 cancer subtypes',
            //     image: '2025 PRISM Graphics - cell lines.png',
            //     action: {
            //     text: 'Learn more',
            //     url: '/consortium-screens/cell-line-collection',
            //     target: '_self'
            //     }
            // },
            // {
            //     title: '150K+ unique baseline genetic and functional genomic features ',
            //     subtitle: 'Features from the Dependency Map are correlated with the PRISM viability profile using univariate and multivariate predictive models',
            //     image: '2025 PRISM Graphics - viability-features.png',
            //     action: {
            //     text: 'Learn more',
            //     url: 'https://depmap.org/portal/',
            //     target: '_blank'
            //     }
            // }
            // ]
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

.v-card-title{
    min-height:5rem !important;
    line-height:1.33em !important;
}
.card-image{
    margin:auto;
    /* align-self: center; */
    width:80% !important;
    max-width: 250px !important;
    min-width:175px !important;
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

