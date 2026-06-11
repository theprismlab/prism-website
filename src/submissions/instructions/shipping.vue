<template>
  <page>
    <container-md>
      <prism-page-title>{{
        currentPage ? currentPage.title : 'Shipping Instructions'
      }}</prism-page-title>
      <iframe :key="iframeKey" :src="pdfUrl" class="pdf-embed" />
    </container-md>
  </page>
</template>

<script>
  import { loadPdfOutline, flattenOutline } from './pdf-outline';

  const PDF_PATH = '/pdfs/instructions/Shipping.pdf';

  export default {
    name: 'ShippingInstructions',
    data() {
      return { pages: [] };
    },
    computed: {
      flatPages() {
        console.log('Flattening pages', this.pages);
        return flattenOutline(this.pages);
      },
      currentPage() {
        const dest = this.$route.query.dest;
        return this.flatPages.find((p) => p.key === dest) || this.flatPages[0] || null;
      },
      pdfUrl() {
        const hash = this.currentPage ? this.currentPage.hash : '';
        return hash ? `${PDF_PATH}#${hash}` : PDF_PATH;
      },
      iframeKey() {
        return this.currentPage ? this.currentPage.key : 'default';
      },
    },
    async created() {
      this.pages = await loadPdfOutline(PDF_PATH);
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
