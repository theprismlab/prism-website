<template>
  <page>
    <app-container wide>
      <prism-page-title>View Quote &amp; Upload PO</prism-page-title>
      <page-section>
        <v-alert type="info" class="mb-4">
          <template #prepend>
            <v-icon>mdi-information-outline</v-icon>
          </template>
          <span class="prism-text-h6">For academic/non-profit collaborators only</span>
        </v-alert>
        <p class="prism-text-body-1">
          PRISM utilizes the Broad Quote Portal to allow collaborators to view, approve, and fund
          their quotes. Please wait to ship samples until a member of our team sends you
          confirmation that funding for your quote has been approved.
          <br /><br />
          Quotes will be created and accessible within 24 hours after your submission form has been
          submitted.
        </p>

        <v-btn
          append-icon="mdi-arrow-right"
          variant="outlined"
          rounded
          size="large"
          color="primary-base"
          href=""
          target="_blank"
        >
          Go to quote</v-btn
        >
        <section class="mt-12">
          <h2 class="prism-text-h4">Instructions</h2>
          <p class="prism-text-body-1">
            Your quote is tied to the specific email addresses provided in the PRISM screen
            submission form. A Quote Portal account will need to be created with the specific email
            address in order to access the quote, and only those accounts will have access to the
            quote.
            <br /><br />
            Purchase Orders should be uploaded to fund the quote through the Broad Quote Portal
            before approving the quote. If you are unable to upload your PO, please email them to
            <a href="mailto:ssfadminsupport@broadinstitute.org"
              >ssfadminsupport@broadinstitute.org</a
            >
            for them to be uploaded on your behalf. Please wait to ship samples until a member of
            our team sends you confirmation that funding for your quote has been approved.
            <br /><br />
            Additional information and troubleshooting tips on how to navigate the Broad Quote
            Portal can be found here.
          </p>
        </section>
        <section class="mt-12">
          <h2 class="prism-text-h4">Important Notes</h2>
          <p class="prism-text-body-1">
            It is the collaborator’s responsibility to ensure quote is approved and funded before
            the submission window deadline. Failure to provide funding and approve the quote will
            lead to your submission being pulled and your test agent(s) will not be included in the
            PRISM screen without exception.
            <br /><br />
            Per the quote terms, by approving the quote you are agree to the following: Broad will
            keep any shared non-public information, including the materials, confidential for 5
            years and will destroy all materials upon completing the collaboration. You retain the
            right to publish the collaboration results and authorship will be managed in accordance
            with customary practices; any such publication will give proper attribution and identify
            Broad’s PRISM Lab, where applicable.
            <br /><br />
            You own and have the right to use the collaboration results for any legal,
            non-commercial non-profit research or teaching purpose, while the PRISM Platform may
            only use them to validate and improve the Platform. Commercial use of the results or use
            of the results by a commercial entity requires a license from the Broad Institute, which
            can be negotiated by contacting
            <a href="mailto:partnering@broadinstitute.org">partnering@broadinstitute.org</a>.
          </p>
        </section>
      </page-section>
    </app-container>
  </page>
</template>

<script>
  export default {
    name: 'QuoteAndPO',
  };
</script>
<style scoped>
  p {
    max-width: 750px;
  }
  .v-alert {
    max-width: 750px;
  }
</style>
