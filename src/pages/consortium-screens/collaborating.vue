<template>
<page>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
        <page-title>Collaborate with us!</page-title>
        <p class="text-body-1">The Broad Institute and PRISM’s mission is to help improve cancer patients’ lives. To that end, we are excited to collaborate with you to advance the understanding of cancer therapeutics and accelerate the drug discovery process. Our working model is that of a scientific collaboration to further cancer research.   
        </p>
      </v-col>
    </v-row>
    </v-container> 
    <gradient-dark class="py-6 my-6">
      <v-container>
        <v-row class="justify-center align-center">
          <v-col cols="auto" class="text-center">
            <section-overline color="primary-accent-1">Key collaboration points</section-overline>
          </v-col>
        </v-row>
        <collaborate-cards></collaborate-cards>
      </v-container>
    </gradient-dark>

</page>

</template>
<script>
  export default {
    mounted() {

  }
}
</script>
<style scoped>

</style>