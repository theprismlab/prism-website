<template>
  <v-main>
    <container-sm v-if="$route.meta.breadcrumbs">
      <breadcrumbs />
    </container-sm>
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script>
  export default {
    name: 'Default',
  };
</script>
