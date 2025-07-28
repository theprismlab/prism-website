<template>
    <v-card class="pa-6 px-10 fill-height justify-start mb-2" variant="tonal" color="secondary-lighten-3" >
        <v-card-item>
            <p class="text-body-1 text-black">
                <svg-icon size="34" type="mdi" :path="mdiFormatQuoteOpenPath" class="text-secondary" ></svg-icon>  {{card.quote}}
                <svg-icon size="34" type="mdi" :path="mdiFormatQuoteClosePath" class="text-secondary" style="float:right;"></svg-icon>
            </p>
            <p class="text-body-2 mb-0 font-weight-bold text-secondary-darken-2" v-html="card.author"></p>
            <p class="text-body-2 mb-0 mt-0 text-grey-darken-1" v-html="card.company"></p>
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
    .v-card {
        border: 1px solid var(--v-secondary-lighten-4);
    }

</style>

