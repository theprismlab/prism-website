<template>
  <v-select
    :model-value="selectedScreenType"
    :items="screens"
    :placeholder="selectedScreenType ? undefined : 'Select screen'"
    hide-details
    v-model:menu="menuOpen"
    @update:model-value="onScreenChange"
  >
    <!-- <template #item="{ item, props }">
      <v-list-item v-bind="props">
        <template #title>
          {{ item.raw }}
          <span v-if="screenNameFor(item.raw)" class="screen-selector__name">{{
            screenNameFor(item.raw)
          }}</span>
        </template>
      </v-list-item>
    </template> -->
  </v-select>
</template>

<script>
  import { useActiveScreenStore } from './active-screen-store.js';
  import { useWindowStatusStore } from './window-status-store.js';

  export default {
    name: 'ScreenSelector',
    setup() {
      return {
        activeScreenStore: useActiveScreenStore(),
        windowStatusStore: useWindowStatusStore(),
      };
    },
    data() {
      return {
        screens: ['MTS', 'CPS', 'APS', 'EPS', 'AIR'],
        menuOpen: false,
      };
    },
    computed: {
      // Only reports the type as "selected" when the URL's specific :screen segment is the
      // one currently valid for that type — not merely because a screenType segment exists.
      // Otherwise a stale/bogus screen name (e.g. a since-closed screen, or a typo) would
      // still show its type as selected, which both looks wrong and means re-picking that
      // same type is a no-op change, leaving onScreenChange's resolve-and-redirect stuck.
      selectedScreenType() {
        const type = this.$route.params.screenType;
        if (!type) return null;
        // Instructions routes only carry :screenType, no :screen to validate against —
        // windowStatusStore's keys are the canonical list of known types for that check.
        if (!this.$route.path.startsWith('/submission-hub/forms')) {
          if (!this.windowStatusStore.loaded) return type; // avoid flashing unselected while loading
          return this.windowStatusStore.isValidType(type) ? type : null;
        }
        // Don't flash "unselected" while the store is still loading for the first time.
        if (!this.activeScreenStore.loaded) return type;
        return this.activeScreenStore.activeScreenNameFor(type) === this.$route.params.screen
          ? type
          : null;
      },
    },
    mounted() {
      this.activeScreenStore.load(import.meta.env.VITE_API_URL);
      this.windowStatusStore.load(import.meta.env.VITE_API_URL);
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
