<template>
  <h2
    :class="[
      'prism-text-overline font-weight-black mb-0',
      gradient ? 'overline-gradient' : `text-${color}`,
    ]"
  >
    <slot></slot>
  </h2>
</template>

<script>
  export default {
    name: 'SectionOverline',
    props: {
      color: {
        type: String,
        required: false,
        default: 'secondary',
      },
      // Dark blue gradient text; overrides `color`
      gradient: {
        type: Boolean,
        required: false,
        default: false,
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
  .overline-gradient {
    display: inline-block;
    background: linear-gradient(90deg, var(--v-blue-darken-2), var(--v-indigo-darken-3));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* .text-overline{
  font-size: .85rem !important;  
} */
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
