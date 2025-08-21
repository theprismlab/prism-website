<template>
  <AppBar/>
  <v-main>
      
        <v-banner
          :sticky="true"
          lines="two"
             style="top: 64px; z-index: 2"
        >
          <template v-slot:text>
          [NOT DONE] PRISM is accepting DMSO-soluble single agents and combinations, and aqueous single agents, for our standard 5-day assay from Monday, August 25 - Friday, September 12. 
          </template>

          <template v-slot:actions>
          <v-btn color="deep-purple-accent-4">
            Learn more
          </v-btn>
        </template>
      </v-banner>
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script setup>
  //
</script>
<style scoped>

</style>
