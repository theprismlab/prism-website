<template>
<page>
  <container-xs>
    <section>
      <page-title>Collaborate with us!</page-title>
        <p class="text-body-1">
          If you have a test agent you want to screen in PRISM, participate in one of our <span class="text-emphasize">PRISM Consortium Screens</span>. These screens are run three times a year (Q1, Q2, and Q3), with specific dates available on the <a href="https://www.theprismlab.org/portal/submissions" target="_blank" class="text-link">PRISM Submission Hub</a>. Data for each screen is returned in approximately 4 months.
          <br><br>
          <a href="/contact-us">Contact us</a> to receive updates on our screen offerings and submission windows!        
        </p>
    </section>
        <section class="mt-12 mb-12">
        <p class="text-body-1">To participate in a PRISM screen:</p>
        <v-card  v-for="(step, index) in steps" :key="index" class="mb-4" elevation="0">
            <div class=" text-body-2">
                <v-icon class="text-primary-base" style="float:left">mdi-numeric-{{ index + 1 }}-circle</v-icon>
                <div style="display: inline-block; width: calc(100% - 40px);">
                    <div v-html="step" class="ml-2"></div>
                </div>
            </div>
        </v-card>
      </section>
      <section class="mt-12 mb-12">
        <h2 class="text-h3">Industry Collaborators</h2>
        <p class="text-body-1">
          PRISM requires fully-executed collaboration agreements with our pharmaceutical and biotech collaborators in order to screen with us. In general, our agreements address the following three areas:
        </p>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="8">
            <collaborate-cards></collaborate-cards>
      </v-col>
    </v-row>
    <p class="text-body-1">Please <a href="/contact-us">contact us</a> to receive additional information about our agreements and pricing.</p>
  </section>
   <section class="mt-12 mb-12">
      <h2 class="text-h3">Academic Collaborators</h2>
      <p class="text-body-1">
        Collaboration agreements are not a requirement for academic collaborators to participate in our screens. If you would like to sign an agreement, please reach out to our team using the form below to receive additional information.
      </p>
   </section>
</container-xs>

</page>

</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDatabaseOutline } from '@mdi/js';
import { mdiFileMultipleOutline } from '@mdi/js';
import { mdiLightbulbOnOutline } from '@mdi/js';

  export default {
    components: {
      SvgIcon
    },
    data() {
      return {
       steps: [
        'Complete the forms on the submission hub during our 2-3 week submission window <a href="https://www.theprismlab.org/portal/submissions" target="_blank" class="text-link">PRISM Submission Hub</a>.',
        'Approve and fund a quote for your PRISM submission',
        'Ship a stock solution of your test agent(s) to the PRISM lab before the submission window deadline!',
        'Data will be released on the PRISM Portal approximately 4 months after the submission window closes'
       ],
       agreements:  [
                {
                    title: "Data Ownership",
                    text: "PRISM retains the right to use collaboratively generated data to validate and improve the PRISM platform. The structure and identity of your compound will not be shared with us. Unique identifiers are given to all test agents.",
                    icon: "mdi-database",
                    path: mdiDatabaseOutline,
                    size: 24

                },
                {
                    title: "Intellectual Property",
                    text: "Non-exclusive royalty-free licenses are granted.",
                    path: mdiLightbulbOnOutline,
                    size: 26

                },
                {
                    title: "Publication",
                    text: "Data may be jointly published when both partners agree.",
                    path: mdiFileMultipleOutline,
                    size: 20
                },
            ]
      }
    },
    mounted() {

  }
}
</script>
<style scoped>

</style>