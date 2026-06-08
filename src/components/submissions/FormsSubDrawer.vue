<template>
  <v-navigation-drawer app location="left" width="220" :order="2">
    <v-list density="comfortable" nav>
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
  export default {
    name: 'FormsSubDrawer',
    data() {
      return {
        items: [
          {
            id: 'overview',
            title: 'Overview',
            route: '/submissions/forms',
            icon: 'mdi-home-outline',
          },
          {
            id: 'application',
            title: 'Application',
            route: '/submissions/forms/application',
            icon: 'mdi-file-document-edit-outline',
          },
          {
            id: 'documents',
            title: 'Supporting Documents',
            route: '/submissions/forms/documents',
            icon: 'mdi-paperclip',
          },
        ],
      };
    },
  };
</script>

<style scoped></style>
