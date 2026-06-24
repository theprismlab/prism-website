<template>
  <sub-drawer title="Steps">
    <screen-selector />
    <div v-if="screenType" class="form-stepper pt-4 pb-2 px-4">
      <div v-for="(step, i) in steps" :key="step.id">
        <div class="d-flex align-start step-clickable" @click="handleStepClick(i)">
          <div class="step-track mr-3">
            <div class="step-circle" :class="circleClass(i)">
              <v-icon v-if="stepStatus(i) === 'completed'" size="13">mdi-check</v-icon>
              <span v-else class="text-caption font-weight-bold">{{ i + 1 }}</span>
            </div>
            <div v-if="i < steps.length - 1" class="step-connector" :class="connectorClass(i)" />
          </div>
          <span class="step-label prism-text-body-2 pt-1" :class="labelClass(i)">
            {{ step.title }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="screenType">
      <v-list density="comfortable" nav>
        <v-list-item
          id="instructions-btn"
          :to="`/submissions/instructions/${screenType}`"
          title="Back to Instructions"
          prepend-icon="mdi-arrow-left"
          exact
        />
      </v-list>
    </div>
  </sub-drawer>
</template>

<script>
  import SubDrawer from '../SubDrawer.vue';
  import ScreenSelector from '../ScreenSelector.vue';
  import { FORM_STEPS, useFormProgressStore } from '../store.js';

  export default {
    name: 'FormsSubDrawer',
    components: { SubDrawer, ScreenSelector },
    setup() {
      return { formStore: useFormProgressStore() };
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
    },
    methods: {
      stepStatus(i) {
        return this.formStore.stepStatus(this.screenType, i);
      },
      handleStepClick(i) {
        this.formStore.setOpenPanel(this.screenType, i);
      },
      circleClass(i) {
        const s = this.stepStatus(i);
        return {
          'circle-completed': s === 'completed',
          'circle-current': s === 'current',
          'circle-available': s === 'available',
        };
      },
      connectorClass(i) {
        return {
          'connector-done': this.stepStatus(i) === 'completed',
          'connector-upcoming': this.stepStatus(i) !== 'completed',
        };
      },
      labelClass(i) {
        return {
          'font-weight-bold': this.stepStatus(i) === 'current',
        };
      },
    },
  };
</script>

<style scoped>
  #instructions-btn {
    text-align: center;
    width: 100%;
    font-weight: bold;
    color: black;
    border-radius: 50px;
    border: 1px solid black;
  }
  .step-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 24px;
  }

  .step-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .circle-completed {
    background-color: rgb(var(--v-theme-teal-accent-4));
    color: white;
  }

  .circle-current {
    /* background-color: rgb(var(--v-theme-primary));
    color: white; */
    border: 2px solid black;
    color: black;
  }

  .circle-available {
    border: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
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
    line-height: 1.4;
    min-height: 44px;
  }

  .step-clickable {
    cursor: pointer;
  }
</style>
