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

          <template v-for="pageDef in item.pages" :key="pageDef.key">
            <v-list-group
              v-if="pageDef.children && pageDef.children.length"
              :value="subGroupKey(item, pageDef)"
            >
              <template #activator="{ props: subProps }">
                <v-list-item
                  v-bind="subProps"
                  :to="{ path: item.route, query: { dest: pageDef.key } }"
                  :title="pageDef.title"
                  :active="isPageActive(item, pageDef)"
                  active-class="active-menu-item"
                />
              </template>
              <v-list-item
                v-for="child in pageDef.children"
                :key="child.key"
                :to="{ path: item.route, query: { dest: child.key } }"
                :title="child.title"
                :active="isPageActive(item, child)"
                active-class="active-menu-item"
              />
            </v-list-group>

            <v-list-item
              v-else
              :to="{ path: item.route, query: { dest: pageDef.key } }"
              :title="pageDef.title"
              :active="isPageActive(item, pageDef)"
              active-class="active-menu-item"
            />
          </template>
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
  import { loadPdfOutline } from './pdf-outline';

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
        return this.screen ? '/pdfs/instructions/Instructions.pdf' : null;
      },
      shippingPdf() {
        return this.screen ? '/pdfs/instructions/Shipping.pdf' : null;
      },
      items() {
        return [
          {
            id: 'test-agent',
            title: 'Test Agent Instructions',
            route: `/submissions/instructions/${this.screen}/test-agent`,
            icon: 'mdi-flask-outline',
            pages: this.testAgentPages,
          },
          {
            id: 'shipping',
            title: 'Shipping Instructions',
            route: `/submissions/instructions/${this.screen}/shipping`,
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
      '$route.query.dest': {
        immediate: true,
        handler(dest) {
          if (!dest) return;
          this.ensureParentOpen(dest);
        },
      },
      items: {
        handler() {
          const dest = this.$route.query.dest;
          if (dest) this.ensureParentOpen(dest);
        },
        deep: true,
      },
    },
    methods: {
      isGroupActive(item) {
        return this.$route.path.includes(`/${item.id}`);
      },
      isPageActive(item, pageDef) {
        if (!this.$route.path.endsWith(item.id)) return false;
        const current = this.$route.query.dest;
        return current === pageDef.key || (!current && pageDef === item.pages[0]);
      },
      subGroupKey(item, pageDef) {
        return `${item.id}/${pageDef.key}`;
      },
      ensureParentOpen(dest) {
        for (const item of this.items) {
          for (const page of item.pages || []) {
            if (page.children && page.children.some((c) => c.key === dest)) {
              const key = this.subGroupKey(item, page);
              if (!this.openedGroups.includes(key)) {
                this.openedGroups = [...this.openedGroups, key];
              }
              return;
            }
          }
        }
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
