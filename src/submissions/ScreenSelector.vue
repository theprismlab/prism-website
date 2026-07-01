<template>
  <v-select
    :model-value="$route.params.screenType"
    :items="screens"
    :placeholder="$route.params.screenType ? undefined : 'Select screen'"
    hide-details
    v-model:menu="menuOpen"
    @update:model-value="onScreenChange"
  />
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
      async onScreenChange(screen) {
        // The forms route also carries a resolved :screen segment after the type, which
        // a plain segment swap would leave stale (pointing at the old type's screen).
        if (this.$route.params.screen) {
          await this.activeScreenStore.load(import.meta.env.VITE_API_URL);
          const active = this.activeScreenStore.activeScreenFor(screen);
          this.$router.push(
            active ? `/submission-hub/forms/${screen}/${active.name}` : '/submission-hub/forms',
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
