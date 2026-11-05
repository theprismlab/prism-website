<template>
  <!-- The page header is the manuscript's title block: overline, paper title, authors,
       collapsible affiliations, then a citation/meta row with actions.
       Publication details come from MANUSCRIPT in content.js. -->
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

    <!-- Citation details, evenly spaced across the row. Each item renders only
         once its value is filled in. -->
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
</template>

<script>
  import { MANUSCRIPT } from './content.js';

  export default {
    name: 'ManuscriptHeader',
    data() {
      return {
        manuscript: MANUSCRIPT,
        // Affiliation list, collapsed until the reader asks for it
        showAffiliations: false,
      };
    },
    computed: {
      // Meta row shows only when at least one citation detail is filled in
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
  }
</style>
