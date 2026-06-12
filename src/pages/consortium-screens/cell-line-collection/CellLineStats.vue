<template>
  <impact-cards :cards="cards" class="mt-8" />
</template>

<script>
  import ImpactCards from '@/components/ImpactCards.vue';
  import { mdiMicroscope, mdiSitemap, mdiLabel, mdiHumanChild } from '@mdi/js';

  export default {
    name: 'CellLineStats',
    components: { ImpactCards },
    data() {
      return {
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
