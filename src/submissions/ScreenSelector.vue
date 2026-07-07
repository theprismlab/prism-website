<template>
  <v-select
    :model-value="selectedScreenType"
    :items="screens"
    :placeholder="selectedScreenType ? undefined : 'Select screen'"
    hide-details
    v-model:menu="menuOpen"
    @update:model-value="onScreenChange"
  >
    <template v-if="isFormsRoute" #item="{ item, props }">
      <v-list-item v-bind="props">
        <template #title>
          {{ item.raw }}
          <span v-if="screenNameFor(item.raw)" class="screen-selector__name"
            >{{ screenNameFor(item.raw) }}
            <span
              v-if="screenStatusFor(item.raw)"
              class="screen-selector__status"
              :class="screenStatusFor(item.raw) === 'OPEN' ? 'screen-selector__status--open' : 'screen-selector__status--closed'"
              >({{ screenStatusFor(item.raw) }})</span
            ></span
          >
        </template>
      </v-list-item>
    </template>

    <template v-if="isFormsRoute" #selection="{ item }">
      {{ item.raw }}
      <span v-if="screenNameFor(item.raw)" class="screen-selector__name">
        {{ screenNameFor(item.raw) }}
      </span>
    </template>
  </v-select>
</template>

<script>
  import { useScreenStatusStore } from './screen-status-store.js';

  export default {
    name: 'ScreenSelector',
    setup() {
      return {
        screenStatusStore: useScreenStatusStore(),
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
        // screenStatusStore's keys are the canonical list of known types for that check.
        if (!this.$route.path.startsWith('/submission-hub/forms')) {
          if (!this.screenStatusStore.loaded) return type; // avoid flashing unselected while loading
          return this.screenStatusStore.isValidType(type) ? type : null;
        }
        // Don't flash "unselected" while the store is still loading for the first time.
        if (!this.screenStatusStore.loaded) return type;
        return this.screenStatusStore.activeScreenNameFor(type) === this.$route.params.screen
          ? type
          : null;
      },
      isFormsRoute() {
        return this.$route.path.startsWith('/submission-hub/forms');
      },
    },
    mounted() {
      this.screenStatusStore.load(import.meta.env.VITE_API_URL);
      if (!this.$route.params.screenType) {
        this.$nextTick(() => {
          this.menuOpen = true;
        });
      }
    },
    methods: {
      screenNameFor(screenType) {
        return this.screenStatusStore.activeScreenNameFor(screenType);
      },
      screenStatusFor(screenType) {
        return this.screenStatusStore.statusFor(screenType)?.status ?? null;
      },
      async onScreenChange(screen) {
        // The forms route needs a resolved :screen segment after the type (unlike
        // instructions, which is just :screenType) — true whether we're switching type on
        // an existing forms/:type/:screen route or picking a type for the first time from
        // the bare /submission-hub/forms page.
        if (this.$route.path.startsWith('/submission-hub/forms')) {
          await this.screenStatusStore.load(import.meta.env.VITE_API_URL);
          const activeName = this.screenStatusStore.activeScreenNameFor(screen);
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

  .screen-selector__status {
    margin-left: 4px;
    font-size: 0.7rem;
  }

  .screen-selector__status--open {
    color: #4caf50;
  }

  .screen-selector__status--closed {
    color: #f44336;
  }
</style>
