<template>
 <v-banner
   v-if="showBanner"
    :sticky="true"
    lines="two"
    style="top: 64px; z-index: 2"
    closable
        
    class="px-6"
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
 
        PRISM is accepting DMSO-soluble single agents and combinations, and aqueous single agents, for our standard 5-day assay from Monday, August 25 - Friday, September 12. 


        

        <template v-slot:actions>
            <v-btn text @click="showBanner = false">
                Close
            </v-btn>
        <v-btn color="deep-purple-accent-4">
        Learn more
        </v-btn>
    </template>
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
</style>
  
