<template>
  <prism-app-bar
    logo-href="/"
    :is-logged-in="isLoggedIn"
    :current-path="currentPath"
    @navigate="onNavigate"
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
        //  showBanner: true
      };
    },
    computed: {
      isLoggedIn() {
        return false;
      },
      currentPath() {
        return this.$route.path;
      },
    },
    methods: {
      onNavigate(item) {
        console.log('currentPath', this.currentPath);
        console.log('Navigating to', item.route);
        if (item.route !== this.currentPath) {
          if (item.route === '/portal') {
            window.open('https://theprismlab.org/portal', '_blank');
            return;
          }
          this.$router.push(item.route);
        }
      },
    },
  };
</script>
<style scoped></style>
