<template>
 <v-banner
   v-if="showBanner"
    :sticky="true"
    closable
    class="banner px-10 py-1"
    color="grey lighten-4"
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
 <v-row justify="space-between" align="top" class="mx-0 py-2">
    <v-col cols="11">
        <h4 class="text-body-2 font-weight-bold text-primary-base">PRISM Submission Window Now Open!</h4>
        <p class="text-body-2 inline-block mb-0 mt-1 banner-text-body">PRISM is accepting DMSO-soluble single agents and combinations, and aqueous single agents, for our standard 5-day assay from <b>Monday, August 25 - Friday, September 12</b>. 
        <a class="v-btn v-btn--size-default pa-0 px-4 font-weight-bold" href="/contact-us" target="_self">Learn More <v-icon right>mdi-chevron-right</v-icon></a>
        </p>
    </v-col>
    <v-col cols="1">
        <v-btn style="background: none;" size="x-small" icon @click="showBanner = false" flat>
            <v-icon right>mdi-close</v-icon>
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
    methods: {},
    computed: {},
    watch: {
        // Watch for route changes
        $route(to) {
            if (to.path === '/contact-us') {
                this.showBanner = false;
            } else {
                this.showBanner = true;
            }
        },
    },
    mounted() {
        // Check the route when the component is mounted
        if (this.$route.path === '/contact-us') {
            this.showBanner = false;
        }
    },
}
</script>
<style scoped>
.v-banner{
    padding-inline: 0px 0px;
    /* padding-top: 0px !important;
    padding-bottom: 0px !important; */
    /* background-color: var(--v-primary-lighten-6) !important; */
    border-bottom: 1px solid var(--v-divider-base) !important;
    /* background: linear-gradient(120deg, var(--v-primary-lighten-6), var(--v-primary-accent-1));  */
    /* background: linear-gradient(120deg, var(--v-primary-accent-1-lighten-1), var(--v-primary-accent-1-lighten-2) ); */
    background: linear-gradient(120deg, var(--v-primary-lighten-6), var(--v-primary-base-lighten-5) );
}
.banner-text-body{
    color: var(--v-grey-darken-3);
    font-size: 0.85rem !important;
}
.banner{
    top: var(--v-toolbar-height);
}
</style>
  
