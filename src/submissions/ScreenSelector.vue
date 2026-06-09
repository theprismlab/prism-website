<template>
  <v-select
    :model-value="$route.params.screen"
    :items="screens"
    density="compact"
    variant="outlined"
    :placeholder="$route.params.screen ? undefined : 'Select screen'"
    hide-details
    class="mx-3 mt-2 mb-1"
    v-model:menu="menuOpen"
    @update:model-value="onScreenChange"
  />
</template>

<script>
  export default {
    name: 'ScreenSelector',
    data() {
      return {
        screens: ['MTS', 'CPS', 'APS', 'EPS', 'AIR'],
        menuOpen: false,
      };
    },
    mounted() {
      if (!this.$route.params.screen) {
        this.$nextTick(() => {
          this.menuOpen = true;
        });
      }
    },
    methods: {
      onScreenChange(screen) {
        const segments = this.$route.path.split('/');
        const screenIndex = segments.indexOf(this.$route.params.screen);
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
