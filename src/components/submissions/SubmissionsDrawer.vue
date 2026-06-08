<template>
  <v-navigation-drawer v-model="drawer" app location="left" width="260" :order="1">
    <v-list density="comfortable" nav>
      <v-list-subheader>Submissions</v-list-subheader>
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
    name: 'SubmissionsDrawer',
    data() {
      return {
        drawer: true,
        items: [
          {
            id: 'overview',
            title: 'Overview',
            route: '/submissions',
            icon: 'mdi-view-dashboard-outline',
          },
        ],
      };
    },
  };
</script>

<style scoped></style>
