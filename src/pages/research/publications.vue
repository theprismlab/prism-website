<template>
  <page>
    <container-xs>
      <page-title>Publications</page-title>
      </container-xs>
      <container-md>
            
      <section>
        <section-overline> Featured</section-overline>
        <v-row class="mt-1">
          <v-col cols="12" xs=" 12" sm="12" md="12" lg="8" xl="8">
            <PublicationCard v-for="each in data.filter((item) => item.rank == 1)"
              size="lg"
              classes="pb-4"
              :title="each.cardTitle" 
              :suptitle="each.cardSuptitle" 
              :subtitle="each.cardSubtitle"
              :text="each.cardText" 
              :url="each.url" 
              :image="`${imgPath}${each.image}`">
            </PublicationCard>
          </v-col>
          <v-col cols="12" xs="12" sm="9" md="6" lg="4" xl="4">
            <PublicationCard 
               v-for="each in data.filter((item) => item.rank > 1 && item.rank <5)" class="py-1"
              size="sm"
              classes="pb-4"
              :title="each.cardTitle" 
              :suptitle="each.cardSuptitle" 
              :subtitle="each.cardSubtitle"
              :text="each.cardText" 
              :url="each.url" 
              >
            </PublicationCard>
            <v-divider></v-divider>
          </v-col>
        </v-row>
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
            <div v-for="each in filteredData">
              <PublicationCard 
              size="sm"
              classes="py-4"
              :title="each.cardTitle" 
              :suptitle="each.cardSuptitle" 
              :subtitle="each.cardSubtitle"
              :url="each.url" 
              >
            </PublicationCard>
              <v-divider></v-divider>
            </div>
            
          </v-col>
        </v-row>
      </section>
      </container-md>
    </page>
  </template>
  
  <script>
  import * as d3 from 'd3';
  import CrossfilterManager from '@/utils/crossfilter-helpers.js';
  const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"data/" : "../../public/data/";
  const dataFile = "Website Content - 2025  - Publications.csv";

    export default {
      data() {
        return {
          data: [],
          filters: {
              year: { options: [], active: [] },
              publisher: { options: [], active: [] },
              title: { options: [], active: [] },
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
        console.log("filteredData", filteredData);
        console.log("crossfilter", cfManager);
        this.filteredData = filteredData;
        this.cfManager = cfManager;
      },
      computed: {
        imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/publications/" : "../../public/images/publications/"
        },
      },
      methods: {
         async getData(){
          const self = this;
          return Promise.all([
            d3.csv(`${dataPath}${dataFile}`, function(d){
                return {
                    title: d.Title,
                    publisher: d.Publication,
                    year: d.Date.toString(),
                    author: d.Author,
                    url: d.Link,
                    abstract: d["Featured Abstract"],
                    rank: d["Featured Rank"],
                    image: `publication-thumbnail-${d["Featured Rank"]}.png`
                }
            })
          ]).then(response=>{
            let data = response[0].sort((a, b) => +b.year - +a.year);
            data.forEach(d=>{
              d.cardSuptitle = this.createSuptitle(d);
              d.cardTitle = this.createTitle(d);
              d.cardSubtitle = this.createSubtitle(d);
              d.cardText = this.createText(d);
            })
            return data;
          });
        },
        createSuptitle(d){
          return `${d.year} <span class='ml-2 text-primary-accent-1'>${d.publisher}</span>`;
        },
        createTitle(d){
          return `<a href='${d.url}' target='_blank' class="text-black">${d.title}</a>`
        },
        createSubtitle(d){
          return `${d.author} et al.`;
        },
        createText(d){
          return `${d.abstract}`;
        },
        onFilterChange(field, values) {
          this.cfManager.setActive(field, values);
          console.log("filteredData", this.cfManager.filteredData);
          this.filteredData = this.cfManager.filteredData;

          // Now this.filters[field].options is updated for all fields
        }
      },
      watch: {
        // filters: {
        //   handler(current, previous) {
        //     const self = this;
        //     let filtered = self.data.filter(item => {
        //       return (self.filters.years.length === 0 || self.filters.years.includes(item.date)) &&
        //       (self.filters.publishers.length === 0 || self.filters.publishers.includes(item.publisher)) &&
        //      (self.filters.titles.length === 0 || self.filters.titles.includes(item.title)) && 
        //      (self.filters.authors.length === 0 || self.filters.authors.includes(item.author));
             
        //     });
        //     this.filteredData = filtered;
        //   },
        //   deep: true
        // },
      }
    }
  </script>

  <style scoped>

</style>
  