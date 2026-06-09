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
  import ScreenSelector from '../ScreenSelector.vue';

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
            id: 'test-agent',
            title: 'Test Agent Instructions',
            route: `/submissions/instructions/${this.screen}/test-agent`,
            icon: 'mdi-flask-outline',
          },
          {
            id: 'shipping',
            title: 'Shipping Instructions',
            route: `/submissions/instructions/${this.screen}/shipping`,
            icon: 'mdi-truck-outline',
          },
        ];
      },
    },
  };
</script>

<style scoped></style>
