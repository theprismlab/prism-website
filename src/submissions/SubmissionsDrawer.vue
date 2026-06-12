<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="isSubSection"
    app
    location="left"
    width="260"
    :order="1"
  >
    <v-list density="comfortable" nav>
      <v-list-subheader v-if="!isSubSection">Submissions</v-list-subheader>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :to="item.route"
        :title="isSubSection ? undefined : item.title"
        :prepend-icon="item.icon"
        :active="isItemActive(item)"
        active-class="active-menu-item"
        lines="one"
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
      };
    },
    methods: {
      isItemActive(item) {
        if (item.activePrefix) return this.$route.path.startsWith(item.activePrefix);
        return this.$route.path === item.route;
      },
    },
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      isSubSection() {
        const path = this.$route.path;
        return (
          path.startsWith('/submissions/instructions') || path.startsWith('/submissions/forms')
        );
      },
      items() {
        return [
          {
            id: 'screens',
            title: 'Screens',
            route: '/submissions',
            // icon: 'mdi-flask-outline',
                        icon: 'mdi-layers-outline',
            activePrefix: null,
          },
          {
            id: 'instructions',
            title: 'Instructions',
            route: this.screen
              ? `/submissions/instructions/${this.screen}`
              : '/submissions/instructions',
            icon: 'mdi-information-variant-box-outline',
            activePrefix: '/submissions/instructions',
          },
          {
            id: 'forms',
            title: 'Forms',
            route: this.screen ? `/submissions/forms/${this.screen}` : '/submissions/forms',
            icon: 'mdi-file-document-outline',
            activePrefix: '/submissions/forms',
          },
          {
            id: 'quote-po',
            title: 'View Quote & Upload PO',
            route: '/submissions/quote-and-po',
            icon: 'mdi-invoice-import-outline',
            activePrefix: null,
          },
        ];
      },
    },
  };
</script>

<style scoped></style>
