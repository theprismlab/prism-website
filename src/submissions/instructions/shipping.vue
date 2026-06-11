<template>
  <page>
    <container-md>
      <prism-page-title>{{ currentPage.title }}</prism-page-title>
      <iframe :key="pageSlug" :src="pdfUrl" class="pdf-embed" />
    </container-md>
  </page>
</template>

<script>
  import { SHIPPING_PAGES } from './pages-config';

  export default {
    name: 'ShippingInstructions',
    beforeRouteUpdate(to, _from, next) {
      if (!to.query.page) {
        next({ ...to, query: { page: '1' } });
      } else {
        next();
      }
    },
    computed: {
      pageSlug() {
        return this.$route.query.page;
      },
      currentPage() {
        return SHIPPING_PAGES.find((p) => p.slug === this.pageSlug) || SHIPPING_PAGES[0];
      },
      pdfUrl() {
        return `/pdfs/instructions/shipping.pdf#page=${this.currentPage.pdfPage}`;
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
