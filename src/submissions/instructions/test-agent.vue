<template>
  <page>
    <app-container wide>
      <prism-page-title>Instructions — {{ this.screenType }}</prism-page-title>
      <!-- <prism-page-title>{{
        currentPage ? currentPage.title : 'Test Agent Instructions'
      }}</prism-page-title> -->
      <v-alert v-if="invalidScreenType" type="error" variant="tonal" density="compact" class="mb-4">
        {{ invalidScreenTypeMsg }}
      </v-alert>
      <iframe v-if="pdfUrl" :key="iframeKey" :src="pdfUrl" class="pdf-embed" />
    </app-container>
  </page>
</template>

<script>
  import { loadPdfOutline, flattenOutline, PDF_PATHS } from './pdf-outline';
  import { useWindowStatusStore, invalidScreenTypeMessage } from '../window-status-store.js';

  export default {
    name: 'TestAgentInstructions',
    setup() {
      return { windowStatusStore: useWindowStatusStore() };
    },
    data() {
      return { pages: [] };
    },
    computed: {
      screenType() {
        return this.$route.params.screenType;
      },
      // Only claim invalidity once the store has actually loaded — otherwise we'd flash the
      // error before we've had a chance to check.
      invalidScreenType() {
        if (!this.screenType) return false;
        if (!this.windowStatusStore.loaded) return false;
        return !this.windowStatusStore.isValidType(this.screenType);
      },
      invalidScreenTypeMsg() {
        return invalidScreenTypeMessage(this.screenType);
      },
      pdfPath() {
        return this.screenType ? (PDF_PATHS.TEST_AGENT[this.screenType.toUpperCase()] ?? null) : null;
      },
      flatPages() {
        return flattenOutline(this.pages);
      },
      currentPage() {
        const dest = this.$route.query.dest;
        return this.flatPages.find((p) => p.slug === dest) || null;
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
    mounted() {
      this.windowStatusStore.load(import.meta.env.VITE_API_URL);
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
