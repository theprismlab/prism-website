<template>
  <page id="publication-page">
      <container-md>

      <page-title>Publications</page-title>            
      <section>
        <section-overline> Featured</section-overline>
      
      </section>
      <section>
        <section-overline> Explore Publications</section-overline>
        <v-row class="mt-1" id="filter-bar">
          <v-col v-for="(key, index) in Object.keys(filters)" :key="index">
      
            <v-autocomplete v-if="key === 'type'"
            v-model="filters.type.active"
            :items="filters.type.options"
            item-title="text"
            item-value="value"
            :label="`Filter Type`"
            multiple
          
            clearable
            hide-details
             @update:modelValue="val => onFilterChange('type', val)"
          >
            <template v-slot:selection="{ item }">
              <v-chip
                :color="typeStyles[item.value].bg"
                :text-color="typeStyles[item.value].fg"
                variant="tonal"
                size="small"
                closable
                @click:close="removeSelection('type', item.value)"
              >
                <v-icon left size="small">{{ typeStyles[item.value].icon }}</v-icon>
                {{ item.title }}
              </v-chip>
            </template>
          </v-autocomplete>

            <v-autocomplete v-else
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
               @update:modelValue="val => onFilterChange(key, val)"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
            <div v-for="each in filteredData"
              :key="each.id">
    
            <!-- <v-card
              class="publication-card mb-3"
              variant="outlined"
              :style="{ border: `0.5px solid ${typeStyles[each.type].border}` }"
            > -->
            <v-card
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
                  <span  class="publication-card__title">{{  each.title }}</span>
                  <div class="publication-meta">
                    <span v-if="each.author">{{ each.author }}, et al. </span>
                    <span v-if="each.publisher"><i>{{ each.publisher || each.conference }}</i>, </span>
                    <span>{{ each.date || each.year }}</span>.
                  </div>
                  <!-- <v-chip v-if="each.tag" variant="outlined" size="x-small" color="grey">{{ each.tag }}</v-chip> -->
                   <div class="publication-links">
                    <a class="publication-link" :href="each.link" target="_blank">
                    Read more <v-icon right size="x-small" class="publication-card__external-icon">mdi-arrow-right</v-icon>
                    </a>
                    <a class="publication-link" v-if="each.portalLink" :href="each.portalLink" target="_blank">
                     <v-icon left>mdi-chart-box-outline</v-icon> Explore data <v-icon right size="x-small" class="publication-card__external-icon">mdi-arrow-right</v-icon>
                    </a>

                   </div>
                </div>
              </div>
  
            </v-card>
           <!-- <v-divider></v-divider> -->
            </div>
          </v-col>
        </v-row>
      </section>
      </container-md>
    </page>
  </template>
  
  <script>


const paperColor = "#3f51b5";
const whitePaperColor = "#8e24aa";
const conferenceAbstractColor = "#009688";


  import * as d3 from 'd3';
  import CrossfilterManager from '@/utils/crossfilter-helpers.js';
  import BaseButton from '@/components/BaseButton.vue';
  const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"data/" : "../public/data/";
  const publicationsFile = "Website Content - 2025  - Publications.csv";
  const whitepaperFile = "Website Content - 2025  - White Papers.csv";
  const conferenceAbstractsFile = "Website Content - 2025  - Conference Abstracts.csv";

    export default {
      components: {
        BaseButton
      },
      data() {
        return {
          data: [],
          filters: {
            type: { options: [], active: [] },
              year: { options: [], active: [] },
              publisher: { options: [], active: [] },
              author: { options: [], active: [] }
            },
            filteredData: [],
            cfManager: null
        }
      },
       async created() {
        this.data = await this.getData();
      
        const cfManager = new CrossfilterManager(this.data, this.filters);
        console.log("Filters after initialization:", cfManager);
        const filteredData =cfManager.filteredData;
        this.filteredData = filteredData;
        this.cfManager = cfManager;

        // Enhance type options with icon and color
        this.filters.type.options = this.filters.type.options.map(option => {
          const style = this.typeStyles[option.value];
          return {
            ...option,
            icon: style ? style.icon : '',
            color: style ? style.bg : ''
          };
        });

        // When no type is selected, default to all types
        if (!this.filters.type.active.length) {
          const allTypes = this.filters.type.options.map(option => option.value);
          this.filters.type.active = allTypes;
          this.cfManager.setActive('type', allTypes);
          this.filteredData = this.cfManager.filteredData;
        }
      },
      computed: {
        imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/publications/" : "../../public/images/publications/"
        },
        typeStyles() {
          return {
            "publication": { icon: 'mdi-file-document-outline', bg: paperColor, fg: '#ffffff', border: paperColor },
            "white paper": { icon: 'mdi-book-outline', bg: whitePaperColor, fg: '#ffffff', border: whitePaperColor },
            "conference abstract": { icon: 'mdi-presentation', bg: conferenceAbstractColor, fg: '#ffffff', border: conferenceAbstractColor },
          }
        },
      },
      methods: {
         async getData(){
          const self = this;
          return Promise.all(
            [
            d3.csv(`${dataPath}${publicationsFile}`, function(d, i){
                return {
                    title: d.Title,
                    type: "publication",
                    id: `publication-${i}`,
                    year: d.Year,
                    link: d.Link,
                    publisher: d.Publisher,
                    author: d.Author
                }
            }),
            d3.csv(`${dataPath}${whitepaperFile}`, function(d, i){
                return {
                    title: d.Title,
                    type: "white paper",
                    id: `white-paper-${i}`,
                    link: d.Link,
                    portalLink: d["Portal Link"],
                    date: d.Date,
                    tag: d.Tag,
                    year: d.Date.split(" ")[2],
                    publisher: "PRISM",
                    author: d.Author
                    // publisher: d.Publisher,
                }
            }),
            d3.csv(`${dataPath}${conferenceAbstractsFile}`, function(d, i){
                return {
                    title: d.Title,
                    type: "conference abstract",
                    id: `conference-abstract-${i}`,
                    year: d.Year,
                    link: d.Link,
                    publisher: d.Publisher,
                    author: "N/A",
                }
            })
          ]
        ).then(response=>{
            let publications = response[0];
            let whitepapers = response[1];
            let conferenceAbstracts = response[2];
            let data = publications.concat(whitepapers).concat(conferenceAbstracts);
            data = data.sort((a, b) => +b.year - +a.year);
            return data;
          });
        },
        onFilterChange(field, values) {
          if (field === 'type' && (!values || !values.length)) {
            values = this.filters.type.options.map(option => option.value);
            this.filters.type.active = values;
          }

          this.cfManager.setActive(field, values);
          this.filteredData = this.cfManager.filteredData;
        },
        removeSelection(field, value) {
          const active = this.filters[field].active.filter(v => v !== value);
          this.onFilterChange(field, active);
        }
      },
      watch: {

      }
    }
  </script>

  <style scoped>
.publication-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: rgb(23, 23, 23) !important;
}
.publication-meta {
  font-size: 0.875rem;
  color: rgb(97, 97, 97);
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
  position: sticky;
      top: var(--v-toolbar-height);
  z-index: 10;
  background: white;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.publication-links{
  margin-top: 0.75rem;
  display: flex;
  gap: 2.5rem;
}
.publication-link{
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--v-primary-base);
  text-decoration: none;
}
</style>
  