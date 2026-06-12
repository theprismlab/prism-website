<template>
  <v-main>
    <container-sm>
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
