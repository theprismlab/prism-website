<template>
  <page>
    <container-sm>
      <h2 class="title">Conference abstracts</h2>
      <section>
        <v-col v-for="(group) in data" :key="group.key" class="mb-4 mt-10">
          <h3 class="text-overline font-weight-bold text-secondary">{{group.key}}</h3>
          <div v-for="subgroup in group.values" :key="subgroup.key">
            <h4>{{subgroup.key}}</h4>
            <div v-for="(value, index) in subgroup.values" :key="`${value.key}-${index}`" class="my-2">
                <a :href="value.url" target="_blank" class="text-button">{{value.title}}</a>
              </div>
          </div>
        </v-col>
      </section>
    </container-sm>
  </page>
  </template>
  
  <script>
  import * as d3 from 'd3';
  const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"data/" : "../../public/data/";
  const dataFile = "Website Content - 2025  - Conference Abstracts.csv";


    export default {
      data() {
        return {
          data: []
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
                  title: d.Title,
                  url: d.Link,
                  year: d.Year,
                  conference: d.Conference
                }
            })
          ]).then(response=>{
    

            let groups = d3.groups(response[0], d=>d.year, d=> d.conference)
              .map((d)=>{
                return {
                  key: d[0],
                  values: d[1].map((v)=>{
                    return {
                      key: v[0],
                      values: v[1]
                    }
                  })
              }
            });
            console.log(groups);
            self.data = groups

          
          });
        }
      },
      watch: {

      }
    }
  </script>

  <style scoped>
  /* a{
    text-decoration: none !important;
    border-bottom: 1px solid var(--v-primary) !important;
  } */

</style>
  