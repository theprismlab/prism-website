<template>
  <page>
    <page-header narrow>
      <template #overline>White Paper</template>
      <template #title>
        PRISM high throughput screening of antibody-drug conjugates uncovers clinically relevant
        targets
      </template>
      <p class="prism-text-body-large text-medium-emphasis whitepaper-meta">
        <span>{{ paper.author }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ paper.date }}</span>
      </p>
      <div class="whitepaper-actions">
        <v-btn
          :href="paper.portalLink"
          target="_blank"
          rel="noopener"
          rounded
          variant="outlined"
          prepend-icon="mdi-chart-box-outline"
          append-icon="mdi-arrow-top-right"
        >
          Explore Data
        </v-btn>
      </div>
    </page-header>

    <page-section width="narrow">
      <article class="whitepaper-body">
        <!-- TODO: replace placeholder sections with the white paper content -->
        <section id="summary">
          <h2 class="prism-text-headline-small font-weight-light">Summary</h2>
          <p class="prism-text-body-large">Summary text goes here.</p>
        </section>

        <section id="introduction">
          <h2 class="prism-text-headline-small font-weight-light">Introduction</h2>
          <p class="prism-text-body-large">Introduction text goes here.</p>
        </section>

        <section id="methods">
          <h2 class="prism-text-headline-small font-weight-light">Methods</h2>
          <p class="prism-text-body-large">Methods text goes here.</p>
        </section>

        <section id="results">
          <h2 class="prism-text-headline-small font-weight-light">Results</h2>
          <p class="prism-text-body-large">Results text goes here.</p>
        </section>

        <section id="conclusions">
          <h2 class="prism-text-headline-small font-weight-light">Conclusions</h2>
          <p class="prism-text-body-large">Conclusions text goes here.</p>
        </section>
      </article>
    </page-section>
  </page>
</template>

<script>
  export default {
    name: 'WhitepaperAntibodyDrugConjugates',
    data() {
      return {
        paper: {
          author: 'Eskra J',
          date: 'July 27, 2023',
          portalLink: 'https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds',
        },
      };
    },
  };
</script>

<style scoped>
  .whitepaper-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0 0 1rem;
  }

  .whitepaper-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .whitepaper-body {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .whitepaper-body h2 {
    margin-bottom: 0.75rem;
  }
</style>
