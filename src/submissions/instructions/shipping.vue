<template>
  <page>
    <container-md>
      <breadcrumbs :items="breadcrumbs" />
      <prism-page-title>Instructions — {{ this.screen }}</prism-page-title>
      <!-- <prism-page-title>{{
        currentPage ? currentPage.title : 'Shipping Instructions'
      }}</prism-page-title> -->
      <iframe :key="iframeKey" :src="pdfUrl" class="pdf-embed" />
    </container-md>
  </page>
</template>

<script>
  import { loadPdfOutline, flattenOutline, PDF_PATHS } from './pdf-outline';
  import Breadcrumbs from '@/components/Breadcrumbs.vue';

  export default {
    name: 'ShippingInstructions',
    components: { Breadcrumbs },
    data() {
      return { pages: [] };
    },
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      breadcrumbs() {
        return [
          { title: 'Submissions', to: '/submissions' },
          { title: 'Instructions', to: '/submissions/instructions' },
          { title: `${this.screen} — Shipping`, disabled: true },
        ];
      },
      flatPages() {
        console.log('Flattening pages', this.pages);
        return flattenOutline(this.pages);
      },
      currentPage() {
        const dest = this.$route.query.dest;
        return this.flatPages.find((p) => p.slug === dest) || this.flatPages[0] || null;
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
