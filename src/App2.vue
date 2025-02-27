<template>
  <v-app :style="cssProps">
    <v-app-bar  app dense light class="elevation-1">
        <v-app-bar-nav-icon v-if="$vuetify.display.mobile" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        <img id="prism_logo" alt="PRISM Logo" width="160px" src="../assets/logo.png"/>
      </router-link>
    </v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>


      <v-navigation-drawer
        v-if="$vuetify.display.mobile"
        v-model="drawer"
        app
        clipped
        hide-overlay
        :style="{ top:'50px', zIndex: 6 }"
        temporary
      >
        <v-list
          :items="items"
        ></v-list>
      </v-navigation-drawer>

    <router-view />



  </v-app>
</template>

<script>
export default {
  data(){
    return{
      drawer: true
    }
  },
  computed: {
    mobile(){
      return this.$vuetify.display.mobile
    },
    cssProps () {
      var themeColors = {}
      Object.keys(this.$vuetify.theme.themes.prismTheme.colors).forEach((color) => {
        themeColors[`--v-${color}`] = this.$vuetify.theme.themes.prismTheme.colors[color]
      })
      return themeColors
    }
  }
}
</script>
