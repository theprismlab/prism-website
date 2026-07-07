<template>
  <sub-drawer title="Steps">
    <screen-selector />
    <div v-if="screenSelected" class="form-stepper pt-4 pb-2 px-4">
      <div v-for="(step, i) in steps" :key="step.id">
        <div class="d-flex align-start step-clickable" @click="handleStepClick(i)">
          <div class="step-track mr-3">
            <v-icon v-if="stepStatus(i) === 'completed'" color="teal-accent-4" size="22"
              >mdi-check-circle</v-icon
            >
            <v-icon
              v-else
              :color="stepStatus(i) === 'current' ? 'primary' : undefined"
              :class="{ 'step-icon-muted': stepStatus(i) !== 'current' }"
              size="22"
              :icon="`mdi-numeric-${i + 1}-circle-outline`"
            />
            <div v-if="i < steps.length - 1" class="step-connector" :class="connectorClass(i)" />
          </div>
          <span class="step-label prism-text-subtitle-2" :class="labelClass(i)">
            {{ step.title }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="screenType" class="submissions-nav-cta-container">
      <v-btn
        :to="`/submissions/instructions/${screenType}`"
        variant="outlined"
        color="primary-base"
        block
        rounded="pill"
        prepend-icon="mdi-arrow-left"
        size="small"
        >Back to Instructions</v-btn
      >
    </div>
  </sub-drawer>
</template>

<script>
  import SubDrawer from '../SubDrawer.vue';
  import ScreenSelector from '../ScreenSelector.vue';
  import { FORM_STEPS, useFormProgressStore } from '../store.js';
  import { useScreenStatusStore } from '../screen-status-store.js';

  export default {
    name: 'FormsSubDrawer',
    components: { SubDrawer, ScreenSelector },
    setup() {
      return { formStore: useFormProgressStore(), screenStatusStore: useScreenStatusStore() };
    },
    data() {
      return { steps: FORM_STEPS };
    },
    watch: {
      '$route.params.screenType': {
        immediate: true,
        handler(screen) {
          this.formStore.setLastScreenType(screen);
        },
      },
    },
    computed: {
      screenType() {
        return this.$route.params.screenType;
      },
      screenName() {
        return this.$route.params.screen;
      },
      // Steps only mean something once a genuinely valid, currently-open screen is resolved
      // (same check screen-type.vue gates the form itself on) — not merely because :screenType
      // and :screen segments exist in the URL, which a stale/bogus deep link would still have.
      screenSelected() {
        if (!this.screenType || !this.screenName) return false;
        if (!this.screenStatusStore.loaded) return true; // avoid flashing hidden while loading
        return this.screenStatusStore.validationFor(this.screenName, this.screenType).status === null;
      },
    },
    mounted() {
      this.screenStatusStore.load(import.meta.env.VITE_API_URL);
    },
    methods: {
      stepStatus(i) {
        return this.formStore.stepStatus(this.screenName, i);
      },
      handleStepClick(i) {
        this.formStore.setOpenPanel(this.screenName, this.screenType, i);
      },
      connectorClass(i) {
        return {
          'connector-done': this.stepStatus(i) === 'completed',
          'connector-upcoming': this.stepStatus(i) !== 'completed',
        };
      },
      labelClass(i) {
        // const isCompleted = this.stepStatus(i) === 'completed';
        const isOpen = this.formStore.openPanel(this.screenName) === i;
        return {
          'font-weight-bold': isOpen,
        };
      },
    },
  };
</script>

<style scoped>
  .step-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 22px;
  }

  .step-icon-muted {
    color: rgba(var(--v-theme-on-surface), 0.35);
  }

  .step-connector {
    width: 2px;
    height: 20px;
    margin: 3px 0;
    border-radius: 1px;
  }

  .connector-done {
    background-color: rgb(var(--v-theme-teal-accent-4));
  }

  .connector-upcoming {
    background-color: rgba(var(--v-border-color), var(--v-border-opacity));
  }

  .step-label {
    line-height: 1.33em;
    padding-top: 0.1em;
  }

  .step-clickable {
    cursor: pointer;
  }
</style>
