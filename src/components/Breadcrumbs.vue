<template>
  <v-breadcrumbs :items="items" class="breadcrumbs pa-0">
    <template #divider>
      <v-icon size="14" color="grey-darken-1">mdi-chevron-right</v-icon>
    </template>
    <template #item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        :disabled="item.disabled"
        :class="item.disabled ? 'text-grey-darken-1' : 'text-primary-base'"
        class="breadcrumb-item text-caption font-weight-medium"
      >
        {{ item.title }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
  export default {
    name: 'Breadcrumbs',
    props: {
      items: {
        type: Array,
        required: true,
        // Each item: { title: String, to?: String | Object, disabled?: Boolean }
      },
    },
    data() {
      return {};
    },
    methods: {},
    watch: {},
  };
</script>

<style scoped>
  .breadcrumbs {
    margin-bottom: 12px;
  }

  .breadcrumb-item {
    letter-spacing: 0.02em;
    text-decoration: none;
    opacity: 1 !important;
  }

  .breadcrumb-item:not([disabled]):hover {
    text-decoration: underline;
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
  }
</style>
