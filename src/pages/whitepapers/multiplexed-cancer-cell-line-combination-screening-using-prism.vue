<template>
  <page>
    <page-header narrow>
      <template #title> Multiplexed cancer cell line combination screening using PRISM </template>
      <p class="prism-text-body-medium text-medium-emphasis whitepaper-meta">
        <span>{{ paper.author }}</span>
        <span>Published {{ paper.date }}</span>
      </p>
      <div class="whitepaper-actions mt-2">
        <v-btn
          :href="paper.portalLink"
          target="_blank"
          rel="noopener"
          rounded
          variant="outlined"
          prepend-icon="mdi-chart-box-outline"
          append-icon="mdi-arrow-top-right"
          size="small"
        >
          Explore Data
        </v-btn>
      </div>
    </page-header>

    <page-section width="narrow" class="mt-0 pt-4">
      <article class="whitepaper-body">
        <section id="introduction">
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
            align="start"
            :items="doseSelection"
            :max-image-width="320"
            border
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

          <term-list shaded class="my-6">
            <term-item>
              <template #name>Temozolomide + O6-benzylguanine</template>
              <template #definition>
                MGMT (O-6-methylguanine-DNA methyltransferase) is an experimentally- and
                clinically-validated biomarker of resistance to temozolomide: MGMT reverses the
                action of temozolomide as the MGMT protein directly repairs temozolomide-induced
                alkylation<sup>11</sup>. As a single agent, we observe that resistance to
                temozolomide is strongly associated with MGMT expression across the large panel of
                cell lines in PRISM (r = 0.63, q = 1.2 x 10<sup>-86</sup>, rank =1;
                <a :href="correlationLink(compounds.temozolomide)" target="_blank">PRISM Portal</a
                >). Inhibition of MGMT by agents such as O6-benzylguanine has been reported to
                enhance temozolomide activity in a subset of MGMT-expressing cell lines in
                vitro<sup>8</sup>. O6-benzylguanine does not have appreciable viability effects in
                PRISM at concentrations sufficient to inhibit MGMT and enhance temozolomide
                sensitivity<sup>8</sup>.
              </template>
            </term-item>
            <term-item>
              <template #name>AZD5991 + A-1331852</template>
              <template #definition>
                Combined genetic or chemical inhibition of the apoptotic regulators MCL1 and BCL2L1
                has been reported as strongly synergistic<sup>12,13</sup>. AZD5991 is a selective
                MCL1 inhibitor; in PRISM, we observe that AZD5991 phenocopies MCL1 CRISPR dependency
                (r = 0.3, q = 5.3 x 10<sup>-11</sup>, rank =1;
                <a :href="correlationLink(compounds.azd5991)" target="_blank">PRISM Portal</a>). In
                addition, we observe that resistance to AZD5991 is strongly associated with BCL2L1
                expression (r = 0.27, q = 5.8 x 10<sup>-11</sup>, rank =1;
                <a :href="correlationLink(compounds.azd5991)" target="_blank">PRISM Portal</a>).
                A-1331852 is a selective BCL2L1 (BCL-xL) inhibitor; in PRISM, we observe that
                A-1331852 phenocopies BCL2L1 CRISPR dependency (r = 0.47, q = 1.1 x
                10<sup>-31</sup>, rank =1;
                <a :href="correlationLink(compounds.a1331852)" target="_blank">PRISM Portal</a>) and
                resistance to A-1338152 is associated with MCL1 expression (<a
                  :href="correlationLink(compounds.a1331852)"
                  target="_blank"
                  >PRISM Portal</a
                >).
              </template>
            </term-item>
            <term-item>
              <template #name>ML210 + ferrostatin-1</template>
              <template #definition>
                ML210 inhibits GPX4 (glutathione peroxidase 4) and kills cells via ferroptosis
                through generation of reactive lipid peroxide species; in PRISM, we observe that
                ML210 phenocopies GPX4 CRISPR dependency (r = 0.44, q = 1.2 x 10<sup>-27</sup>, rank
                =1;
                <a :href="correlationLink(compounds.ml210)" target="_blank">PRISM Portal</a>).
                Ferrostatin-1 is a radical-trapping antioxidant that protects cells from reactive
                species and therefore rescues cells from ferroptosis<sup>14,15</sup>. As
                ferrostatin-1 has been reported to have minimal viability effects across cell lines,
                we tested ferrostatin-1 at a single dose of 10µM, a concentration sufficient to
                fully inhibit ferroptosis; this concentration does not show appreciable viability
                effects in PRISM<sup>8,14,16</sup>.
              </template>
            </term-item>
          </term-list>

          <section>
            <h3 class="prism-text-headline-small">Pooled combination screening results</h3>
            <p class="prism-text-body-large">
              Because O6-benzylguanine and ferrostatin-1 demonstrated minimal effects on viability
              as single agents across a large panel of cell lines, we screened a single dose (5 µM
              and 10 µM, respectively) in combination with 7 concentrations of temozolomide (top
              concentration: 100µM; threefold dilution) and ML210 (top concentration: 10µM;
              threefold dilution), respectively. As both A-1331852 and AZD5991 had dose-dependent
              effects on cell viability, we screened a 5x5 matrix (threefold dilution) of these
              compounds (top concentrations: 0.041 and 0.37µM, respectively). Combinations and all
              component single agents at matching concentrations were plated using an HP D300e drug
              printer and screened in nearly 900 cancer cell lines using standard PRISM conditions
              and data processing [<a href="https://github.com/cmap/dockerized_mts" target="_blank"
                >link</a
              >].
            </p>

            <div class="combo-grid">
              <div v-for="combo in combinations" :key="combo.title" class="combo-figure">
                <div class="combo-figure__text">
                  <h4 class="prism-text-headline-xs combo-figure__title">{{ combo.title }}</h4>
                  <dl class="prism-text-body-medium combo-figure__dosing">
                    <template v-for="agent in [combo.x, combo.y]" :key="agent.name">
                      <dt>{{ agent.name }}</dt>
                      <dd>{{ agent.dosing }}</dd>
                    </template>
                  </dl>
                </div>

                <div class="combo-figure__card">
                  <h5 class="prism-text-title-medium combo-figure__card-title">
                    Sensitivity across doses
                  </h5>
                  <div v-if="combo.cells" class="combo-figure__panels">
                    <div class="combo-figure__panel">
                      <p class="prism-text-title-small combo-figure__label">Single agent</p>
                      <div class="combo-figure__strips">
                        <heatmap
                          :data="combo.cells.x"
                          :x-title="`${combo.x.name} (µM)`"
                          :value-title="killedLabel"
                          :domain="combo.cells.domain"
                          :size="heatmapCellSize"
                          log
                        />
                        <heatmap
                          :data="combo.cells.y"
                          :x-title="`${combo.y.name} (µM)`"
                          :value-title="killedLabel"
                          :domain="combo.cells.domain"
                          :size="heatmapCellSize"
                          log
                        />
                      </div>
                    </div>
                    <div class="combo-figure__panel">
                      <p class="prism-text-title-small combo-figure__label">Combination</p>
                      <heatmap
                        :data="combo.cells.xy"
                        :x-title="`${combo.x.name} (µM)`"
                        :y-title="`${combo.y.name} (µM)`"
                        :value-title="killedLabel"
                        :domain="combo.cells.domain"
                        :size="heatmapCellSize"
                        log
                        legend
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <figure-caption>
              <template #title>Fig.4. Combinations tested and their dosing schemes.</template>
              The dosing schemes of the three combinations tested were determined based on the
              described procedure. Thus, temozolomide + O6 Benzylguanine and ML210 + Ferrostatin
              were screened in the 7x1 format since one of the single agents was largely inert.
              Since both AZD5991 and A-1331852 demonstrated significant viability effects, we
              employed the 5x5 format for the AZD5991 + A-1331852 combination. A cell line was
              classified as “killed” if its viability (relative to vehicle control) was &lt; 0.3.
            </figure-caption>
            <p class="prism-text-body-large mt-6">
              We calculated a synergy score for combination effects at each dose combination using
              both the Highest Single Agent (HSA) and Bliss models to generate a null expectation
              for the viability at the combination dose (see figure 2 Eqs. 1,2). In the HSA model,
              the expected viability of the combination is the minimum of the two single agent
              viabilities. In the Bliss model, viability effects are multiplicative (i.e.,
              log-viability effects are additive)一based on the assumption of independent action of
              the two single agents. The synergy score is computed as the difference between the
              model expectation and the observed viability <sup>1</sup> — a positive value indicates
              synergy while a negative value indicates antagonism. For robustness, we combine both
              model expectations into a single synergy score (Eq. 3), which effectively considers
              the lower viability of the two model expectations when looking for synergy and the
              higher viability of the two model expectations when looking for
              antagonism<sup>2</sup>. Significance (q values) for synergy scores were calculated
              using an empirical null model of synergy scores generated using negative control data
              from the experiment that accounts for cell-line specific variability (see Appendix).
            </p>
          </section>
          <section>
            <figure-cards
              align="start"
              :items="equationCards.filter((d, i) => i < 2)"
              caption=""
              color="grey-lighten-5"
              border
              :max-image-width="220"
            />
            <figure-cards
              align="start"
              :items="equationCards.filter((d, i) => i == 2)"
              caption=""
              color="grey-lighten-5"
              border
              class="mt-2"
              :max-image-width="400"
            />
            <figure-caption>
              <sup>1</sup> Note that the synergy score is measured in terms of viability rather than
              in terms of log2fold-change (LFC) as used on the PRISM portal (<a
                href="https://theprismlab.org/portal/CPS009/CPS_WHITEPAPER/PCPS019/BRD-K32107296_BRD-K92041145/synergy-by-dose"
                target="_blank"
                >PRISM Portal</a
              >). This is done to better align with literature.<br /><br />
              <sup>2</sup> We cap viabilities at 1 before calculating null model expectations for
              synergy computation. For viabilities capped at 1, the Bliss expectation is always
              &lt;= HSA.
            </figure-caption>
          </section>
        </section>

        <section>
          <h2 class="prism-text-headline-medium">Synergy by dose</h2>
          <section>
            <h3 class="prism-text-headline-small">Temozolomide + O6-benzylguanine</h3>
            <p class="prism-text-body-large">
              In the presence of O6-benzylguanine, cell lines that expressed MGMT were sensitized to
              temozolomide (i.e., synergy was observed) (figure 5). Intriguingly, while MGMT
              expression appeared necessary for sensitization to temozolomide, a subset of cell
              lines remained resistant to temozolomide even in the presence of O6-benzylguanine.
              Accordingly, we asked whether any baseline genomic features were associated with the
              calculated temozolomide+O6-benzylguanine synergy score in MGMT-expressing cell lines
              (MGMT expression &gt; 1.5, see figure 8). We found that low expression of the MSH6
              gene (and low protein levels of MSH6, or its heterodimeric partner protein MSH2) were
              associated with lack of synergy in MGMT-proficient cell lines. MSH2 and MSH6 are genes
              involved in DNA mismatch repair, and their loss has been previously suggested to be
              associated with resistance to temozolomide<sup>17, 18</sup>.
            </p>
            <scatter-grid
              v-if="synergy.temo"
              :data="synergy.temo"
              id-field="ccle_name"
              id-title="Cell line"
              :column="{ field: 'dose1', title: 'Temozolomide (µM)' }"
              :row="{ field: 'dose2', title: 'O6-benzylguanine (µM)' }"
              :x="{
                field: 'S',
                title: 'Synergy score',
                domain: [-1, 1],
                threshold: 0,
                tickValues: [-0.5, 0, 0.5],
              }"
              :y="{ field: 'EXP_MGMT', title: 'MGMT expression', threshold: 1.5 }"
              :color="{
                field: 'synergy_count_across_doses',
                title: 'Synergy count',
                type: 'sequential',
                range: 'blues',
              }"
              marginals
            />
            <figure-caption>
              <template #title
                >Fig.5. Synergy in temozolomide + O6-Benzylguanine combination.</template
              >
              Many cell lines with high MGMT expression levels were sensitized to temozolomide by
              the addition of O6-Benzylguanine, and thus exhibited strong synergy. Each point,
              representing a cell line, is colored by the number of times the synergy score of the
              cell line was &gt; 0 (with a q-value &lt; 0.1). Histograms of the synergy score at
              each dose and MGMT expression are also shown. Due to the bimodal nature of MGMT
              expression in the set of cell lines, we set a threshold of 1.5 (dashed line) to
              differentiate high MGMT expressing lines from low MGMT expressing lines. Statistical
              significance was evaluated by computing empirical p-values of the corresponding
              one-sided test followed by multiple hypothesis correction (see Appendix).
            </figure-caption>
          </section>
          <section>
            <h3 class="prism-text-headline-small mt-8">ML210 + ferrostatin-1</h3>
            <p class="prism-text-body-large">
              As the dose of ML210 increased, we observed that ferrostatin-1 consistently
              antagonized the effects of ML210 across cell lines (figure 6). For example, the median
              viability across cell lines at 10µM ML210 was 58.0%, compared with 92.9% at 10µM ML210
              + ferrostatin-1, resulting in a median synergy score of S = -0.30.
            </p>
            <scatter-grid
              v-if="synergy.ml210"
              :data="synergy.ml210"
              id-field="ccle_name"
              id-title="Cell line"
              :column="{ field: 'dose1', title: 'ML210 (µM)' }"
              :row="{ field: 'dose2', title: 'Ferrostatin-1 (µM)' }"
              :x="{
                field: 'S',
                title: 'Synergy score',
                domain: [-1, 1],
                threshold: 0,
                tickValues: [-0.5, 0, 0.5],
              }"
              :y="{ field: 'XPR_GPX4', title: 'GPX4 dependency' }"
              :color="{
                field: 'antagonism_count_across_doses',
                title: 'Antagonism count',
                type: 'sequential',
                range: 'reds',
              }"
              marginals
            />
            <figure-caption>
              <template #title>Fig.6. Antagonism in ML210 + Ferrostatin combination.</template>
              Many cell lines exhibited strong antagonism at higher dose values of ML210. Each
              point, representing a cell line, is colored by the number of times the synergy score
              of the cell line was &lt; 0 (with a q-value &lt; 0.1). Histograms of the synergy score
              at each dose and the CRISPR Chronos dependency score of GPX4 are also shown. Note
              that, unlike MGMT expression, there is no apparent bimodality in the CRISPR score.
              Statistical significance was evaluated by computing empirical p-values of the
              corresponding one-sided test followed by multiple hypothesis correction (see
              Appendix).
            </figure-caption>
          </section>
          <section>
            <h3 class="prism-text-headline-small mt-8">AZD5991 + A-1331852</h3>
            <p class="prism-text-body-large">
              Across doses and across cell lines, we observed that BCL-xL and MCL1 inhibition were
              synergistic: for example, the median synergy score at the highest tested doses (0.37µM
              AZD5991 + 0.041µM A-1331852) was S = 0.28 (figure 7).
            </p>
            <scatter-grid
              v-if="synergy.azd"
              :data="synergy.azd"
              id-field="ccle_name"
              id-title="Cell line"
              :column="{ field: 'dose1', title: 'AZD5991 (µM)' }"
              :row="{ field: 'dose2', title: 'A-1331852 (µM)' }"
              :x="{
                field: 'S',
                title: 'Synergy score',
                domain: [-1, 1],
                threshold: 0,
                tickValues: [-0.5, 0, 0.5],
              }"
              :y="{ field: 'neg_log10_qval', title: '-log10(q value)', threshold: 1 }"
              :color="{
                field: 'S',
                title: 'Synergy score',
                type: 'sequential',
                range: 'rdbu',
                reverse: true,
              }"
            />
            <figure-caption>
              <template #title
                >Fig.7. Observed synergy in AZD5991 + A-1331852 combination.</template
              >
              Many cell lines exhibited strong synergy at higher doses of the combination. Each
              point, representing a cell line, is colored by the number of times the synergy score
              of the cell line was significantly different from 0 (q-value &lt; 0.1). Statistical
              significance was evaluated by computing empirical p-values from a two-sided test
              followed by multiple hypothesis correction (see Appendix). The p-values were computed
              from an empirical null model of synergy values that accounted for cell-line specific
              variability—reflected in the range of q-values at a given synergy value. The gap at
              synergy=0 reflects the large number of cases where synergy is zero by our definition.
            </figure-caption>
          </section>
        </section>

        <section>
          <h2 class="prism-text-headline-medium">Conclusion</h2>
          <p class="prism-text-body-large">
            Combination screening is a challenging scientific, analytical, and logistical endeavor.
            As studies to date have suggested combination partner interactions are difficult to
            predict and highly context specific, a robust platform for high-throughput screening of
            combinations could provide substantial value to the scientific community. Multiplexing
            cell lines using PRISM enables data generation at an unprecedented scale: here, we
            demonstrate that PRISM can clearly identify synergistic and antagonistic combinations,
            as well as biomarkers relevant to combination interactions (e.g., MGMT expression in the
            context of temozolomide + O6-benzylguanine). Analysis of combination data using metrics
            such as log2(fold-change) (LFC) and area under the dose response curve (AUC) (<a
              :href="paper.portalLink"
              target="_blank"
              >PRISM Portal</a
            >) can be supplemented with analysis of combination-specific metrics like synergy
            (figure 8) to aim to identify biomarkers associated with combination treatment after
            accounting for the effects of the single agents. Such approaches can reveal biomarkers
            that uniquely underlie sensitivity or resistance to the combination (e.g., MSH6 for
            MGMT-expressing cell lines).
          </p>
          <scatter-grid
            v-if="biomarkers"
            :data="biomarkers"
            id-field="feature"
            id-title="Feature"
            :column="{ field: 'featureType', domain: featureTypes }"
            :x="{ field: 'rho', title: 'Correlation', domain: [-0.5, 0.5], threshold: 0 }"
            :y="{ field: 'neg_log10_qval', title: '-log10(q value)', domain: [0, 14] }"
            :color="{
              field: 'dose',
              title: 'Temozolomide (µM) + O6-benzylguanine 5 µM',
              type: 'categorical',
            }"
            :initial-selected="['MSH2', 'MSH6']"
            label-selected
          />
          <figure-caption>
            <template #title>
              Fig.8. Biomarkers associated with synergy in temozolomide + O6-Benzylguanine are
              related to DNA mismatch repair.
            </template>
            The correlation between the synergy score and multi-omic data can be used to investigate
            potential mechanisms underlying combination-specific effects. Here, we looked at the
            subset of high MGMT expressing cell lines (MGMT expression &gt;1.5) to examine
            biomarkers that may determine whether a high MGMT expressing cell line exhibits synergy
            on O6-benzylguanine co-treatment. We found genes involved in DNA mismatch repair (MSH6
            and MSH2) appeared as significant biomarkers in the proteomics and expression datasets.
            Such analyses can be used to generate hypotheses regarding the mechanisms underlying
            sensitivity to drug combinations.
          </figure-caption>
          <p class="prism-text-body-large mt-6">
            Dose selection is one of the most important considerations for combination screening,
            ensuring combination effects can be reliably and efficiently measured across the largest
            number of cell lines. Differential single-agent activity across cell lines can be
            measured or estimated in a number of ways: by first running compounds as single agents
            at dose in PRISM, by leveraging existing public data (e.g., at depmap.org), or by
            measuring response in a panel of individual cell lines.
            <br /><br />
            Currently, combination screening is offered through PRISM using a standardized 7x1
            design. 7x1 combinations are useful where one component (the “anchor” agent) has limited
            differential viability effects, facilitating identification of a single concentration
            informative for screening. Where both agents have strong differential viability effects,
            contact us to discuss alternative screening designs; we recommend a matrixed format such
            as 5x5. Visit our
            <a href="/consortium-screens/assays" target="_blank">Assays</a> page to learn more.
          </p>
        </section>

        <section id="citations">
          <h2 class="prism-text-headline-medium">Citations</h2>
          <ol>
            <li>
              Eder, J. P. & Hafez, N. Principles of dose, schedule, and combination therapy.
              Holland-Frei Cancer Medicine 1–13 Preprint at
              https://doi.org/10.1002/9781119000822.hfcm055.pub3 (2022).
            </li>
            <li>
              Griner, L. A. M. et al. High-throughput combinatorial screening identifies drugs that
              cooperate with ibrutinib to kill activated B-cell–like diffuse large B-cell lymphoma
              cells. Proceedings of the National Academy of Sciences 111, 2349–2354 (2014).
            </li>
            <li>
              Jaaks, P. et al. Effective drug combinations in breast, colon and pancreatic cancer
              cells. Nature 603, 166–173 (2022).
            </li>
            <li>
              Menden, M. P. et al. Community assessment to advance computational prediction of
              cancer drug combinations in a pharmacogenomic screen. Nat. Commun. 10, 2674 (2019).
            </li>
            <li>
              Gao, H. et al. High-throughput screening using patient-derived tumor xenografts to
              predict clinical trial drug response. Nat. Med. 21, 1318–1325 (2015).
            </li>
            <li>Berenbaum, M. C. What is synergy? Pharmacol. Rev. 41, 93–141 (1989).</li>
            <li>
              Bliss, C. I. THE TOXICITY OF POISONS APPLIED JOINTLY1. Ann. Appl. Biol. 26, 585–615
              (1939).
            </li>
            <li>
              Rees, M. G. et al. Systematic identification of biomarker-driven drug combinations to
              overcome resistance. Nat. Chem. Biol. 18, 615–624 (2022).
            </li>
            <li>
              Palmer, A. C. & Sorger, P. K. Combination Cancer Therapy Can Confer Benefit via
              Patient-to-Patient Variability without Drug Additivity or Synergy. Cell 171,
              1678–1691.e13 (2017).
            </li>
            <li>
              Frei, E., 3rd & Freireich, E. J. Progress and perspectives in the chemotherapy of
              acute leukemia. Adv. Chemother. 2, 269–298 (1965).
            </li>
            <li>
              Hegi, M. E. et al. MGMT gene silencing and benefit from temozolomide in glioblastoma.
              N. Engl. J. Med. 352, 997–1003 (2005).
            </li>
            <li>
              Najm, F. J. et al. Orthologous CRISPR-Cas9 enzymes for combinatorial genetic screens.
              Nat. Biotechnol. 36, 179–189 (2018).
            </li>
            <li>
              Abdul Rahman, S. F. et al. Co-inhibition of BCL-XL and MCL-1 with selective BCL-2
              family inhibitors enhances cytotoxicity of cervical cancer cell lines. Biochem Biophys
              Rep 22, 100756 (2020).
            </li>
            <li>
              Dixon, S. J. et al. Ferroptosis: an iron-dependent form of nonapoptotic cell death.
              Cell 149, 1060–1072 (2012).
            </li>
            <li>
              Yang, W. S. et al. Regulation of ferroptotic cancer cell death by GPX4. Cell 156,
              317–331 (2014).
            </li>
            <li>
              Rees, M. G. et al. Correlating chemical sensitivity and basal gene expression reveals
              mechanism of action. Nat. Chem. Biol. 12, 109–116 (2016).
            </li>
            <li>
              Cahill, D. P. et al. Loss of the mismatch repair protein MSH6 in human glioblastomas
              is associated with tumor progression during temozolomide treatment. Clin. Cancer Res.
              13, 2038–2045 (2007).
            </li>
            <li>
              McFaline-Figueroa, J. L. et al. Minor Changes in Expression of the Mismatch Repair
              Protein MSH2 Exert a Major Impact on Glioblastoma Response to Temozolomide. Cancer
              Res. 75, 3127–3138 (2015).
            </li>
            <li>
              Corsello, S. M. et al. Discovering the anticancer potential of non-oncology drugs by
              systematic viability profiling. Nature Cancer 1, 235–248 (2020).
            </li>
            <li>
              Ghandi, M. et al. Next-generation characterization of the Cancer Cell Line
              Encyclopedia. Nature 569, 503–508 (2019).
            </li>
          </ol>
        </section>
        <section id="appendix">
          <h2 class="prism-text-headline-medium">Appendix</h2>
          <p>
            For each cell line, we generate median viability values (replicates) for a mock
            treatment condition using the median viability from 3 randomly selected vehicle-control
            (DMSO) replicates. This process is repeated to generate 10,000 viability values each for
            mock single agent and combination treatments. From these viabilities, we generate an
            empirical null distribution of synergy scores which we use to compute empirical p-values
            (with Laplace smoothing to avoid zeros). These p-values are used to compute a q-value
            that corrects for multiple hypothesis testing using the Benjamini-Hochberg procedure.
            Importantly, each cell line has a separate null distribution to account for cell-line
            specific variability. <br /><br />
            There exist a few cell lines which are cultured in two separate pools (one in each cell
            set: PR500 and PR300) and pass QC in both pools. For these cell lines, we use data from
            PR500 for analysis in this whitepaper. The PRISM portal provides data on these cell
            lines in both pools.
            <br /><br />
            For all analyses in the whitepaper, such as computing the synergy score and associated
            biomarkers, we capped the measured viability at 1.
            <br /><br />
            For biomarker analysis, we used cell line characterizations from the DepMap Portal
            (depmap.org). In particular, we used files from 23Q2 release
            (https://doi.org/10.6084/m9.figshare.22765112.v2) along with PRISM Repurposing<sup
              >19</sup
            >
            and legacy CCLE<sup>20</sup> data. <br /><br />
            *Note: Figure 7 was updated on September 3, 2024 due to a minor error in the computed
            q-values. This did not affect any of our conclusions.
          </p>
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
      (r) => (yKey ? r[yKey] : ''),
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
      (r) => r.ccle_name,
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
        // viabilityCards: [
        //   {
        //     title: 'Temozolomide + O6-Benzylguanine',
        //     body: '<b>Temozolomide</b><br>7 concentrations <br>top concentration: 100µM; threefold dilution<br><br><b>O6-Benzylguanine</b><br>1 concentration: 5 µM<br><br>',
        //   },
        //   {
        //     title: 'ML210 + Ferrostatin-1',
        //     body: '<b>ML210</b><br>7 concentrations <br>top concentration: 10µM; threefold dilution<br><br><b>Ferrostatin-1</b><br>1 concentration:  10 µM <br><br>',
        //   },
        //   {
        //     title: 'AZD5991 + A-1331852',
        //     body: '<b>AZD5991</b><br>5 concentrations <br>top concentration: 0.037µM; threefold dilution<br><br><b>A-1331852</b><br>5 concentrations <br>top concentration: 0.041µM; threefold dilution',
        //   },
        // ],
        equationCards: [
          {
            title: 'Eqn.1',
            image: imagePath + 'PRISM-CPS-Equation-1.svg',
          },
          {
            title: 'Eqn.2',
            image: imagePath + 'PRISM-CPS-Equation-2.svg',
          },
          {
            title: 'Eqn.3',
            image: imagePath + 'PRISM-CPS-Equation-3.svg',
          },
        ],
        killedLabel: 'Cell lines killed (viability < 0.3)',
        // Fig. 4 cell size in px. The figure's two panels have about 330px
        // of room each in the narrow text column, so anything up to 40 fits
        heatmapCellSize: 26,
        // Fig. 4: one CSV per combination. x is the library compound (dose1),
        // y the anchor (dose2). `cells` is filled in once the CSV loads.
        // `dosing` is the text listed beside each compound's name.
        // An anchor screened alone over its own dose range names that file in
        // `singleAgent`; its single-agent strip is then drawn from it.
        combinations: [
          {
            title: 'Temozolomide + O6-Benzylguanine',
            file: 'temoO6_updated.csv',
            x: {
              name: 'Temozolomide',
              dosing: '7 concentrations; top concentration: 100 µM; threefold dilution',
            },
            y: {
              name: 'O6-Benzylguanine',
              dosing: '1 concentration: 5 µM',
              singleAgent: { file: 'O6-benzyl_data.csv', dose: 'Dose', viability: 'Viability' },
            },
            cells: null,
          },
          {
            title: 'ML210 + Ferrostatin-1',
            file: 'MLferro_updated.csv',
            x: {
              name: 'ML210',
              dosing: '7 concentrations; top concentration: 10 µM; threefold dilution',
            },
            y: { name: 'Ferrostatin-1', dosing: '1 concentration: 10 µM' },
            cells: null,
          },
          {
            title: 'AZD5991 + A-1331852',
            file: 'A133AZD_updated.csv',
            x: {
              name: 'AZD5991',
              dosing: '5 concentrations; top concentration: 0.37 µM; threefold dilution',
            },
            y: {
              name: 'A-1331852',
              dosing: '5 concentrations; top concentration: 0.041 µM; threefold dilution',
            },
            cells: null,
          },
        ],
        // Figs. 5-7: raw CSV rows per combination, filled in once loaded
        synergy: { temo: null, ml210: null, azd: null },
        // Fig. 8: biomarker correlations, one panel per feature type in this order
        featureTypes: [
          'Gene Expression',
          'Proteomics',
          'CRISPR Knock-Out',
          'Copy Number',
          'Repurposing Compounds',
        ],
        biomarkers: null,
      };
    },

    created() {
      this.loadBiomarkers();

      const synergyFiles = {
        temo: 'temoO6_updated.csv',
        ml210: 'MLferro_updated.csv',
        azd: 'A133AZD_updated.csv',
      };
      Object.entries(synergyFiles).forEach(async ([key, file]) => {
        this.synergy[key] = await csv(dataPath + file);
      });

      this.combinations.forEach(async (combo) => {
        const { singleAgent } = combo.y;
        const [rows, anchorRows] = await Promise.all([
          csv(dataPath + combo.file),
          singleAgent ? csv(dataPath + singleAgent.file) : null,
        ]);
        const cells = {
          x: heatmapCells(singleAgentRows(rows, 'dose1'), 'capped_library', 'dose1'),
          // The anchor's own dose series (one row per dose and cell line) when it
          // has one, otherwise the dose it was given in the combination
          y: anchorRows
            ? heatmapCells(anchorRows, singleAgent.viability, singleAgent.dose)
            : heatmapCells(singleAgentRows(rows, 'dose2'), 'capped_anchor', 'dose2'),
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
      async loadBiomarkers() {
        const typeLabel = {
          EXP: 'Gene Expression',
          RPPA: 'Proteomics',
          XPR: 'CRISPR Knock-Out',
          CN: 'Copy Number',
          REP: 'Repurposing Compounds',
        };
        const rows = await csv(dataPath + 'temoO6_highMGMT_biomarkers.csv');
        this.biomarkers = rows.map((r) => {
          // Proteomics features read "ANTIBODY_GENE"; show just the gene when they agree
          let feature = r.feature.replace('Caution_', '');
          const [antibody, gene] = feature.split('_');
          if (r['feature.set'] === 'RPPA' && antibody === gene) feature = gene;
          // The y column is "pert1::pert2::dose1::dose2"; O6-benzylguanine is always 5 µM
          const dose = r.y.split('::')[2];
          return { ...r, feature, dose, featureType: typeLabel[r['feature.set']] };
        });
      },
    },
  };
</script>

<style scoped>
  .whitepaper-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.66rem;
  }

  .whitepaper-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.66rem;
  }

  .whitepaper-body {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  /* Fig. 4: one block per combination: its title and dosing text, then a
     card with the single-agent strips and the combination heatmap side by
     side. The cards are all the same width and split into equal halves, so the
     panels line up down the page. */
  .combo-grid {
    --combo-rule: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
    display: flex;
    flex-direction: column;
    gap: 48px;
    margin-top: 1.5rem;
  }
  .combo-figure {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  /* A combination's dosing: compound names in one column, each one's dose
     series beside it */
  .combo-figure__title {
    margin: 0 0 8px;
  }
  .combo-figure__dosing {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    gap: 4px 16px;
    margin: 0;
  }
  .combo-figure__dosing dt {
    font-weight: var(--prism-font-weight-medium);
  }
  .combo-figure__dosing dd {
    margin: 0;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }
  /* The card: a header strip, tinted like the page's shaded term list, over
     two panels divided by a rule */
  .combo-figure__card {
    border: var(--combo-rule);
    border-radius: var(--prism-radius-lg);
  }
  .combo-figure__card-title {
    margin: 0;
    padding: 10px 20px;
    background: rgba(var(--v-theme-on-surface), 0.025);
    /* Inside the card's 1px border */
    border-radius: calc(var(--prism-radius-lg) - 1px) calc(var(--prism-radius-lg) - 1px) 0 0;
  }
  .combo-figure__panels {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: var(--combo-rule);
  }
  .combo-figure__panel {
    padding: 16px 20px 20px;
  }
  .combo-figure__panel + .combo-figure__panel {
    border-left: var(--combo-rule);
  }
  .combo-figure__label {
    margin: 0 0 8px;
  }
  .combo-figure__strips {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  /* Never scale the SVGs down: label sizes must match from block to block */
  .combo-figure :deep(.heatmap__svg) {
    max-width: none;
  }
  /* Phones: the two panels stack, and each dose series sits under its
     compound's name */
  @media (max-width: 599.98px) {
    .combo-figure__dosing {
      grid-template-columns: minmax(0, 1fr);
      row-gap: 0;
    }
    .combo-figure__dosing dd + dt {
      margin-top: 8px;
    }
    .combo-figure__card-title {
      padding-inline: 16px;
    }
    .combo-figure__panels {
      grid-template-columns: minmax(0, 1fr);
    }
    .combo-figure__panel {
      padding: 16px;
    }
    .combo-figure__panel + .combo-figure__panel {
      border-top: var(--combo-rule);
      border-left: 0;
    }
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
