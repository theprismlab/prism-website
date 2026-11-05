<template>
  <v-card variant="outlined" class="manuscript-card">
    <span class="manuscript-card__overline">
      <v-icon
        icon="mdi-file-document-outline"
        size="18"
        class="manuscript-card__overline-icon"
        aria-hidden="true"
      />
      <span class="manuscript-card__overline-text prism-text-overline font-weight-black">
        Oncology Reference · Manuscript
      </span>
    </span>

    <h2 class="prism-text-headline-medium manuscript-card__title">{{ manuscript.title }}</h2>

    <!-- Author list: each name followed by its affiliation marks as superscript -->
    <p class="prism-text-body-medium manuscript-card__authors mb-0">
      <template v-for="(author, i) in manuscript.authors" :key="author.name">
        <template v-if="i > 0 && i === manuscript.authors.length - 1">and </template>
        <span class="text-no-wrap"
          >{{ author.name }}<sup v-if="author.note">{{ author.note }}</sup></span
        >
        <template v-if="i < manuscript.authors.length - 1">, </template>
      </template>
    </p>

    <!-- Affiliations and notes keyed by the superscript marks above, collapsed by default -->
    <div v-if="manuscript.affiliations?.length" class="manuscript-card__affiliations">
      <button
        type="button"
        class="manuscript-card__toggle"
        :aria-expanded="showAffiliations"
        :aria-controls="affiliationsId"
        @click="showAffiliations = !showAffiliations"
      >
        {{ showAffiliations ? 'Hide' : 'Show' }} affiliations
        <v-icon :icon="showAffiliations ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="small" />
      </button>
      <v-expand-transition>
        <ul
          v-show="showAffiliations"
          :id="affiliationsId"
          class="manuscript-card__affiliation-list prism-text-body-small"
        >
          <li v-for="aff in manuscript.affiliations" :key="aff.mark">
            <sup>{{ aff.mark }}</sup>
            <span>{{ aff.text }}</span>
          </li>
        </ul>
      </v-expand-transition>
    </div>

    <!-- Citation details. Each item renders only once its value is filled in. -->
    <dl v-if="hasMeta" class="manuscript-card__meta">
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

    <!-- The paper link is the primary action; data access is secondary (outlined) -->
    <div v-if="manuscript.pdfUrl || manuscript.dataAccess" class="manuscript-card__actions">
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
  </v-card>
</template>
<script>
  import { MANUSCRIPT } from './content.js';

  export default {
    name: 'ManuscriptCard',
    data() {
      return {
        manuscript: MANUSCRIPT,
        // Affiliation list, collapsed until the reader asks for it
        showAffiliations: false,
        affiliationsId: 'manuscript-card-affiliations',
      };
    },
    computed: {
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
  .manuscript-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 28px 32px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: var(--prism-radius-lg);
    /* Outlined cards are transparent, so give it a solid fill over the gradient */
    background: rgb(var(--v-theme-surface));
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }

  /* Gradient overline, matching SectionOverline's `gradient` variant */
  .manuscript-card__overline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .manuscript-card__overline-icon {
    color: var(--v-blue-darken-2);
  }
  .manuscript-card__overline-text {
    display: inline-block;
    background: linear-gradient(90deg, var(--v-blue-darken-2), var(--v-indigo-darken-3));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .manuscript-card__title {
    margin: 0 0 4px;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .manuscript-card__authors {
    color: rgba(var(--v-theme-on-surface), 0.78);
    line-height: 1.6;
  }
  .manuscript-card__authors sup,
  .manuscript-card__affiliation-list sup {
    font-size: 0.7em;
    font-weight: 700;
    line-height: 0;
    margin-left: 1px;
    color: rgba(var(--v-theme-on-surface), 0.6);
  }

  /* Quiet text toggle: reads as a link, not a button */
  .manuscript-card__toggle {
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
  .manuscript-card__toggle:hover,
  .manuscript-card__toggle:focus-visible {
    outline: none;
    opacity: 0.8;
  }
  .manuscript-card__affiliation-list {
    margin: 12px 0 0;
    padding: 0;
    list-style: none;
    color: rgba(var(--v-theme-on-surface), 0.7);
  }
  .manuscript-card__affiliation-list li {
    display: flex;
    gap: 8px;
    padding: 3px 0;
  }
  .manuscript-card__affiliation-list li sup {
    flex: 0 0 1.25em;
    margin: 0;
    line-height: inherit;
    font-size: 0.75em;
    text-align: right;
  }
  .manuscript-card__affiliation-list span {
    overflow-wrap: anywhere;
  }

  /* Citation row: hairline above, label/value pairs in equal-width columns */
  .manuscript-card__meta {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    gap: 12px 24px;
    margin: 12px 0 0;
    padding-top: 16px;
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  }
  .manuscript-card__meta dt {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), 0.55);
  }
  .manuscript-card__meta dd {
    margin: 2px 0 0;
    font-size: 0.9375rem;
    overflow-wrap: anywhere;
  }

  .manuscript-card__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }

  /* xs */
  @media (max-width: 600px) {
    .manuscript-card {
      padding: 20px 16px;
    }
    .manuscript-card__meta {
      grid-auto-flow: row;
    }
    .manuscript-card__actions {
      flex-direction: column;
    }
    .manuscript-card__actions .v-btn {
      width: 100%;
    }
  }
</style>
