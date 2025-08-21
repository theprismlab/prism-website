<template>
  <v-app :style="cssProps">
    <router-view />
  </v-app>
</template>

<script>
export default {
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
