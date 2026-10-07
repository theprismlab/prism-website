<template>
  <v-breadcrumbs v-if="items.length" :items="items" class="breadcrumbs pa-0">
    <template #divider>
      <v-icon size="14" color="grey-darken-1">mdi-chevron-right</v-icon>
    </template>
    <template #item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        :disabled="item.disabled"
        :aria-current="item.current ? 'page' : undefined"
        :class="{
          'breadcrumb-item--current text-grey-darken-3': item.current,
          'breadcrumb-item--link text-primary': item.link,
          'breadcrumb-item--label text-grey-darken-1': !item.current && !item.link,
        }"
        class="breadcrumb-item text-caption font-weight-medium"
      >
        {{ item.title }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
  /**
   * Breadcrumbs
   *
   * Reads `$route.meta.breadcrumbs`, a function returning `[{ title, to? }]`.
   * The router only supplies data; this component derives the three states:
   *   - current : the last item (plain text, aria-current="page"; any `to` is ignored)
   *   - link    : any earlier item with a `to`
   *   - label   : any earlier item without a `to` (a grouping with no page of its own)
   */
  export default {
    name: 'Breadcrumbs',
    computed: {
      items() {
        const fn = this.$route?.meta?.breadcrumbs;
        const raw = fn ? fn(this.$route) : [];
        return raw.map((item, i) => {
          const current = i === raw.length - 1;
          const link = !current && !!item.to;
          return {
            title: item.title,
            to: link ? item.to : undefined,
            current,
            link,
            disabled: !link,
          };
        });
      },
    },
  };
</script>

<style scoped>
  .breadcrumb-item {
    letter-spacing: 0.02em;
    text-decoration: none;
    opacity: 1 !important; /* Vuetify dims disabled items; the colors below carry the state instead */
  }

  /* Colors come from Vuetify utility classes bound in the template:
     link -> text-primary, label -> text-grey-darken-1, current -> text-grey-darken-3 */
  .breadcrumb-item--link:hover {
    text-decoration: underline;
  }
</style>
