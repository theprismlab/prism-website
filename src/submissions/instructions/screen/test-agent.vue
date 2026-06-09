<template>
  <page>
    <container-md>
      <page-title>Test Agent Instructions</page-title>
      <iframe :src="pdfUrl" class="pdf-embed" />
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
      pdfUrl() {
        return `/pdfs/instructions/${this.screen}_test_agent_instructions.pdf`;
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
