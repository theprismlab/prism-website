<template>
  <v-navigation-drawer app location="left" width="220" :order="2">
    <screen-selector />
    <v-list
      v-if="screen"
      :opened="openedGroups"
      density="comfortable"
      nav
      @update:opened="openedGroups = $event"
    >
      <v-list-subheader>Instructions</v-list-subheader>
      <template v-for="item in items" :key="item.id">
        <v-list-group v-if="item.pages" :value="item.id">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.title"
            />
          </template>
          <v-list-item
            v-for="pageDef in item.pages"
            :key="pageDef.slug"
            :to="{ path: item.route, query: { page: pageDef.slug } }"
            :title="pageDef.title"
            :active="isPageActive(item, pageDef)"
            prepend-icon="mdi-file-outline"
            active-class="active-menu-item"
          />
        </v-list-group>
        <v-list-item
          v-else
          :to="item.route"
          :title="item.title"
          :prepend-icon="item.icon"
          exact
          active-class="active-menu-item"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import ScreenSelector from '../ScreenSelector.vue';
  import { TEST_AGENT_PAGES, SHIPPING_PAGES } from './pages-config';

  export default {
    name: 'InstructionsSubDrawer',
    components: { ScreenSelector },
    data() {
      return {
        openedGroups: ['test-agent'],
      };
    },
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
            pages: TEST_AGENT_PAGES,
          },
          {
            id: 'shipping',
            title: 'Shipping Instructions',
            route: `/submissions/instructions/${this.screen}/shipping`,
            icon: 'mdi-truck-outline',
            pages: SHIPPING_PAGES,
          },
        ];
      },
    },
    watch: {
      '$route.path': {
        handler(path) {
          if (path.includes('/shipping') && !this.openedGroups.includes('shipping')) {
            this.openedGroups = [...this.openedGroups, 'shipping'];
          }
          if (path.includes('/test-agent') && !this.openedGroups.includes('test-agent')) {
            this.openedGroups = [...this.openedGroups, 'test-agent'];
          }
        },
      },
    },
    methods: {
      isPageActive(item, pageDef) {
        if (!this.$route.path.endsWith(item.id)) return false;
        const currentSlug = this.$route.query.page;
        return currentSlug === pageDef.slug || (!currentSlug && pageDef === item.pages[0]);
      },
    },
  };
</script>

<style scoped></style>
