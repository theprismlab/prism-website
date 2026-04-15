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
              variant="tonal"
              class="mb-3"
            >
                {{  each.title }}
              <v-divider></v-divider>
            </v-alert>
            
          </v-col>
        </v-row>
      </section>
      </container-md>
    </page>
  </template>
  
  <script>
  import * as d3 from 'd3';
  import CrossfilterManager from '@/utils/crossfilter-helpers.js';
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
            publication: { icon: 'mdi-file-document-outline', color: 'blue' },
            whitepaper: { icon: 'mdi-note-outline', color: 'teal' },
            conferenceAbstract: { icon: 'mdi-microphone-outline', color: 'deep-purple' },
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
                    id: `publication-${i}`
                  //  date: d.year
                }
            }),
            d3.csv(`${dataPath}${whitepaperFile}`, function(d, i){
                return {
                    title: d.Title,
                    type: "whitepaper",
                    id: `whitepaper-${i}`
                 //   date: d.year
                }
            }),
            d3.csv(`${dataPath}${conferenceAbstractsFile}`, function(d, i){
                return {
                    title: d.Title,
                    type: "conferenceAbstract",
                    id: `conferenceAbstracts-${i}`,
                    //   date: d.year
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

</style>
  