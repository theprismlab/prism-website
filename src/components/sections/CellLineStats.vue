<template>
  <v-row class="mt-8">
    <v-col
      v-for="(card, index) in cards"
      :key="card.title"
      cols="12"
      xs="6"
      sm="6"
      md="3"
      lg="3"
      xl="3"
    >
      <v-card
        class="stat-card fill-height d-flex flex-column align-center justify-center text-center"
        :elevation="0"
        flat
        :style="{ border: `1px solid ${card.color}` }"
      >
        <div
          class="icon-circle d-flex align-center justify-center"
          :style="{ backgroundColor: card.color }"
        >
          <svg-icon :size="iconSize" type="mdi" :path="card.icon" color="white"></svg-icon>
        </div>
        <h2 class="text-h2 font-weight-light card-title">{{ card.title }}</h2>
        <p class="text-h4 font-weight-normal text-grey-darken-1 card-subtitle">
          {{ card.subtitle }}
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiMicroscope, mdiSitemap, mdiLabel, mdiHumanChild } from '@mdi/js';

  export default {
    name: 'CellLineStats',
    components: { SvgIcon },
    data() {
      return {
        iconSize: 54,
        cards: [
          {
            title: '900+',
            subtitle: 'Cancer cell lines',
            icon: mdiMicroscope,
            color: 'var(--v-primary-base)',
          },
          {
            title: '45+',
            subtitle: 'Lineages',
            icon: mdiSitemap,
            color: 'var(--v-indigo-accent-2)',
          },
          {
            title: '80+',
            subtitle: 'Subtypes',
            icon: mdiLabel,
            color: 'var(--v-teal-accent-4)',
          },
          {
            title: '100+',
            subtitle: 'Hematopoietic / Pediatric',
            icon: mdiHumanChild,
            color: 'var(--v-red-accent-2)',
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .stat-card {
    border-radius: 14px;
    padding: 32px 24px;
    gap: 16px;
  }

  .icon-circle {
    width: 54px;
    height: 54px;
    padding: 13.5px;
    border-radius: 50%;
  }

  .card-title {
    margin: 0;
    line-height: 1.2em !important;
    font-family: 'Archivo Expanded', sans-serif !important;
  }

  .card-subtitle {
    margin: 0;
    opacity: 1;
    line-height: 1.4em !important;
    font-size: 1.12rem !important;
    font-weight: 600 !important;
    color: var(--v-grey) !important;
  }
</style>
