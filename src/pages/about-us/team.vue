<template>
  <page>
    <container-md>
        <page-title>Team</page-title>
          <v-row class="mt-12" justify="space-around">
            <!-- <div class="team-card-wrapper" v-for="individual in teamMembers">
              <TeamCard :name="individual.name" :title="individual.title" :image="`${imgPath}${individual.image}`"></TeamCard>
            </div> -->
             <v-col cols="7" xs="4" sm="4" md="3" lg="3" xl="3" v-for="(individual, index) in teamMembers" :key="index">
              <TeamCard :name="individual.name" :title="individual.title" :image="`${imgPath}${individual.image}`" :index="index"></TeamCard>
             </v-col>
          </v-row>
      </container-md>
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
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/team_headshots_png/" : "../../public/images/team_headshots_png/"
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
                    image: `${d["Team Member"]}.png`,
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

<style scoped>
/* .team-card-wrapper {
  width:24%;
} */
</style>