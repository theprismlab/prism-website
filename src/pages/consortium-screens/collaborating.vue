<template>
<page>
  <v-container>
    <v-row class="">
      <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
        <page-title>Collaborate with us!</page-title>
        <p class="text-body-1">
          If you have a test agent you want to screen in PRISM, participate in one of our PRISM Consortium Screens. These screens are run three times a year (Q1, Q2, and Q3), with specific dates available on the <a href="https://www.theprismlab.org/portal/submissions" target="_blank" class="text-link">PRISM Submission Hub</a>. Data for each screen is returned in approximately 4 months.
          <br><br>
          Get on our <a href="">mailing list </a>below to receive updates on our screen offerings and submission windows!
          <br><br>
          To participate in a PRISM screen:
        </p>
          <collaborate-steps></collaborate-steps>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
        <h2 class="text-h3">Industry Collaborators</h2>
        <p class="text-body-1">
          PRISM requires fully-executed collaboration agreements with our pharmaceutical and biotech collaborators in order to screen with us. In general, our agreements address the following three areas:
        </p>
        <v-row>
          <v-col cols="8">
            <collaborate-cards></collaborate-cards>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
        <h2 class="text-h3">Academic Collaborators</h2>
      <p class="text-body-1">

      Collaboration agreements are not a requirement for academic collaborators to participate in our screens. If you would like to sign an agreement, please reach out to our team using the form below to receive additional information.
    </p>
      </v-col>
    </v-row>
  </v-container> 

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