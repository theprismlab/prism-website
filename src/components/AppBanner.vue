<template>
 <v-banner
   v-if="showBanner"
    :sticky="true"
    lines="three"
   
    closable
        
    class="banner px-12 pt-12 pb-4"
    >
    <!-- <v-expansion-panels>
        <v-expansion-panel>
        <v-expansion-panel-title>
          Item
        </v-expansion-panel-title>
        <v-expansion-panel-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-text>
        <v-expansion-panel-title>
          Item
          <template v-slot:actions>
            <v-icon color="error" icon="mdi-alert-circle">
            </v-icon>
          </template>
        </v-expansion-panel-title>
      
        </v-expansion-panel>
    </v-expansion-panels> -->
    <!-- <v-banner-text>
     
        <h4 class="text-h5">PRISM Submission Window Now Open!</h4>
        <p class="text-body-2">    PRISM is accepting DMSO-soluble single agents and combinations, and aqueous single agents, for our standard 5-day assay from Monday, August 25 - Friday, September 12. 
        </p>
    </v-banner-text> -->
 <v-row justify="space-between" align="center" class="mx-0 py-4">
    <v-col cols="11">
        <h4 class="text-h6">PRISM Submission Window Now Open!</h4>
        <p class="text-body-2 inline-block">PRISM is accepting DMSO-soluble single agents and combinations, and aqueous single agents, for our standard 5-day assay from <b>Monday, August 25 - Friday, September 12</b>. 
            <v-btn
            color="primary-base"
            to="/contact-us"
            variant="text"
            rounded>
            Learn More <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
        </p>


            </v-col>
            <v-col cols="1">
                <v-btn icon @click="showBanner = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-col>
 </v-row>
   
  


        

                <!-- <template v-slot:actions>
                <v-btn text @click="showBanner = false">
                    Close
                </v-btn>
            </template> -->
    </v-banner>
</template>
<script>
export default {
    name: 'AppBanner',
    data () {
        return {
            showBanner: true,
            panel: [0],
        }
    },
    methods: {

    },
    computed: {


    },
    watch:{

    }
}
</script>
<style scoped>
.v-banner{
    padding-inline: 0px 0px;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    
}
.banner{
    top: var(--v-toolbar-height);
}
</style>
  
