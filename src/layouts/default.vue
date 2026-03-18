<template>
  <AppBar/>
  <v-main>
      
       <app-banner v-if="showBanner"></app-banner>
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script>
export default {
  name: 'Default',
  data: function() {
    return {
      showBanner: true
    }
  }
}
</script>
<style scoped>

</style>
