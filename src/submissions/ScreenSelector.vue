<template>
  <v-select
    :model-value="$route.params.screenType"
    :items="screens"
    :placeholder="$route.params.screenType ? undefined : 'Select screen'"
    hide-details
    v-model:menu="menuOpen"
    @update:model-value="onScreenChange"
  >
    <template #item="{ item, props }">
      <v-list-item v-bind="props">
        <template #title>
          {{ item.raw }}
          <span v-if="screenNameFor(item.raw)" class="screen-selector__name">{{
            screenNameFor(item.raw)
          }}</span>
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
  import { useActiveScreenStore } from './active-screen-store.js';

  export default {
    name: 'ScreenSelector',
    setup() {
      return { activeScreenStore: useActiveScreenStore() };
    },
    data() {
      return {
        screens: ['MTS', 'CPS', 'APS', 'EPS', 'AIR'],
        menuOpen: false,
      };
    },
    mounted() {
      this.activeScreenStore.load(import.meta.env.VITE_API_URL);
      if (!this.$route.params.screenType) {
        this.$nextTick(() => {
          this.menuOpen = true;
        });
      }
    },
    methods: {
      screenNameFor(screenType) {
        return this.activeScreenStore.activeScreenNameFor(screenType);
      },
      async onScreenChange(screen) {
        // The forms route needs a resolved :screen segment after the type (unlike
        // instructions, which is just :screenType) — true whether we're switching type on
        // an existing forms/:type/:screen route or picking a type for the first time from
        // the bare /submission-hub/forms page.
        if (this.$route.path.startsWith('/submission-hub/forms')) {
          await this.activeScreenStore.load(import.meta.env.VITE_API_URL);
          const activeName = this.activeScreenStore.activeScreenNameFor(screen);
          this.$router.push(
            activeName ? `/submission-hub/forms/${screen}/${activeName}` : '/submission-hub/forms',
          );
          return;
        }

        const segments = this.$route.path.split('/');
        const screenIndex = segments.indexOf(this.$route.params.screenType);
        if (screenIndex !== -1) {
          segments[screenIndex] = screen;
          this.$router.push(segments.join('/'));
        } else {
          this.$router.push(`${this.$route.path}/${screen}`);
        }
      },
    },
  };
</script>

<style scoped>
  .screen-selector__name {
    margin-left: 8px;
    color: rgba(var(--v-theme-on-surface), 0.55);
  }
</style>
