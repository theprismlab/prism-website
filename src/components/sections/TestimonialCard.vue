<template>
    <v-card class="pa-6 fill-height justify-start mb-2" style="background: none;" elevation="1">
        <v-card-item>
            <p class="text-body-1">
                <svg-icon size="34" type="mdi" :path="mdiFormatQuoteOpenPath" class="text-teal-lighten-4" ></svg-icon>  {{card.quote}}
                <svg-icon size="34" type="mdi" :path="mdiFormatQuoteClosePath" class="text-teal-lighten-4" style="float:right;"></svg-icon>
            </p>
            <p class="text-body-2 mb-0 text-grey-darken-1"  v-html="card.author"></p>

            
        </v-card-item>
    </v-card>
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
        
        index: {
            type: Number,
            required: true,
            default: 0
        },
        card: {
            type: Object,
            required: true,
            default: () => ({})
        }

    },
    data(){
        return {
            mdiFormatQuoteOpenPath: mdiFormatQuoteOpen,
            mdiFormatQuoteClosePath: mdiFormatQuoteClose,
           
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

