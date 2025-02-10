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
          md="7" 
          lg="7"
          xl="8"
        >
        <div v-for="each in featuredPublications.filter((item, index) => index == 0)">
          <PublicationCard 
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
          md="5"
          lg="5"
          xl="4"
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
        <v-col>
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
        <v-col>
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
        <v-col>
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
import PublicationCard from '@/components/PublicationCard.vue';

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
          //  list the titles of the publications that you want to feature. 
          // The first publication will be displayed as a large card, and the rest will be displayed as smaller cards 
          featuredPublicationTitles: [
            "Genetic dependencies associated with transcription factor activities in human cancer cell lines",
            "High-throughput identification of genotype-specific cancer vulnerabilities in mixtures of barcoded tumor cell lines",
            "Discovering the anticancer potential of non-oncology drugs by systematic viability profiling"
          ], 
          publications: [
          {
                title: "Genetic dependencies associated with transcription factor activities in human cancer cell lines",
                publisher: "Cell Reports",
                date: 2024,
                authors: "Thatikonda V, et al.",
                url: "",
                abstract: "Developed by the Broad Institute of MIT and Harvard, PRISM (Profiling Relative Inhibition Simultaneously in Mixtures) is a novel DNA barcoding technology that allows for rapid, viability screening of cancer cell line models in mixtures. Our original efforts have been published by Channing Yu in 2016, that showed that mixing barcoded cell lines together is feasible and by Steven Corsello in 2020 showing that screening a large number of known drugs across over 500 barcoded cell lines identified new indications for non-oncology drugs.",
                image: "Genetic-dependencies-associated-with-transcription-factor-activities-in-human-cancer-cell-lines.png" 
            },
            {
                title: "High-throughput identification of genotype-specific cancer vulnerabilities in mixtures of barcoded tumor cell lines",
                publisher: "Nature Biotechnology",
                date: 2016,
                authors: "Yu C, et al.",
                url: "https://www.nature.com/articles/nbt.3460",
                abstract: "Abstract",
                image: "High-throughput identification of genotype-specific cancer vulnerabilities in mixtures of barcoded tumor cell lines.png" 
            },
            {
                title: "Discovering the anticancer potential of non-oncology drugs by systematic viability profiling",
                publisher: "Nature Cancer",
                date: 2020,
                authors: "Corsello SM, et al.",
                url: "https://www.nature.com/articles/s43018-019-0018-6",
                abstract: "Abstract",
                image: "Discovering the anticancer potential of non-oncology drugs by systematic viability profiling.png" 
            },
            {
                title: "Title",
                publisher: "Publisher",
                date: 2024,
                authors: "Authors",
                url: "",
                abstract: "Abstract",
                image: "" 
            },

          ]
         
        }
      },
      mounted() {
        this.publications = this.publications.sort((a, b) => b.date - a.date);
        this.filteredPublications = this.publications;

        this.years = [...new Set(this.publications.map(item => item.date))];
        this.publishers = [...new Set(this.publications.map(item => item.publisher))];
        this.titles = [...new Set(this.publications.map(item => item.title))];

      },
      computed: {
        // filter the list of publications to only include the titles that are in the featuredPublicatonTitles list
        featuredPublications(){
          const self = this;
          return self.publications.filter((item, index) => self.featuredPublicationTitles.includes(item.title));
        },
        imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/publications/" : "../../public/images/publications/"
        },
      },
      methods: {
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
  