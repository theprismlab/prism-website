<template>
  <page-section
    :width="width"
    :background="background"
    :padding="padding"
    :padding-bottom="bottomPadding"
    class="page-header"
  >
    <nav v-if="hasBreadcrumbs" aria-label="Breadcrumb" class="page-header__breadcrumbs">
      <breadcrumbs />
    </nav>
    <slot name="overline" />
    <prism-page-title :class="{ 'page-header__title--last': !$slots.default }">
      <slot name="title" />
    </prism-page-title>
    <slot />
  </page-section>
</template>

<script>
  /**
   * PageHeader
   *
   * The single owner of the page title block: breadcrumbs, optional overline,
   * the H1, and any lead copy / actions passed in the default slot.
   *
   * Breadcrumbs are read from `$route.meta.breadcrumbs` (see Breadcrumbs.vue)
   * and always sit a fixed distance above the H1, so their position is the same
   * whether or not the header has a background.
   *
   * Usage:
   *   <page class="pt-0">
   *     <page-header background="multi-focal-cool">
   *       <template #overline>RESOURCES</template>
   *       <template #title>Page Title</template>
   *       <p class="prism-text-body-large">Lead paragraph.</p>
   *     </page-header>
   *     ...page sections...
   *   </page>
   *
   * Pass `wide` / `narrow` to match the container width used by the page body
   * so the breadcrumbs and title stay flush with the content below.
   *
   * Without a background fill the header's bottom padding reads as blank space
   * and stacks with the body's own top spacing, so it is halved in that case.
   * With a fill the padding reads as part of the colored block and is kept.
   */
  export default {
    name: 'PageHeader',
    props: {
      // Background variant, forwarded to PageSection ('default', 'muted', 'multi-focal-cool', ...)
      background: { type: String, default: 'default' },
      // Vertical padding in Vuetify spacing units, forwarded to PageSection
      padding: { type: [String, Number], default: 12 },
      // Container width, forwarded to AppContainer
      wide: { type: Boolean, default: false },
      narrow: { type: Boolean, default: false },
    },
    computed: {
      width() {
        if (this.narrow) return 'narrow';
        return this.wide ? 'wide' : 'default';
      },
      bottomPadding() {
        const n = Number(this.padding);
        if (!Number.isFinite(n)) return null;
        return this.background === 'default' ? n / 2 : n;
      },
      hasBreadcrumbs() {
        const fn = this.$route?.meta?.breadcrumbs;
        return !!fn && fn(this.$route).length > 0;
      },
    },
  };
</script>

<style scoped>
  .page-header__breadcrumbs {
    margin-bottom: 12px;
  }

  /* PrismPageTitle sets an inline top margin; the breadcrumb gap above owns that spacing here. */
  .page-header :deep(h1) {
    margin-top: 0 !important;
  }

  /* No lead content below the title: let the section padding close the header. */
  .page-header :deep(h1.page-header__title--last) {
    margin-bottom: 0 !important;
  }

  /* Lead copy keeps a readable measure (~65 characters) and stays flush with the
     title's left edge; the space to the right is intentional. `ch` scales with
     the paragraph's own font size, so it suits any text style passed in. */
  .page-header :deep(p) {
    max-width: 70ch;
  }
  /* A centred header (class="text-center") centres the measure under the title too. */
  .page-header.text-center :deep(p) {
    margin-inline: auto;
  }
</style>
