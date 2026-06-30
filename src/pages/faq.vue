<template>
  <page>
    <app-container>
      <prism-page-title>Frequently Asked Questions</prism-page-title>
      <section class="faq-list">
        <v-expansion-panels variant="accordion" flat>
          <v-expansion-panel v-for="item in faqs" :key="item.question">
            <v-expansion-panel-title>
              {{ item.question }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="faq-answer">{{ item.answer }}</div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>
    </app-container>
  </page>
</template>

<script>
  export default {
    name: 'FAQ',
    data() {
      return {
        faqs: [
          {
            category: 'About PRISM',
            question: 'What is the PRISM assay?',
            answer:
              'PRISM (Profiling Relative Inhibition Simultaneously in Mixtures) is a high-throughput cancer cell line screening platform that uses DNA barcoding to pool hundreds of cell lines together, enabling simultaneous drug sensitivity profiling across a large panel of human cancer cell lines in a single experiment.',
          },
          {
            category: 'About PRISM',
            question: 'How many cell lines are included in PRISM screens?',
            answer:
              'The standard PRISM panel includes approximately 900+ cancer cell lines spanning over 45 lineages. Specific pools may vary by screen type (e.g., MTS single-agent, CPS combination, APS aqueous).',
          },
          {
            category: 'Data Access',
            question: 'How do I access PRISM screening data?',
            answer:
              "PRISM data is publicly available through the DepMap portal at depmap.org. You can download processed viability matrices, log-fold change files, and associated metadata directly from the portal's data downloads page.",
          },
          {
            category: 'Data Access',
            question: 'What file formats are PRISM results provided in?',
            answer:
              'Results are provided as CSV files containing log-fold change values and viability scores per cell line per compound. Metadata files (cell line annotations, compound annotations) are also available as CSV downloads from the portal.',
          },
          {
            category: 'Screening Services',
            question: 'Can I submit my own compounds for PRISM screening?',
            answer:
              'Yes. PRISM accepts compound submissions for inclusion in its pooled screening campaigns. Please visit the Contact Us page to get in touch with the PRISM team about submission requirements, timelines, and collaboration opportunities.',
          },
          {
            category: 'Screening Services',
            question: 'What is the difference between MTS, CPS, and APS screens?',
            answer:
              'MTS (Multiplexed Tumor Screening) screens single agents dissolved in DMSO. CPS (Combination PRISM Screening) tests drug combinations. APS (Aqueous PRISM Screening) extends single-agent screening to water-soluble compounds that cannot be dissolved in DMSO.',
          },
          {
            category: 'Technical',
            question: 'What readout does the PRISM sequencing assay use?',
            answer:
              'The updated PRISM sequencing assay uses a next-generation sequencing (NGS) readout to quantify cell line–specific DNA barcodes, replacing the earlier Luminex bead-based detection. This improves sensitivity, throughput, and dynamic range across the cell line panel.',
          },
          {
            category: 'Technical',
            question: 'How are PRISM viability values calculated?',
            answer:
              'Viability is calculated as the log-fold change (LFC) of barcode counts in the treated condition relative to a DMSO vehicle control, normalized using reference cell lines included in each pool. Values near 0 indicate no effect; more negative values indicate greater growth inhibition.',
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .faq-list {
    max-width: 720px;
  }

  /* .v-expansion-panel {
    margin-top: -1px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    box-shadow: none !important;
  } */
  .v-expansion-panel {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .v-expansion-panel:not(:first-child)::after {
    display: none;
  }

  .v-expansion-panel-title {
    font-size: 0.925rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }

  .v-expansion-panel-title.v-expansion-panel-title--active {
    background-color: rgba(var(--v-theme-on-surface), 0.03);
  }

  .faq-answer {
    font-size: 0.875rem;
    color: rgb(120, 126, 140);
    line-height: 1.6;
  }
</style>
