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
          <box-plot
            v-if="adc.pools"
            :data="adc.pools"
            id-field="cellLine"
            id-title="Cell line"
            :x="{ field: 'pool', title: 'PRISM pool' }"
            :y="{ field: 'expression', title: 'ERBB2 expression' }"
            :initial-selected="her2Lines"
            initial-selected-label="Highlight HER2-overexpressing cell lines"
            :point-radius="3"
          />

          <p class="prism-text-body-large mt-8">
            Next, we developed a co-culture assay system consisting of fluorescently labeled
            HER2-positive NCIN87 cells and HER2-negative HCC1806 cells to confirm bystander killing
            capabilities of T-DM1 and T-MMAE. Co-cultures of GFP-NCIN87 cells and RFP-HCC1806 cells
            were seeded at 4 different ratios (1:1, 1:2, 1:5, and 1:20). In addition, each cell
            line was plated and treated individually. Cells were exposed to T-MMAE and T-DM1 at the
            same concentrations and treatment conditions as performed in the PRISM screen. Cell
            counts of each line were quantified by fluorescent imaging.
          </p>
          <p class="prism-text-body-large">
            Treatment of each cell line individually confirmed target-specific killing of T-DM1 and
            T-MMAE. Results showed some dose-related nonspecific cytotoxicity at the highest
            concentrations for both ADCs, but at lower doses both T-DM1 and T-MMAE were able to
            kill NCIN87 cells without affecting HCC1806 cells. In the co-culture system, both T-DM1
            and T-MMAE efficiently killed the target NCIN87 cells.
          </p>
          <p class="prism-text-body-large">
            Cytotoxicity of T-DM1 on HCC1806 was limited to the highest concentrations, consistent
            with the nonspecific high dose cytotoxicity observed in monoculture format. However, at
            low doses, HCC1806 cells were unaffected by T-DM1 and there was no shift in sensitivity
            across different ratios of NCIN87 cells, validating a lack of bystander killing
            activity by T-DM1.
          </p>
          <div
            v-if="adc.coCulture"
            class="line-chart-pair"
          >
            <line-chart
              v-for="panel in coCulturePanels('T-DM1')"
              :key="panel.title"
              v-bind="panel"
            />
          </div>

          <p class="prism-text-body-large mt-8">
            In contrast, we observed pronounced cytotoxicity by T-MMAE in HCC1806 that was both
            dependent on T-MMAE dose and the amount of NCIN87 cells present. Notably, at a ratio of
            1:20, which is approximately similar to the expected abundance of HER2-positive and
            HER2-negative cells in PRISM pools, T-MMAE did not induce bystander killing of HCC1806
            cells.
          </p>
          <div
            v-if="adc.coCulture"
            class="line-chart-pair"
          >
            <line-chart
              v-for="panel in coCulturePanels('T-MMAE')"
              :key="panel.title"
              v-bind="panel"
            />
          </div>

          <p class="prism-text-body-large mt-8">
            Collectively, these results confirm that T-MMAE has bystander killing activity, the
            extent of which in vitro is dependent on the presence of a sufficient number of
            HER2-positive cells. Taking this into consideration, given the relatively low number of
            HER2-positive cell lines in the PRISM set, the minimal off-target cell killing by
            T-MMAE is not unexpected.
          </p>
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
        adc: { auc: null, ge: null, shrna: null, pools: null, coCulture: null },
      };
    },

    created() {
      this.loadAuc();
      this.loadBiomarkers('ge');
      this.loadBiomarkers('shrna');
      this.loadPools();
      this.loadCoCulture();
    },

    methods: {
      // Co-culture viability for both ADCs, one row per cell line, ratio, dose and replicate
      async loadCoCulture() {
        const perAgent = await Promise.all(
          ['T-DM1', 'T-MMAE'].map(async (compound) => {
            const rows = await csv(dataPath + `co-culture results_normalized_${compound}.csv`);
            return rows.map((r) => ({
              compound,
              cells: r.Cells,
              // Doses carry float noise (0.1111111 vs 0.111111111), so round to 3 digits
              dose: +(+r.pert_dose).toPrecision(3),
              viability: +r.Viability,
              // Ratios arrive spreadsheet-mangled as "1:01"; the monoculture rows keep their name
              ratio: r.ratio.replace(/:0+(\d)/, ':$1'),
            }));
          }),
        );
        this.adc.coCulture = perAgent.flat();
      },
      // The two LineChart panels for one ADC: HCC1806 (HER2-negative) and NCIN87 (HER2-positive)
      coCulturePanels(compound) {
        const rows = this.adc.coCulture.filter((r) => r.compound === compound);
        const palettes = {
          HCC1806: ['#d0d1e6', '#a6bddb', '#74a9cf', '#2b8cbe', '#045a8d'],
          NCIN87: ['#bfd3e6', '#9ebcda', '#8c96c6', '#8856a7', '#810f7c'],
        };
        return ['HCC1806', 'NCIN87'].map((cells) => {
          const other = cells === 'HCC1806' ? 'NCIN87' : 'HCC1806';
          return {
            title: `${compound} – ${cells}`,
            data: rows.filter((r) => r.cells === cells),
            x: { field: 'dose', title: 'Concentration (µg/mL)', type: 'log' },
            // One viability range for all four panels; the data tops out at 1.23
            y: { field: 'viability', title: 'Viability', domain: [0, 1.25] },
            yTickCount: 6,
            series: {
              field: 'ratio',
              title: `${other} : ${cells} cell ratio`,
              domain: ['1:1', '1:2', '1:5', '1:20', `${cells} only`],
              range: palettes[cells],
            },
          };
        });
      },
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

  /* Two co-culture panels side by side, stacked on narrow screens */
  .line-chart-pair {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  @media (max-width: 600px) {
    .line-chart-pair {
      grid-template-columns: 1fr;
    }
  }

  .whitepaper-body h2 {
    margin-bottom: 0.75rem;
  }
</style>
