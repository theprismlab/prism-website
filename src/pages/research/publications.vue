<template>
  <div>
  <v-container>
    <h1 class="text-h1 title font-weight-bold">Publications</h1>
    <page-section>
      <v-list>
        <v-list-subheader class="text-uppercase subtitle-1 font-weight-bold" color="secondary">Featured</v-list-subheader>
      </v-list>
      <v-row>
        <v-col 
          cols="12" 
          xs="12"
          sm="12"
          md="8" 
          lg="8"
          xl="9"
        >
        <div v-for="each in featuredPublications.filter((item) => item.rank == 1)">
          <PublicationCard 
            size="large"
            :title="each.title" 
            :publisher="each.publisher" 
            :date="each.date" 
            :authors="each.authors" 
            :url="each.url" 
            :abstract="each.abstract" 
            :image="`${imgPath}${each.image}`">
          </PublicationCard>
        </div>
        </v-col>
      
        <v-col 
          cols="12" 
          xs="12"
          sm="12"
          md="4"
          lg="4"
          xl="3"
          >
          <div v-for="each in featuredPublications.filter((item, index) => index > 0)" class="py-1">
            <PublicationCard 
            :title="each.title" 
            :publisher="each.publisher" 
            :date="each.date" 
            :authors="each.authors" 
            :url="each.url"

            >
          </PublicationCard>
          <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
    </page-section>
    <page-section>

      <v-row>
        <v-col cols="12" xs="12" sm="6" md="4" lg="3" xl="3">
          <v-autocomplete
            v-model="filters.titles"
            :items="titles"
            label="Filter titles"
            multiple
            chips
            clearable
            hide-details
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="4" lg="3" xl="3">
          <v-autocomplete
            v-model="filters.publishers"
            :items="publishers"
            label="Filter publishers"
            multiple
            chips
            clearable
            hide-details
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="4" lg="3" xl="3">
          <v-autocomplete
            v-model="filters.years"
            :items="years"
            label="Filter years"
            multiple
            chips
            clearable
            hide-details
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
          <div v-for="each in filteredPublications">
            <PublicationCard 
              :title="each.title" 
              :publisher="each.publisher" 
              :date="each.date" 
              :authors="each.authors" 
              :url="each.url"
              >
            </PublicationCard>
            <v-divider></v-divider>
          </div>
          
        </v-col>
      </v-row>
    </page-section>
    </v-container>



  </div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  import PublicationCard from '@/components/PublicationCard.vue';
  const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"/data/" : "../../data/";
  const dataFile = "Website Content - 2025  - Publications.csv";


    export default {
      data() {
        return {
          years: [],
          publishers: [],
          titles: [],
          filters: {
            years: [],
            publishers: [],
            titles: []
          },
          filteredPublications: [],
          publications: [],
        }
      },
      async mounted() {

        await this.getData();
      },
      computed: {
        // filter the list of publications to only include the titles that are in the featuredPublicatonTitles list
        featuredPublications(){
          return this.publications.filter((item) => item.rank >0);
        },
        imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/publications/" : "../../public/images/publications/"
        },
      },
      methods: {
        async getData(){
        const self = this;
        Promise.all([
                d3.csv(`${dataPath}${dataFile}`, function(d){
                    return {
                        title: d.Title,
                        publisher: d.Publication,
                        date: +d.Date,
                        author: d.Author,
                        url: d.Link,
                        abstract: d["Featured Abstract"],
                        rank: d["Featured Rank"],
                        // image: `${d["Featured Rank"]}.webp`
                        image: `publication-thumbnail-${d["Featured Rank"]}.png`
                    }
                })
              ]).then(response=>{
                this.publications = response[0].sort((a, b) => b.date - a.date);
                this.filteredPublications = this.publications;
                this.years = [...new Set(this.publications.map(item => item.date))];
                this.publishers = [...new Set(this.publications.map(item => item.publisher))];
                this.titles = [...new Set(this.publications.map(item => item.title))];
                this.authors = [...new Set(this.publications.map(item => item.author))];
              });
    }
      },
      watch: {
        filters: {
          handler(current, previous) {
             const self = this;
            let filtered = self.publications.filter(item => {
              return (self.filters.years.length === 0 || self.filters.years.includes(item.date)) &&
              (self.filters.publishers.length === 0 || self.filters.publishers.includes(item.publisher)) &&
             (self.filters.titles.length === 0 || self.filters.titles.includes(item.title));
             
            });
            this.filteredPublications = filtered;
          },
          deep: true
        },
      }
    }
  </script>

  <style scoped>

</style>
  