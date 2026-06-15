<template>
  <div>
    <p class="prism-text-body-2 text-medium-emphasis mb-4">
      Review your submission details before sending.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'ReviewStep',
    props: {
      data: { type: Object, required: true },
    },
  };
</script>
