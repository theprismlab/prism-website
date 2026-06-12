<template>
  <page>
    <container-md>
      <breadcrumbs :items="[{ title: 'Submissions', disabled: true }]" />
      <prism-page-title>Submissions</prism-page-title>
      <p class="prism-text-body-1">Submissions page content goes here.</p>
    </container-md>
  </page>
</template>

<script>
  import Breadcrumbs from '@/components/Breadcrumbs.vue';

  export default {
    name: 'SubmissionsOverview',
    components: { Breadcrumbs },
  };
</script>

<style scoped></style>
