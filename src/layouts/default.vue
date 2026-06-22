<template>
  <v-main>
    <app-container v-if="$route.meta.breadcrumbs">
      <!-- <breadcrumbs /> -->
    </app-container>
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script>
  export default {
    name: 'Default',
  };
</script>
