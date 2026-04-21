<template>
  <page id="publication-page">
    <page-title>Publications</page-title>
    <!-- <section class="blue-banner mt-3 mb-3 pa-6">
      <h2 class="text-h2 text-center text-white">
        <span class="mdi mdi-magnify"></span>Explore all publications
      </h2>
    </section> -->
    <section>
      <v-row class="blue-banner mt-3 mb-3 pa-6"> </v-row>
      <v-row>
        <v-col cols="12" md="4" lg="3" class="mx-auto" id="filter-bar">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="searchQuery"
                placeholder="Search titles..."
                prepend-inner-icon="mdi-magnify"
                clearable
                rounded
                variant="outlined"
                class="mb-3"
              />
            </v-col>
          </v-row>
          <span class="v-label v-field-label ml-4" style="margin-top: -1rem; font-size: 12px"
            >Filter type
          </span>
          <div class="type-filter-chips">
            <v-chip
              v-for="option in filters.type.options"
              :key="option.value"
              :color="
                filters.type.active.includes(option.value)
                  ? typeStyles[option.value].bg
                  : 'lightgray'
              "
              :text-color="
                filters.type.active.includes(option.value) ? typeStyles[option.value].fg : '#999'
              "
              :variant="filters.type.active.includes(option.value) ? 'flat' : 'tonal'"
              size="large"
              @click="toggleTypeSelection(option.value)"
              class="type-chip"
            >
              <v-icon left class="mr-2">{{ typeStyles[option.value].icon }}</v-icon>
              <span class="pr-1">{{ option.text.split(' (')[0] }}</span>
            </v-chip>
          </div>

          <v-row class="mt-2">
            <v-col cols="12" v-for="key in Object.keys(filters).filter((k) => k !== 'type')">
              <v-autocomplete
                :key="key"
                v-model="filters[key].active"
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
                @update:modelValue="(val) => onFilterChange(key, val)"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-col>

        <v-col class="filter-results my-12 py-12">
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
                    <a class="publication-link" :href="each.link" target="_blank">
                      Read more
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
    </section>
  </page>
</template>

<script>
  const paperColor = '#3f51b5';
  const whitePaperColor = '#8e24aa';
  const conferenceAbstractColor = '#009688';

  import * as d3 from 'd3';
  import CrossfilterManager from '@/utils/crossfilter-helpers.js';
  import BaseButton from '@/components/BaseButton.vue';
  const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL + 'data/' : '../public/data/';
  const publicationsFile = 'Website Content - 2025  - Publications.csv';
  const whitepaperFile = 'Website Content - 2025  - White Papers.csv';
  const conferenceAbstractsFile = 'Website Content - 2025  - Conference Abstracts.csv';

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
      };
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
    },
    computed: {
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
        return {
          Publication: {
            icon: 'mdi-file-document-outline',
            bg: paperColor,
            fg: '#ffffff',
            border: paperColor,
          },
          'White Paper': {
            icon: 'mdi-book-outline',
            bg: whitePaperColor,
            fg: '#ffffff',
            border: whitePaperColor,
          },
          'Conference Abstract': {
            icon: 'mdi-presentation',
            bg: conferenceAbstractColor,
            fg: '#ffffff',
            border: conferenceAbstractColor,
          },
        };
      },
    },
    methods: {
      async getData() {
        const self = this;
        return Promise.all([
          d3.csv(`${dataPath}${publicationsFile}`, function (d, i) {
            return {
              title: d.Title,
              type: 'Publication',
              id: `publication-${i}`,
              year: d.Year,
              link: d.Link,
              publisher: d.Publisher,
              author: d.Author,
            };
          }),
          d3.csv(`${dataPath}${whitepaperFile}`, function (d, i) {
            return {
              title: d.Title,
              type: 'White Paper',
              id: `white-paper-${i}`,
              link: d.Link,
              portalLink: d['Portal Link'],
              date: d.Date,
              tag: d.Tag,
              year: d.Date.split(' ')[2],
              publisher: 'PRISM',
              author: d.Author,
              // publisher: d.Publisher,
            };
          }),
          d3.csv(`${dataPath}${conferenceAbstractsFile}`, function (d, i) {
            return {
              title: d.Title,
              type: 'Conference Abstract',
              id: `conference-abstract-${i}`,
              year: d.Year,
              link: d.Link,
              publisher: d.Publisher,
              author: 'N/A',
            };
          }),
        ]).then((response) => {
          let publications = response[0];
          let whitepapers = response[1];
          let conferenceAbstracts = response[2];
          let data = publications.concat(whitepapers).concat(conferenceAbstracts);
          data = data.sort((a, b) => +b.year - +a.year);
          return data;
        });
      },
      onFilterChange(field, values) {
        if (field === 'search') {
          this.cfManager.setSearchQuery(values);
        } else {
          this.cfManager.setActive(field, values || []);
        }
        this.updateFilteredData();
      },
      updateFilteredData() {
        // Crossfilter handles all filtering (type, year, publisher, author, search)
        this.filteredData = this.cfManager.filteredData;
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
    --publications-banner-height: 72px;
  }
  .blue-banner {
    background: linear-gradient(45deg, #3f51b5, #8e24aa, #009688);
    position: -webkit-sticky;
    position: sticky;
    top: var(--v-layout-top, 0px);
    z-index: 20;
    min-height: var(--publications-banner-height);
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
  #publication-page {
    position: relative;
  }
  #filter-bar {
    position: -webkit-sticky;
    position: sticky;
    top: calc(var(--v-layout-top, 0px) + var(--publications-banner-height) + 1rem);
    align-self: flex-start;
    height: fit-content;
    z-index: 10;
    background: white;
    padding: 1rem 0;
    padding-left: 1rem;
    padding-right: 1rem;
    border-bottom: 0.2px solid rgba(0, 0, 0, 0.08);
  }
  @media (max-width: 959px) {
    .blue-banner {
      position: static;
      top: auto;
      min-height: auto;
    }
    #filter-bar {
      position: static;
      top: auto;
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
</style>
