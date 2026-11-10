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
            id-field="cellLine"
            id-title="Cell line"
            :column="{ field: 'compound', domain: compounds }"
            :x="{ field: 'auc', title: 'AUC' }"
            :y="{ field: 'expression', title: 'ERBB2 expression, log2(TPM+1)' }"
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
            id-field="feature"
            id-title="Gene"
            :column="{ field: 'compound', title: 'Gene expression', domain: compounds.slice(0, 2) }"
            :x="{ field: 'coef', title: 'Correlation', domain: [-0.6, 0.6], threshold: 0 }"
            :y="{ field: 'qval', title: '-log10(q value)' }"
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
            id-field="feature"
            id-title="Gene"
            :column="{ field: 'compound', title: 'shRNA knockdown', domain: compounds.slice(0, 2) }"
            :x="{ field: 'coef', title: 'Correlation', domain: [-1, 1], threshold: 0 }"
            :y="{ field: 'qval', title: '-log10(q value)' }"
            :initial-selected="['ERBB2']"
            initial-selected-label="Highlight ERBB2"
            :point-radius="4"
          />

          <h3 class="prism-text-title-large mt-8">
            Validation of ADC bystander activity
          </h3>
          <p class="prism-text-body-large">
            Next, we further explored bystander activities of T-DM1 and T-MMAE. Overall, we did
            not observe robust HER2-independent cytotoxicity by either T-DM1 or T-MMAE. These
            results are consistent with expected activity for T-DM1; however, T-MMAE releases a
            cell permeable payload that can kill neighboring cells. To account for our
            observations, we speculated that the relative abundance of HER2-positive target cells
            in PRISM pools could be too low to induce a substantial bystander killing effect. We
            evaluated the quantity and distribution of target cell lines based on ERBB2 gene
            expression status and identified ten HER2-positive cell lines in the PR500 cell set.
            Looking across PRISM pools, the number of HER2-positive cell lines ranges from 1-3 cell
            lines per pool, each of which consist of 20-25 total cell lines.
          </p>
          <div class="figure-toolbar">
            <v-autocomplete
              v-model="poolSelected"
              :items="poolCellLines"
              label="Search cell lines"
              class="figure-toolbar__search"
              variant="underlined"
              density="compact"
              multiple
              chips
              closable-chips
              clearable
              hide-details
            />
            <v-btn
              size="small"
              variant="outlined"
              rounded
              @click="poolSelected = [...her2Lines]"
            >
              Highlight HER2-overexpressing cell lines
            </v-btn>
          </div>
          <box-plot-chart
            v-if="adc.pools"
            :data="adc.pools"
            orientation="vertical"
            points
            :height="400"
            :axis="{
              x: { field: 'pool', title: 'PRISM pool' },
              y: { field: 'expression', title: 'ERBB2 expression' },
            }"
            :tooltip="poolTooltip"
            :highlight="poolHighlight"
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
  import BoxPlotChart from '@/lib/charts/BoxPlotChart.vue';

  // The ten HER2-overexpressing lines in the PR500 set
  const HER2_LINES = [
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
  ];

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
    components: { BoxPlotChart },
    data() {
      return {
        paper: {
          author: 'Eskra J',
          date: 'July 27, 2023',
          portalLink: 'https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds',
        },
        compounds: ['T-DM1', 'T-MMAE', 'Trastuzumab'],
        // The ten HER2-overexpressing lines in the PR500 set
        her2Lines: HER2_LINES,
        // Rows for the figures, filled in once the CSVs load
        adc: { auc: null, ge: null, shrna: null, pools: null },
        // Cell lines highlighted in the pools box plot
        poolSelected: [...HER2_LINES],
      };
    },

    computed: {
      poolCellLines() {
        return this.adc.pools ? [...new Set(this.adc.pools.map((r) => r.cellLine))].sort() : [];
      },
      // Highlight predicate for the box plot; null when nothing is selected
      poolHighlight() {
        if (!this.poolSelected.length) return null;
        const selected = new Set(this.poolSelected);
        return (record) => selected.has(record.cellLine);
      },
    },

    created() {
      this.loadAuc();
      this.loadBiomarkers('ge');
      this.loadBiomarkers('shrna');
      this.loadPools();
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
      // ERBB2 expression per cell line with its pool; lines without a name are dropped
      async loadPools() {
        const rows = await csv(dataPath + 'ERBB2 expression PR500.csv');
        this.adc.pools = rows
          .filter((r) => r.cell_line_display_name && r.cell_line_display_name !== 'NA')
          .map((r) => ({
            pool: r.pool_id,
            cellLine: r.cell_line_display_name,
            expression: +r['ERBB2 expression'],
            status: r['ERBB2 status'],
          }))
          .sort((a, b) => a.pool.localeCompare(b.pool));
      },
      // Tooltip rows for the box plot: lead with the cell line
      poolTooltip(record, rows) {
        return [['Cell line', record.cellLine], ...rows];
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

  /* Search box plus reset button above a figure */
  .figure-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 12px;
  }
  .figure-toolbar__search {
    flex: 1 1 260px;
    max-width: 360px;
  }

  .whitepaper-body h2 {
    margin-bottom: 0.75rem;
  }
</style>
