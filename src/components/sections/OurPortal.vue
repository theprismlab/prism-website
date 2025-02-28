<template>
    <gradient-light>
        <v-container>
            <v-row class="d-flex align-center justify-center fill-height">
                <v-col>
                    <v-img class="align-end"  width="100%" alt="" :src="`${imgPath}${image}`" style="" aspect-ratio="1.5"></v-img>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="6">
                    <section-overline>Our Portal</section-overline>
                    <h3 class="text-h3 font-weight-bold">{{ title }}</h3>
                    <p class="text-body-2">{{  body }}</p>
                    <v-btn :href="button.link" target="_blank" color="primary-accent-2" rounded variant="flat">{{  button.text }} <v-icon>mdi-arrow-right-thin</v-icon></v-btn>
                </v-col>
            </v-row>
        </v-container>
    </gradient-light>   
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
            image: 'Macbook PRISM Portal- front views.png'
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

