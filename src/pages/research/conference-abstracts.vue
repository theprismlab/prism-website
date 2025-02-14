<template>
  <div>
    <v-container class="py-16">
    <h1 class="text-h2 title">Conference abstracts</h1>
    <!-- <section>
        <div v-for="each in whitePapers.filter((item) => item.rank == 1)">
          <PublicationCard 
            :title="each.title" 
            :date="each.date" 
            :author="`${each.author}, et al.`" 
            :url="each.url" 
            :abstract="each.abstract" 
            :image="`${imgPath}${each.image}`">
          </PublicationCard>
        </div>
    </section> -->

    </v-container>



  </div>
  </template>
  
  <script>
  // import * as d3 from 'd3';
  // const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"data/" : "../../public/data/";
  // const dataFile = "Website Content - 2025  - Publications.csv";


    export default {
      data() {
        return {

        }
      },
      async mounted() {
       // await this.getData();
      },
      computed: {
        // imgPath() {
        //   return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/publications/" : "../../public/images/publications/"
        // },
      },
      methods: {
        // async getData(){
        //   const self = this;
        //   Promise.all([
        //     d3.csv(`${dataPath}${dataFile}`, function(d){
        //         return {
                  
        //         }
        //     })
        //   ]).then(response=>{
          
        //   });
        // }
      },
      watch: {

      }
    }
  </script>

  <style scoped>

</style>
  