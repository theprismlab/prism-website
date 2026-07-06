<template>
  <v-card
    :class="`pa-6 px-10 justify-start mb-6 ${colorScheme}-card`"
    variant="tonal"
    color="var(--prism-color-amber-accent-4)"
    max-width="700"
  >
    <h3 class="prism-text-title-large d-flex align-center justify-start">
      <svg-icon :path="icon.path" type="mdi" :size="icon.size" class="mr-2"></svg-icon>
      {{ title }}
    </h3>
    <p class="prism-text-body-large text-grey-darken-2 ml-8 mt-4">
      <slot></slot>
    </p>
  </v-card>
</template>
<script>
  import SvgIcon from '@jamescoyle/vue-icon';

  export default {
    name: 'DeliverableCard',
    components: {
      SvgIcon,
    },
    props: {
      title: {
        type: Object,
        default: () => {},
      },
      icon: {
        type: Object,
        default: {},
      },
      colorScheme: {
        type: String,
        default: 'secondary',
      },
    },
    data() {
      return {};
    },
  };
</script>
<style scoped></style>
