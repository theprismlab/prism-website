<template>
  <sub-drawer title="Contents">
    <screen-selector />
    <v-list
      v-if="screenType"
      :opened="openedGroups"
      density="comfortable"
      nav
      @update:opened="openedGroups = $event"
    >
      <template v-for="item in items" :key="item.id">
        <v-list-group v-if="item.pages && item.pages.length" :value="item.id">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              class="menu-group-activator"
              :to="item.route"
              :prepend-icon="item.icon"
              :title="item.title"
              :active="isGroupActive(item)"
              active-class="active-menu-item"
            />
          </template>

          <v-list-item
            v-for="pageDef in flattenOutline(item.pages).slice(1)"
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
    <!-- <div style="text-align: center">
      <v-btn
        rounded
        variant="outlined"
        :to="`/submission-hub/forms/${screen}`"
        append-icon="mdi-arrow-right"
        class="mt-4 mx-auto"
      >
        Start Form</v-btn
      >
    </div> -->

    <v-list v-if="screenType" density="comfortable" nav>
      <v-list-item
        :to="`/submission-hub/forms/${screen}`"
        title="Start Form"
        append-icon="mdi-arrow-right"
        class="submissions-nav-cta"
        exact
      />
    </v-list>
  </sub-drawer>
</template>

<script>
  import SubDrawer from '../SubDrawer.vue';
  import ScreenSelector from '../ScreenSelector.vue';
  import { loadPdfOutline, flattenOutline, PDF_PATHS } from './pdf-outline.js';

  export default {
    name: 'InstructionsSubDrawer',
    components: { SubDrawer, ScreenSelector },
    data() {
      return {
        openedGroups: ['test-agent'],
        testAgentPages: [],
        shippingPages: [],
      };
    },
    computed: {
      screenType() {
        return this.$route.params.screenType;
      },
      testAgentPdf() {
        return this.screenType
          ? (PDF_PATHS.TEST_AGENT[this.screenType.toUpperCase()] ?? null)
          : null;
      },
      shippingPdf() {
        return this.screenType ? PDF_PATHS.SHIPPING : null;
      },
      items() {
        return [
          {
            id: 'test-agent',
            title: 'Test Agent Instructions',
            route: `/submission-hub/instructions/${this.screenType}/test-agent`,
            icon: 'mdi-flask-outline',
            pages: this.testAgentPages,
          },
          {
            id: 'shipping',
            title: 'Shipping Instructions',
            route: `/submission-hub/instructions/${this.screenType}/shipping`,
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
        return this.$route.query.dest === pageDef.slug;
      },
    },
  };
</script>

<style scoped>
  .v-list--nav {
    padding-inline: 0px;
  }
  .v-list-item {
    color: var(--prism-color-text);
    border-radius: 0px;
    padding-left: 8px;
    padding-right: 8px;
    border-left: 3px solid transparent;
    font-size: var(--prism-text-subtitle-1-size);
    font-weight: var(--prism-font-weight-medium);
    transition:
      background-color var(--prism-transition-fast),
      color var(--prism-transition-fast);
  }
  .v-list-item:not(.submissions-nav-cta):hover {
    background-color: var(--prism-color-primary-lighter);
    color: var(--prism-color-primary);
  }
  .v-list-item--active {
    border-left-color: var(--prism-color-primary) !important;
    background-color: var(--prism-color-primary-lighter) !important;
  }
  ::v-deep .menu-group-activator .v-list-item__prepend > .v-icon ~ .v-list-item__spacer {
    width: 12px;
  }
  ::v-deep .v-list-item--active > .v-list-item__overlay,
  ::v-deep .v-list-item--active:hover > .v-list-item__overlay,
  ::v-deep .v-list-item--active:focus-visible > .v-list-item__overlay {
    opacity: 0 !important;
    pointer-events: none !important;
  }
  /* .outline-level-0 > * {
    padding-left: 0px !important;
  }
  .outline-level-1 > * {
    padding-left: 24px !important;
  }
  .outline-level-2 > * {
    padding-left: 32px !important;
  } */
  /* ::v-deep .v-list-group__items .v-list-item {
    padding-inline-start: 32px !important;
  } */
</style>
