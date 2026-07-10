<template>
  <page>
    <app-container narrow>
      <prism-page-title>Assays</prism-page-title>
      <v-expansion-panels variant="accordion" flat>
        <v-expansion-panel v-for="item in items" :key="item.id">
          <v-expansion-panel-title>
            <img
              :src="imgPath + 'Thumbnail_' + item.screen + '.svg'"
              :alt="item.screen + ' thumbnail'"
              class="assay-avatar"
            />
            <div class="assay-header">
              <h2 class="prism-text-title-large">{{ item.screen }} - {{ item.screen_full }}</h2>
              <h3 class="prism-text-body-large text-medium-emphasis">{{ item.test_agents }}</h3>
            </div>
            <span class="assay-time-point"> {{ item.time_point }}</span>
            <!-- <v-icon class="category-icon mr-3" size="28">{{ categoryIcons[item.category] }}</v-icon> -->
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="prism-text-body-large">{{ item.description }}</div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </app-container>
  </page>
</template>

<script>
  import { assetUrl } from '@/utils/assets';
  import { ASSAYS } from '@/utils/assays';
  export default {
    name: 'Assays',
    data() {
      return {
        items: ASSAYS,
      };
    },
    computed: {
      imgPath() {
        return assetUrl('assay/');
      },
    },
  };
</script>

<style scoped>
  .v-expansion-panel {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .v-expansion-panel-title.v-expansion-panel-title--active {
    background-color: rgba(var(--v-theme-on-surface), 0.03);
  }

  .category-icon {
    flex: 0 0 auto;
    color: var(--prism-color-blue-lighten-2);
  }
  .assay-time-point {
    color: var(--prism-color-blue-lighten-2);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    flex: 0 0 auto;
    margin-inline-end: 12px;
  }
  /* Fixed size — won't grow or shrink */
  .assay-avatar {
    width: 64px;
    height: 64px;
    object-fit: contain;
    flex: 0 0 64px; /* flex-grow: 0, flex-shrink: 0, flex-basis: 64px */
  }

  /* Fills remaining space so the time-point sits just before the chevron */
  .assay-header {
    flex: 1 1 0;
    min-width: 0;
  }
</style>
