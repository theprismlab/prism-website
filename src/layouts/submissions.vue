<template>
  <SubmissionsDrawer />
  <InstructionsSubDrawer v-if="isInstructions" />
  <FormsSubDrawer v-if="isForms" />
  <v-main>
    <container-md>
      <breadcrumbs />
    </container-md>
    <router-view />
  </v-main>
</template>

<script>
  import SubmissionsDrawer from '@/submissions/SubmissionsDrawer.vue';
  import InstructionsSubDrawer from '@/submissions/instructions/InstructionsSubDrawer.vue';
  import FormsSubDrawer from '@/submissions/forms/FormsSubDrawer.vue';

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
