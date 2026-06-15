<template>
  <div>
    <p class="prism-text-body-2 text-medium-emphasis mb-4">
      Review your submission details before sending.
    </p>
  </div>
</template>

<script>
  export function getInitialData() {
    return { confirmed: false };
  }

  export function validate(_data, _screenType) {
    return {};
  }

  export default {
    name: 'ReviewStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
  };
</script>
