<template>
  <AppBar/>
  <v-main>
      
       <!-- <app-banner v-if="showBanner"></app-banner> -->
               <AACRBanner v-if="showBanner"></AACRBanner>
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script>
import AACRBanner from '@/components/AACRBanner.vue';

export default {
  name: 'Default',
  components: {
    AACRBanner
  },
  data: function() {
    return {
      showBanner: true
    }
  }
}
</script>
<style scoped>

</style>
