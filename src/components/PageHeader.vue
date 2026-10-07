<template>
  <page-section :background="background" :padding="padding" class="page-header">
    <app-container :wide="wide" :narrow="narrow">
      <nav v-if="hasBreadcrumbs" aria-label="Breadcrumb" class="page-header__breadcrumbs">
        <breadcrumbs />
      </nav>
      <slot name="overline" />
      <prism-page-title :class="{ 'page-header__title--last': !$slots.default }">
        <slot name="title" />
      </prism-page-title>
      <slot />
    </app-container>
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
</style>
