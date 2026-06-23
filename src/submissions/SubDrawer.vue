<template>
  <v-navigation-drawer
    v-model="drawerOpen"
    app
    location="left"
    :width="$vuetify.display.xs ? 280 : 220"
    :temporary="$vuetify.display.xs"
    :mobile="false"
    :order="2"
  >
    <template v-if="$vuetify.display.xs">
      <div class="d-flex align-center justify-space-between px-3 py-2">
        <span class="text-body-2 font-weight-medium">{{ title }}</span>
        <v-btn icon="mdi-close" variant="text" size="small" density="compact" @click="drawerOpen = false" />
      </div>
      <v-divider />
    </template>

    <slot />
  </v-navigation-drawer>

  <button
    v-if="$vuetify.display.xs && !drawerOpen"
    class="subdrawer-tab"
    @click="drawerOpen = true"
  >
    <v-icon size="16">mdi-chevron-right</v-icon>
  </button>
</template>

<script>
  export default {
    name: 'SubDrawer',
    props: {
      title: {
        type: String,
        default: 'Navigation',
      },
    },
    data() {
      return { drawerOpen: true };
    },
    created() {
      if (this.$vuetify.display.xs) this.drawerOpen = false;
    },
    watch: {
      '$route.path': {
        handler() {
          if (this.$vuetify.display.xs) this.drawerOpen = false;
        },
      },
      '$route.query.dest': {
        handler() {
          if (this.$vuetify.display.xs) this.drawerOpen = false;
        },
      },
    },
  };
</script>

<style scoped>
  .subdrawer-tab {
    position: fixed;
    left: 56px;
    top: 80px;
    z-index: 1006;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 48px;
    border: none;
    border-radius: 0 10px 10px 0;
    background-color: rgba(var(--v-theme-surface-variant), 0.15);
    cursor: pointer;
    padding: 0;
  }

  .subdrawer-tab:hover {
    background-color: rgba(var(--v-theme-surface-variant), 0.3);
  }
</style>
