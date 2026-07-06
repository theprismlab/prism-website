<template>
  <page>
    <app-container narrow>
      <prism-page-title>Collaborate with us!</prism-page-title>
      <p class="prism-text-body-large">
        If you have a test agent you want to screen in PRISM, participate in one of our PRISM
        Consortium Screens. These screens are run four times a year, with specific dates available
        on the
        <a href="https://www.theprismlab.org/portal/submissions" target="_blank" class="text-link"
          >PRISM Submission Hub</a
        >. Data for each screen is returned in approximately 4 months. <br /><br />
        <a href="/contact-us">Contact us</a> to receive updates on our screen offerings, submission
        windows, and costs!
      </p>

      <section class="page-section">
        <h2 class="prism-text-display-small mb-4">How to participate in a PRISM screen</h2>
        <div v-for="(step, index) in steps" :key="index" class="my-4">
          <v-icon color="var(--prism-color-teal-accent-4)" style="float: left"
            >mdi-numeric-{{ index + 1 }}-circle</v-icon
          >
          <div style="display: inline-block; width: calc(100% - 40px)">
            <div v-html="step" class="ml-2 prism-text-body-2"></div>
          </div>
        </div>
      </section>

      <section class="page-section">
        <h2 class="prism-text-display-small mb-4">Industry Collaborators</h2>
        <p class="prism-text-body-large">
          PRISM requires fully-executed collaboration agreements with our pharmaceutical and biotech
          collaborators in order to screen with us. In general, our agreements address the following
          three areas:
        </p>

        <collaborate-cards class="my-6"></collaborate-cards>

        <p class="prism-text-body-large">
          Please <a href="/contact-us">contact us</a> to receive additional information about our
          agreements and pricing.
        </p>
      </section>

      <section class="page-section">
        <h2 class="prism-text-display-small mb-4">Academic Collaborators</h2>
        <p class="prism-text-body-large">
          Collaboration agreements are not a requirement for academic collaborators to participate
          in our screens. If you would like to sign an agreement, please email our team at
          <a href="mailto:prism@broadinstitute.org" class="text-link">prism@broadinstitute.org</a>.
        </p>
      </section>
    </app-container>
  </page>
</template>
<script>
  export default {
    data() {
      return {
        steps: [
          'Complete the forms on the <a href="https://www.theprismlab.org/portal/submissions" target="_blank" class="text-link">PRISM Submission Hub</a> during our 2-week submission window.',
          'Approve and fund a quote for your PRISM submission',
          'Ship a stock solution of your test agent(s) to the PRISM lab before the submission window deadline!',
          'Data will be released on the PRISM Portal approximately 4 months after the submission window closes',
        ],
      };
    },
    mounted() {},
  };
</script>
<style scoped></style>
