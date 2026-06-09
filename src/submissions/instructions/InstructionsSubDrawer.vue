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
              :to="item.route"
              :prepend-icon="item.icon"
              :title="item.title"
              active-class="active-menu-item"
            />
          </template>
          <v-list-item
            v-for="(pageLabel, idx) in item.pages"
            :key="idx"
            :to="{ path: item.route, query: { page: idx + 1 } }"
            :title="pageLabel"
            prepend-icon="mdi-file-outline"
            exact
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

  export default {
    name: 'InstructionsSubDrawer',
    components: { ScreenSelector },
    data() {
      return {
        openedGroups: [],
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
            pages: ['Page 1', 'Page 2'],
          },
          {
            id: 'shipping',
            title: 'Shipping Instructions',
            route: `/submissions/instructions/${this.screen}/shipping`,
            icon: 'mdi-truck-outline',
          },
        ];
      },
    },
    watch: {
      '$route.path': {
        immediate: true,
        handler(path) {
          if (path.includes('/test-agent') && !this.openedGroups.includes('test-agent')) {
            this.openedGroups = ['test-agent'];
          }
        },
      },
    },
  };
</script>

<style scoped></style>
