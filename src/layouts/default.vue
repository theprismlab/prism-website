<template>
  <prism-app-bar
    site="marketing"
    :base-url="baseUrl"
    :is-logged-in="isLoggedIn"
    :current-path="currentPath"
  />
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
        //  showBanner: true
      };
    },
    computed: {
      isLoggedIn() {
        console.log(localStorage);
        const user_info = localStorage.getItem('user_info');
        const user_info_parsed = JSON.parse(user_info);
        if (user_info_parsed) {
          return user_info_parsed.email !== 'clue_demo@clue.io';
        }
        return false;
      },
      currentPath() {
        return this.$route.path;
      },
    },
    methods: {},
  };
</script>
<style scoped></style>
