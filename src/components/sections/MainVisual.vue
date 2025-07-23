<template>
  <div class="background">
    <!-- <container-md>
      <v-row class="justify-center">
        <v-col v-for="(card, index) in cards" :key="index" cols="12" xs="12" sm="12" md="4" lg="4">
          <v-card class="pa-4 fill-height" variant="outlined" color="grey-lighten-2">
            <v-row no-gutters>
              <v-col cols="5" xs="5" sm="5" md="12" lg="12" xl="12">
                  <v-img  style="margin:auto;" :src="card.img" width="100%" max-width="320px"></v-img>
              </v-col>
              <v-col>
                <v-card-item>
                <h4 class="text-h4 text-black">{{ card.title }}</h4>
                <p class="text-body-2">{{ card.description }}</p>
                <v-btn variant="outlined" rounded color="primary-base" :href="card.action.url" :target="card.action.target">{{ card.action.text }}<v-icon right>mdi-chevron-right</v-icon></v-btn>
                </v-card-item>
              </v-col>
            </v-row>         
          </v-card>
        </v-col>
      </v-row>
    </container-md> -->

    <container-md>
      <v-row class="justify-center">
        <v-col v-for="(card, index) in cards" :key="index" cols="12" xs="12" sm="12" md="4" lg="4">
          <v-card class="pa-4 fill-height" variant="flat">
            <v-row no-gutters>
              <v-col cols="5" xs="5" sm="5" md="12" lg="12" xl="12">
                  <v-img  style="margin:auto;" :src="card.img" width="100%" max-width="320px"></v-img>
              </v-col>
              <v-col>
                <v-card-item>
                <h4 class="text-h4 text-black">{{ card.title }}</h4>
                <p class="text-body-2 mb-2">{{ card.description }}</p>
                <a class="v-btn v-btn--size-default pa-0" :href="card.action.url" :target="card.action.target">{{ card.action.text }} <v-icon right>mdi-chevron-right</v-icon></a>
              </v-card-item>
            </v-col>
          </v-row>         
        </v-card>
      </v-col>
      </v-row>
    </container-md>
  </div>  
</template>
<script>


export default {
    name: "MainVisual",
    data(){
      return {

      }

    },
    computed: {
        imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/" : "../../public/images/"
        },
        cards() {
          return [
          {
            img: `${this.imgPath}main-11.png`,
            title: "900+ genomically diverse barcoded and pooled cell lines",
            description: "Hematopoietic and solid tumor, covering 80 cancer subtypes",
            action: {
              text: 'Learn more',
              url: '/consortium-screens/cell-line-collection',
              target: '_self'
            }
          },
          {
            img: `${this.imgPath}main-12.png`,
            title: "Over 150K unique baseline genetic and functional genomic features",
            description: "Features from the Dependency Map are correlated with the PRISM viability profile using univariate and multivariate predictive models",
             action: {
              text: 'Learn more',
              url: '/consortium-screens/data-analysis',
              target: '_self'
            }
          },
          {
            img: `${this.imgPath}main-13.png`,
            title: "Identify target and patient population of your drug",
            description: "Confirm hypothesis and establish biomarkers of sensitivity and resistance",
            action: {
              text: 'Learn more',
              url: '/consortium-screens/data-analysis',
              target: '_self'
            }
          },
        ]
        }
    },
    mounted(){

    }
}
</script>
<style scoped>
.background{
  /* background-color: var(--v-grey-lighten-3); */
  /* background-color: var(--v-primary-lighten-7); */
}
.v-card{
  background-color: white;
}
p{
    max-width: 500px;
}
.text-h4 {
    line-height: 1.4em;
    font-weight:500;
}
.text-body-2{
  color: var(--v-grey-darken-1)
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

