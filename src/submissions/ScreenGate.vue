<template>
  <v-alert
    v-if="screenState.status === 'invalid'"
    type="error"
    variant="tonal"
    density="compact"
    class="mb-4"
  >
    {{ screenState.message }}
  </v-alert>
  <div
    v-else-if="!optimistic && screenState.status === 'loading'"
    class="d-flex justify-center pa-8"
  >
    <v-progress-circular indeterminate color="primary" />
  </div>
  <slot v-else :screen-state="screenState" />
</template>

<script>
  import { useScreenStatusStore } from './screen-status-store.js';

  // Centralizes the loading/invalid/valid tri-state every screen-gated page (instructions,
  // shipping, forms) needs, so the "show an alert on invalid, otherwise render content" rule
  // can't drift between pages the way it did before (test-agent.vue's iframe wasn't gated on
  // validity while shipping.vue's was, for the same kind of route).
  //
  // - Pass only `screen-type` to validate a bare :screenType route (instructions pages).
  // - Pass both `screen-type` and `screen-name` to validate a :screenType/:screen pair (forms).
  // - `optimistic` renders the slot immediately while status is 'loading', instead of a
  //   spinner — matches the instructions pages' prior behavior of not flashing a spinner
  //   before the store resolves. Omit it for the forms' prior spinner-then-content behavior.
  export default {
    name: 'ScreenGate',
    props: {
      screenType: { type: String, default: null },
      screenName: { type: String, default: null },
      optimistic: { type: Boolean, default: false },
    },
    setup() {
      return { screenStatusStore: useScreenStatusStore() };
    },
    computed: {
      screenState() {
        return this.screenName
          ? this.screenStatusStore.screenRouteStateFor(this.screenName, this.screenType)
          : this.screenStatusStore.typeRouteStateFor(this.screenType);
      },
    },
    mounted() {
      this.screenStatusStore.load(import.meta.env.VITE_API_URL);
    },
  };
</script>
