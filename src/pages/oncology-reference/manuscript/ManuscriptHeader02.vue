<template>
  <!-- The page header has two zones:
       1. Publication block: overline, paper title, authors (+ affiliations on
          expand), a compact citation line, and the paper/data actions.
       2. Summary band (optional): headline figures from the abstract, set off
          by a hairline so they read as "about the resource", not citation info.
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

    <!-- Author list: each name followed by its affiliation marks as superscript.
         Collapsed, only the first few authors show; expanded, all of them do. -->
    <p id="manuscript-authors" class="prism-text-body-medium manuscript-header__authors mb-0">
      <template v-for="(author, i) in authorsShown" :key="author.name">
        <template v-if="!isTruncated && i === authorsShown.length - 1">and </template>
        <span class="text-no-wrap"
          >{{ author.name }}<sup>{{ author.note }}</sup></span
        >
        <template v-if="i < authorsShown.length - 1">, </template>
      </template>
      <template v-if="isTruncated">, et al.</template>
    </p>

    <!-- Affiliations and notes keyed by the superscript marks above, collapsed
         by default so the header stays short. The same toggle reveals the full
         author list, and sits below whatever it expanded. -->
    <div class="manuscript-header__affiliations">
      <v-expand-transition>
        <ul
          v-show="expanded"
          id="manuscript-affiliations"
          class="manuscript-header__affiliation-list prism-text-body-small"
        >
          <li v-for="aff in manuscript.affiliations" :key="aff.mark">
            <sup>{{ aff.mark }}</sup>
            <span>{{ aff.text }}</span>
          </li>
        </ul>
      </v-expand-transition>
      <button
        type="button"
        class="manuscript-header__toggle"
        :aria-expanded="expanded"
        aria-controls="manuscript-authors manuscript-affiliations"
        @click="expanded = !expanded"
      >
        {{
          expanded ? 'Show less' : `Show all ${manuscript.authors.length} authors & affiliations`
        }}
        <v-icon :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="small" />
      </button>
    </div>

    <!-- Citation as one quiet line, the way a journal prints it. Each item
         renders only once its value is filled in. -->
    <p v-if="hasMeta" class="manuscript-header__citation prism-text-body-small">
      <span v-if="manuscript.journal" class="manuscript-header__journal">{{
        manuscript.journal
      }}</span>
      <span v-if="manuscript.date">Published {{ manuscript.date }}</span>
      <span v-if="manuscript.doi">
        DOI
        <a :href="doiUrl" target="_blank" rel="noopener">{{ manuscript.doi }}</a>
      </span>
    </p>

    <!-- The paper link is the primary action; data access is secondary (outlined). -->
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

    <!-- Summary band: what the resource contains, separate from the citation -->
    <section v-if="showStats" class="manuscript-header__stats" aria-labelledby="manuscript-stats">
      <h2 id="manuscript-stats" class="manuscript-header__stats-label">OncRef at a glance</h2>
      <manuscript-stat-cards />
    </section>
  </page-header>
</template>

<script>
  import { MANUSCRIPT } from './content.js';
  import ManuscriptStatCards from './ManuscriptStatCards.vue';
  export default {
    name: 'ManuscriptHeader02',
    components: { ManuscriptStatCards },
    props: {
      showStats: { type: Boolean, default: false },
    },
    data() {
      return {
        manuscript: MANUSCRIPT,
        // Authors and affiliations are collapsed until the reader clicks "Show more"
        expanded: false,
        authorPreviewCount: 3,
      };
    },
    computed: {
      // Only the author list is cut short, and only while collapsed
      isTruncated() {
        return !this.expanded && this.manuscript.authors.length > this.authorPreviewCount;
      },
      authorsShown() {
        return this.isTruncated
          ? this.manuscript.authors.slice(0, this.authorPreviewCount)
          : this.manuscript.authors;
      },
      // Citation line shows only when at least one detail is filled in
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
    max-width: 24ch;
    margin-bottom: 16px !important;
    line-height: 1.1;
    letter-spacing: -0.015em;
    text-wrap: balance;
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
    margin-top: 6px;
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
  .manuscript-header__toggle:hover {
    opacity: 0.8;
  }
  /* Keep a visible focus ring for keyboard users */
  .manuscript-header__toggle:focus-visible {
    outline: 2px solid rgb(var(--v-theme-primary));
    outline-offset: 2px;
    border-radius: 2px;
  }
  .manuscript-header__affiliation-list {
    max-width: calc(var(--prism-measure) + 150px);
    margin: 12px 0 8px;
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

  /* Citation line: journal · date · DOI, muted, dot-separated */
  .manuscript-header__citation {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    margin: 20px 0 0;
    color: rgba(var(--v-theme-on-surface), 0.65);
  }
  .manuscript-header__citation > span + span::before {
    content: '·';
    margin: 0 10px;
    color: rgba(var(--v-theme-on-surface), 0.35);
  }
  .manuscript-header__journal {
    font-style: italic;
    font-weight: 600;
    color: rgba(var(--v-theme-on-surface), 0.85);
  }
  .manuscript-header__citation a {
    overflow-wrap: anywhere;
  }

  .manuscript-header__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 20px;
  }

  /* Summary band: a hairline and small label set it apart from the citation */
  .manuscript-header__stats {
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  }
  .manuscript-header__stats-label {
    margin: 0 0 12px;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1.4;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), 0.55);
  }

  /* xs */
  @media (max-width: 600px) {
    .manuscript-header :deep(h1) {
      max-width: none;
    }
    /* Citation items stack on phones; drop the dot separators */
    .manuscript-header__citation {
      flex-direction: column;
      gap: 2px;
    }
    .manuscript-header__citation > span + span::before {
      content: none;
    }
    .manuscript-header__actions {
      flex-direction: column;
    }
    .manuscript-header__actions .v-btn {
      width: 100%;
    }
  }
</style>
