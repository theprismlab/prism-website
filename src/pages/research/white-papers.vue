<template>
  <page>
    <container-sm>
        <page-title>White papers</page-title>
        <section class="section-margin-default">
          <v-row>
          <v-col cols="12" xs="12" sm="12" md="10" lg="8" xl="8">
            <div v-for="each in data">
              <PublicationCard
                size="sm"
                classes="px-4 py-4"
                :suptitle="each.suptitle"
                :title="each.title"
                :image="each.image"
                :button="each.button"
              >
              </PublicationCard>
              <v-divider style="max-width: 1000px"></v-divider>
            </div>
          </v-col>
        </v-row>
        </section>
    </container-sm>
  </page>
</template>
  
  <script>
  import * as d3 from 'd3';  
  const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"data/" : "../../public/data/";
  const dataFile = "Website Content - 2025  - White Papers.csv";


    export default {
      data() {
        return {
          data: [],
        }
      },
      async mounted() {
        await this.getData();
      },
      computed: {
        imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/whitepapers/" : "../../public/images/whitepapers/"
        },
      },
      methods: {
        async getData(){
          const self = this;
          Promise.all([
            d3.csv(`${dataPath}${dataFile}`, function(d){
                return {
                  topic: d["Chip"], 
                  title: d["Title"], // white paper title
                  date: d["Date"], // date published
                  url: d["Paper Link"], // link to the white paper
                  portalUrl: d["Portal Link"], // link to the portal
                  image: d['Title'] // Developer/Lia handles naming images the same as the title
        
                }
            })
          ]).then(response=>{
            response[0].forEach(d=>{
              d.suptitle = this.createSuptitle(d);
              d.title = this.createTitle(d);
           //   d.text = this.createText(d);
              d.button = this.createButton(d);
              d.image = `${this.imgPath}${d.image}.png`;
            })
            self.data = response[0];
          
          });
        },
        createButton(d){
          return {
            text: "Explore data <span class='mdi mdi-open-in-new'></span>",
            variant: "text",
            url: d.portalUrl
          }
        },
        createSuptitle(d){
          return `${d.date} <span class='ml-2 text-primary-accent-1'>${d.topic}</span>`;
        },
        createTitle(d){
          return `<a href='${d.url}' target='_blank' class="text-black">${d.title}</a>`
        },
        // createText(d){
        //   return `<a class='text-button text-primary-accent-2' style='text-decoration: none;' href='${d.portalUrl}' target='_blank'>Explore data <span class='mdi mdi-open-in-new'></span></a>`
        // },
      },
      watch: {

      }
    }
  </script>

  <style>

</style>
  