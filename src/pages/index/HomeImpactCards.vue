<template>
  <impact-cards :cards="cards" />
</template>

<script>
  import ImpactCards from '@/components/ImpactCards.vue';
  import { mdiAccountGroup, mdiHexagonMultiple, mdiFileDocumentMultipleOutline } from '@mdi/js';

  export default {
    name: 'HomeImpactCards',
    components: { ImpactCards },
    data() {
      return {
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
