<template>
    <page-gradient background="gradient-grey-lighten">
    <v-container>
        <v-row class="d-flex align-center justify-center fill-height">
            <v-col>
                <v-img v-if="image" class="align-end"  width="100%" alt="" :src="image" style="" aspect-ratio="1.5"></v-img>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="6">
                <section-overline>Our Portal</section-overline>
                <h3 class="text-h3 font-weight-bold">Explore and discover</h3>
                <p class="text-body-2">Securely browse and discover insights from your screening results with interactive visualizations.</p>
                <v-btn href="https://theprismlab.org/portal/projects" target="_blank" color="primary-accent-2" rounded variant="flat">PRISM portal <v-icon>mdi-arrow-right-thin</v-icon></v-btn>
            </v-col>
        </v-row>
    </v-container>
</page-gradient>
  </template>
<script>


export default {
    name: "PortalBanner",
    props: {    
     image: {
        type: String,
        required: true
    },
    },
    data(){
        return {

        }
    },
    computed: {

    },
    mounted(){

    }
}
</script>
<style scoped>
.v-card-title{
    min-height:5rem !important;
    line-height:1.33em !important;
}
</style>

