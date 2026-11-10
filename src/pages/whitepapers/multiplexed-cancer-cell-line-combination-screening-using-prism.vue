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

          <div class="intro-cards">
            <v-card v-for="card in introCards" :key="card.title" variant="flat" class="intro-card">
              <h3 class="intro-card__title prism-text-title-medium">{{ card.title }}</h3>
              <div class="intro-card__media">
                <v-img eager :src="card.image" :alt="card.title" class="intro-card__img" />
              </div>
            </v-card>
          </div>

          <p class="prism-text-body-medium text-medium-emphasis">
            Fig.1. Schematic of the PRISM assay
          </p>
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
          <div class="intro-cards">
            <v-card
              v-for="card in combinationEffects"
              :key="card.title"
              variant="flat"
              class="intro-card"
            >
              <h3 class="intro-card__title prism-text-title-medium">{{ card.title }}</h3>
              <div class="intro-card__media">
                <v-img eager :src="card.image" :alt="card.title" class="intro-card__img" />
              </div>
            </v-card>
          </div>
          <p class="prism-text-body-medium text-medium-emphasis">
            Fig.2. Classifications of combination effects
          </p>
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
          <div class="intro-cards">
            <v-card
              v-for="(card, index) in doseSelection"
              :key="card.title"
              variant="flat"
              class="intro-card"
            >
              <h3 class="intro-card__title prism-text-title-medium">{{ card.title }}</h3>
              <div class="intro-card__media">
                <v-img eager :src="card.image" :alt="card.title" class="intro-card__img" />
              </div>
            </v-card>
          </div>
          <p class="prism-text-body-medium text-medium-emphasis">
            Fig.3. Dosing schemes of combinations based on single agent viability results
          </p>
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
  const imagePath = import.meta.env.BASE_URL + 'images/white-paper-cps/';
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
      };
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

  .whitepaper-body {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .whitepaper-body h2,
  .whitepaper h3 {
    margin-bottom: 0.75rem;
  }

  /* Four cards after the introduction: title on top, image below */
  .intro-cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    margin: 2rem 0 0.75rem;
  }

  .intro-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: var(--prism-radius-lg);
  }

  .intro-card__title {
    margin: 0;
  }

  .intro-card__media {
    display: flex;
    align-items: center;
    flex: 1;
    min-height: 140px;
    overflow: hidden;
  }

  .intro-card__img {
    width: 100%;
  }

  .intro-card__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--v-grey-darken-1);
  }

  @media (max-width: 960px) {
    .intro-cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .intro-cards {
      grid-template-columns: 1fr;
    }
  }
</style>
