<template>
  <prism-top-banner
    variant="primary"
    message="This is a top banner — it sits above the AppBar."
    @dismiss="$emit('dismiss')"
  />
</template>

<script>
  export default {
    name: 'TheAppBanner',
    emits: ['dismiss'],
  };
</script>

<style></style>
