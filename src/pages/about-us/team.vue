<template>
  <page>
    <container-sm>
        <page-title>Team</page-title>
        <section>
          <v-row class="justify-center">
            <v-col v-for="individual in teamMembers" cols="12" xs="12" sm="6" md="4" lg="3" xl="3">
              <TeamCard :name="individual.name" :title="individual.title" :image="`${imgPath}${individual.image}`"></TeamCard>
            </v-col>
          </v-row>
        </section>
      </container-sm>
    </page>
</template>
<script>
  import * as d3 from 'd3';
import TeamCard from '@/components/TeamCard.vue';
const dataPath = import.meta.env.PROD ? import.meta.env.BASE_URL+"data/" : "../../public/data/";
const dataFile = "Website Content - 2025  - Team Page.csv";


  export default {
    data() {
      return {
        teamMembers: [],
      }
    },
    async mounted() {

      await this.getData();
    },
    computed: {
      imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/team/" : "../../public/images/team/"
        },
   
    },
    methods: {
      async getData(){
          const self = this;
          Promise.all([
            d3.csv(`${dataPath}${dataFile}`, function(d){
                return {
                    name: d["Team Member"],
                    title: d["Title"],
                    image: `${d["Team Member"]}.JPG`,
                }
            })
          ]).then(response=>{
            this.teamMembers = response[0];
          });
        }
    
    },
    watch: {

    }
  }
</script>