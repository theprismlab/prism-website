<template>
  <v-select
    v-model:menu="menuOpen"
    :model-value="selectedScreenType"
    :items="screens"
    :placeholder="selectedScreenType ? undefined : 'Select screen'"
    hide-details
    @update:model-value="onScreenChange"
  >
    <template
      v-if="isFormsRoute"
      #item="{ item, props }"
    >
      <v-list-item v-bind="props">
        <template #title>
          {{ item.raw }}
          <span
            v-if="screenNameFor(item.raw)"
            class="screen-selector__name"
          >{{ screenNameFor(item.raw) }}
            <span
              v-if="screenStatusStore.windowStatusFor(item.raw)?.status"
              class="screen-selector__status"
              :style="{
                color: statusColors[screenStatusStore.windowStatusFor(item.raw)?.status],
              }"
            >
              ({{ formattedWindowStatusFor(item.raw) }})
            </span>
          </span>
        </template>
      </v-list-item>
    </template>

    <template
      v-if="isFormsRoute"
      #selection="{ item }"
    >
      {{ item.raw }}
      <span
        v-if="screenNameFor(item.raw)"
        class="screen-selector__name"
      >
        {{ screenNameFor(item.raw) }}
      </span>
    </template>
  </v-select>
</template>

<script>
  import { useScreenStatusStore } from './screen-status-store.js';

  // Preferred display order for the dropdown. Not the source of truth for which types are
  // valid — that's screenStatusStore's statuses map (populated from the API). This just orders
  // whatever the store knows about; a type the API stops returning drops out automatically, and
  // one the store starts returning that isn't listed here still shows up (appended).
  const SCREEN_ORDER = ['MTS', 'CPS', 'APS', 'EPS', 'AIR'];

  export default {
    name: 'ScreenSelector',
    setup() {
      return {
        screenStatusStore: useScreenStatusStore(),
      };
    },
    data() {
      return {
        menuOpen: false,
      };
    },
    computed: {
      // Before the store has loaded, statuses is empty — fall back to SCREEN_ORDER so the
      // dropdown isn't blank while the first fetch is in flight.
      screens() {
        const known = Object.keys(this.screenStatusStore.statuses);
        if (!known.length) return SCREEN_ORDER;
        return [
          ...SCREEN_ORDER.filter((type) => known.includes(type)),
          ...known.filter((type) => !SCREEN_ORDER.includes(type)),
        ];
      },
      statusColors() {
        return {
          OPEN: 'var(--prism-color-teal-accent-4)',
          MAX_CAPACITY: 'var(--prism-color-orange-accent-4)',
          CLOSE: 'var(--prism-color-red-accent-3)',
        };
      },
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
          return this.screenStatusStore.typeRouteStateFor(type).status !== 'invalid' ? type : null;
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
      formattedWindowStatusFor(screenType) {
        // parse status CLOSE to CLOSED, "_" to " "
        const status = this.screenStatusStore.windowStatusFor(screenType)?.status;
        if (status === 'CLOSE') {
          return 'CLOSED';
        }
        return status ? status.replace('_', ' ') : '';
      },
      screenNameFor(screenType) {
        return this.screenStatusStore.activeScreenNameFor(screenType);
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
</style>
