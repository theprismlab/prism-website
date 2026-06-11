<template>
  <page>
    <container-md>
      <prism-page-title>{{ currentPage.title }}</prism-page-title>
      <iframe :key="pageSlug" :src="pdfUrl" class="pdf-embed" />
    </container-md>
  </page>
</template>

<script>
  import { TEST_AGENT_PAGES } from './pages-config';

  export default {
    name: 'TestAgentInstructions',
    beforeRouteUpdate(to, _from, next) {
      if (!to.query.page) {
        next({ ...to, query: { page: '1' } });
      } else {
        next();
      }
    },
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      pageSlug() {
        return this.$route.query.page;
      },
      currentPage() {
        return TEST_AGENT_PAGES.find((p) => p.slug === this.pageSlug) || TEST_AGENT_PAGES[0];
      },
      pdfUrl() {
        return `/pdfs/instructions/${this.screen}_test_agent_instructions.pdf#page=${this.currentPage.pdfPage}`;
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
