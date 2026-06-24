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
  export default {
    name: 'ScreenSelector',
    data() {
      return {
        screens: ['MTS', 'CPS', 'APS', 'EPS', 'AIR'],
        menuOpen: false,
      };
    },
    mounted() {
      if (!this.$route.params.screenType) {
        this.$nextTick(() => {
          this.menuOpen = true;
        });
      }
    },
    methods: {
      onScreenChange(screen) {
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
