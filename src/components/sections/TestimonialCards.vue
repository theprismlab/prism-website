<template>
    <v-row class="mt-6 mb-6">
        <v-col v-for="card in cards" :key="card.title" cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
            <v-card class="pa-6 fill-height justify-start mb-2" style="background: none;" elevation="1">
                <v-card-text style="line-height:1.75;">
                    <svg-icon type="mdi" :path="mdiFormatQuoteOpenPath" class="text-primary-lighten-4" ></svg-icon>
                    {{card.text}}
                    <svg-icon type="mdi" :path="mdiFormatQuoteClosePath" class="text-primary-lighten-4" style="float:right;"></svg-icon>
                </v-card-text>
                <v-card-subtitle style="line-height:1.33;" class="mb-4 font-weight-medium" v-html="card.subtitle"> </v-card-subtitle>
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
            mdiFormatQuoteOpenPath: mdiFormatQuoteOpen,
            mdiFormatQuoteClosePath: mdiFormatQuoteClose,
           cards: [
        {
            text: "I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.",
            author: "Florian Muller",
            subtitle: "Florian Muller<br>Head of Chemistry<br>Lindonlight Collective",

        },
        {
            text: "The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our research process.",
            author: "Discovery Oncology Scientist",
            subtitle: "Discovery Oncology Scientist<br>Fortune 500<br>Pharmaceutical Company",


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
.v-card-subtitle{
    color: var(--v-grey-darken-2);
}
p{
    max-width: 500px;
}
</style>

