<template>
  <page>
    <app-container>
      <prism-page-title class="text-center">Team</prism-page-title>
      <div class="team-grid team-grid--first-row">
        <TeamCard
          v-for="(individual, index) in firstRow"
          :key="index"
          :name="individual.name"
          :title="individual.title"
          :image="`${imgPath}${individual.image}`"
          :index="index"
        ></TeamCard>
      </div>
      <div class="team-grid team-grid--rest">
        <TeamCard
          v-for="(individual, index) in rest"
          :key="firstRow.length + index"
          :name="individual.name"
          :title="individual.title"
          :image="`${imgPath}${individual.image}`"
          :index="firstRow.length + index"
        ></TeamCard>
      </div>
    </app-container>
  </page>
</template>
<script>
  import * as d3 from 'd3';
  import TeamCard from '@/components/TeamCard.vue';
  import { assetUrl } from '@/utils/assets';
  const dataPath = import.meta.env.BASE_URL + 'data/';
  const dataFile = 'Website Content - 2025  - Team Page.csv';

  export default {
    data() {
      return {
        teamMembers: [],
      };
    },
    async mounted() {
      await this.getData();
    },
    computed: {
      imgPath() {
        return assetUrl('team_headshots_png/');
      },
      firstRow() {
        return this.teamMembers.slice(0, 3);
      },
      rest() {
        return this.teamMembers.slice(3);
      },
    },
    methods: {
      async getData() {
        const self = this;
        Promise.all([
          d3.csv(`${dataPath}${dataFile}`, function (d) {
            return {
              name: d['Team Member'],
              title: d['Title'],
              image: `${d['Team Member']}.png`,
            };
          }),
        ]).then((response) => {
          this.teamMembers = response[0];
        });
      },
    },
    watch: {},
  };
</script>

<style scoped>
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 260px));
    justify-content: center;
    gap: 48px 32px;
  }

  .team-grid--first-row {
    margin-top: 48px;
  }

  .team-grid--rest {
    margin-top: 32px;
  }
</style>
