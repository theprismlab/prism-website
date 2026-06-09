<template>
  <SubmissionsDrawer />
  <InstructionsSubDrawer v-if="isInstructions" />
  <FormsSubDrawer v-if="isForms" />
  <v-main>
    <router-view />
  </v-main>
</template>

<script>
  import SubmissionsDrawer from './SubmissionsDrawer.vue';
  import InstructionsSubDrawer from './InstructionsSubDrawer.vue';
  import FormsSubDrawer from './FormsSubDrawer.vue';

  export default {
    name: 'SubmissionsLayout',
    components: { SubmissionsDrawer, InstructionsSubDrawer, FormsSubDrawer },
    computed: {
      isInstructions() {
        return this.$route.path.startsWith('/submissions/instructions');
      },
      isForms() {
        return this.$route.path.startsWith('/submissions/forms');
      },
    },
  };
</script>
