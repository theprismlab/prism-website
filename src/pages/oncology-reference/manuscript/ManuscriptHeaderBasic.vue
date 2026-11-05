<template>
  <page-header background="multi-focal-cool" narrow>
    <template #title> Oncology Reference </template>
    <p class="prism-text-headline-small mb-6">
      A pan-cancer reference of cancer therapeutics from the PRISM platform — clinically relevant
      agents screened across 891 barcoded cancer cell lines spanning 29 tumor lineages, integrated
      with genome-wide CRISPR knockout profiles.
    </p>
    <v-slot></v-slot>
  </page-header>
</template>

<script>
  export default {
    name: 'ManuscriptHeaderForCard',

    data() {
      return {};
    },
    computed: {},
  };
</script>

<style scoped>
  /* Pull the card section up so the card overlaps the header gradient. The header
     has 64px of bottom padding, so -64px leaves roughly 32px of card over it. */
  .manuscript-overlap {
    position: relative;
    z-index: 1;
    margin-top: -64px;
  }

  /* xs */
  @media (max-width: 600px) {
  }
</style>
