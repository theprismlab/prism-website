<template>
  <page>
    <container-sm>
      <page-title>Publications</page-title>
      </container-sm>
      <container-md>
            
      <section>
        <section-overline> Featured</section-overline>
      
      </section>
      <section>
        <section-overline> Explore Publications</section-overline>
        <v-row class="mt-1">
          <v-col v-for="(key, index) in Object.keys(filters)" :key="index">
            <v-autocomplete
              v-model="filters[key].active"
              :items="filters[key].options"
              item-title="text"
              item-value="value"
              :label="`Filter ${key}`"
              multiple
              chips
              clearable
              hide-details
               @update:modelValue="val => onFilterChange(key, val)"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
            <v-alert
              v-for="each in filteredData"
              :key="each.id"
              :icon="typeStyles[each.type].icon"
              :color="typeStyles[each.type].color"
              border="start"
              colored-border
              variant="outlined"
              class="mb-3"
    
            >
            <v-alert-title class="publication-title">
              
              <a :href="each.link" target="_blank" style="color: inherit; text-decoration: none;">
                {{ each.title }} <v-icon right size="x-small" class="pl-1">mdi-open-in-new</v-icon>
              </a>

            </v-alert-title>
            <div class="publication-meta">
             <span v-if="each.author">{{ each.author }}, et al. </span>
            <span v-if="each.publisher">{{ each.publisher || each.conference }}, </span>
            <span>{{ each.date || each.year }}</span>.
            </div>

           

  

          

           
            </v-alert>
            
          </v-col>
        </v-row>
      </section>
      </container-md>
    </page>
  </template>
  
  <script>
  import SvgIcon from '@jamescoyle/vue-icon';
import { mdiBookMultipleOutline } from '@mdi/js';
  import { mdiBookOpenBlankVariantOutline } from '@mdi/js';
import { mdiFileCertificateOutline } from '@mdi/js';
import { mdiFileChartOutline } from '@mdi/js';
import { mdiFileDocumentMultipleOutline } from '@mdi/js';
import { mdiFileMultipleOutline } from '@mdi/js';
import { mdiFilePresentationBox } from '@mdi/js';
import { mdiPresentation } from '@mdi/js';


  import * as d3 from 'd3';
  import CrossfilterManager from '@/utils/crossfilter-helpers.js';
import svgIconVue from '@jamescoyle/vue-icon';
  const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"data/" : "../public/data/";
  const publicationsFile = "Website Content - 2025  - Publications.csv";
  const whitepaperFile = "Website Content - 2025  - White Papers.csv";
  const conferenceAbstractsFile = "Website Content - 2025  - Conference Abstracts.csv";

    export default {
      data() {
        return {
          data: [],
          filters: {
              year: { options: [], active: [] },
              publisher: { options: [], active: [] },
            //   title: { options: [], active: [] },
              author: { options: [], active: [] }
            },
            filteredData: [],
            cfManager: null
        }
      },
       async created() {
        this.data = await this.getData();
      
        const cfManager = new CrossfilterManager(this.data, this.filters);
        const filteredData =cfManager.filteredData;
        this.filteredData = filteredData;
        this.cfManager = cfManager;
      },
      computed: {
        imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/publications/" : "../../public/images/publications/"
        },
        typeStyles() {
          return {
            "publication": { icon: 'mdi-file-document-outline', color: 'indigo-accent-3' }, // blue
            // "white paper": { icon: 'mdi-note-outline', color: 'teal' },
                      "white paper": { icon: 'mdi-book-open-blank-variant-outline', color: 'teal' },
            "conference abstract": { icon: 'mdi-presentation', color: 'purple' }, // deep-purple
            //mdi-file-chart-outline
            // mdi-chart-box-outline
            //mdi-chart-box-multiple-outline
            //mdi-note-multiple-outline
            //mdi-newspaper-variant-outline
            //mdi-note-text-outline
            // mdi-format-quote-open
            //mdi-file-delimited-outline
            //mdi-file-certificate-outline
            //mdi-file-star-outline
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
                    publisher: d.Publication,
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
                    year: d.Date.split(" ")[2],
                    conference: d.Conference
                }
            }),
            d3.csv(`${dataPath}${conferenceAbstractsFile}`, function(d, i){
                return {
                    title: d.Title,
                    type: "conference abstract",
                    id: `conference-abstract-${i}`,
                    year: d.Year,
                    link: d.Link,
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
          this.cfManager.setActive(field, values);
          this.filteredData = this.cfManager.filteredData;

          // Now this.filters[field].options is updated for all fields
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
.v-alert--variant-outlined {
    border: 0.1px solid currentColor;
}

</style>
  