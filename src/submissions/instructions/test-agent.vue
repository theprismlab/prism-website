<template>
  <page>
    <container-md>
      <prism-page-title>{{ currentPage.title }}</prism-page-title>
      <iframe :key="currentPage.namedest" :src="pdfUrl" class="pdf-embed" />
    </container-md>
  </page>
</template>

<script>
  import { TEST_AGENT_PAGES } from './pages-config';

  export default {
    name: 'TestAgentInstructions',
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      currentPage() {
        const dest = this.$route.query.namedest;
        return TEST_AGENT_PAGES.find((p) => p.namedest === dest) || TEST_AGENT_PAGES[0];
      },
      pdfUrl() {
        return `/pdfs/instructions/${this.screen}_Instructions.pdf#nameddest=${this.currentPage.namedest}`;
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
