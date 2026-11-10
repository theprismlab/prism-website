<template>
  <page>
    <page-header narrow>
      <template #overline>
        White Paper
      </template>
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
          <h2 class="prism-text-headline-small font-weight-light">
            Summary
          </h2>
          <p class="prism-text-body-large">
            Summary text goes here.
          </p>
        </section>

        <section id="introduction">
          <h2 class="prism-text-headline-small font-weight-light">
            Introduction
          </h2>
          <p class="prism-text-body-large">
            Introduction text goes here.
          </p>
        </section>

        <section id="methods">
          <h2 class="prism-text-headline-small font-weight-light">
            Methods
          </h2>
          <p class="prism-text-body-large">
            Methods text goes here.
          </p>
        </section>

        <section id="results">
          <h2 class="prism-text-headline-small font-weight-light">
            Results
          </h2>

          <h3 class="prism-text-title-large">
            ADCs exhibit target specific cytotoxicity in PRISM
          </h3>
          <p class="prism-text-body-large">
            The correlation between HER2 expression level and antitumor efficacy of trastuzumab
            ADCs has been well established<sup>19</sup>; therefore, we explored whether the
            selectivity of T-MMAE and T-DM1 was associated with ERBB2 (HER2) gene expression. We
            found a clear association between the cell line sensitivity profile and ERBB2
            overexpression for both T-DM1 and T-MMAE. The strongest effects on viability were
            observed in a subset of cell lines that overexpress ERBB2. Importantly, the correlation
            of ERBB2 expression with treatment sensitivity was retained for T-MMAE, despite its
            ability to exert bystander killing effects, which could potentially confound target
            identification. As expected, trastuzumab alone was relatively inert across all PRISM
            cell lines. These results indicate that PRISM pooled cell line screening is capable of
            maintaining selectivity of the primary target for ADCs with different payload
            characteristics.
          </p>
          <scatter-grid
            v-if="adc.auc"
            :data="adc.auc"
            id-key="cellLine"
            id-title="Cell line"
            :column="{ key: 'compound', values: compounds }"
            :x="{ key: 'auc', title: 'AUC' }"
            :y="{ key: 'expression', title: 'ERBB2 expression, log2(TPM+1)' }"
            :color="{
              scheme: 'corners',
              title: 'Color deepens with ERBB2 expression',
              labels: ['Low AUC (sensitive)', 'High AUC'],
            }"
            :initial-selected="her2Lines"
            initial-selected-label="Highlight HER2-overexpressing cell lines"
            :point-radius="4"
          />

          <h3 class="prism-text-title-large mt-8">
            PRISM screening identifies relevant ADC biomarkers
          </h3>
          <p class="prism-text-body-large">
            PRISM biomarker analysis enables identification of genomic features and genetic
            dependencies (gene expression, copy number, proteomics, CRISPR knockdown, shRNA
            knockdown, etc.) associated with sensitivity. These analyses can identify predictive
            markers for treatment response or inform potential hypotheses for mechanisms of action.
            We explored T-DM1 and T-MMAE biomarker results to evaluate whether PRISM screening
            recovers expected markers of sensitivity to ADCs.
          </p>
          <scatter-grid
            v-if="adc.ge"
            :data="adc.ge"
            id-key="feature"
            id-title="Gene"
            :column="{ key: 'compound', title: 'Gene expression', values: compounds.slice(0, 2) }"
            :x="{ key: 'coef', title: 'Correlation', domain: [-0.6, 0.6], threshold: 0 }"
            :y="{ key: 'qval', title: '-log10(q value)' }"
            :color="{
              scheme: 'corners',
              title: 'Color deepens with significance',
              labels: ['Negative correlation', 'Positive correlation'],
            }"
            :initial-selected="['ERBB2']"
            initial-selected-label="Highlight ERBB2"
            :point-radius="4"
          />
          <p class="prism-text-body-large mt-8">
            Univariate biomarker analysis identified ERBB2 gene expression and copy number as
            significantly correlated with sensitivity to both T-DM1 and T-MMAE. Additionally, when
            comparing PRISM profiles with shRNA dependency data, ERBB2 emerged as one of the top
            correlated dependencies for both T-DM1 and T-MMAE. These results demonstrate that PRISM
            screening is capable of identifying relevant targets of ADCs with permeable and
            non-permeable payloads in an unbiased fashion.
          </p>
          <scatter-grid
            v-if="adc.shrna"
            :data="adc.shrna"
            id-key="feature"
            id-title="Gene"
            :column="{ key: 'compound', title: 'shRNA knockdown', values: compounds.slice(0, 2) }"
            :x="{ key: 'coef', title: 'Correlation', domain: [-1, 1], threshold: 0 }"
            :y="{ key: 'qval', title: '-log10(q value)' }"
            :color="{
              scheme: 'corners',
              title: 'Color deepens with significance',
              labels: ['Negative correlation', 'Positive correlation'],
            }"
            :initial-selected="['ERBB2']"
            initial-selected-label="Highlight ERBB2"
            :point-radius="4"
          />
        </section>

        <section id="conclusions">
          <h2 class="prism-text-headline-small font-weight-light">
            Conclusions
          </h2>
          <p class="prism-text-body-large">
            Conclusions text goes here.
          </p>
        </section>
      </article>
    </page-section>
  </page>
</template>

<script>
  import { csv } from 'd3';

  const dataPath = import.meta.env.BASE_URL + 'data/2023_07_adc/';

  // One CSV per agent; the AUC column is named differently in each
  const AUC_FILES = {
    'T-DM1': { file: 'ERBB2 log2(TPM+1) Expression vs T-DM1 AUC.csv', aucKey: 'T-DM1 AUC' },
    'T-MMAE': {
      file: 'ERBB2 log2(TPM+1) Expression vs T-MMAE AUC.csv',
      aucKey: 'Trastuzumab-MMAE AUC',
    },
    Trastuzumab: {
      file: 'ERBB2 log2(TPM+1) Expression vs Trastuzumab AUC.csv',
      aucKey: 'Trastuzumab',
    },
  };
  const EXPRESSION_KEY = 'ERBB2 log2(TPM+1) Expression Public 23Q2';

  // Biomarker CSVs: one per ADC, features prefixed with the data type
  const BIOMARKER_FILES = {
    ge: { prefix: 'GE_', files: { 'T-DM1': 'biomarker_GE_T-DM1.csv', 'T-MMAE': 'biomarker_GE_T-MMAE.csv' } },
    shrna: {
      prefix: 'shRNA_',
      files: { 'T-DM1': 'biomarker_shRNA_T-DM1.csv', 'T-MMAE': 'biomarker_shRNA_T-MMAE.csv' },
    },
  };

  export default {
    name: 'WhitepaperAntibodyDrugConjugates',
    data() {
      return {
        paper: {
          author: 'Eskra J',
          date: 'July 27, 2023',
          portalLink: 'https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds',
        },
        compounds: ['T-DM1', 'T-MMAE', 'Trastuzumab'],
        // The ten HER2-overexpressing lines in the PR500 set
        her2Lines: [
          'BT474',
          'EFM192A',
          'HCC1419',
          'KYSE410',
          'MKN7',
          'NCIH2170',
          'NCIN87',
          'OE19',
          'SKOV3',
          'TE4',
        ],
        // Rows for the three scatter figures, filled in once the CSVs load
        adc: { auc: null, ge: null, shrna: null },
      };
    },

    created() {
      this.loadAuc();
      this.loadBiomarkers('ge');
      this.loadBiomarkers('shrna');
    },

    methods: {
      // Merge the per-agent files into one list with a `compound` column
      async loadAuc() {
        const perAgent = await Promise.all(
          Object.entries(AUC_FILES).map(async ([compound, { file, aucKey }]) => {
            const rows = await csv(dataPath + file);
            return rows.map((r) => ({
              compound,
              cellLine: r['Cell Line Name'],
              auc: r[aucKey],
              expression: r[EXPRESSION_KEY],
              lineage: r.Lineage,
            }));
          }),
        );
        this.adc.auc = perAgent.flat();
      },
      async loadBiomarkers(kind) {
        const { prefix, files } = BIOMARKER_FILES[kind];
        const perAgent = await Promise.all(
          Object.entries(files).map(async ([compound, file]) => {
            const rows = await csv(dataPath + file);
            return rows.map((r) => ({
              compound,
              feature: r.feature.startsWith(prefix) ? r.feature.slice(prefix.length) : r.feature,
              coef: r.coef,
              qval: r['log10(q.val)'],
            }));
          }),
        );
        this.adc[kind] = perAgent.flat();
      },
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
