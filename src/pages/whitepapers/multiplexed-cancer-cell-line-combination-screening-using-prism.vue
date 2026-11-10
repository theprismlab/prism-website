<template>
  <page>
    <page-header narrow>
      <template #title>Multiplexed cancer cell line combination screening using PRISM</template>
      <p class="prism-text-body-medium text-medium-emphasis whitepaper-meta">
        <span>{{ paper.author }}</span>
        <span>Published {{ paper.date }}</span>
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
        <section>
          <h2 class="prism-text-headline-medium">Introduction</h2>
          <p class="prism-text-body-large">
            Combination therapies are routinely used in cancer care, and patient cure is almost
            never achieved by monotherapy<sup>1</sup>. However, which combinations will benefit
            specific cancer patients is largely unknown. While many studies have used cell culture
            and animal model systems to characterize combination effects, the sheer number of
            clinical, investigational, and tool anticancer agents, coupled with the diversity and
            heterogeneity of cancer, precludes comprehensive investigation<sup>2–5</sup>.
            Accordingly, most such studies are restricted to a small number of drugs or a restricted
            set of cancer contexts. Methods to address these limitations, such as those that enable
            measurement of candidate combinations in many cell lines simultaneously, would greatly
            increase the potential scale of combinations research, generating preclinical evidence
            that may help identify candidate combinations for clinical trials.
          </p>

          <figure-cards :items="introCards" caption="Fig.1. Schematic of the PRISM assay" />
        </section>

        <section>
          <h2 class="prism-text-headline-medium">Analysis of combination data</h2>
          <p class="prism-text-body-large">
            Experimental combinations are generally benchmarked by comparing the effects of two (or
            more) agents to the corresponding single-agent activities, using established metrics to
            describe the combined effects (e.g., independent action, additivity, synergy,
            antagonism)<sup>6</sup>. For example, the Bliss model assesses proportional cell
            killing, where under the null hypothesis (no interaction between two or more
            perturbations) viability effects are multiplicative<sup>7</sup>. The quantification and
            classification of combination effects may aid prioritization of combinations for
            additional investigation while also providing biological and mechanistic insights. For
            example, antagonistic combinations might be deprioritized from further study, while
            synergistic combinations may be useful in overcoming resistance<sup>8</sup>. Independent
            (or additive) combinations may be useful to combat inter- or intra-patient
            heterogeneity; this behavior is characteristic of many effective clinical combinations
            (and most curative combinations) described to date<sup>9, 10</sup>.
          </p>
          <figure-cards
            :items="combinationEffects"
            caption="Fig.2. Classifications of combination effects"
          />
        </section>

        <section>
          <h2 class="prism-text-headline-medium">Considerations for dose selection</h2>
          <p class="prism-text-body-large">
            The ideal dose range for the single-agent components in combination screening would span
            at least one concentration with no effect on cell line viability but evidence for
            cellular activity (e.g., target engagement) across all models to be tested, and one dose
            where the maximal effects attributable to on-mechanism activity are observed. To
            facilitate determining this dose range for test combinations, we routinely assess single
            agents over a range of concentrations in up to 900 cell lines using PRISM. An
            alternative approach would test single-agent concentration ranges in a number of
            individual cell lines, and/or, if available, leverage published cell biology or
            screening data (e.g., at depmap.org). <br /><br />
            For combination components with minimal differential viability effects, testing a single
            dose may represent the most efficient combinatorial design. By contrast, strong
            differential viability effects of one combination partner across cell lines supports the
            use of multiple doses; this approach also facilitates aggregation of the viability
            readout across doses (e.g., through fitting of dose-response curves). Where it is not
            possible to span the entire range of response to a given compound, it is recommended to
            focus on the lower end of the ideal concentration range (i.e., less cell viability
            effects) to facilitate identification of increased cell killing (e.g., additivity or
            synergy)–unless the experimental goal is to identify and characterize antagonistic
            combinations (e.g., drug rescue screens).
          </p>
          <figure-cards
            :items="doseSelection"
            caption="Fig.3. Dosing schemes of combinations based on single agent viability results"
          />
        </section>

        <section>
          <h2 class="prism-text-headline-medium">Results</h2>
          <h3 class="prism-text-headline-small">Selection of test combinations</h3>
          <p class="prism-text-body-large">
            To test the suitability of PRISM for pooled cell line combination screening, we selected
            three test combinations: temozolomide+O6-benzylguanine, A-1331852+AZD5991, and
            ML210+ferrostatin-1. Single-agent responses across PRISM cell lines are shown in figure
            4, and we choose the combination screening format based on this data.
          </p>

          <p class="prism-text-medium my-4">
            <b>temozolomide+O6-benzylguanine. </b>MGMT (O-6-methylguanine-DNA methyltransferase) is
            an experimentally- and clinically-validated biomarker of resistance to temozolomide:
            MGMT reverses the action of temozolomide as the MGMT protein directly repairs
            temozolomide-induced alkylation<sup>11</sup>. As a single agent, we observe that
            resistance to temozolomide is strongly associated with MGMT expression across the large
            panel of cell lines in PRISM (r = 0.63, q = 1.2 x 10<sup>-86</sup>, rank =1;
            <a :href="correlationLink(compounds.temozolomide)" target="_blank">PRISM Portal</a>).
            Inhibition of MGMT by agents such as O6-benzylguanine has been reported to enhance
            temozolomide activity in a subset of MGMT-expressing cell lines in vitro<sup>8</sup>.
            O6-benzylguanine does not have appreciable viability effects in PRISM at concentrations
            sufficient to inhibit MGMT and enhance temozolomide sensitivity<sup>8</sup>.
            <br /><br />
            <b>AZD5991+A-1331852.</b> Combined genetic or chemical inhibition of the apoptotic
            regulators MCL1 and BCL2L1 has been reported as strongly synergistic<sup>12,13</sup>.
            AZD5991 is a selective MCL1 inhibitor; in PRISM, we observe that AZD5991 phenocopies
            MCL1 CRISPR dependency (r = 0.3, q = 5.3 x 10<sup>-11</sup>, rank =1;
            <a :href="correlationLink(compounds.azd5991)" target="_blank">PRISM Portal</a>). In
            addition, we observe that resistance to AZD5991 is strongly associated with BCL2L1
            expression (r = 0.27, q = 5.8 x 10<sup>-11</sup>, rank =1;
            <a :href="correlationLink(compounds.azd5991)" target="_blank">PRISM Portal</a>).
            A-1331852 is a selective BCL2L1 (BCL-xL) inhibitor; in PRISM, we observe that A-1331852
            phenocopies BCL2L1 CRISPR dependency (r = 0.47, q = 1.1 x 10<sup>-31</sup>, rank =1;
            <a :href="correlationLink(compounds.a1331852)" target="_blank">PRISM Portal</a>) and
            resistance to A-1338152 is associated with MCL1 expression (<a
              :href="correlationLink(compounds.a1331852)"
              target="_blank"
              >PRISM Portal</a
            >) . <br /><br />
            <b> ML210+ferrostatin-1.</b> ML210 inhibits GPX4 (glutathione peroxidase 4) and kills
            cells via ferroptosis through generation of reactive lipid peroxide species; in PRISM,
            we observe that ML210 phenocopies GPX4 CRISPR dependency (r = 0.44, q = 1.2 x
            10<sup>-27</sup>, rank =1;
            <a :href="correlationLink(compounds.ml210)" target="_blank">PRISM Portal</a>).
            Ferrostatin-1 is a radical-trapping antioxidant that protects cells from reactive
            species and therefore rescues cells from ferroptosis<sup>14,15</sup>. As ferrostatin-1
            has been reported to have minimal viability effects across cell lines, we tested
            ferrostatin-1 at a single dose of 10µM, a concentration sufficient to fully inhibit
            ferroptosis; this concentration does not show appreciable viability effects in
            PRISM<sup>8,14,16</sup>.
          </p>

          <h3 class="prism-text-headline-small">Pooled combination screening results</h3>
          <p class="prism-text-body-large">
            Because O6-benzylguanine and ferrostatin-1 demonstrated minimal effects on viability as
            single agents across a large panel of cell lines, we screened a single dose (5 µM and 10
            µM, respectively) in combination with 7 concentrations of temozolomide (top
            concentration: 100µM; threefold dilution) and ML210 (top concentration: 10µM; threefold
            dilution), respectively. As both A-1331852 and AZD5991 had dose-dependent effects on
            cell viability, we screened a 5x5 matrix (threefold dilution) of these compounds (top
            concentrations: 0.041 and 0.37µM, respectively). Combinations and all component single
            agents at matching concentrations were plated using an HP D300e drug printer and
            screened in nearly 900 cancer cell lines using standard PRISM conditions and data
            processing [<a href="https://github.com/cmap/dockerized_mts" target="_blank">link</a>].
          </p>
          <div></div>

          <div
            v-for="combo in combinations"
            :key="combo.title"
            class="combo-figure"
          >
            <h4 class="prism-text-title-medium combo-figure__title">{{ combo.title }}</h4>
            <div v-if="combo.cells" class="combo-figure__panels">
              <div>
                <p class="combo-figure__label prism-text-title-small">Single agent</p>
                <div class="combo-figure__panels">
                  <heatmap
                    :data="combo.cells.x"
                    :x-title="`${combo.x.name} (µM)`"
                    :value-title="killedLabel"
                    :domain="combo.cells.domain"
                    log
                  />
                  <heatmap
                    :data="combo.cells.y"
                    :x-title="`${combo.y.name} (µM)`"
                    :value-title="killedLabel"
                    :domain="combo.cells.domain"
                    log
                  />
                </div>
              </div>
              <heatmap
                :data="combo.cells.xy"
                :x-title="`${combo.x.name} (µM)`"
                :y-title="`${combo.y.name} (µM)`"
                :value-title="killedLabel"
                :domain="combo.cells.domain"
                log
                title="Combination"
                legend
              />
            </div>
          </div>

          <p class="prism-text-body-medium text-medium-emphasis mt-4">
            Fig.4. Combinations tested and their dosing schemes. The dosing schemes of the three
            combinations tested were determined based on the described procedure. Thus, temozolomide
            + O6 Benzylguanine and ML210 + Ferrostatin were screened in the 7x1 format since one of
            the single agents was largely inert. Since both AZD5991 and A-1331852 demonstrated
            significant viability effects, we employed the 5x5 format for the AZD5991 + A-1331852
            combination. A cell line was classified as “killed” if its viability (relative to
            vehicle control) was &lt; 0.3.
          </p>
        </section>

        <section>
          <h2 class="prism-text-headline-medium">Synergy by dose</h2>

          <h3 class="prism-text-headline-small">Temozolomide + O6-benzylguanine</h3>
          <p class="prism-text-body-large">
            In the presence of O6-benzylguanine, cell lines that expressed MGMT were sensitized to
            temozolomide (i.e., synergy was observed) (figure 5). Intriguingly, while MGMT
            expression appeared necessary for sensitization to temozolomide, a subset of cell lines
            remained resistant to temozolomide even in the presence of O6-benzylguanine.
            Accordingly, we asked whether any baseline genomic features were associated with the
            calculated temozolomide+O6-benzylguanine synergy score in MGMT-expressing cell lines
            (MGMT expression &gt; 1.5, see figure 8). We found that low expression of the MSH6 gene
            (and low protein levels of MSH6, or its heterodimeric partner protein MSH2) were
            associated with lack of synergy in MGMT-proficient cell lines. MSH2 and MSH6 are genes
            involved in DNA mismatch repair, and their loss has been previously suggested to be
            associated with resistance to temozolomide<sup>17, 18</sup>.
          </p>
          <scatter-grid
            v-if="synergy.temo"
            :data="synergy.temo"
            id-key="ccle_name"
            id-title="Cell line"
            :column="{ key: 'dose1', title: 'Temozolomide (µM)' }"
            :row="{ key: 'dose2', title: 'O6-benzylguanine (µM)' }"
            :x="{ key: 'S', title: 'Synergy score', domain: [-1, 1], threshold: 0 }"
            :y="{ key: 'EXP_MGMT', title: 'MGMT expression', threshold: 1.5 }"
            :color="{ key: 'synergy_count_across_doses', title: 'Synergy count', scheme: 'blues' }"
            marginals
          />
          <p class="prism-text-body-medium text-medium-emphasis mt-4">
            <b>Fig.5. Synergy in temozolomide + O6-Benzylguanine combination.</b> Many cell lines
            with high MGMT expression levels were sensitized to temozolomide by the addition of
            O6-Benzylguanine, and thus exhibited strong synergy. Each point, representing a cell
            line, is colored by the number of times the synergy score of the cell line was &gt; 0
            (with a q-value &lt; 0.1). Histograms of the synergy score at each dose and MGMT
            expression are also shown. Due to the bimodal nature of MGMT expression in the set of
            cell lines, we set a threshold of 1.5 (dashed line) to differentiate high MGMT
            expressing lines from low MGMT expressing lines. Statistical significance was evaluated
            by computing empirical p-values of the corresponding one-sided test followed by multiple
            hypothesis correction (see Appendix).
          </p>

          <h3 class="prism-text-headline-small mt-8">ML210 + ferrostatin-1</h3>
          <p class="prism-text-body-large">
            As the dose of ML210 increased, we observed that ferrostatin-1 consistently antagonized
            the effects of ML210 across cell lines (figure 6). For example, the median viability
            across cell lines at 10µM ML210 was 58.0%, compared with 92.9% at 10µM ML210 +
            ferrostatin-1, resulting in a median synergy score of S = -0.30.
          </p>
          <scatter-grid
            v-if="synergy.ml210"
            :data="synergy.ml210"
            id-key="ccle_name"
            id-title="Cell line"
            :column="{ key: 'dose1', title: 'ML210 (µM)' }"
            :row="{ key: 'dose2', title: 'Ferrostatin-1 (µM)' }"
            :x="{ key: 'S', title: 'Synergy score', domain: [-1, 1], threshold: 0 }"
            :y="{ key: 'XPR_GPX4', title: 'GPX4 dependency' }"
            :color="{
              key: 'antagonism_count_across_doses',
              title: 'Antagonism count',
              scheme: 'reds',
            }"
            marginals
          />
          <p class="prism-text-body-medium text-medium-emphasis mt-4">
            <b>Fig.6. Antagonism in ML210 + Ferrostatin combination.</b> Many cell lines exhibited
            strong antagonism at higher dose values of ML210. Each point, representing a cell line,
            is colored by the number of times the synergy score of the cell line was &lt; 0 (with a
            q-value &lt; 0.1). Histograms of the synergy score at each dose and the CRISPR Chronos
            dependency score of GPX4 are also shown. Note that, unlike MGMT expression, there is no
            apparent bimodality in the CRISPR score. Statistical significance was evaluated by
            computing empirical p-values of the corresponding one-sided test followed by multiple
            hypothesis correction (see Appendix).
          </p>

          <h3 class="prism-text-headline-small mt-8">AZD5991 + A-1331852</h3>
          <p class="prism-text-body-large">
            Across doses and across cell lines, we observed that BCL-xL and MCL1 inhibition were
            synergistic: for example, the median synergy score at the highest tested doses (0.37µM
            AZD5991 + 0.041µM A-1331852) was S = 0.28 (figure 7).
          </p>
          <scatter-grid
            v-if="synergy.azd"
            :data="synergy.azd"
            id-key="ccle_name"
            id-title="Cell line"
            :column="{ key: 'dose1', title: 'AZD5991 (µM)' }"
            :row="{ key: 'dose2', title: 'A-1331852 (µM)' }"
            :x="{ key: 'S', title: 'Synergy score', threshold: 0 }"
            :y="{ key: 'neg_log10_qval', title: '-log10(q value)', threshold: 1 }"
            :color="{ key: 'S', title: 'Synergy score', scheme: 'rdbu' }"
          />
          <p class="prism-text-body-medium text-medium-emphasis mt-4">
            <b>Fig.7. Observed synergy in AZD5991 + A-1331852 combination.</b> Many cell lines
            exhibited strong synergy at higher doses of the combination. Each point, representing a
            cell line, is colored by the number of times the synergy score of the cell line was
            significantly different from 0 (q-value &lt; 0.1). Statistical significance was
            evaluated by computing empirical p-values from a two-sided test followed by multiple
            hypothesis correction (see Appendix). The p-values were computed from an empirical null
            model of synergy values that accounted for cell-line specific variability—reflected in
            the range of q-values at a given synergy value. The gap at synergy=0 reflects the large
            number of cases where synergy is zero by our definition.
          </p>
        </section>

        <section>
          <h2 class="prism-text-headline-small font-weight-light"></h2>
          <p class="prism-text-body-large"></p>
        </section>
      </article>
    </page-section>
  </page>
</template>

<script>
  import { csv, rollups } from 'd3';

  const imagePath = import.meta.env.BASE_URL + 'images/white-paper-cps/';
  const dataPath = import.meta.env.BASE_URL + 'data/2024_04_cps/';
  // A cell line counts as killed when its viability relative to vehicle is under this
  const KILLED_BELOW = 0.3;

  // Number of rows (cell lines) whose viability is under the threshold
  function countKilled(rows, viabilityKey) {
    return rows.filter((r) => +r[viabilityKey] < KILLED_BELOW).length;
  }

  // Heatmap cells { x, y, value } from CSV rows: one value per (xKey, yKey) pair.
  // Omit yKey for a one-row strip.
  function heatmapCells(rows, viabilityKey, xKey, yKey = null) {
    const grouped = rollups(
      rows,
      (group) => countKilled(group, viabilityKey),
      (r) => r[xKey],
      (r) => (yKey ? r[yKey] : '')
    );
    return grouped.flatMap(([x, byY]) => byY.map(([y, value]) => ({ x, y, value })));
  }

  // Single-agent viability is repeated on every combination row, so keep one
  // row per (dose, cell line) before counting.
  function singleAgentRows(rows, doseKey) {
    return rollups(
      rows,
      (group) => group[0],
      (r) => r[doseKey],
      (r) => r.ccle_name
    ).flatMap(([, byCellLine]) => byCellLine.map(([, row]) => row));
  }

  export default {
    name: 'WhitepaperMultiplexedCombinationScreening',
    data() {
      const portalBase = 'https://theprismlab.org/portal';
      const project = 'CPS009/CPS_WHITEPAPER';
      const screen = 'PCPS019';
      return {
        portalBase,
        project,
        screen,
        compounds: {
          temozolomide: 'BRD-K32107296',
          azd5991: 'BRD-K00005264',
          a1331852: 'BRD-K50731585',
          ml210: 'BRD-K01877528',
        },

        paper: {
          author:
            'Matthew G. Rees, Ashish Bino George, Mustafa Kocak, Shiker Nair, Lia Petronio, Ellen Nguyen, Alvin Kalathungal, Anthony Fazio, Cole Ponsi, Aydin Golabi, Melissa M. Ronan, Jennifer A. Roth',
          date: 'April 5, 2024',
          portalLink: `${portalBase}/projects/${project}/compounds`,
        },
        introCards: [
          {
            title: '900 cancer cell lines pooled and barcoded',
            image: imagePath + 'PRISM-CPS-Assay-Cells.svg',
          },
          {
            title: 'Treatment with single-agent and combination',
            image: imagePath + 'PRISM-CPS-Assay-Treatment.svg',
          },
          {
            title: 'Viability profile across doses',
            image: imagePath + 'PRISM-CPS-Assay-Viability.svg',
          },
          {
            title: 'Biomarker analysis and combination discovery',
            image: imagePath + 'PRISM-CPS-Assay-Discover.svg',
          },
        ],
        combinationEffects: [
          {
            title: 'Independent Action',
            image: imagePath + 'Combination-Effects-Independent-Action.svg',
          },
          {
            title: 'Antagonistic',
            image: imagePath + 'Combination-Effects-Antagonistic.svg',
          },
          {
            title: 'Synergistic',
            image: imagePath + 'Combination-Effects-Synergistic.svg',
          },
        ],
        doseSelection: [
          {
            title: '7x1 Dose Scheme',
            image: imagePath + 'PRISM-Combination-Dose-Selection-7x1.svg',
          },
          {
            title: '5x5 Dose Scheme',
            image: imagePath + 'PRISM-Combination-Dose-Selection-5x5.svg',
          },
        ],
        viabilityCards: [
          {
            title: 'Temozolomide + O6-Benzylguanine',
            body: '<b>Temozolomide</b><br>7 concentrations <br>top concentration: 100µM; threefold dilution<br><br><b>O6-Benzylguanine</b><br>1 concentration: 5 µM<br><br>',
          },
          {
            title: 'ML210 + Ferrostatin-1',
            body: '<b>ML210</b><br>7 concentrations <br>top concentration: 10µM; threefold dilution<br><br><b>Ferrostatin-1</b><br>1 concentration:  10 µM <br><br>',
          },
          {
            title: 'AZD5991 + A-1331852',
            body: '<b>AZD5991</b><br>5 concentrations <br>top concentration: 0.037µM; threefold dilution<br><br><b>A-1331852</b><br>5 concentrations <br>top concentration: 0.041µM; threefold dilution',
          },
        ],
        killedLabel: 'Cell lines killed (viability < 0.3)',
        // Fig. 4: one CSV per combination. x is the library compound (dose1),
        // y the anchor (dose2). `cells` is filled in once the CSV loads.
        combinations: [
          {
            title: 'Temozolomide + O6-Benzylguanine',
            file: 'temoO6_updated.csv',
            x: { name: 'Temozolomide' },
            y: { name: 'O6-Benzylguanine' },
            cells: null,
          },
          {
            title: 'ML210 + Ferrostatin-1',
            file: 'MLferro_updated.csv',
            x: { name: 'ML210' },
            y: { name: 'Ferrostatin-1' },
            cells: null,
          },
          {
            title: 'AZD5991 + A-1331852',
            file: 'A133AZD_updated.csv',
            x: { name: 'AZD5991' },
            y: { name: 'A-1331852' },
            cells: null,
          },
        ],
        // Figs. 5-7: raw CSV rows per combination, filled in once loaded
        synergy: { temo: null, ml210: null, azd: null },
      };
    },

    created() {
      const synergyFiles = {
        temo: 'temoO6_updated.csv',
        ml210: 'MLferro_updated.csv',
        azd: 'A133AZD_updated.csv',
      };
      Object.entries(synergyFiles).forEach(async ([key, file]) => {
        this.synergy[key] = await csv(dataPath + file);
      });

      this.combinations.forEach(async (combo) => {
        const rows = await csv(dataPath + combo.file);
        const cells = {
          x: heatmapCells(singleAgentRows(rows, 'dose1'), 'capped_library', 'dose1'),
          y: heatmapCells(singleAgentRows(rows, 'dose2'), 'capped_anchor', 'dose2'),
          xy: heatmapCells(rows, 'capped_combination', 'dose1', 'dose2'),
        };
        // One color scale across the three panels of this combination, so its
        // strongest effect is the darkest color
        const max = Math.max(...[...cells.x, ...cells.y, ...cells.xy].map((d) => d.value));
        combo.cells = { ...cells, domain: [0, max] };
      });
    },

    methods: {
      correlationLink(brdId) {
        return `${this.portalBase}/${this.project}/${this.screen}/${brdId}/correlation-analysis`;
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

  /* Fig. 4: three heatmap panels per combination */
  .combo-figure {
    margin-top: 1.5rem;
  }
  .combo-figure__title {
    margin: 0 0 0.5rem;
  }
  .combo-figure__panels {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 24px;
  }
  /* Same spacing as the title inside Heatmap, so the panels line up */
  .combo-figure__label {
    margin: 0 0 4px;
  }

  .whitepaper-body {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .whitepaper-body h2,
  .whitepaper-body h3 {
    margin-bottom: 0.75rem;
  }
</style>
