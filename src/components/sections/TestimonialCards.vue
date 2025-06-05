<template>
    <v-row>
        <v-col v-for="card in cards" :key="card.title" cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
            <v-card class="pa-2 fill-height" style="background: none;" elevation="0" variant="outlined" color="primary-accent-2">
                <v-card-item>
                    <div class="d-flex align-center justify-start text-primary-accent-1 mb-2">
 
                        <svg-icon type="mdi" :path="card.iconPath" class="text-primary-accent-1 mr-4"></svg-icon>
                        <p style="line-height: 1.2em !important;" class="text-body-1">{{card.text}}</p>
                    </div>
                    <h3 style="opacity: 1; line-height: 1.4em !important;" class="text-overline text-primary-accent-2 text-none font-weight-medium" v-html="card.subtitle"></h3>
                </v-card-item>
            </v-card>
        </v-col>
        </v-row>
  </template>
<script>

import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiFormatQuoteOpen } from '@mdi/js';
  import { mdiFormatQuoteClose } from '@mdi/js';


export default {
    name: "TestimonialCards",
    components: {
        SvgIcon
    },
    props: {    

    },
    data(){
        return {
           cards: [
        {
            text: "I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.",
            title: "Florian Muller",
            subtitle: "Head of Chemistry, Lindonlight Collective",
            iconPath: mdiFormatQuoteOpen
        },
        {
            text: "The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our research process.",
            title: "Discovery Oncology Scientist",
            subtitle: "Fortune 500, Pharmaceutical Company",
            iconPath: mdiFormatQuoteOpen

        }
        
    ]
        }
    },
    computed: {

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

