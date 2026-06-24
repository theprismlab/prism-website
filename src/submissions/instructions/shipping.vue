<template>
  <page>
    <app-container wide>
      <prism-page-title>Instructions — {{ this.screenType }}</prism-page-title>
      <!-- <prism-page-title>{{
        currentPage ? currentPage.title : 'Shipping Instructions'
      }}</prism-page-title> -->
      <iframe :key="iframeKey" :src="pdfUrl" class="pdf-embed" />
    </app-container>
  </page>
</template>

<script>
  import { loadPdfOutline, flattenOutline, PDF_PATHS } from './pdf-outline';

  export default {
    name: 'ShippingInstructions',
    data() {
      return { pages: [] };
    },
    computed: {
      screenType() {
        return this.$route.params.screenType;
      },
      flatPages() {
        return flattenOutline(this.pages);
      },
      currentPage() {
        const dest = this.$route.query.dest;
        return this.flatPages.find((p) => p.slug === dest) || null;
      },
      pdfUrl() {
        const hash = this.currentPage ? this.currentPage.hash : '';
        return hash ? `${PDF_PATHS.SHIPPING}#${hash}` : PDF_PATHS.SHIPPING;
      },
      iframeKey() {
        return this.currentPage ? this.currentPage.key : 'default';
      },
    },
    async created() {
      this.pages = await loadPdfOutline(PDF_PATHS.SHIPPING);
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
