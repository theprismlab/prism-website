<template>
  <page>
    <app-container narrow>
      <prism-page-title>Frequently Asked Questions</prism-page-title>
      <v-expansion-panels variant="accordion" flat>
        <v-expansion-panel v-for="item in faqs" :key="item.question">
          <v-expansion-panel-title>
            <span class="prism-text-headline-small font-weight-light">{{ item.question }}</span>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="prism-text-body-large" v-html="item.answer"></div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </app-container>
  </page>
</template>

<script>
  const PRISM_PORTAL_LINK = `<a href="https://www.theprismlab.org/portal/" target="_blank">PRISM Portal</a>`;
  const PRISM_PORTAL_PROJECTS_LINK = `<a href="https://www.theprismlab.org/portal/projects" target="_blank">PRISM Portal</a>`;
  const PRISM_WEBINARS_LINK = `<a href="https://www.theprismlab.org/webinars/" target="_blank">Webinars</a>`;
  const DEPMAP_PORTAL_LINK = `<a href="https://depmap.org/portal/" target="_blank">DepMap Portal</a>`;
  const PRISM_GITHUB_lINK = `<a href="https://github.com/cmap/dockerized_mts" target="_blank">PRISM GitHub</a>`;
  const PRISM_EMAIL = `<a href="mailto:prism@broadinstitute.org">prism@broadinstitute.org</a>`;

  export default {
    name: 'FAQ',
    data() {
      return {
        faqs: [
          {
            category: 'Cell Line Collection',
            question: 'What cell lines are included in the PRISM cell set?',
            answer: `The PRISM cell line collection contains over 900 DNA barcoded cell lines that represent over 45 major types of cancer and wide genomic diversity. Among them, our collection includes a significant number of pediatric cancer cell lines, as well as over 100 hematopoietic cell lines.<br><br>
            A list of the 900+ PRISM cell lines used in our screens can be found on the <a href="/consortium-screens/cell-line-collection" target="_blank">Cell Line Collection</a> page.`,
          },
          {
            category: 'Cell Line Collection',
            question: 'What does “PR2025A” and “PR2025B” mean?',
            answer: `These are the names of the two cell sets used in the PRISM 5-day assays. "PR2025A" are our 20 fastest-growing pools; "PR2025B" are our 20 slowest-growing pools.`,
          },
          {
            category: 'Cell Line Collection',
            question: 'How are PRISM cell lines grown?',
            answer: `PRISM cell lines are grown in antibiotic-free RPMI 1640 media. When onboarded into PRISM, cell lines are adapted from their native media to a standard media: RPMI 10% FBS without phenol red for adherent lines and RPMI 20% FBS without phenol red for suspension lines.
`,
          },
          {
            category: 'Cell Line Collection',
            question: 'How are PRISM cell lines barcoded?',
            answer: `Cell lines are infected with a lentivirus containing a unique 24-nt DNA barcode within a vector that has blasticidin resistance.`,
          },
          {
            category: 'Cell Line Collection',
            question: `How are PRISM cell lines QC'd?`,
            answer: `Barcoded cell lines must pass a few quality control measures before it can be integrated into a new pool: testing for mycoplasma contamination, SNP test to confirm cell line identity, and sequencing to confirm barcode ID.`,
          },
          {
            category: 'Cell Line Collection',
            question: `How are PRISM cell lines pooled?`,
            answer: `PRISM cell lines are mixed by doubling time into pools of 20-25 cell lines. Pools of cell lines are then frozen into 'assay-ready pools' so they can be easily thawed for screening.`,
          },
          {
            category: 'Cell Line Collection',
            question: `Where do PRISM cell lines come from?`,
            answer: `Most PRISM cell lines are from the Cancer Cell Line Encyclopedia (CCLE), but some were obtained from different vendors or from individual laboratories. All cell lines are then genomically characterized at the Broad Institute.`,
          },
          {
            category: 'Cell Line Collection',
            question: `Can I send you my favorite cell line to be included in PRISM?`,
            answer: `Adding new cell lines would require re-pooling existing PRISM pools. We also require PRISM cell lines to be genetically characterized for our analyses. Because of these reasons, we are unable to add collaborator cell lines to the PRISM cell set. However, the Broad Institute is always onboarding new cell lines through the Cancer Cell Line Factory (CCLF).`,
          },
          {
            category: 'Cell Line Collection',
            question: `Can PRISM cell lines be shared with external collaborators?`,
            answer: `PRISM cell lines cannot be shared outside of the Broad Institute due to the cell line MTAs. If you are interested in doing additional experiments or validation using the cell lines included in PRISM, we can help point you to the original cell line source as many are available from global cell banks including ATCC, DSMZ, HSRRB, RIKEN, etc.`,
          },
          {
            category: 'Cell Line Collection',
            question: `Are 'normal (immortalized) cell lines' included in the PRISM cell set?`,
            answer: `The current PRISM cell set has 7 non-cancerous/normal cell lines. A list of the 900+ PRISM cell lines used in our screens can be found on the <a href="/consortium-screens/cell-line-collection" target="_blank">Cell Line Collection</a> page.`,
          },
          {
            category: 'Assays',
            question: `What is the readout for PRISM?`,
            answer: `All PRISM assays use Next Gen Sequencing (NovaSeqX) to readout the PRISM barcode after drug treatment.`,
          },
          {
            category: 'Assays',
            question: `What controls are included in the screen?`,
            answer: `PRISM uses DMSO as the negative control and bortezomib as the positive control. The same validation compounds are also included in every PRISM screen to assess data quality over time, between compound plates, and to ensure biomarker analysis is identifying similar correlations over time.`,
          },
          {
            category: 'Assays',
            question: `What validation compounds are included in the screen?`,
            answer: `
              <ul>
                <li>MTS: Encorafenib, imatinib, brigimadlin</li>
                <li>CPS: Encorafenib, imatinib, brigimadlin, temozolomide | O6-benzylguanine (single-agents & combination)</li>
                <li>APS: TDM1, Palbociclib HCl, Imatinib Mesylate</li>
                <li>AIR: Trastuzumab, IgG</li>
                <li>EPS: KSQ-4279</li>
              </ul>
              Collaborators will have access to the specific validation compound data for their screen as a part of our standard deliverables.
              Public validation compound data for select screens can be accessed on the ${PRISM_PORTAL_LINK}.
            `,
          },
          {
            category: 'Assays',
            question: `How is quality control (QC) measured in the PRISM assay?`,
            answer: `
            <ul>
              <li class=mb-6>A cell line passes QC on a PCR plate (replicate plate) only if it satisfies the conditions below:
                <ol class=ml-6>
                  <li>Cell line is sufficiently abundant in the negative control condition.
                    <br><span class="text-medium-emphasis">i.e. Has more than 100 read counts in at least half of the negative control wells.</span>
                  </li>
                  <li>Cell line variability is low.
                    <br><span class="text-medium-emphasis">i.e. Median Absolute Deviation (MAD) of the log2-normalized counts across negative control wells is less than 1.</span>
                  </li>
                  <li>Cell line is killed sufficiently in the positive control.
                    <br><span class="text-medium-emphasis">i.e. Median cell line viability across positive control wells on the PCR plate is less than 0.25.</span>
                  </li>
                  <li>Cell line killing is detected reliably.
                    <br><span class="text-medium-emphasis">i.e. The overlap of cell line signal between negative and positive control conditions on the PCR plate is small; has an error rate less than 0.05.</span>
                  </li>
                </ol> 
              </li>
              <li class=mb-6>The cell line passes on a pert plate (set of replicates) if at least two independent replicates pass.</li>
              <li class=mb-6>A pool passes QC on a PCR plate (replicate plate) only if it satisfies the conditions below:
                <ol class=ml-6>
                  <li>Deviation from the pool's median signal in the controls is less than 2.</li>
                  <li>Pool is passing in more than 75% of the control wells of a PCR plate.</li>
                  <li>PCR well contains more than 75% passing pools.</li>
                </ol>
              </li>
              <li class=mb-6>If a cell line or pool passes QC, it is included in the downstream analysis.</li>

            </ul>
            For a specific project, additional information can be found within the Project's "Quality Control" tab on the ${PRISM_PORTAL_PROJECTS_LINK}.
            `,
          },
          {
            category: 'Consortium Screens',
            question: `What is the easiest way to screen with PRISM?`,
            answer: `
            We run three consortium-style screens each year (typically January, May, and September) for DMSO-soluble compounds (single-agent or combination format) and aqueous test agents (single-agent format or antibody internalization reporter assay).
            <br><br>
            Collaborators can submit their test agents and compounds for PRISM screening to be run in our standard format.
            <br><br>
            Additional details, including upcoming submission dates and test agent requirements can be found on the <a href="/consortium-screens/submission-hub/" target="_blank">Submission Hub</a>.
            `,
          },
          {
            category: 'Consortium Screens',
            question: `What is the data delivery turnaround time for these screens?`,
            answer: `Data for each screen is returned in approximately 4 months after the submission window.`,
          },
          {
            category: 'Consortium Screens',
            question: `Who selects the top dose? Which top dose should I choose?`,
            answer: `
            Collaborators select the top screening dose for their drug during the screen submission process. PRISM performs the respective serial dilutions from the stock concentration submitted to the screen.
            <br><br>
            The ideal dosing for screening would generate a gradual viability effect across doses (i.e. not kill all PRISM cell lines) in order to pull stronger biomarker correlations.
            <br><br>
            If you are unsure of the top dose to submit to PRISM, we strongly recommend screening your test agent in single-cell lines to understand the dosing prior to submitting to PRISM.
            `,
          },
          {
            category: 'Consortium Screens',
            question: `What if the compound has issues with stability/solubility/etc.?`,
            answer: `For compounds with stability/solubility issues, we strongly suggest trying to recreate the stressors of the PRISM protocol in-house prior to submitting.<br><br>
            We do not re-run compounds that don't perform well in PRISM, unless a screen is repeated due to a fault in the assay workflow.<br><br>
            Any compounds submitted to PRISM are run 'at-risk' to the collaborator.
            `,
          },
          {
            category: 'Consortium Screens',
            question: `Where can I find more information about the assay offerings?`,
            answer: `An overview of PRISM assay offerings can be found on the <a href="/consortium-screens/assays" target="_blank">Assays</a> page.`,
          },
          {
            category: 'Combination Screens',
            question: `What is the PRISM combination study design?`,
            answer: `A standard PRISM combination submission requires 2 screening slots as outlined below:<br>
              <table>
                <tr>
                    <th>Slot #</th>
                    <th>Test Compound<br><span style="font-weight:400;" class=text-medium-emphasis>(7pt. dose, 3x dilution)<span></th>
                    <th>Anchor Compound<br><span style="font-weight:400;" class=text-medium-emphasis>(1 dose)</span></th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Drug A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Drug A</td>
                  <td>Drug B</td>
                </tr>
              </table>
              <br>
              We will screen:
              <ul>
                <li>Treatment compound at dose (7-point dose with 3-fold dilutions) alone (Slot #1)</li>
                <li>Treatment compound at dose (7-point dose with 3-fold dilutions) + Anchor compound at one anchor dose (Slot #2)</li>
                <li>Anchor compound at one anchor dose alone (no slot - since it just 1 dose)</li>
              </ul>
            `,
          },
          {
            category: 'Combination Screens',
            question: `Can I only submit the combination and not include the single-agent arm?`,
            answer: `No - our combinatorial analytics are designed for curves of drug A+B and drug A alone, which is why we require 2 slots for our combination consortium screens.<br><br>
            By submitting only drug A+B in combination, we cannot offer any combinatorial analyses (including synergy scores and differential analyses) and it would be difficult to interpret the data for the combination without submitting drug A on its own.
            `,
          },
          {
            category: 'Aqueous Screens',
            question: `Are there bystander effects when screening ADCs in PRISM?`,
            answer: `Based on previous work from our team, we do not see significant bystander effects with ADC screening in PRISM.<br><br>
            For additional context, we screened HER2 ADCs and did not find significant bystander killing of HER2-negative cells. This was validated experimentally by screening the ADCs against HER2 positive and HER2 negative cell lines pooled at different ratios to mimic the expression in PRISM pools. <br><br>
            Learn more in our <a href="https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets" target="_blank">ADC white paper</a>.
            `,
          },
          {
            category: 'Aqueous Screens',
            question: `What is AIR?`,
            answer: `PRISM AIR stands for “Antibody Internalization Reporter” assay.<br><br>
            The assay is for viability screening of unconjugated antibodies: we couple collaborator antibodies with a cytotoxic payload via a universal secondary drug-conjugate prior to screening to mimic the function of an ADC. Additional details about AIR can be accessed <a href="https://assets.clue.io/prism/Overview-of-PRISM-AIR-Assay-for-Collaborators.pdf" target="_blank">here</a>.<br><br>
            AIR screens are run in the same format and at the same time as standard PRISM aqueous screens.
            `,
          },
          {
            category: 'Data Processing & Analysis',
            question: `How is PRISM data processed / analyzed?`,
            answer: `PRISM generates sensitivity profiles (heatmaps) for each drug based on the PRISM barcode amount of each cell line after treatment relative to the negative control wells.<br><br>
            These PRISM sensitivity profiles are then compared to baseline genomic feature sets for each cell line to identify features that correlate with sensitivity.<br><br>
            These feature sets are publicly available via the ${DEPMAP_PORTAL_LINK}, and the code for our data processing pipeline is available via the ${PRISM_GITHUB_lINK}.
            `,
          },
          {
            category: 'Data Processing & Analysis',
            question: `How is PRISM data normalized?`,
            answer: `PRISM data is normalized to the negative control used in the assay (DMSO).`,
          },
          {
            category: 'Data Processing & Analysis',
            question: `What genomic characterization data is used in PRISM analysis?`,
            answer: `Each PRISM cell line has been genomically characterized through the Cancer Dependency Map group at the Broad Institute. This data can be accessed on the ${DEPMAP_PORTAL_LINK}.
            <br><br>
            The specific feature sets used in PRISM analysis include:
            <ul>
              <li>Cell line lineage and subtype, mutation status, gene expression, protein expression, copy number, methylation, and metabolomics</li>
              <li>Loss-of-function genetic perturbation data using CRISPR and shRNA</li>
              <li>PRISM viability data from over 6,000 annotated commercial drugs (Drug Repurposing dataset)</li>
              <li>PRISM only uses baseline genomic features - we do not use post-transcriptomics. </li>
              </ul>
            `,
          },
          {
            category: 'Data Processing & Analysis',
            question: `What resources are available to understand how PRISM data is processed?`,
            answer: `Collaborators receive their PRISM data through the ${PRISM_PORTAL_LINK}. The Portal includes additional pop-outs and sections explaining how the data is processed, including a dedicated Data Processing page.<br><br>
            The code for collaborators to process or re-capitulate the data themselves is provided on the ${PRISM_GITHUB_lINK}.
            `,
          },
          {
            category: 'Data Delivery',
            question: `Can PRISM data be shared with others?`,
            answer: `Collaborators will select a ‘Data Access Manager’ at the time of submission, who will be able to independently grant access to the PRISM dataset to others through the PRISM Portal.`,
          },
          {
            category: 'Data Delivery',
            question: `What resources are available to help navigate the PRISM Portal or interpret the analyses?`,
            answer: `Pre-recorded webinars that walk through the features of the PRISM Portal and how to generally interpret the figures provided can be found on the ${PRISM_WEBINARS_LINK} page.`,
          },
          {
            category: 'Data Delivery',
            question: `Is there a way to do further analysis on the PRISM data?`,
            answer: `A feature of the PRISM Data Portal allows PRISM data to be exported directly to the DepMap Portal Data Explorer tool. This tool allows collaborators to compare their PRISM data to other public DepMap datasets as well as generate custom figures and comparisons.`,
          },
          {
            category: 'Data Delivery',
            question: `Does PRISM provide growth rates or Day 0 counts as part of its standard deliverables?`,
            answer: `We do not provide growth rates or Day 0 data in our deliverables.`,
          },
          {
            category: 'Custom Screens',
            question: `Are there any other readouts other than viability?`,
            answer: `As PRISM is a viability assay, we do not do any other readouts.`,
          },
          {
            category: 'Custom Screens',
            question: `Does PRISM do mixed combinations (i.e. DMSO + aqueous combination)?`,
            answer: `While we have previous experience running these types of screens, these are considered a "custom PRISM screen".
            <br><br>
            If you are interested in exploring a custom collaboration, please email ${PRISM_EMAIL} to connect with our custom project team.
            `,
          },
          {
            category: 'Custom Screens',
            question: `Does PRISM do co-culture screens (i.e. co-culture with T cells)?`,
            answer: `
            While we have previous experience running these types of screens, these are considered a "custom PRISM screen".
             <br><br>
            If you are interested in exploring a custom collaboration, please email ${PRISM_EMAIL} to connect with our custom project team.
            `,
          },
          {
            category: 'Custom Screens',
            question: `Does PRISM do 3D screening?`,
            answer: `While we have previous experience running these types of screens in a ULA format, these are considered a "custom PRISM screen".
             <br><br>
            If you are interested in exploring a custom collaboration, please email ${PRISM_EMAIL} to connect with our custom project team.
            `,
          },
          {
            category: 'Custom Screens',
            question: `Does PRISM do organoid screening?`,
            answer: `Unfortunately, we do not have this offering.`,
          },
          {
            category: 'Custom Screens',
            question: `Does PRISM screen radioligand therapeutics?`,
            answer: `Unfortunately, we do not have this offering.`,
          },
          {
            category: 'Custom Screens',
            question: `Can I screen in only a subset of cell lines?`,
            answer: `No, consortium screens are run only in our full 900+ PRISM cell set. Due to the scale of these screens, it is more costly to screen in only a subset rather than the full PRISM cell set.`,
          },
          {
            category: 'Custom Screens',
            question: `Can I purchase PRISM pools for my own use?`,
            answer: `PRISM pools can only be used for PRISM experiments and screens. Due to the cell line MTAs, PRISM cell lines cannot be shared outside of the Broad Institute.`,
          },

          {
            category: 'Legal / Operations',
            question: `Are agreements required for industry collaborators?`,
            answer: `Yes, we require fully-executed sponsored research agreements (SRA) for industry groups to screen with PRISM. 
            <br><br>
            To receive a template copy of the SRA, reach out to ${PRISM_EMAIL}`,
          },
          {
            category: 'Legal / Operations',
            question: `Are agreements required for academic/non-profit collaborators?`,
            answer: `No, we do not require an agreement of any kind for academic/non-profit groups to screen with PRISM. Instead, we will issue a quote at the time of submission, which will need to be funded before accepting compounds for screening.
            <br><br>
            Academic/non-profit groups can still request to put an SRA in-place, if they would like
            <br><br>
            To receive a template copy of the SRA, reach out to ${PRISM_EMAIL}`,
          },
          {
            category: 'Legal / Operations',
            question: `As an academic, can I submit compounds for PRISM screening for industry/commercial use?`,
            answer: `Academics/non-profits receive subsidized pricing for PRISM screens and thus, results are for academic/research purposes only. If academics would like to use results for commercial/industry purposes, they will need to purchase a license or sign a sponsored research agreement, and pay a higher fee.<br><br>
            Examples of using PRISM results in commercial or industry purposes include but are not limited to: starting a new company using PRISM results, or selling a test agent with PRISM results to a company.`,
          },
          {
            category: 'Legal / Operations',
            question: `What is PRISM’s policy on using PRISM data in publications?`,
            answer: `PRISM requests acknowledgement in manuscripts in accordance with the NIH guidelines for Authorship Contribution. At minimum, please acknowledge the PRISM lab and use the word “PRISM” in the manuscript.
            <br><br>
            If you would like help with your manuscript, we request at least 30 days notice for our team to review manuscripts and at least 10 days for posters. Please send the manuscripts to ${PRISM_EMAIL}.
            <br><br>
            To cite our work, please use: 
            <ul class=ml-6>
              <li>Corsello, S.M., Nagari, R.T., Spangler, R.D. et al. Discovering the anticancer potential of non-oncology drugs by systematic viability profiling. Nat Cancer 1, 235–248 (2020). 
                <a href="https://doi.org/10.1038/s43018-019-0018-6" target="_blank">https://doi.org/10.1038/s43018-019-0018-6</a>
              </li>
              <li>Yu, C., Mannan, A., Yvone, G. et al. High-throughput identification of genotype-specific cancer vulnerabilities in mixtures of barcoded tumor cell lines. Nat Biotechnol 34, 419–423 (2016). 
                <a href="https://doi.org/10.1038/nbt.3460" target="_blank">https://doi.org/10.1038/nbt.3460</a>
              </li>
              <li>Rees, M.G et al OncRef: A pan-cancer PRISM reference of cancer therapeutics, (manuscript submitted, 2026)</li>
            </ul>
            `,
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .v-expansion-panel {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .v-expansion-panel-title.v-expansion-panel-title--active {
    background-color: rgba(var(--v-theme-on-surface), 0.03);
  }
  .text-medium-emphasis {
    font-weight: 100 !important;
  }
</style>
