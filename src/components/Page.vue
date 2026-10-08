<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Page',
    props: {},
    data() {
      return {};
    },
    methods: {},
    watch: {},
  };
</script>
<style scoped>
  /* No top padding: every page opens with a PageHeader or PageSection,
     which own their own vertical spacing. The bottom padding plus the last
     section's own padding puts 64px between content and the footer. */
  .page {
    padding-bottom: 32px;
  }

  /* xxl  */
  @media (min-width: 2560px) {
  }
  /* xl */
  @media (min-width: 1920px) and (max-width: 2560px) {
  }
  /* lg */
  @media (min-width: 1280px) and (max-width: 1920px) {
  }
  /* md */
  @media (min-width: 960px) and (max-width: 1280px) {
  }

  /* sm */
  @media (min-width: 600px) and (max-width: 960px) {
  }
  /* xs */
  @media (max-width: 600px) {
    .page {
      padding-bottom: 24px;
    }
  }
</style>
