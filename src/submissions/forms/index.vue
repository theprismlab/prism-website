<template>
  <page>
    <container-md>
      <breadcrumbs />
      <prism-page-title>Forms</prism-page-title>
      <p class="prism-text-body-1">Select a screen above to view forms.</p>
    </container-md>
  </page>
</template>

<script>
  import Breadcrumbs from '@/components/Breadcrumbs.vue';

  export default {
    name: 'FormsIndex',
    components: { Breadcrumbs },
  };
</script>
