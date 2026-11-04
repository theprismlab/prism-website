<template>
  <page>
    <!-- The header is the manuscript's title block: overline, paper title, authors,
         collapsible affiliations, then a citation/meta row with actions. -->
    <page-header background="multi-focal-cool" narrow class="manuscript-header">
      <template #overline>
        <span class="manuscript-header__overline">
          <v-icon
            icon="mdi-file-document-outline"
            size="18"
            class="manuscript-header__overline-icon"
            aria-hidden="true"
          />
          <span class="manuscript-header__overline-text prism-text-overline font-weight-black">
            Oncology Reference · Manuscript
          </span>
        </span>
      </template>
      <template #title>{{ manuscript.title }}</template>

      <!-- Author list: each name followed by its affiliation marks as superscript -->
      <p class="prism-text-body-medium manuscript-header__authors mb-0">
        <template v-for="(author, i) in manuscript.authors" :key="author.name">
          <template v-if="i === manuscript.authors.length - 1">and </template>
          <span class="text-no-wrap"
            >{{ author.name }}<sup>{{ author.note }}</sup></span
          >
          <template v-if="i < manuscript.authors.length - 1">, </template>
        </template>
      </p>

      <!-- Affiliations and notes keyed by the superscript marks above, collapsed
           by default so the header stays short. -->
      <div class="manuscript-header__affiliations">
        <button
          type="button"
          class="manuscript-header__toggle"
          :aria-expanded="showAffiliations"
          aria-controls="manuscript-affiliations"
          @click="showAffiliations = !showAffiliations"
        >
          {{ showAffiliations ? 'Hide' : 'Show' }} affiliations
          <v-icon :icon="showAffiliations ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="small" />
        </button>
        <v-expand-transition>
          <ul
            v-show="showAffiliations"
            id="manuscript-affiliations"
            class="manuscript-header__affiliation-list prism-text-body-small"
          >
            <li v-for="aff in manuscript.affiliations" :key="aff.mark">
              <sup>{{ aff.mark }}</sup>
              <span>{{ aff.text }}</span>
            </li>
          </ul>
        </v-expand-transition>
      </div>

      <!-- Headline figures from the abstract -->

      <!-- Citation details, evenly spaced across the row. Each item renders only
           once its value is filled in (see `manuscript` in data). -->
      <div v-if="hasMeta" class="manuscript-header__meta">
        <dl class="manuscript-header__citation">
          <div v-if="manuscript.journal">
            <dt>Journal</dt>
            <dd>{{ manuscript.journal }}</dd>
          </div>
          <div v-if="manuscript.date">
            <dt>Published</dt>
            <dd>{{ manuscript.date }}</dd>
          </div>
          <div v-if="manuscript.doi">
            <dt>DOI</dt>
            <dd>
              <a :href="doiUrl" target="_blank" rel="noopener">{{ manuscript.doi }}</a>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Actions, separate from the citation block. The paper link is the
           primary action; data access is secondary (outlined). -->
      <div v-if="manuscript.pdfUrl || manuscript.dataAccess" class="manuscript-header__actions">
        <v-btn
          v-if="manuscript.pdfUrl"
          :href="manuscript.pdfUrl"
          target="_blank"
          rel="noopener"
          color="primary"
          variant="flat"
          rounded
          append-icon="mdi-arrow-right"
          style="text-transform: none"
        >
          Read the paper
        </v-btn>
        <v-btn
          v-if="manuscript.dataAccess"
          :href="manuscript.dataAccess"
          target="_blank"
          rel="noopener"
          color="primary"
          variant="outlined"
          rounded
          append-icon="mdi-database-arrow-right-outline"
          style="text-transform: none"
        >
          Request data access
        </v-btn>
      </div>
    </page-header>

    <page-section width="narrow">
      <prism-section-title gradient>Summary</prism-section-title>
      <p class="prism-text-body-large">
        Transformative therapeutic approaches are emerging to address cancer complexity and
        heterogeneity, underscoring the need for systematic drug evaluation methodologies to
        accelerate the translation to improved patient outcomes. Cell line profiling is a powerful
        tool; however, mechanistic interpretation requires large-scale collections with extensive
        molecular characterization. We screened the PRISM collection of 891 deeply characterized
        barcoded cancer cell lines spanning 29 lineages with 396 clinically relevant agents,
        encompassing small molecules, protein degraders, and biologics, to generate an Oncology
        Reference (OncRef) resource. Most molecules produced effects consistent with modulation of
        their annotated targets. Beyond primary target characterization, we develop a new framework
        to quantify specificity, selectivity, on-target polypharmacology, and non-target effects,
        identifying unintended targets and mediators of toxicity modulating cellular response. This
        resource establishes a benchmark for oncology therapeutics, providing a scalable framework
        for evaluating new targets and modalities.
      </p>
    </page-section>

    <page-section width="normal">
      <h3 class="prism-text-headline-medium mb-8" style="text-align: center">
        OncRef composition and association with multiomic features
      </h3>
      <manuscript-figures :figures="figures" />
    </page-section>

    <page-section width="wide">
      <h3 class="prism-text-headline-medium mb-8" style="text-align: center">
        Explore the OncRef similarity map
      </h3>
      <agent-explorer />
    </page-section>

    <page-section width="narrow">
      <v-card variant="outlined" class="nominations-cta">
        <div class="nominations-cta__content">
          <section-overline gradient>Nominations</section-overline>
          <h2 class="prism-text-display-small mt-1 mb-3">Help grow the Oncology Reference</h2>
          <p class="prism-text-body-large mb-0">
            We are excited to accept nominations from all researchers to continue to grow our
            Oncology Reference library. Based on our in-process manuscript to create a living
            resource of Oncology Reference test agents, the PRISM Team will be screening 150 new
            test agents per year, composed of small molecules, antibodies, and ADCs.
          </p>
        </div>
        <v-btn
          to="/oncology-reference/nominations"
          color="primary"
          variant="flat"
          size="large"
          append-icon="mdi-arrow-right"
          class="align-self-start"
        >
          Learn more about nominations
        </v-btn>
      </v-card>
    </page-section>
  </page>
</template>

<script>
  import AgentExplorer from './manuscript/AgentExplorer.vue';
  import ManuscriptFigures from './manuscript/ManuscriptFigures.vue';
  import { ASSAY_WORKFLOW, CASE_STUDIES } from './manuscript/content.js';

  // Figure images live in public/images/oncref_manuscript/. BASE_URL makes the
  // path correct both on the dev server and under the production base path.
  const figurePath = import.meta.env.BASE_URL + 'images/oncref_manuscript/';

  export default {
    name: 'OncologyReferenceManuscript',
    components: {
      AgentExplorer,
      ManuscriptFigures,
    },
    data() {
      return {
        // Affiliation list in the header, collapsed until the reader asks for it
        showAffiliations: false,
        // Citation details for the OncRef paper. `note` on each author and `mark` on
        // each affiliation are rendered as superscripts in the template.
        // journal / date / doi / pdfUrl are empty until the manuscript is public;
        // each renders in the header only once it has a value.
        manuscript: {
          title: 'OncRef: A pan-cancer PRISM reference of cancer therapeutics',
          authors: [
            { name: 'Matthew G. Rees', note: '1,5,7,#' },
            { name: 'Matthew J. Emmett', note: '1,2,3,4,5' },
            { name: 'Mustafa A. Kocak', note: '1' },
            { name: 'Colleen T. Harrington', note: '1' },
            { name: 'Anthony Fazio', note: '1' },
            { name: 'Mrinal Shekhar', note: '1' },
            { name: 'Li Wang', note: '1' },
            { name: 'Alvin Kalathungal', note: '1' },
            { name: 'Tenzin Sangpo', note: '1' },
            { name: 'Emily R. Borr', note: '1' },
            { name: 'Yiwei Liang', note: '1' },
            { name: 'Rachael Barry', note: '1' },
            { name: 'Emily Reeves', note: '1' },
            { name: 'Aydin Golabi', note: '1' },
            { name: 'Blanche C. Ip', note: '1' },
            { name: 'Laura Doherty', note: '1' },
            { name: 'Jillian Eskra', note: '1' },
            { name: 'John F. Davis', note: '1' },
            { name: 'Ashish B. George', note: '1' },
            { name: 'Dennie T. Frederick', note: '1' },
            { name: 'Melissa M. Ronan', note: '1' },
            { name: 'Catarina D. Campbell', note: '1' },
            { name: 'Jennifer A. Roth', note: '1,6,#' },
            { name: 'William R. Sellers', note: '1,2,4,6,#' },
          ],
          affiliations: [
            { mark: '1', text: 'Broad Institute of MIT & Harvard, Cambridge, MA 02142, USA' },
            {
              mark: '2',
              text: 'Department of Medical Oncology, Dana-Farber Cancer Institute, Boston, MA 02215, USA',
            },
            {
              mark: '3',
              text: 'Division of Hematology and Oncology, Mass General Brigham Cancer Institute, Boston, MA 02114, USA',
            },
            { mark: '4', text: 'Harvard Medical School, Boston, MA 02115, USA' },
            { mark: '5', text: 'These authors contributed equally' },
            { mark: '6', text: 'These authors contributed equally' },
            { mark: '7', text: 'Lead contact' },
            {
              mark: '#',
              text: 'Correspondence: reesm@broadinstitute.org (M.G.R.), jroth@broadinstitute.org (J.A.R.), wsellers@broadinstitute.org (W.R.S.)',
            },
          ],
          journal: 'TBD',
          date: 'Month DD, YYYY',
          doi: '10.1101/2025.XX.XX.XXXXXX',
          pdfUrl: '#',
          dataAccess: '#',
        },
        // Headline figures as cited in the abstract below; shown as cards in the header
        abstractStats: [
          {
            value: 396,
            label: 'Clinically relevant agents',
            detail: 'Small molecules, protein degraders, and biologics',
            icon: 'mdi-flask-outline',
          },
          {
            value: 891,
            label: 'Barcoded cancer cell lines',
            detail: 'Deeply characterized PRISM collection',
            icon: 'mdi-dna',
          },
          {
            value: 29,
            label: 'Tumor lineages',
            detail: 'Pan-cancer coverage in pooled screens',
            icon: 'mdi-sitemap-outline',
          },
        ],
        // The abstract's argument in three parts, shown as ordered cards below the
        // header: the resource that was built, the framework applied to it, and
        // what the two together establish.
        storyCards: [
          {
            eyebrow: 'The resource',
            title: 'A pan-cancer screen of clinical therapeutics',
            body: 'Clinically relevant agents were profiled across the PRISM collection of deeply characterized, barcoded cancer cell lines spanning 29 lineages. The result is OncRef, an Oncology Reference for cancer therapeutics.',
            points: [
              'Small molecules, protein degraders, and biologics',
              '891 barcoded cell lines with extensive molecular characterization',
              'Pooled, multiplexed screening of all lines at once',
            ],
          },
          {
            eyebrow: 'The framework',
            title: 'Beyond the primary target',
            body: 'Most agents produced effects consistent with their annotated targets. A new framework then quantifies how each agent behaves beyond that target, surfacing unintended targets and the mediators of toxicity that shape cellular response.',
            points: [
              'Specificity',
              'Selectivity',
              'On-target polypharmacology',
              'Non-target effects',
            ],
          },
          {
            eyebrow: 'The benchmark',
            title: 'A reference that scales',
            body: 'Together, the resource and the framework establish a benchmark for oncology therapeutics, and a repeatable way to evaluate new targets and new modalities as they emerge.',
            points: [
              'Benchmark for oncology therapeutics',
              'Scalable framework for new targets',
              'Extends to new modalities',
            ],
          },
        ],
        // Manuscript figures: { src, alt?, label?, caption, cols?, maxHeight? }.
        // Leave `src` empty to show a placeholder until the image is in place.
        // `cols` is the span out of 12 on md+ screens (default 12 = full row);
        // `maxHeight` caps the image (px as a number, or any CSS length string).
        figures: [
          {
            src: figurePath + 'Figures-01a.png',
            label: 'Figure 1a.',
            caption:
              ' Depiction of 265 test agents in the OncRef dataset by target pathway and modality.',
            cols: 6,
            maxHeight: 350,
          },
          {
            src: figurePath + 'Figures-01b.png',
            label: 'Figure 1b.',
            caption:
              'PRISM viability profiles across 891 cell lines are associated with orthogonal baseline feature datasets from DepMap.',
            cols: 6,
            maxHeight: 350,
          },
          {
            src: figurePath + 'Figures-01a2.png',
            label: 'Figure XX.',
            caption:
              ' Depiction of 265 test agents in the OncRef dataset by class, clinical stage, and screening status.',
            maxHeight: 350,
          },
        ],
        // Highlighted findings from the manuscript, one ImageCard each
        // ({ title, body, caption, category, image })
        caseStudies: CASE_STUDIES,
        assayWorkflow: ASSAY_WORKFLOW,
      };
    },
    computed: {
      // Header meta row shows only when at least one citation detail is filled in
      hasMeta() {
        const { journal, date, doi } = this.manuscript;
        return Boolean(journal || date || doi);
      },
      doiUrl() {
        return this.manuscript.doi ? `https://doi.org/${this.manuscript.doi}` : '';
      },
    },
  };
</script>

<style scoped>
  /* ---- Manuscript header ------------------------------------------------- */
  /* Gradient overline, matching SectionOverline's `gradient` variant without
     introducing a second <h2> above the page's <h1>. */
  .manuscript-header__overline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  /* Icon takes the gradient's start color so the pair reads as one mark */
  .manuscript-header__overline-icon {
    color: var(--v-blue-darken-2);
  }
  .manuscript-header__overline-text {
    display: inline-block;
    background: linear-gradient(90deg, var(--v-blue-darken-2), var(--v-indigo-darken-3));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  /* The paper title is long; tighten the display size so it holds ~2 lines. */
  .manuscript-header :deep(h1) {
    max-width: 22ch;
    margin-bottom: 20px !important;
    line-height: 1.1;
    letter-spacing: -0.015em;
  }
  .manuscript-header__authors {
    color: rgba(var(--v-theme-on-surface), 0.78);
    line-height: 1.6;
  }
  .manuscript-header__authors sup,
  .manuscript-header__affiliation-list sup {
    font-size: 0.7em;
    font-weight: 700;
    line-height: 0;
    margin-left: 1px;
    color: rgba(var(--v-theme-on-surface), 0.6);
  }

  .manuscript-header__affiliations {
    margin-top: 12px;
  }
  /* Quiet text toggle: reads as a link, not a button, so it sits inside prose */
  .manuscript-header__toggle {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 0;
    border: 0;
    background: none;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    color: rgb(var(--v-theme-primary));
    cursor: pointer;
  }
  .manuscript-header__toggle:hover,
  .manuscript-header__toggle:focus-visible {
    text-decoration: none;
    outline: none;
    opacity: 0.8;
  }
  .manuscript-header__affiliation-list {
    max-width: calc(var(--prism-measure) + 150px);
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
    color: rgba(var(--v-theme-on-surface), 0.7);
  }
  .manuscript-header__affiliation-list li {
    display: flex;
    gap: 8px;
    padding: 3px 0;
  }
  .manuscript-header__affiliation-list li sup {
    flex: 0 0 1.25em;
    margin: 0;
    line-height: inherit;
    font-size: 0.75em;
    text-align: right;
  }
  .manuscript-header__affiliation-list span {
    overflow-wrap: anywhere;
  }

  /* Citation row: a hairline above, label/value pairs in equal-width columns */
  .manuscript-header__meta {
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  }
  .manuscript-header__citation {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    gap: 12px 24px;
    margin: 0;
  }
  .manuscript-header__citation dt {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), 0.55);
  }
  .manuscript-header__citation dd {
    margin: 2px 0 0;
    font-size: 0.9375rem;
    overflow-wrap: anywhere;
  }
  .manuscript-header__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }

  .nominations-cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding: 28px 32px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: var(--prism-radius-lg);
    background: linear-gradient(
      180deg,
      rgba(var(--v-theme-on-surface), 0.035) 0%,
      rgba(var(--v-theme-on-surface), 0.015) 100%
    );
  }
  .nominations-cta__content {
    max-width: 640px;
  }
  /* xs */
  @media (max-width: 600px) {
    .manuscript-header :deep(h1) {
      max-width: none;
    }
    /* One column per line on phones instead of three squeezed columns */
    .manuscript-header__citation {
      grid-auto-flow: row;
    }
    .manuscript-header__actions {
      flex-direction: column;
    }
    .manuscript-header__actions .v-btn {
      width: 100%;
    }
    .nominations-cta {
      gap: 20px;
      padding: 20px 16px;
    }
  }
</style>
