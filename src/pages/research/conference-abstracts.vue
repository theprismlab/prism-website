<template>
  <page>
    <container-xs>
      <page-title>Conference abstracts</page-title>
      <section class="section-margin-default">
        <v-row>
          <v-col cols="12" v-for="(group) in data" :key="group.key" class="mb-8">
            <section-overline>{{group.key}}</section-overline>
            <div v-for="subgroup in group.values" :key="subgroup.key">
              <h4 class="mb-6">{{subgroup.key}}</h4>
              <div v-for="(value, index) in subgroup.values" :key="`${value.key}-${index}`" class="mb-4">
                <v-divider v-if="index===0" class="mb-4"></v-divider>
                <a :href="value.url">{{value.title}} <v-icon size="x-small">mdi-open-in-new</v-icon></a>
                  <v-divider class="mt-4"></v-divider>
                </div>
            </div>
          </v-col>
      </v-row>
      </section>
    </container-xs>
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
  .text-button{
    line-height:1.3em;
    text-decoration: none;

  }
  /* a{
    text-decoration: none !important;
    border-bottom: 1px solid var(--v-primary) !important;
  } */

</style>
  