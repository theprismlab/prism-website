<template>
  <page>
    <app-container wide>
      <prism-page-title class="text-center">Meet our team</prism-page-title>
      <div class="team-grid">
        <TeamCard
          v-for="(individual, index) in teamBosses"
          :key="index"
          :name="individual.name"
          :title="individual.title"
          :image="`${imgPath}${individual.image}`"
          :index="individual.index"
        ></TeamCard>
      </div>
      <div class="team-grid">
        <TeamCard
          v-for="(individual, index) in teamMembers"
          :key="index"
          :name="individual.name"
          :title="individual.title"
          :image="`${imgPath}${individual.image}`"
          :index="individual.index"
        ></TeamCard>
      </div>
    </app-container>
  </page>
</template>
<script>
  import * as d3 from 'd3';
  import TeamCard from './team/TeamCard.vue';
  import { assetUrl } from '@/utils/assets';
  const dataPath = import.meta.env.BASE_URL + 'data/';
  const dataFile = 'Website Content - 2025  - Team Page.csv';

  export default {
    data() {
      return {
        teamBosses: [],
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
    },
    methods: {
      async getData() {
        const self = this;
        Promise.all([
          d3.csv(`${dataPath}${dataFile}`, function (d, i) {
            return {
              name: d['Team Member'],
              title: d['Title'],
              image: `${d['Team Member']}.png`,
              index: i,
            };
          }),
        ]).then((response) => {
          this.teamBosses = response[0].filter((member, i) => i < 3);
          this.teamMembers = response[0].filter((member, i) => i >= 3);
        });
      },
    },
    watch: {},
  };
</script>

<style scoped>
  .team-grid {
    --team-card-width: 260px;
    --team-avatar-size: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px 14px;
    margin-top: 48px;
  }
  /* ipad size */
  @media (max-width: 960px) {
    .team-grid {
      --team-card-width: 200px;
      --team-avatar-size: 160px;
      gap: 14px 14px;
    }
  }
  @media (max-width: 768px) {
    .team-grid {
      --team-card-width: 200px;
      --team-avatar-size: 160px;
      gap: 14px 14px;
    }
  }
  @media (max-width: 500px) {
    .team-grid {
      --team-card-width: 260px;
      --team-avatar-size: 200px;
      gap: 10px 10px;
    }
  }
</style>
