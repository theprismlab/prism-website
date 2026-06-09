<template>
  <page>
    <container-md>
      <page-title>Test Agent Instructions</page-title>
      <iframe :key="page" :src="pdfUrl" class="pdf-embed" />
    </container-md>
  </page>
</template>

<script>
  export default {
    name: 'TestAgentInstructions',
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      page() {
        return parseInt(this.$route.query.page) || 1;
      },
      pdfUrl() {
        return `/pdfs/instructions/${this.screen}_test_agent_instructions.pdf#page=${this.page}`;
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
