<template>
  <page>
    <app-container wide>
      <prism-page-title>Instructions — {{ this.screenType }}</prism-page-title>
      <!-- <prism-page-title>{{
        currentPage ? currentPage.title : 'Test Agent Instructions'
      }}</prism-page-title> -->
      <v-alert
        v-if="screenState.status === 'invalid'"
        type="error"
        variant="tonal"
        density="compact"
        class="mb-4"
      >
        {{ screenState.message }}
      </v-alert>
      <iframe v-if="pdfUrl" :key="iframeKey" :src="pdfUrl" class="pdf-embed" />
    </app-container>
  </page>
</template>

<script>
  import { loadPdfOutline, flattenOutline, PDF_PATHS } from './pdf-outline';
  import { useScreenStatusStore } from '../screen-status-store.js';

  export default {
    name: 'TestAgentInstructions',
    setup() {
      return { screenStatusStore: useScreenStatusStore() };
    },
    data() {
      return { pages: [] };
    },
    computed: {
      screenType() {
        return this.$route.params.screenType;
      },
      screenState() {
        return this.screenStatusStore.typeRouteStateFor(this.screenType);
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
      this.screenStatusStore.load(import.meta.env.VITE_API_URL);
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
