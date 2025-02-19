<template>
  <page>
    <container-sm>
        <h2 class="title">White papers</h2>
        <section>
            <div v-for="each in data">
              <Card
                size="md"
                classes="px-4 py-4"
                :chip="each.chip"
                :suptitle="each.suptitle"
                :title="each.title"
                :text="each.text"
                :image="each.image"
              >
              </Card>
              <v-divider style="max-width: 1000px"></v-divider>
            </div>
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
                  chip: d["Chip"], // this is the screen type or topic category
                  title: d["Title"], // white paper title
                  date: d["Date"], // date published
                  url: d["Paper Link"], // link to the white paper
                  portalUrl: d["Portal Link"], // link to the portal
                  image: d['Title'] // Developer/Lia handles naming images the same as the title
        
                }
            })
          ]).then(response=>{
            response[0].forEach(d=>{
              d.chip = this.createChip(d);
              d.suptitle = this.createSuptitle(d);
              d.title = this.createTitle(d);
              d.text = this.createText(d);
              d.button = this.createButton(d);
              d.image = `${this.imgPath}${d.image}.png`;
            })
            self.data = response[0];
          
          });
        },
        createChip(d){
          return {
            text: d.chip,
            color: "primary",
            size: "x-small"
          }
        },
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
        createText(d){
          return `<a style='text-decoration: none; font-size: 0.875rem; font-weight: 500; letter-spacing: 0.01em;' href='${d.portalUrl}' target='_blank'>Explore data <span class='mdi mdi-open-in-new'></span></a>`
        },
      },
      watch: {

      }
    }
  </script>

  <style>

</style>
  