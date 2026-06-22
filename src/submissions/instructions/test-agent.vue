<template>
  <page>
    <app-container wide>
      <prism-page-title>Instructions — {{ this.screen }}</prism-page-title>
      <!-- <prism-page-title>{{
        currentPage ? currentPage.title : 'Test Agent Instructions'
      }}</prism-page-title> -->
      <iframe v-if="pdfUrl" :key="iframeKey" :src="pdfUrl" class="pdf-embed" />
    </app-container>
  </page>
</template>

<script>
  import { loadPdfOutline, flattenOutline, PDF_PATHS } from './pdf-outline';

  export default {
    name: 'TestAgentInstructions',
    data() {
      return { pages: [] };
    },
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      pdfPath() {
        return this.screen ? PDF_PATHS.TEST_AGENT[this.screen] : null;
      },
      flatPages() {
        return flattenOutline(this.pages);
      },
      currentPage() {
        const dest = this.$route.query.dest;
        return this.flatPages.find((p) => p.slug === dest) || this.flatPages[0] || null;
      },
      pdfUrl() {
        if (!this.pdfPath) return null;
        const encoded = this.pdfPath
          .split('/')
          .map((s) => encodeURIComponent(s))
          .join('/');
        const hash = this.currentPage ? this.currentPage.hash : '';
        return hash ? `${encoded}#${hash}` : encoded;
      },
      iframeKey() {
        return this.currentPage ? this.currentPage.key : 'default';
      },
    },
    watch: {
      pdfPath: {
        immediate: true,
        async handler(url) {
          this.pages = url ? await loadPdfOutline(url) : [];
        },
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
