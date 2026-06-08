<template>
  <SubmissionsDrawer />
  <v-main>
    <router-view />
  </v-main>
</template>

<script>
  import SubmissionsDrawer from '@/components/submissions/SubmissionsDrawer.vue';

  export default {
    name: 'SubmissionsLayout',
    components: { SubmissionsDrawer },
  };
</script>
