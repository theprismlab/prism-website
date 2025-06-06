<template>
<page>
  <v-container>
    <v-row class="">
      <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
        <page-title>Collaborate with us!</page-title>
        <p class="text-body-1">
          If you have a test agent you want to screen in PRISM, participate in one of our PRISM Consortium Screens. These screens are run three times a year (Q1, Q2, and Q3), with specific dates available on the <a href="https://www.theprismlab.org/portal/submissions" target="_blank" class="text-link">PRISM Submission Hub</a>. Data for each screen is returned in approximately 4 months.
          <br><br>
          To participate in a PRISM screen:

        </p>
        <ul class="text-body-1">
          <li>Get on our mailing list below to receive updates on our screen offerings and submission windows!
          </li>
          <li>Register for the screen by completing an online submission form on the <a href="https://www.theprismlab.org/portal/submissions" target="_blank" class="text-link">PRISM Submission Hub</a>.
            <ul class="mt-4">
              <li>
                Forms can only be completed during our 2-3 week submission window periods (specific dates will be available on the Submission Hub)
              </li>
              <li>
                As we have limited capacity for all of our screens, we encourage collaborators to submit their forms as soon as the window opens.
              </li>
            </ul>
          </li>
          <li>
            Approve and fund a quote for your PRISM submission
              <ul class="mt-4">
                <li>
                  An invoice will be sent after data is delivered
                </li>
              </ul>
          </li>
          <li>
            Ship a stock solution of your test agent(s) to the PRISM lab before the submission window deadline
            <ul>
              <li>
                We will share additional shipping information once your submission form and funded quote are confirmed by a member of our team
              </li>
            </ul>
          </li>
          <li>
            Create an account on the <a href="https://www.theprismlab.org/portal/log-in" target="_blank" class="text-link">PRISM Portal</a>  to prepare for data delivery and give data access to others

          </li>
          <li>
            Receive your screening data on the PRISM Portal approximately 4 months after the submission window closes
          </li>


        </ul>
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