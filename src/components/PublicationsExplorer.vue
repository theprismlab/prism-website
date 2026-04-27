<template>
  <section class="publications-explorer">
    <div class="explorer-sticky-header">
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
              variant="text"
              color="white"
              prepend-icon="mdi-filter-variant"
              @click="openFilterPanel"
              aria-label="Show filters"
            >
              Filters
            </v-btn>
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
                :menu-props="{ contentClass: 'pubs-autocomplete-menu' }"
                @update:modelValue="(val) => onDraftFilterChange(key, val)"
              >
                <template #append-item>
                  <div class="autocomplete-footer">
                    <v-divider />
                    <div class="px-4 py-2 text-right">
                      <v-btn
                        variant="text"
                        color="primary-base"
                        elevation="0"
                        @click="closeAutocompleteMenu"
                      >
                        Done
                      </v-btn>
                    </div>
                  </div>
                </template>
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
    </div>

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
            <publication-card
              v-for="each in filteredData"
              :key="each.id"
              :item="each"
              :type-style="typeStyles[each.type]"
              :links="getLinks(each)"
            />
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
</template>

<script>
  import CrossfilterManager from '@/utils/crossfilter-helpers.js';
  import PublicationCard from '@/components/PublicationCard.vue';

  export default {
    name: 'PublicationsExplorer',
    components: { PublicationCard },
    props: {
      items: { type: Array, required: true },
      typeStyles: { type: Object, required: true },
      getLinks: { type: Function, required: true },
      bannerHeight: { type: Number, default: 70 },
    },
    data() {
      return {
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
            chips.push({ key, value, label: `${key}: ${value}` });
          });
        });

        return chips;
      },
      noResultsMessage() {
        if (!this.items || this.items.length === 0) {
          return 'Loading publications...';
        } else if (this.filteredData.length === 0) {
          return 'No publications match the selected filters.';
        }
        return '';
      },
    },
    watch: {
      items: {
        immediate: true,
        handler(newItems) {
          if (!newItems || newItems.length === 0) return;
          this.initCrossfilter();
        },
      },
      searchQuery(newVal) {
        if (!this.cfManager) return;
        this.cfManager.setSearchQuery(newVal);
        this.updateFilteredData();
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
    methods: {
      initCrossfilter() {
        this.cfManager = new CrossfilterManager(this.items, this.filters);

        const defaultTypeSelection = this.filters.type.options.map((option) => option.value);
        this.filters.type.active = defaultTypeSelection;
        this.cfManager.setActive('type', defaultTypeSelection);

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
        if (closePanel) this.filterPanelOpen = false;
        if (scrollToTop) this.scrollToResultsTop();
      },
      updateFilteredData() {
        this.filteredData = this.cfManager.filteredData;
      },
      toggleDraftTypeSelection(typeValue) {
        const allTypes = this.filters.type.options.map((option) => option.value);
        const activeTypes = this.draftFilters.type;
        const isAllSelected = activeTypes.length === allTypes.length;
        const isSelected = activeTypes.includes(typeValue);

        if (isAllSelected) {
          this.draftFilters.type = [typeValue];
        } else if (isSelected) {
          this.draftFilters.type = allTypes;
        } else {
          this.draftFilters.type = [typeValue];
        }
        this.applyDraftFilters({ closePanel: false, scrollToTop: false });
      },
      onDraftFilterChange(field, values) {
        this.draftFilters[field] = values || [];
        this.applyDraftFilters({ closePanel: false, scrollToTop: false });
      },
      closeAutocompleteMenu() {
        // Blurring the active element collapses the autocomplete's overlay menu.
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur();
        }
      },
      removeAppliedFilter(chip) {
        if (chip.key === 'type') {
          const allTypes = this.filters.type.options.map((option) => option.value);
          this.filters.type.active = allTypes;
          this.cfManager.setActive('type', allTypes);
        } else {
          const active = this.filters[chip.key].active.filter((value) => value !== chip.value);
          this.filters[chip.key].active = active;
          this.cfManager.setActive(chip.key, active);
        }
        this.updateFilteredData();
        this.syncDraftFromApplied();
      },
      getResultsTopScrollPosition() {
        const target = this.$refs.filterResults?.$el || this.$refs.filterResults;
        if (!target) return 0;

        const layoutTop = this.getLayoutTopOffset();
        const extraSpacing = 8;

        return (
          target.getBoundingClientRect().top +
          window.scrollY -
          layoutTop -
          this.bannerHeight -
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
  };
</script>

<style scoped>
  .publications-explorer {
    position: relative;
    --publications-layout-top: var(--v-toolbar-height, 0px);
    --publications-banner-height: 70px;
    --publications-layout-padding-top: 1.5rem;
    --publications-layout-padding-bottom: 3rem;
  }
  .explorer-sticky-header {
    /* Single sticky parent for both toolbar and drawer.
       The drawer is absolutely positioned inside, so it won't push
       sibling content (the publication list) downward. */
    position: -webkit-sticky;
    position: sticky;
    top: var(--publications-layout-top);
    z-index: 20;
    margin: 1rem 0;
  }
  .explorer-toolbar-track {
    /* now just a presentational wrapper around the toolbar */
    position: relative;
  }
  .explorer-toolbar {
    background: linear-gradient(45deg, #3f51b5, #8e24aa, #009688);
    min-height: var(--publications-banner-height);
    border-radius: 0;
  }
  .mobile-filter-drawer {
    /* Absolute inside the sticky header so it overlays the page below
       without contributing to layout height. Aligned with the top of
       the toolbar-track (top: 0 of the sticky header). */
    position: absolute !important;
    top: 0 !important;
    height: calc(100vh - var(--publications-layout-top)) !important;
  }
  :deep(.explorer-toolbar .v-toolbar__content) {
    min-height: var(--publications-banner-height) !important;
    padding-inline: 0.75rem;
  }
  .toolbar-title {
    font-size: 1.125rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
    flex: 0 0 auto;
  }
  :deep(.toolbar-title .v-toolbar-title__placeholder) {
    overflow: visible;
    text-overflow: clip;
  }
  .toolbar-search {
    max-width: 420px;
    min-width: 180px;
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
  }
  /* Remove v-list's default 8px top/bottom padding so the sticky footer
     sits flush against the scroll container's bottom edge. */
  :deep(.v-overlay__content .v-list) {
    padding-block: 0;
  }
  .autocomplete-footer {
    position: sticky;
    bottom: 0;
    background: rgb(var(--v-theme-surface, 255, 255, 255));
    z-index: 1;
  }
</style>

<style>
  /* Vuetify teleports the autocomplete overlay outside this component, so
     scoped :deep() can't reach it. Target the menu via its contentClass. */
  .pubs-autocomplete-menu .v-list {
    padding-block: 0 !important;
  }
  @media (max-width: 959px) {
    .publications-explorer {
      --publications-banner-height: 64px;
      --publications-layout-padding-top: 1rem;
      --publications-layout-padding-bottom: 1.25rem;
    }
    .explorer-sticky-header {
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
  .scroll-to-results-btn {
    position: fixed;
    right: 1.25rem;
    bottom: 1.25rem;
    z-index: 40;
  }
</style>
