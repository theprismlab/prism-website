<template>
  <prism-app-bar site="marketing" :base-url="baseUrl" />
  <v-main>
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script>
  export default {
    name: 'Default',
    components: {},
    data: function () {
      return {
        baseUrl: import.meta.env.VITE_PRISM_BASE_URL || '',
      };
    },
    computed: {},
    methods: {},
  };
</script>
<style scoped></style>
