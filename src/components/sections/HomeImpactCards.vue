<template>
  <v-row class="mt-12">
    <v-col
      v-for="(card, index) in cards"
      :key="card.title"
      cols="12"
      xs="12"
      sm="4"
      md="4"
      lg="4"
      xl="4"
    >
      <v-card
        class="impact-card fill-height d-flex flex-column align-center justify-center text-center"
        :elevation="0"
        flat
        :style="{ border: `1px solid ${card.color}` }"
      >
        <div
          :id="`icon-circle-${index}`"
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
  import { mdiAccountGroup, mdiHexagonMultiple, mdiFileDocumentMultipleOutline } from '@mdi/js';

  export default {
    name: 'HomeImpactCards',
    components: { SvgIcon },
    data() {
      return {
        iconSize: 54,
        cards: [
          {
            title: '200+',
            subtitle: 'Academic and industry partners',
            icon: mdiAccountGroup,
            color: 'var(--v-red-accent-2)',
          },
          {
            title: '7,000+',
            subtitle: 'Compounds screened in over 500 cell lines',
            icon: mdiHexagonMultiple,
            color: 'var(--v-secondary-accent-4)',
          },
          {
            title: '50+',
            subtitle: 'Publications in high-impact journals',
            icon: mdiFileDocumentMultipleOutline,
            color: 'var(--v-indigo-accent-2)',
          },
        ],
      };
    },
  };
</script>
<style scoped>
  .impact-card {
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