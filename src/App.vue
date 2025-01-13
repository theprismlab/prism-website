<template>
  <v-app :style="cssProps">
    <router-view />
  </v-app>
</template>

<script>
  export default {
  computed: {
  //  cssProps () {
  //     var themeColors = {}
  //     Object.keys(this.$vuetify.theme.themes.light).forEach((color) => {
  //       themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light[color]
  //     })
  //     return themeColors
  //  },
   cssProps () {
      var themeColors = {}
      Object.keys(this.$vuetify.theme.themes.prismTheme.colors).forEach((color) => {
        themeColors[`--v-${color}`] = this.$vuetify.theme.themes.prismTheme.colors[color]
      })
      return themeColors
   }
}
}

  //
</script>
