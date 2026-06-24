<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    :mobile="false"
    app
    location="left"
    width="260"
    :order="1"
  >
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :to="item.route"
        :title="rail ? undefined : item.title"
        :prepend-icon="item.icon"
        :active="isItemActive(item)"
        active-class="active-menu-item"
        lines="one"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { useFormProgressStore } from './store';

  export default {
    name: 'SubmissionsDrawer',
    setup() {
      return {
        formStore: useFormProgressStore(),
      };
    },
    data() {
      return {
        drawer: true,
      };
    },
    watch: {
      '$route.params.screenType': {
        immediate: true,
        handler(screen) {
          this.formStore.setLastScreenType(screen);
        },
      },
    },
    methods: {
      isItemActive(item) {
        if (item.activePrefix) return this.$route.path.startsWith(item.activePrefix);
        return this.$route.path === item.route;
      },
    },
    computed: {
      screenType() {
        return this.$route.params.screenType || this.formStore.lastScreenType;
      },
      isSubSection() {
        const path = this.$route.path;
        return (
          path.startsWith('/submission-hub/instructions') ||
          path.startsWith('/submission-hub/forms')
        );
      },
      rail() {
        return this.$vuetify.display.xs || this.isSubSection;
      },
      items() {
        return [
          {
            id: 'overview',
            title: 'Overview',
            route: '/submission-hub/overview',
            icon: 'mdi-layers-outline',
          },
          {
            id: 'instructions',
            title: 'Instructions',
            route: this.screenType
              ? `/submission-hub/instructions/${this.screenType}`
              : '/submission-hub/instructions',
            icon: 'mdi-information-variant-box-outline',
            activePrefix: '/submission-hub/instructions',
          },
          {
            id: 'forms',
            title: 'Forms',
            route: this.screenType ? `/submission-hub/forms/${this.screenType}` : '/submission-hub/forms',
            icon: 'mdi-file-document-outline',
            activePrefix: '/submission-hub/forms',
          },
          {
            id: 'quote-po',
            title: 'View Quote & Upload PO',
            route: '/submission-hub/quote-and-po',
            icon: 'mdi-invoice-import-outline',
          },
        ];
      },
    },
  };
</script>
