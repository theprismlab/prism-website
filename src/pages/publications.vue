<template>
  <page id="publication-page">
    <container-md>
      <page-title>Publications</page-title>
    </container-md>

    <container-md>
      <v-row justify="center" class="mb-12">
        <v-col v-for="card in featuredCards" :key="card.id" cols="12" md="4">
          <v-card class="featured-card h-100" variant="flat">
            <div class="featured-card__content">
              <div class="featured-card__body">
                <div class="featured-card__header">
                  <div
                    class="featured-card__icon"
                    :style="{ backgroundColor: typeStyles[card.type].bg }"
                  >
                    <v-icon size="20" :color="typeStyles[card.type].fg">
                      {{ typeStyles[card.type].icon }}
                    </v-icon>
                  </div>
                  <p class="featured-card__type" :style="{ color: typeStyles[card.type].bg }">
                    {{ card.type }}
                  </p>
                </div>
                <h3 class="featured-card__title">{{ card.title }}</h3>
                <div class="featured-card__meta">
                  <span v-if="card.author">{{ card.author }}, et al. </span>
                  <span v-if="card.publisher"
                    ><i>{{ card.publisher }}</i
                    >,
                  </span>
                  <span>{{ card.date || card.year }}</span
                  >.
                </div>

                <div class="featured-card__links">
                  <a
                    v-if="getPrimaryLink(card)"
                    class="featured-card-link"
                    :href="getPrimaryLink(card)"
                    target="_blank"
                  >
                    {{ getReadLabel(card) }}
                    <v-icon right size="x-small" class="featured-card-link-icon"
                      >mdi-arrow-right</v-icon
                    >
                  </a>

                  <a
                    v-if="card.portalLink"
                    class="featured-card-link"
                    :href="card.portalLink"
                    target="_blank"
                  >
                    <v-icon left size="small">mdi-chart-box-outline</v-icon>
                    Explore data
                    <v-icon right size="x-small" class="featured-card-link-icon"
                      >mdi-arrow-right</v-icon
                    >
                  </a>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </container-md>
    <section>
      <div class="explorer-toolbar-track">
        <v-toolbar class="explorer-toolbar" flat>
          <v-toolbar-title class="toolbar-title text-white">Explore publications</v-toolbar-title>
          <v-spacer />

          <v-text-field
            v-model="searchQuery"
            placeholder="Search titles..."
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            density="compact"
            variant="solo-filled"
            flat
            class="toolbar-search"
          />

          <v-badge
            :model-value="activeFilterCount > 0"
            :content="activeFilterCount"
            color="error"
            offset-x="5"
            offset-y="5"
            class="ml-2"
          >
            <v-btn
              icon="mdi-filter-variant"
              variant="text"
              color="white"
              @click="openFilterPanel"
              aria-label="Show filters"
            />
          </v-badge>
        </v-toolbar>
      </div>

      <v-navigation-drawer
        v-model="filterPanelOpen"
        location="left"
        temporary
        width="360"
        class="mobile-filter-drawer"
      >
        <div class="filter-panel pa-4">
          <div class="d-flex align-center justify-space-between mb-4">
            <span class="text-subtitle-1 font-weight-semibold">Filters</span>
            <v-btn
              icon="mdi-close"
              variant="text"
              @click="filterPanelOpen = false"
              aria-label="Hide filters"
            />
          </div>

          <span class="v-label ml-1" style="font-size: 12px">Type</span>
          <div class="type-filter-chips">
            <v-chip
              v-for="option in filters.type.options"
              :key="`draft-${option.value}`"
              :color="
                draftFilters.type.includes(option.value) ? typeStyles[option.value].bg : 'lightgray'
              "
              :text-color="
                draftFilters.type.includes(option.value) ? typeStyles[option.value].fg : '#999'
              "
              :variant="draftFilters.type.includes(option.value) ? 'flat' : 'tonal'"
              size="large"
              @click="toggleDraftTypeSelection(option.value)"
              class="type-chip"
            >
              <v-icon left class="mr-2">{{ typeStyles[option.value].icon }}</v-icon>
              <span class="pr-1">{{ option.text.split(' (')[0] }}</span>
            </v-chip>
          </div>

          <v-row class="mt-2">
            <v-col cols="12" v-for="key in Object.keys(filters).filter((k) => k !== 'type')">
              <v-autocomplete
                :key="`draft-${key}`"
                v-model="draftFilters[key]"
                :items="filters[key].options"
                item-title="text"
                item-value="value"
                :label="`Filter ${key}`"
                multiple
                chips
                clearable
                closable-chips
                hide-details
                chip-size="large"
                @update:modelValue="(val) => onDraftFilterChange(key, val)"
              >
              </v-autocomplete>
            </v-col>
          </v-row>

          <div class="filter-panel__actions mt-8">
            <v-btn variant="text" @click="resetDraftFilters">Reset</v-btn>
            <v-spacer />
            <v-btn variant="text" rounded color="primary-base" @click="applyDraftFilters"
              >Apply filters</v-btn
            >
          </div>
        </div>
      </v-navigation-drawer>
      <container-md>
        <v-row class="publications-layout-row px-2" align="start">
          <v-col ref="filterResults" class="filter-results" cols="12">
            <div class="results-header mb-4">
              <span class="text-body-2 text-medium-emphasis"
                >Showing {{ filteredData.length }} results</span
              >
              <div class="active-filters mt-2" v-if="appliedFilterChips.length > 0">
                <v-chip
                  v-for="chip in appliedFilterChips"
                  :key="`${chip.key}-${chip.value}`"
                  size="small"
                  closable
                  @click:close="removeAppliedFilter(chip)"
                >
                  {{ chip.label }}
                </v-chip>
              </div>
            </div>

            <div v-if="noResultsMessage" class="mt-5">
              <v-alert variant="outlined" color="info" class="text-center">
                {{ noResultsMessage }}
              </v-alert>
            </div>
            <div v-else>
              <v-card
                v-for="each in filteredData"
                :key="each.id"
                class="publication-card mb-3"
                variant="flat"
              >
                <div class="publication-card__content">
                  <div
                    class="publication-card__icon"
                    :style="{ backgroundColor: typeStyles[each.type].bg }"
                  >
                    <v-icon size="28" :color="typeStyles[each.type].fg">
                      {{ typeStyles[each.type].icon }}
                    </v-icon>
                  </div>
                  <div class="publication-card__details">
                    <span class="publication-card__title">{{ each.title }}</span>
                    <div class="publication-meta">
                      <span v-if="each.author">{{ each.author }}, et al. </span>
                      <span v-if="each.publisher"
                        ><i>{{ each.publisher || each.conference }}</i
                        >,
                      </span>
                      <span>{{ each.date || each.year }}</span
                      >.
                    </div>
                    <div class="publication-links">
                      <a
                        v-if="getPrimaryLink(each)"
                        class="publication-link"
                        :href="getPrimaryLink(each)"
                        target="_blank"
                      >
                        {{ getReadLabel(each) }}
                        <v-icon right size="x-small" class="publication-card__external-icon"
                          >mdi-arrow-right</v-icon
                        >
                      </a>
                      <a
                        class="publication-link"
                        v-if="each.portalLink"
                        :href="each.portalLink"
                        target="_blank"
                      >
                        <v-icon left>mdi-chart-box-outline</v-icon> Explore data
                        <v-icon right size="x-small" class="publication-card__external-icon"
                          >mdi-arrow-right</v-icon
                        >
                      </a>
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </container-md>

      <v-btn
        v-show="showScrollToResultsBtn"
        class="scroll-to-results-btn"
        color="primary"
        size="large"
        icon="mdi-arrow-up"
        elevation="8"
        @click="scrollToResultsTop"
        aria-label="Scroll to top of results"
      />
    </section>
  </page>
</template>

<script>
  import * as d3 from 'd3';
  import CrossfilterManager from '@/utils/crossfilter-helpers.js';
  import BaseButton from '@/components/BaseButton.vue';
  const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL + 'data/' : '../public/data/';
  const whitepaperDateFormatter = new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  function parseDateValue(dateValue) {
    if (!dateValue) return null;

    const raw = String(dateValue).trim();
    const direct = new Date(raw);
    if (!Number.isNaN(direct.getTime())) return direct;

    const mdyMatch = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
    if (!mdyMatch) return null;

    const month = Number(mdyMatch[1]) - 1;
    const day = Number(mdyMatch[2]);
    const yearPart = Number(mdyMatch[3]);
    const year = yearPart < 100 ? 2000 + yearPart : yearPart;
    const parsed = new Date(year, month, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function formatWhitepaperDate(dateValue) {
    const parsed = parseDateValue(dateValue);
    return parsed ? whitepaperDateFormatter.format(parsed) : dateValue;
  }

  function getYearFromDate(dateValue) {
    const parsed = parseDateValue(dateValue);
    return parsed ? String(parsed.getFullYear()) : '';
  }

  // Single source of truth for per-type customization.
  // To add a new type: add a new entry here. No other code changes required.
  const TYPE_CONFIG = {
    Publication: {
      icon: 'mdi-file-document-outline',
      color: '#3f51b5',
      file: 'Website Content - 2025  - Publications.csv',
      idPrefix: 'publication',
      readLabel: 'Read Publication',
      parseRow: (d) => ({
        year: d.Year,
        link: d.Link,
        publisher: d.Publisher,
        author: d.Author,
      }),
    },
    'White Paper': {
      icon: 'mdi-book-outline',
      color: '#8e24aa',
      file: 'Website Content - 2025  - White Papers.csv',
      idPrefix: 'white-paper',
      readLabel: 'Read White Paper',
      parseRow: (d) => ({
        link: d['Paper Link'],
        portalLink: d['Portal Link'],
        date: formatWhitepaperDate(d.Date),
        tag: d.Tag,
        year: getYearFromDate(d.Date),
        publisher: 'PRISM White Papers',
        author: d.Author,
      }),
    },
    'Conference Abstract': {
      icon: 'mdi-presentation',
      color: '#009688',
      file: 'Website Content - 2025  - Conference Abstracts.csv',
      idPrefix: 'conference-abstract',
      readLabel: 'Read Conference Abstract',
      parseRow: (d) => ({
        year: d.Year,
        link: d.Link,
        publisher: d.Conference,
        author: null,
      }),
    },
    'Conference Poster': {
      icon: 'mdi-image-text',
      color: '#ff7043',
      file: 'Website Content - 2025  - Posters.csv',
      idPrefix: 'conference-poster',
      readLabel: 'View Conference Poster',
      parseRow: (d) => ({
        year: d.Year,
        link: d.Link,
        publisher: d.Conference,
        author: d.Author,
      }),
    },
  };

  export default {
    components: {
      BaseButton,
    },
    data() {
      return {
        data: [],
        searchQuery: '',
        filters: {
          type: { options: [], active: [] },
          year: { options: [], active: [] },
          publisher: { options: [], active: [] },
          author: { options: [], active: [] },
        },
        filteredData: [],
        cfManager: null,
        showScrollToResultsBtn: false,
        filterPanelOpen: false,
        draftFilters: {
          type: [],
          year: [],
          publisher: [],
          author: [],
        },
      };
    },
    computed: {
      featuredCards() {
        console.log('All data:', this.data);
        return this.data.filter((d) => d.featured == 1);
      },
      activeFilterCount() {
        const nonTypeCount = ['year', 'publisher', 'author'].reduce(
          (acc, key) => acc + this.filters[key].active.length,
          0,
        );
        const typeCount = this.isAllTypesSelected ? 0 : this.filters.type.active.length;
        return nonTypeCount + typeCount;
      },
      isAllTypesSelected() {
        return this.filters.type.active.length === this.filters.type.options.length;
      },
      appliedFilterChips() {
        const chips = [];
        if (!this.isAllTypesSelected && this.filters.type.active.length > 0) {
          chips.push({
            key: 'type',
            value: this.filters.type.active[0],
            label: `Type: ${this.filters.type.active[0]}`,
          });
        }

        ['year', 'publisher', 'author'].forEach((key) => {
          this.filters[key].active.forEach((value) => {
            chips.push({
              key,
              value,
              label: `${key}: ${value}`,
            });
          });
        });

        return chips;
      },
      noResultsMessage() {
        if (this.data.length === 0) {
          return 'Loading publications...';
        } else if (this.filteredData.length === 0) {
          return 'No publications match the selected filters.';
        } else {
          return '';
        }
      },
      imgPath() {
        return import.meta.env.PROD
          ? import.meta.env.BASE_URL + 'images/publications/'
          : '../../public/images/publications/';
      },
      typeStyles() {
        return Object.fromEntries(
          Object.entries(TYPE_CONFIG).map(([type, cfg]) => [
            type,
            { icon: cfg.icon, bg: cfg.color, fg: '#ffffff', border: cfg.color },
          ]),
        );
      },
    },
    mounted() {
      this.updateScrollToResultsButtonVisibility();
      window.addEventListener('scroll', this.updateScrollToResultsButtonVisibility, {
        passive: true,
      });
      window.addEventListener('resize', this.updateScrollToResultsButtonVisibility);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.updateScrollToResultsButtonVisibility);
      window.removeEventListener('resize', this.updateScrollToResultsButtonVisibility);
    },
    async created() {
      this.data = await this.getData();

      const cfManager = new CrossfilterManager(this.data, this.filters);
      this.cfManager = cfManager;

      // // Default to a single type selected
      // const firstType = this.filters.type.options[0]?.value;
      // const defaultTypeSelection = firstType ? [firstType] : [];
      // Default to all types selected
      const defaultTypeSelection = this.filters.type.options.map((option) => option.value); // Default to all types selected
      this.filters.type.active = defaultTypeSelection;
      this.cfManager.setActive('type', defaultTypeSelection);

      // Enhance type options with icon and color (after setActive rebuilds options)
      this.filters.type.options = this.filters.type.options.map((option) => {
        const style = this.typeStyles[option.value];
        return {
          ...option,
          icon: style ? style.icon : '',
          color: style ? style.bg : '',
        };
      });

      this.updateFilteredData();
      this.syncDraftFromApplied();
      this.$nextTick(() => this.updateScrollToResultsButtonVisibility());
    },
    methods: {
      getLayoutTopOffset() {
        return (
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--v-toolbar-height'),
          ) || 0
        );
      },
      openFilterPanel() {
        this.syncDraftFromApplied();
        this.filterPanelOpen = true;
      },
      syncDraftFromApplied() {
        this.draftFilters = {
          type: [...this.filters.type.active],
          year: [...this.filters.year.active],
          publisher: [...this.filters.publisher.active],
          author: [...this.filters.author.active],
        };
      },
      resetDraftFilters() {
        this.draftFilters = {
          type: [...this.filters.type.options.map((option) => option.value)],
          year: [],
          publisher: [],
          author: [],
        };

        this.applyDraftFilters({ closePanel: true, scrollToTop: true });
      },
      applyDraftFilters({ closePanel = true, scrollToTop = true } = {}) {
        const activeObj = {
          type: [...this.draftFilters.type],
          year: [...this.draftFilters.year],
          publisher: [...this.draftFilters.publisher],
          author: [...this.draftFilters.author],
        };

        this.cfManager.setAllActive(activeObj);
        this.updateFilteredData();
        if (closePanel) {
          this.filterPanelOpen = false;
        }
        if (scrollToTop) {
          this.scrollToResultsTop();
        }
      },
      async getData() {
        const loaders = Object.entries(TYPE_CONFIG).map(([type, cfg]) =>
          d3.csv(`${dataPath}${cfg.file}`, (d, i) => ({
            title: d.Title,
            type,
            id: `${cfg.idPrefix}-${i}`,
            featured: d.Featured,
            ...cfg.parseRow(d),
          })),
        );
        const groups = await Promise.all(loaders);
        return groups.flat().sort((a, b) => +b.year - +a.year);
      },
      onFilterChange(field, values) {
        if (field === 'search') {
          this.cfManager.setSearchQuery(values);
        } else {
          this.cfManager.setActive(field, values || []);
        }
        this.updateFilteredData();
      },
      getPrimaryLink(item) {
        return item?.link || '';
      },
      getReadLabel(item) {
        return TYPE_CONFIG[item?.type]?.readLabel || 'Read more';
      },
      updateFilteredData() {
        // Crossfilter handles all filtering (type, year, publisher, author, search)
        this.filteredData = this.cfManager.filteredData;
      },
      toggleDraftTypeSelection(typeValue) {
        const allTypes = this.filters.type.options.map((option) => option.value);
        const activeTypes = this.draftFilters.type;
        const isAllSelected = activeTypes.length === allTypes.length;
        const isSelected = activeTypes.includes(typeValue);

        if (isAllSelected) {
          this.draftFilters.type = [typeValue];
          this.applyDraftFilters({ closePanel: false, scrollToTop: false });
          return;
        }

        if (isSelected) {
          this.draftFilters.type = allTypes;
          this.applyDraftFilters({ closePanel: false, scrollToTop: false });
          return;
        }

        this.draftFilters.type = [typeValue];
        this.applyDraftFilters({ closePanel: false, scrollToTop: false });
      },
      onDraftFilterChange(field, values) {
        this.draftFilters[field] = values || [];
        this.applyDraftFilters({ closePanel: false, scrollToTop: false });
      },
      toggleTypeSelection(typeValue) {
        const allTypes = this.filters.type.options.map((option) => option.value);
        const activeTypes = this.filters.type.active;
        const isAllSelected = activeTypes.length === allTypes.length;
        const isSelected = activeTypes.includes(typeValue);

        if (isAllSelected) {
          const next = [typeValue];
          this.filters.type.active = next;
          this.onFilterChange('type', next);
          return;
        }

        if (isSelected) {
          this.filters.type.active = allTypes;
          this.onFilterChange('type', allTypes);
          return;
        }

        const next = [typeValue];
        this.filters.type.active = next;
        this.onFilterChange('type', next);
      },
      removeAppliedFilter(chip) {
        if (chip.key === 'type') {
          const allTypes = this.filters.type.options.map((option) => option.value);
          this.filters.type.active = allTypes;
          this.cfManager.setActive('type', allTypes);
          this.updateFilteredData();
          this.syncDraftFromApplied();
          return;
        }

        const active = this.filters[chip.key].active.filter((value) => value !== chip.value);
        this.filters[chip.key].active = active;
        this.cfManager.setActive(chip.key, active);
        this.updateFilteredData();
        this.syncDraftFromApplied();
      },
      getResultsTopScrollPosition() {
        const target = this.$refs.filterResults?.$el || this.$refs.filterResults;
        if (!target) return 0;

        const layoutTop = this.getLayoutTopOffset();
        const pageStyles = getComputedStyle(document.getElementById('publication-page'));
        const toolbarHeight =
          parseFloat(pageStyles.getPropertyValue('--publications-banner-height')) || 0;
        const extraSpacing = 8;

        return (
          target.getBoundingClientRect().top +
          window.scrollY -
          layoutTop -
          toolbarHeight -
          extraSpacing
        );
      },
      updateScrollToResultsButtonVisibility() {
        const targetTop = this.getResultsTopScrollPosition();
        this.showScrollToResultsBtn = window.scrollY > targetTop + 4;
      },
      scrollToResultsTop() {
        const top = this.getResultsTopScrollPosition();
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
      },
    },
    watch: {
      searchQuery(newVal) {
        this.cfManager.setSearchQuery(newVal);
        this.updateFilteredData();
      },
    },
  };
</script>

<style scoped>
  #publication-page {
    position: relative;
    --publications-layout-top: var(--v-toolbar-height, 0px);
    --publications-banner-height: 70px;
    --publications-layout-padding-top: 1.5rem;
    --publications-layout-padding-bottom: 3rem;
  }
  .explorer-toolbar-track {
    position: -webkit-sticky;
    position: sticky;
    top: var(--publications-layout-top);
    z-index: 20;
    margin: 1rem 0;
  }
  .explorer-toolbar {
    background: linear-gradient(45deg, #3f51b5, #8e24aa, #009688);
    min-height: var(--publications-banner-height);
    border-radius: 0;
  }
  :deep(.explorer-toolbar .v-toolbar__content) {
    min-height: var(--publications-banner-height) !important;
    padding-inline: 0.75rem;
  }
  .toolbar-title {
    font-size: 1.125rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .toolbar-search {
    max-width: 420px;
    min-width: 180px;
  }
  .featured-card {
    border: 1px solid rgba(63, 81, 181, 0.14);
    border-radius: 14px;
    box-shadow: 0 8px 22px rgba(20, 30, 60, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(249, 251, 255, 0.96));
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;
  }
  .featured-card:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(20, 30, 60, 0.14);
  }
  .featured-card__content {
    display: block;
    padding: 1rem;
  }
  .featured-card__header {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin-bottom: 0.55rem;
  }
  .featured-card__icon {
    min-width: 36px;
    min-height: 36px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  }
  .featured-card__body {
    flex: 1;
    min-width: 0;
  }
  .featured-card__type {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.075em;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
    line-height: 1;
  }
  .featured-card__title {
    margin: 0;
    font-size: 1.02rem;
    line-height: 1.35;
    color: rgb(20, 24, 34);
    font-weight: 700;
  }
  .featured-card__meta {
    margin-top: 0.4rem;
    font-size: 0.84rem;
    color: rgb(99, 107, 123);
  }
  .featured-card__links {
    margin-top: 0.7rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .featured-card-link {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    font-size: 0.84rem;
    font-weight: 600;
    color: #3f51b5;
    text-decoration: none;
  }
  .featured-card-link:hover {
    opacity: 0.85;
  }
  .filter-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgb(135, 135, 135);
    margin-bottom: 2.5rem !important;
  }
  .type-filter-chips {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    align-items: center;
  }
  .type-chip {
    cursor: pointer;
  }
  .publication-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
    color: rgb(23, 23, 23) !important;
  }
  .publication-meta {
    font-size: 0.875rem;
    color: rgb(135, 135, 135);
    margin-top: 4px;
  }
  .publication-card {
    padding: 1rem;
    border-radius: 12px;
    border: 0.2px solid rgba(0, 0, 0, 0.16);
  }
  .publication-card__content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .publication-card__icon {
    min-width: 56px;
    min-height: 56px;
    display: grid;
    place-items: center;
    border-radius: 16px;
  }
  .publication-card__details {
    flex: 1;
  }
  .publication-card__title {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: rgb(23, 23, 23);
    text-decoration: none;
  }
  .publication-card__title:hover {
    opacity: 0.88;
  }
  .publication-card__external-icon {
    margin-left: 0.25rem;
  }
  .v-alert--variant-outlined {
    border: 0.1px solid currentColor;
  }
  .publications-layout-row {
    padding-top: var(--publications-layout-padding-top);
    padding-bottom: var(--publications-layout-padding-bottom);
  }
  .results-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .active-filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .filter-panel {
    display: flex;
    flex-direction: column;
  }
  .filter-panel__actions {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
  @media (max-width: 959px) {
    #publication-page {
      --publications-banner-height: 64px;
      --publications-layout-padding-top: 1rem;
      --publications-layout-padding-bottom: 1.25rem;
    }
    .explorer-toolbar-track {
      margin: 0;
    }
    .toolbar-title {
      font-size: 1rem;
    }
    .toolbar-search {
      max-width: 44vw;
      min-width: 120px;
    }
    .scroll-to-results-btn {
      right: 1rem;
      bottom: 1rem;
    }
  }
  .publication-links {
    margin-top: 0.75rem;
    display: flex;
    gap: 2.5rem;
  }
  .publication-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--v-primary-base);
    text-decoration: none;
  }
  .scroll-to-results-btn {
    position: fixed;
    right: 1.25rem;
    bottom: 1.25rem;
    z-index: 40;
  }
</style>
