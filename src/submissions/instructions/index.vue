<template>
  <page>
    <container-md>
      <breadcrumbs
        :items="[
          { title: 'Submissions', to: '/submissions' },
          { title: 'Instructions', disabled: true },
        ]"
      />
      <prism-page-title>Instructions</prism-page-title>
      <p class="prism-text-body-1">Select a screen above to view instructions.</p>
    </container-md>
  </page>
</template>

<script>
  import Breadcrumbs from '@/components/Breadcrumbs.vue';

  export default {
    name: 'InstructionsIndex',
    components: { Breadcrumbs },
  };
</script>
