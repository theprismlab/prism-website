<template>
  <page>
    <container-md>
      <prism-page-title>{{ currentPage.title }}</prism-page-title>
      <iframe :key="currentPage.namedest" :src="pdfUrl" class="pdf-embed" />
    </container-md>
  </page>
</template>

<script>
  import { SHIPPING_PAGES } from './pages-config';

  export default {
    name: 'ShippingInstructions',
    computed: {
      currentPage() {
        const dest = this.$route.query.namedest;
        return SHIPPING_PAGES.find((p) => p.namedest === dest) || SHIPPING_PAGES[0];
      },
      pdfUrl() {
        return `/pdfs/instructions/shipping.pdf#nameddest=${this.currentPage.namedest}`;
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
