<template>
  <v-navigation-drawer v-model="drawer" :rail="isSubSection" app location="left" width="260" :order="1">
    <v-list density="comfortable" nav>
      <v-list-subheader>Submissions</v-list-subheader>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :to="item.route"
        :title="item.title"
        :prepend-icon="item.icon"
        :exact="item.exact"
        active-class="active-menu-item"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'SubmissionsDrawer',
    computed: {
      isSubSection() {
        const path = this.$route.path;
        return (
          path.startsWith('/submissions/instructions') || path.startsWith('/submissions/forms')
        );
      },
    },
    data() {
      return {
        drawer: true,
        items: [
          {
            id: 'screens',
            title: 'Screens',
            route: '/submissions',
            icon: 'mdi-flask-outline',
            exact: true,
          },
          {
            id: 'instructions',
            title: 'Instructions',
            route: '/submissions/instructions',
            icon: 'mdi-information-variant-box-outline',
            exact: false,
          },
          {
            id: 'forms',
            title: 'Forms',
            route: '/submissions/forms',
            icon: 'mdi-file-document-arrow-right-outline',
            exact: false,
          },
          {
            id: 'quote-po',
            title: 'View Quote & Upload PO',
            route: '/submissions/quote-and-po',
            icon: 'mdi-currency-usd',
            exact: true,
          },
        ],
      };
    },
  };
</script>

<style scoped></style>
