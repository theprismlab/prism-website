<template>
  <page>
    <container-md>
      <breadcrumbs />
      <prism-page-title>View Quote &amp; Upload PO</prism-page-title>
      <p class="prism-text-body-1">Review your quote and upload a purchase order.</p>
    </container-md>
  </page>
</template>

<script>
  import Breadcrumbs from '@/components/Breadcrumbs.vue';

  export default {
    name: 'QuoteAndPO',
    components: { Breadcrumbs },
  };
</script>
