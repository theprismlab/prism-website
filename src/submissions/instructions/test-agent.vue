<template>
  <page>
    <container-md>
      <prism-page-title>{{
        currentPage ? currentPage.title : 'Test Agent Instructions'
      }}</prism-page-title>
      <iframe v-if="pdfUrl" :key="iframeKey" :src="pdfUrl" class="pdf-embed" />
    </container-md>
  </page>
</template>

<script>
  import { loadPdfOutline, flattenOutline } from './pdf-outline';

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
        return this.screen ? `/pdfs/instructions/Instructions.pdf` : null;
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
        const hash = this.currentPage ? this.currentPage.hash : '';
        return hash ? `${this.pdfPath}#${hash}` : this.pdfPath;
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
