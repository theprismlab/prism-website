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
        <section id="introduction">
          <h2 class="prism-text-headline-medium">
            Introduction
          </h2>
          <p class="prism-text-body-large">
            Antibody-drug conjugates (ADCs) are a rapidly growing class of cancer therapeutics,
            with approximately two dozen ADCs approved or in late-stage clinical trials through
            2022<sup>1,2</sup>. ADCs combine the targeting specificity of monoclonal antibodies
            with the cytotoxicity of small molecules to provide highly targeted delivery of drug
            payloads; the ideal ADC would recognize a cancer-cell specific antigen but spare
            healthy tissue from indiscriminate chemotherapeutic damage<sup>3,4</sup>. Although
            ADCs have achieved significant success in the clinic, ADC development continues to be
            a challenging endeavor that is time consuming, expensive, and has a high failure
            rate<sup>5,6</sup>.
          </p>
          <p class="prism-text-body-large">
            Much of the difficulty in ADC development arises from their multifaceted structural
            properties and diverse pharmacological activity<sup>7</sup>. They exhibit
            characteristics of both biologics and small molecule therapeutics, can exert activity
            through multiple mechanisms, and some are capable of killing not only target cells but
            also neighboring cancer cells that may not express the targeted antigen, a phenomenon
            known as the bystander effect. Due to this inherent complexity, cell-based functional
            screening plays a crucial role in the initial screening, characterization, and
            optimization of ADCs. However, such in vitro studies are often performed on a small
            number of cell lines and thus provide limited information on therapeutic potential,
            resulting in missed opportunities as an ADC progresses through the development
            pipeline<sup>8</sup>. There is a need for in vitro screening tools that can provide
            more comprehensive insights into ADC mechanisms, effectiveness, and potential
            limitations, informing decision-making in early stages of development and reducing
            the risk of later-stage failures.
          </p>
          <p class="prism-text-body-large">
            To help facilitate the characterization of ADCs, we developed a screening assay that
            enables high throughput profiling of the viability effects of ADCs in hundreds of cell
            lines simultaneously.
          </p>

          <h3 class="prism-text-title-large mt-8">
            The PRISM assay
          </h3>
          <figure-cards :items="assayCards" />
          <p class="prism-text-body-large mt-6">
            Our multiplexed cell viability platform, PRISM (profiling relative inhibition
            simultaneously in mixtures), enables screening of potential cancer therapeutics at an
            unprecedented scale<sup>9,10</sup>. We routinely assess the effects of perturbations
            against hundreds of cancer cell lines concurrently using unique oligonucleotide
            barcodes stably transduced into individual lines. Following barcode transduction,
            individual cell lines are pooled together in groups of 20-25 based on growth rate
            similarity, then thawed into 384-well assay-ready plates and treated with test
            articles of interest. After 5 days of incubation, isolated mRNA is used to quantify
            transcribed barcode abundance of each individual cancer cell line to calculate
            relative viability. We leverage the baseline cellular features (e.g., gene expression,
            cell lineage, mutation, copy number, metabolomics, proteomics, genome-wide RNAi and
            CRISPR dependencies) of each cell line to interpret viability profiles, enabling
            identification of drivers of differential sensitivity and potential biomarkers of
            response. Visit our
            <a
              href="https://www.theprismlab.org/knowledge-base/#prism-assay"
              target="_blank"
            >knowledge base</a>
            to learn more about the PRISM assay.
          </p>
          <p class="prism-text-body-large">
            The full collection of PRISM cell lines contains over 900 barcoded cell lines
            representing more than 45 lineages. The collection is divided into two cell sets:
          </p>
          <dl class="whitepaper-terms">
            <div>
              <dt>PR500 cell set</dt>
              <dd>488 solid tumor adherent cell lines</dd>
            </div>
            <div>
              <dt>PR300+ cell set</dt>
              <dd>431 hematopoietic, solid tumor, and pediatric cell lines</dd>
            </div>
          </dl>
          <p class="prism-text-body-large">
            Within each cell set, cell lines are pooled in groups of 20-25 based on their growth
            rates. See a full annotated list of our PRISM barcoded cell lines
            <a
              :href="cellLineInventoryLink"
              target="_blank"
            >here</a>.
          </p>

          <h3 class="prism-text-title-large mt-8">
            Antibody-drug conjugates
          </h3>
          <p class="prism-text-body-large">
            ADCs are a class of therapeutics which exploit the properties of monoclonal antibodies
            to achieve targeted delivery of drug payloads to specific cell populations. Over the
            past decade, ADCs have seen expansive growth and success in the oncology field, and
            growing momentum for applications beyond oncology indications<sup>11</sup>.
          </p>
          <p class="prism-text-body-large">
            ADCs are a structurally and biologically complex therapeutic modality<sup>12</sup>.
            They are composed of three main components: an antibody, a linker, and a payload, each
            of which can have unique characteristics and activity profiles that affect functional
            performance and stability of the ADC<sup>13</sup>. For example, whether an ADC is
            conjugated using a cleavable or non-cleavable linker will affect its stability and
            target-specific activity. Likewise, ADC efficacy is intrinsically related to the
            characteristics and mechanism of action of the cytotoxic payload. Following
            intracellular processing, membrane-permeable payloads can diffuse into neighboring
            cells and induce antigen-independent cytotoxicity, an activity of ADCs known as the
            bystander effect. Another factor impacting ADC efficacy is the number of cytotoxic
            molecules linked to each antibody, referred to as the drug to antibody ratio (DAR).
          </p>
          <div class="whitepaper-split">
            <div
              class="image-placeholder"
              role="img"
              aria-label="ADC components (image to come)"
            >
              <v-icon
                icon="mdi-image-outline"
                size="36"
              />
              <span class="prism-text-body-small">ADC components</span>
            </div>
            <dl class="whitepaper-terms">
              <div>
                <dt>Antibody</dt>
                <dd>
                  Targets a highly expressed antigen on the surface of cancer cells, acts as a
                  targeted delivery system for cytotoxic agents.
                </dd>
              </div>
              <div>
                <dt>Linker</dt>
                <dd>
                  Can be cleavable or non-cleavable, determines ADC stability in circulation and
                  the mechanism of payload release after an ADC is internalized by
                  antigen-expressing target cells.
                </dd>
              </div>
              <div>
                <dt>Payload</dt>
                <dd>
                  A highly potent compound that drives the primary biological activity of the ADC.
                  Current approved payloads fall into three classes: microtubule inhibitors,
                  DNA-damaging agents, or topoisomerase inhibitors.
                </dd>
              </div>
            </dl>
          </div>
          <p class="prism-text-body-large">
            The primary mechanism of ADC-induced cytotoxicity occurs via their internalization
            into target antigen-expressing cancer cells. Upon reaching and binding the target
            antigen, ADCs are taken up by the cell through receptor-mediated
            endocytosis<sup>14</sup>. Drug payloads are subsequently released following lysosomal
            degradation into the cytosol, where they then induce death of the target cell via a
            pathway specific to the mechanism of action of the payload. In addition to
            target-specific cell killing, some ADC payloads can exert a bystander effect. If the
            free drug payload is cell permeable, it can kill not only antigen-expressing cells but
            also neighboring antigen-negative cells.
          </p>
          <div
            class="image-placeholder image-placeholder--wide"
            role="img"
            aria-label="ADC killing mechanism (image to come)"
          >
            <v-icon
              icon="mdi-image-outline"
              size="36"
            />
            <span class="prism-text-body-small">ADC killing mechanism</span>
          </div>

          <h3 class="prism-text-title-large mt-8">
            HER2 as a cancer target
          </h3>
          <p class="prism-text-body-large">
            Human epidermal growth factor 2 (HER2) is a member of the EGFR family of receptor
            tyrosine kinases encoded by the ERBB2 gene and is a well-established therapeutic cancer
            target<sup>15</sup>. HER2 alterations, including overexpression, amplifications, and
            other mutations, have been detected in a wide range of solid tumors<sup>16</sup>.
            Targeting HER2 with small molecules, monoclonal antibodies, or antibody-drug conjugates
            has proven to be an effective strategy for treating HER2-positive cancer. To date, four
            HER2-targeting antibody-based therapeutics have received FDA approval (trastuzumab,
            pertuzumab, trastuzumab emtansine and trastuzumab deruxtecan) and several others are
            in late stages of clinical development<sup>17</sup>.
          </p>

          <h3 class="prism-text-title-large mt-8">
            Screening HER2-targeting ADCs in PRISM
          </h3>
          <p class="prism-text-body-large">
            To validate suitability of the PRISM assay for ADC screening, we elected to focus on
            HER2 because it is a well-established ADC target and has a wide expression range
            across PRISM cell lines. We utilized two HER2-targeting ADCs: trastuzumab emtansine
            (T-DM1) and trastuzumab-monomethyl auristatin E (T-MMAE). T-DM1 and T-MMAE were both
            conjugated containing trastuzumab, a humanized anti-HER2 monoclonal antibody, but had
            unique linkers and payloads. Comparative profiling of these agents provides an
            opportunity to study ADCs that target the same antigen but differ in the bystander
            killing capabilities of their released payloads. Catabolism of T-MMAE releases a
            cell-permeable payload capable of inducing bystander activity, whereas the payload of
            T-DM1 is impermeable and therefore not cytotoxic to bystander cells.
          </p>
          <dl class="whitepaper-terms">
            <div>
              <dt>Trastuzumab</dt>
              <dd>
                A therapeutic monoclonal antibody with clinical indications for HER2 overexpressing
                solid tumors. It is sold under the brand name Herceptin.
              </dd>
            </div>
            <div>
              <dt>Trastuzumab emtansine (T-DM1)</dt>
              <dd>
                An ADC consisting of trastuzumab conjugated via a non-cleavable linker (MCC;
                maleimidomethyl cyclohexane-1-carboxylate) to mertansine (also called DM1), a
                cytotoxic microtubule inhibitor, with a DAR of 3.5<sup>18</sup>. After T-DM1 is
                internalized into cells, the released payload (emtansine) is unable to cross the
                membrane of surrounding HER2-negative cells and is therefore not associated with a
                bystander killing effect. T-DM1 is FDA approved for the treatment of
                HER2-overexpressing breast cancer. It is sold under the brand name Kadcyla.
              </dd>
            </div>
            <div>
              <dt>Trastuzumab-monomethyl auristatin E (T-MMAE)</dt>
              <dd>
                An ADC consisting of trastuzumab conjugated with a cleavable MC-VC-PAB
                (maleimidocaproyl-valine-citrulline-para-amino benzyl alcohol) linker to
                monomethyl auristatin E (MMAE), a microtubule inhibitor, at a DAR of 4. T-MMAE was
                specifically designed to release MMAE, a cell-permeable payload that therefore can
                exert bystander killing activity.
              </dd>
            </div>
          </dl>
          <p class="prism-text-body-large">
            ADCs were screened in triplicate at 8 dose points in the PR500 PRISM cell set of
            adherent cancer cell lines. Vehicle treatment alone and unconjugated trastuzumab
            antibody were included as controls. After 5 days of treatment, cells were lysed and
            the barcodes were amplified and detected using the PRISM Luminex workflow. Viability
            results were normalized to vehicle control, dose response curves were fit, and area
            under curve (AUC) values were computed for each curve.
          </p>
        </section>

        <section id="results">
          <h2 class="prism-text-headline-medium">
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
            label-selected
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
            label-selected
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
            label-selected
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
            label-selected
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

        <section id="considerations">
          <h2 class="prism-text-headline-medium">
            Key considerations for ADC screening in PRISM
          </h2>
          <p class="prism-text-body-large">
            Due to their inherent complexity, multiple aspects of ADCs will affect their activity
            in vitro. Based on the characteristics of a particular ADC, we anticipate unique
            challenges may arise on a case-by-case basis. However, there are some universal
            considerations relevant to high throughput cell line screening using the PRISM
            technology. Below we highlight several guidelines for designing an ADC screening study
            using PRISM.
          </p>

          <h3 class="prism-text-title-large mt-8">
            Target expression
          </h3>
          <p class="prism-text-body-large">
            Because of the pooled format of the PRISM platform, special consideration should be
            given to target antigen expression across the PRISM cell set. The distribution of
            target antigen-expressing cells within and across cell pools is particularly relevant
            for ADCs with bystander activity. Prior to submitting ADCs for screening in PRISM, we
            recommend investigators review the
            <a
              :href="cellLineInventoryLink"
              target="_blank"
            >PRISM cell line inventory and pooling information</a>
            and cross reference the
            <a
              href="https://depmap.org/portal/interactive/"
              target="_blank"
            >DepMap Data Explorer</a>
            for relevant genetic features to estimate the number of target and non-target cell
            lines across PRISM pools. In addition, we strongly suggest using this information to
            carry out preliminary experiments to gain an understanding of potential ADC bystander
            activity. A recommended strategy is to perform a co-culture assay using an
            antigen-positive and an antigen-negative cell line plated together at ratios that
            simulate those of PRISM pools.
          </p>

          <h3 class="prism-text-title-large mt-8">
            ADC structure and stability
          </h3>
          <p class="prism-text-body-large">
            In order to accurately interpret results from high throughput pooled cell line screens
            it is necessary to understand the structural composition of an ADC, its stability,
            heterogeneity, and the relevant analytes that can drive activity in vitro. As a best
            practice we advise carrying out analytical and functional studies prior to submitting
            an ADC for high throughput screening. Bioanalytical characterization should include
            measuring the amount of intact ADC, free payload and free antibody of the stock
            solution, as well as after exposure of the ADC to conditions that mimic the screening
            assay conditions. In addition, cell-based pilot experiments to evaluate ADC activity,
            as well as activity of the relevant components (i.e., free antibody, free payload,
            linker/payload) using antigen-positive and -negative cell lines are recommended.
            Results of these experiments can inform on stability, as well as on- and off-target
            mechanisms of ADC activity, to guide interpretation of PRISM results.
          </p>

          <h3 class="prism-text-title-large mt-8">
            Experimental controls
          </h3>
          <p class="prism-text-body-large">
            Depending on the experimental goals of a particular ADC screening effort, additional
            controls are advised. A non-targeting control ADC constructed with an antibody that
            does not bind cell membrane antigens (e.g., recognizing a viral antigen) is a
            recommended negative control. Likewise, an ADC conjugated to a widely expressed cell
            membrane antigen (e.g., CD71) can serve as a positive control. In addition, it may be
            beneficial to screen each component of a test ADC (free antibody and free payload)
            individually in parallel with the ADC. These data will help distinguish between
            activity attributable to the ADC and the unconjugated components.
          </p>
        </section>

        <section id="conclusions">
          <h2 class="prism-text-headline-medium">
            Conclusions
          </h2>
          <p class="prism-text-body-large">
            With the rapidly evolving landscape of ADCs, there is a growing need for better in
            vitro models to support ADC development platforms. PRISM combines an extensive and
            diverse cell line collection with comprehensive multi-omic datasets to create highly
            informative profiles of therapeutic agents. Our high-throughput, multiplexed approach
            has facilitated the rapid screening of thousands of oncology drug candidates to
            uncover novel mechanisms of action, identify unexpected off-target effects and
            toxicities, and validate potential patient populations. Here, we demonstrated how the
            PRISM technology can be leveraged for high-throughput ADC screening across hundreds of
            cell lines simultaneously. Our results highlight how PRISM can be utilized to analyze
            ADC activity and uncover clinically relevant targets.
          </p>
          <p class="prism-text-body-large">
            Numerous factors can influence ADC efficacy including antibody specificity, target
            antigen expression, linker stability, payload release kinetics, payload potency and
            efflux susceptibility. As a consequence of their structural and biological complexity,
            studying the behavior of ADCs in vitro can be difficult. Successful ADC screening
            requires careful design of experiments, thoughtful selection of appropriate controls,
            and an understanding of ADC structural elements and their properties. Despite these
            challenges, cell-based functional screening is an essential preclinical step that
            serves various purposes in the development and characterization of these therapeutic
            agents. Such studies provide valuable insights into ADC behavior, mechanism of action,
            potency, and selectivity, and help guide subsequent in vivo investigations.
          </p>
          <p class="prism-text-title-medium mt-6">
            Explore and interact with the data on the
            <a
              :href="paper.portalLink"
              target="_blank"
              rel="noopener"
            >PRISM Data Portal</a>.
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
          author:
            'Jillian N. Eskra, Ellen Nguyen, Aydin Golabi, Shiker Nair, Antonella Masciotti, Nashielli Diaz, Anthony Fazio, Lia Petronio, Mustafa Kocak, Melissa Ronan, Matthew G. Rees, Jennifer A. Roth',
          date: 'July 27, 2023',
          portalLink: 'https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds',
        },
        cellLineInventoryLink:
          'https://docs.google.com/spreadsheets/d/1PcxxZ0O6U20megXtVs6BL10Jr-qnIZPbKk_MXKwz_BI/edit#gid=802313244',
        // The PRISM assay schematic; images to come, so each card shows a placeholder
        assayCards: [
          { title: '900+ cancer cell lines', placeholder: 'Pooled and barcoded' },
          { title: 'Antibody-drug conjugate', placeholder: 'Test agents' },
          { title: '5-day viability assay', placeholder: 'Plated and treated' },
          { title: 'Target validation and discovery', placeholder: 'Comprehensive data' },
        ],
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

  /* Definition lists: cell sets, ADC components, test agents */
  .whitepaper-terms {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0.5rem 0 1rem;
    padding: 16px 20px;
    background: rgba(var(--v-theme-on-surface), 0.035);
    border-radius: var(--prism-radius-lg);
  }
  .whitepaper-terms dt {
    font-weight: 600;
  }
  .whitepaper-terms dd {
    margin: 2px 0 0;
    color: rgba(var(--v-theme-on-surface), 0.7);
  }

  /* Image placeholder until the artwork is available */
  .image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 200px;
    margin: 1rem 0;
    color: var(--v-grey-darken-1);
    text-align: center;
    background: rgba(var(--v-theme-on-surface), 0.035);
    border: 1px dashed rgba(var(--v-theme-on-surface), 0.25);
    border-radius: var(--prism-radius-lg);
  }
  .image-placeholder--wide {
    min-height: 280px;
  }

  /* Image beside a list, stacked on narrow screens */
  .whitepaper-split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 20px;
    align-items: start;
    margin: 1rem 0;
  }
  .whitepaper-split .image-placeholder,
  .whitepaper-split .whitepaper-terms {
    margin: 0;
  }
  @media (max-width: 600px) {
    .whitepaper-split {
      grid-template-columns: 1fr;
    }
  }

  .whitepaper-body h2 {
    margin-bottom: 0.75rem;
  }
</style>
