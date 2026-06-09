<template>
  <v-navigation-drawer app location="left" width="220" :order="2">
    <screen-selector />
    <v-list v-if="screen" density="comfortable" nav>
      <v-list-subheader>Instructions</v-list-subheader>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :to="item.route"
        :title="item.title"
        :prepend-icon="item.icon"
        exact
        active-class="active-menu-item"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import ScreenSelector from './ScreenSelector.vue';

  export default {
    name: 'InstructionsSubDrawer',
    components: { ScreenSelector },
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      items() {
        return [
          {
            id: 'overview',
            title: 'Overview',
            route: `/submissions/instructions/${this.screen}`,
            icon: 'mdi-home-outline',
          },
          {
            id: 'getting-started',
            title: 'Getting Started',
            route: `/submissions/instructions/${this.screen}/getting-started`,
            icon: 'mdi-rocket-launch-outline',
          },
          {
            id: 'requirements',
            title: 'Requirements',
            route: `/submissions/instructions/${this.screen}/requirements`,
            icon: 'mdi-checkbox-marked-circle-outline',
          },
        ];
      },
    },
  };
</script>

<style scoped></style>
