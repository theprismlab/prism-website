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
    <!-- <template v-if="$vuetify.display.xs">
      <div class="px-3 py-2">
        <span class="text-body-2 font-weight-medium">{{ title }}</span>
      </div>
      <v-divider />
    </template> -->

    <slot />
  </v-navigation-drawer>

  <Teleport to="body">
    <button
      v-if="$vuetify.display.xs && !drawerOpen"
      class="subdrawer-tab subdrawer-tab--open"
      @click="drawerOpen = true"
    >
      <v-icon size="16">mdi-chevron-right</v-icon>
    </button>

    <button
      v-if="$vuetify.display.xs && drawerOpen"
      class="subdrawer-tab subdrawer-tab--close"
      @click="drawerOpen = false"
    >
      <v-icon size="16">mdi-chevron-left</v-icon>
    </button>
  </Teleport>
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
    top: 75px;
    z-index: 1006;
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background-color: rgba(var(--v-theme-surface-variant), 0.15);
    cursor: pointer;
    padding: 0;
    /* border-radius: 0 10px 10px 0; 
    width: 20px;
    height: 48px; */
    border-radius: 36px;
    width: 36px;
    height: 36px;
    background-color: rgb(222, 222, 222);
  }

  .subdrawer-tab:hover {
    background-color: rgba(var(--v-theme-surface-variant), 0.3);
  }

  .subdrawer-tab--open {
    left: 56px;
    /* border-radius: 0 10px 10px 0; */
  }

  .subdrawer-tab--close {
    left: calc(280px + 56px);
  }
</style>
