<template>
  <v-row class="overview-cards">
    <v-col v-for="(card, index) in cards" :key="index" cols="12" md="4">
      <v-card class="overview-card fill-height" :elevation="0">
        <div class="overview-card-media">
          <v-img eager :src="card.img" max-width="200px" class="mx-auto"></v-img>
        </div>
        <div class="overview-card-body">
          <h4 class="overview-card-title">{{ card.title }}</h4>
          <p class="text-body-2 text-grey-darken-2 mb-4">{{ card.description }}</p>
          <v-btn
            variant="text"
            :href="card.action.url"
            :target="card.action.target"
            color="primary"
            class="px-0"
            size="small"
          >
            {{ card.action.text }}
            <v-icon end size="16">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { ASSET_BASE } from '@/utils/assets';

  export default {
    name: 'HomeOverviewCards',
    computed: {
      imgPath() {
        return ASSET_BASE;
      },
      cards() {
        return [
          {
            img: `${this.imgPath}home-cell-lines.png`,
            title: '900+ genomically diverse barcoded and pooled cell lines',
            description: 'Hematopoietic and solid tumor, covering 80 cancer subtypes',
            action: { text: 'Learn more', url: '/consortium-screens/cell-line-collection', target: '_self' },
          },
          {
            img: `${this.imgPath}home-features.png`,
            title: '150K+ unique baseline genetic and functional genomic features',
            description:
              'Features from the Dependency Map are correlated with the PRISM viability profile using univariate and multivariate predictive models',
            action: { text: 'Learn more', url: 'https://depmap.org/portal/', target: '_blank' },
          },
          {
            img: `${this.imgPath}home-target.png`,
            title: 'Identify target and patient population of your drug',
            description: 'Confirm hypothesis and establish biomarkers of sensitivity and resistance',
            action: { text: 'Learn more', url: '/consortium-screens/data-analysis', target: '_self' },
          },
        ];
      },
    },
  };
</script>

<style scoped lang="scss">
  .overview-cards {
    padding: 8px 0 32px;
  }

  .overview-card {
    border-radius: 16px;
    background: white;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
    overflow: hidden;
  }

  .overview-card-media {
    background: linear-gradient(180deg, #edf4fb, #f6f9fd);
    padding: 28px 24px 0;
    text-align: center;
  }

  .overview-card-body {
    padding: 24px 24px 20px;
  }

  .overview-card-title {
    font-size: var(--h5-size);
    font-family: 'Archivo Expanded', sans-serif;
    font-weight: 600;
    line-height: 1.35em;
    color: #1a1a1a;
    margin-bottom: 12px;
  }
</style>
