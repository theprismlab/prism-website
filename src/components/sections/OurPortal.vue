<template>
    <div class="background">
        <container-md class="py-8">
            <v-row class="d-flex align-center justify-center">
                <v-col cols="11" xs="11" sm="5" md="5" lg="5">
                    <v-img class="align-end" :src="`${imgPath}${image}`" width="100%"></v-img>
                </v-col>
                <v-col>
                    <v-card variant="transparent">
                        <v-card-item>
                            <h3 class="text-h3 font-weight-bold">{{ title }}</h3>
                            <p class="text-body-1">{{  body }}</p>
                            <v-btn :href="button.link" target="_blank" color="white" variant="outlined" rounded>{{  button.text }} <v-icon right>mdi-chevron-right</v-icon></v-btn>
                    </v-card-item>
                </v-card>
                </v-col>
            </v-row>
        </container-md>
    </div>
  </template>
<script>


export default {
    name: "OurPortal",
    props: {    

    },
    data(){
        return {
            overline: 'Our Portal',
            title: 'Explore and discover',
            body: 'Securely browse and discover insights from your screening results with interactive visualizations.',
            button: {
                text: 'PRISM portal',
                link: 'https://theprismlab.org/portal/projects'
            },
            image: 'macbook-portal-01.png'
        }
    },
    computed: {
        imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/" : "../../public/images/"
        },
    },
    mounted(){

    }
}
</script>
<style scoped>
/* .background{
  color: white;
    background: linear-gradient(45deg, #0e0c1b, #161730 40%, #393d80);
} */
.background{
    color: white;
  background: linear-gradient(120deg, var(--v-primary-accent-3), var(--v-primary-darken-4));
}
 /* .background{
  background: linear-gradient(120deg, var(--v-primary-accent-4-desaturated), var(--v-primary-darken-4-desaturated));
} */
/* .background{
  background: linear-gradient(120deg, var(--v-primary-darken-4-desaturated), var(--v-primary-darken-6-desaturated));
} */
/* .background{
    color:black !important;
  background: linear-gradient(120deg, var(--v-primary-lighten-7), var(--v-primary-lighten-5));
} */
</style>

