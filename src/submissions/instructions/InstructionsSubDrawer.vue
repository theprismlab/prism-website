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
              :active="isGroupActive(item)"
              active-class="active-menu-item"
            />
          </template>
          <v-list-item
            v-for="pageDef in item.pages"
            :key="pageDef.namedest"
            :to="{ path: item.route, query: { namedest: pageDef.namedest } }"
            :title="pageDef.title"
            :active="isPageActive(item, pageDef)"
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
        <v-divider></v-divider>
      </template>
    </v-list>
    <v-list v-if="screen" density="comfortable" nav>
      <v-list-item
        id="form-btn"
        :to="`/submissions/forms/${screen}`"
        title="Start Form"
        append-icon="mdi-arrow-right"
        exact
      />
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
          // {
          //   id: 'forms',
          //   title: `Start Form`,
          //   route: `/submissions/forms/${this.screen}`,
          //   icon: 'mdi-file-document-arrow-right-outline',
          //   type: 'button',
          // },
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
      isGroupActive(item) {
        return this.$route.path.includes(`/${item.id}`);
      },
      isPageActive(item, pageDef) {
        if (!this.$route.path.endsWith(item.id)) return false;
        const current = this.$route.query.namedest;
        return current === pageDef.namedest || (!current && pageDef === item.pages[0]);
      },
    },
  };
</script>

<style scoped>
  #form-btn {
    padding-left: 24px;
    padding-right: 16px;
    font-weight: bold;
    color: black;
    border-radius: 40px;
    border: 1px solid black;
  }
  .v-list--nav {
    padding-inline: 0px;
  }
  .v-list-item {
    border-radius: 0px;
    padding-left: 8px;
    padding-right: 8px;
  }
  .v-list-item--active {
    color: var(--v-primary-base);
    font-weight: 900 !important;
  }
  /* .v-list-item__overlay {

  } */
</style>
