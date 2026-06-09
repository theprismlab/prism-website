<template>
  <page>
    <container-md>
      <page-title>Shipping Instructions</page-title>
      <iframe :src="pdfUrl" class="pdf-embed" />
    </container-md>
  </page>
</template>

<script>
  export default {
    name: 'ShippingInstructions',
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      pdfUrl() {
        return `/pdfs/instructions/${this.screen}_shipping.pdf`;
      },
    },
  };
</script>

<style scoped>
  .pdf-embed {
    width: 100%;
    height: 80vh;
    border: none;
    border-radius: 4px;
  }
</style>
