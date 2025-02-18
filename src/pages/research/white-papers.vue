<template>
  <div>
    <v-container class="py-16">
      <h2 class="title">White papers</h2>
    <section>
        <div v-for="each in data">
          <Card
            size="md"
            classes="px-4 py-4"
            :suptitle="each.suptitle"
            :title="each.title"
            :button="each.button"
          >
          </Card>
        </div>
    </section>

    </v-container>



  </div>
  </template>
  
  <script>
  import * as d3 from 'd3';  
  import Card from '@/components/Card.vue';
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
        // imgPath() {
        //   return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/publications/" : "../../public/images/publications/"
        // },
      },
      methods: {
        async getData(){
          const self = this;
          Promise.all([
            d3.csv(`${dataPath}${dataFile}`, function(d){
                return {
                  chip: d.Chip,
                  title: d.Title,
                  date: d.Date,
                  url: d["Paper Link"],
                  portalUrl: d["Portal Link"],
        
                }
            })
          ]).then(response=>{
            response[0].forEach(d=>{
              // d.chip = this.createChip(d);
              d.suptitle = this.createSuptitle(d);
              d.title = this.createTitle(d);
              // d.text = this.createText(d);
              d.button = this.createButton(d);
            })
            self.data = response[0];
          
          });
        },
        // createChip(d){
        //   return `<v-chip>${d.chip}</v-chip>`
        // },
        createButton(d){
          return {
            text: `Explore ${d.chip} data in the portal <span class='ml-1 mdi mdi-open-in-new'></span>`,
            color: "primary",
            variant: "text",
            url: d.portalUrl
          }
        },
        createSuptitle(d){
          return `${d.date}`;
        },
        createTitle(d){
          return `<a href='${d.url}' target='_blank' class="text-black">${d.title}</a>`
        },
        // createText(d){
        //   return `<a href='${d.portalUrl}' target='_blank'>Explore White Paper Data in the Portal <span class='ml-1 mdi mdi-open-in-new'></span></a>`
        // }
      },
      watch: {

      }
    }
  </script>

  <style scoped>

</style>
  