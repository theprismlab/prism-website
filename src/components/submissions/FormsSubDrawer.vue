<template>
  <v-navigation-drawer app location="left" width="220" :order="2">
    <screen-selector />
    <v-list v-if="screen" density="comfortable" nav>
      <v-list-subheader>Forms</v-list-subheader>
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
    name: 'FormsSubDrawer',
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
            route: `/submissions/forms/${this.screen}`,
            icon: 'mdi-home-outline',
          },
          {
            id: 'application',
            title: 'Application',
            route: `/submissions/forms/${this.screen}/application`,
            icon: 'mdi-file-document-edit-outline',
          },
          {
            id: 'documents',
            title: 'Supporting Documents',
            route: `/submissions/forms/${this.screen}/documents`,
            icon: 'mdi-paperclip',
          },
        ];
      },
    },
  };
</script>

<style scoped></style>
