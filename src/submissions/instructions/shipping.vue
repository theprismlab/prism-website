<template>
  <page>
    <app-container wide>
      <prism-page-title>Instructions — {{ this.screenType }}</prism-page-title>
      <!-- <prism-page-title>{{
        currentPage ? currentPage.title : 'Shipping Instructions'
      }}</prism-page-title> -->
      <v-alert v-if="invalidScreenType" type="error" variant="tonal" density="compact" class="mb-4">
        {{ invalidScreenTypeMsg }}
      </v-alert>
      <iframe v-if="!invalidScreenType" :key="iframeKey" :src="pdfUrl" class="pdf-embed" />
    </app-container>
  </page>
</template>

<script>
  import { loadPdfOutline, flattenOutline, PDF_PATHS } from './pdf-outline';
  import { useWindowStatusStore, invalidScreenTypeMessage } from '../window-status-store.js';

  export default {
    name: 'ShippingInstructions',
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
      // error before we've had a chance to check. Shipping instructions are the same PDF for
      // every type, but a bogus/typo'd :screenType shouldn't still show a legitimate-looking
      // PDF under a nonsense header.
      invalidScreenType() {
        if (!this.screenType) return false;
        if (!this.windowStatusStore.loaded) return false;
        return !this.windowStatusStore.isValidType(this.screenType);
      },
      invalidScreenTypeMsg() {
        return invalidScreenTypeMessage(this.screenType);
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
