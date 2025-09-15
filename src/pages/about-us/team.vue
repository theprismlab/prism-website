<template>
  <page>
    <container-xs>
        <page-title>Team</page-title>
          <v-row class="mt-12" align="center" justify="center">
            <div class="team-card-wrapper" v-for="individual in teamMembers">
              <TeamCard :name="individual.name" :title="individual.title" :image="`${imgPath}${individual.image}`"></TeamCard>
            </div>
          </v-row>
      </container-xs>
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
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/team_photos/" : "../../public/images/team_photos/"
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

<style scoped>
.team-card-wrapper {
  width:240px;
}
</style>