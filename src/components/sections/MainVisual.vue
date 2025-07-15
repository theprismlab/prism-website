<template>
    <v-container>
        <v-row class="justify-center">  
          <v-col cols="12" xs="12" sm="12" md="12" lg="11" xl="10" offset-sm="0" offset-md="0" offset-lg="0" offset-xl="0">
            <v-row>
              <v-col class="px-6">
                <v-img :src="`${imgPath}main graphic copy 11.png`"></v-img>
                <h3 class="text-h5 font-weight-bold">900+ genomically diverse barcoded and pooled cell lines</h3>
                <p class="text-body-2">
                  Hematopoietic and solid tumor, covering 80 cancer subtypes<br>
                    <v-btn variant="text" color="primary">Learn more</v-btn>
                </p>
              </v-col>
              <v-col class="px-6">
                <v-img :src="`${imgPath}main graphic copy 12.png`"></v-img>
                <h3 class="text-h5 font-weight-bold">Over 150K unique baseline genetic and functional genomic features </h3> 
                <p class="text-body-2">
                  Features from the Dependency Map are correlated with the PRISM viability profile using univariate and multivariate predictive models
                </p>
                <v-btn variant="text" color="primary">Learn more</v-btn>
              </v-col>
              <v-col class="px-6">
                <v-img :src="`${imgPath}main graphic copy 13.png`"></v-img>
                <h3 class="text-h5 font-weight-bold">Identify target and patient population of your drug</h3>
                <p class="text-body-2">Confirm hypothesis and establish biomarkers of sensitivity and resistance</p>
                <v-btn variant="text" color="primary">Learn more</v-btn>
              </v-col>
            </v-row>
         
          </v-col>
        </v-row>
    </v-container>
</template>
<script>


export default {
    name: "MainVisual",
    data(){

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

