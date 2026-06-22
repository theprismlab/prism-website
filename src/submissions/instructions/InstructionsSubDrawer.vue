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
        <v-list-group v-if="item.pages && item.pages.length" :value="item.id">
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
            v-for="pageDef in flattenOutline(item.pages)"
            :key="pageDef.key"
            :to="{ path: item.route, query: { dest: pageDef.slug } }"
            :title="pageDef.title"
            :active="isPageActive(item, pageDef)"
            :class="`outline-level-${pageDef.level}`"
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

    <v-list v-if="screen" density="comfortable" nav>
      <v-list-item
        id="form-btn"
        :to="`/submission-hub/forms/${screen}`"
        title="Start Form"
        append-icon="mdi-arrow-right"
        exact
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import ScreenSelector from '../ScreenSelector.vue';
  import { loadPdfOutline, flattenOutline, PDF_PATHS } from './pdf-outline.js';

  export default {
    name: 'InstructionsSubDrawer',
    components: { ScreenSelector },
    data() {
      return {
        openedGroups: ['test-agent'],
        testAgentPages: [],
        shippingPages: [],
      };
    },
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      testAgentPdf() {
        return this.screen ? (PDF_PATHS.TEST_AGENT[this.screen.toUpperCase()] ?? null) : null;
      },
      shippingPdf() {
        return this.screen ? PDF_PATHS.SHIPPING : null;
      },
      items() {
        return [
          {
            id: 'test-agent',
            title: 'Test Agent Instructions',
            route: `/submission-hub/instructions/${this.screen}/test-agent`,
            icon: 'mdi-flask-outline',
            pages: this.testAgentPages,
          },
          {
            id: 'shipping',
            title: 'Shipping Instructions',
            route: `/submission-hub/instructions/${this.screen}/shipping`,
            icon: 'mdi-truck-outline',
            pages: this.shippingPages,
          },
        ];
      },
    },
    watch: {
      testAgentPdf: {
        immediate: true,
        async handler(url) {
          this.testAgentPages = url ? await loadPdfOutline(url) : [];
        },
      },
      shippingPdf: {
        immediate: true,
        async handler(url) {
          this.shippingPages = url ? await loadPdfOutline(url) : [];
        },
      },
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
      flattenOutline,
      isGroupActive(item) {
        return this.$route.path.includes(`/${item.id}`);
      },
      isPageActive(item, pageDef) {
        if (!this.$route.path.endsWith(item.id)) return false;
        const current = this.$route.query.dest;
        return current === pageDef.slug || (!current && pageDef === flattenOutline(item.pages)[0]);
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
  /* .v-list-item--active {
    color: var(--v-primary-base);
  } */
  .v-list-item--active > * > * {
    font-weight: bold !important;
  }

  .outline-level-0 > * {
    padding-left: 0px !important;
  }
  .outline-level-1 > * {
    padding-left: 24px !important;
  }
  .outline-level-2 > * {
    padding-left: 32px !important;
  }
  /* .v-list-group--open:has(.v-list-item--active) {
    background-color: rgba(var(--v-theme-primary), 0.08);
  } */
</style>
