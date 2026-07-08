<template>
  <page>
    <app-container wide>
      <prism-page-title>
        {{ screenType }} Submission Form —<br>
        {{ screenName }}
      </prism-page-title>
      <!-- <div v-if="isDev" class="mb-4">
        <v-btn size="small" variant="outlined" color="warning" @click="fillTestData">
          Fill test data
        </v-btn>
      </div> -->
      <screen-gate
        :screen-type="screenType"
        :screen-name="screenName"
      >
        <v-expansion-panels
          v-model="openPanel"
          elevation="0"
        >
          <v-expansion-panel
            v-for="(step, i) in steps"
            :key="step.id"
            :value="i"
            :disabled="i > maxOpenIndex"
          >
            <v-expansion-panel-title :class="{ 'is-completed': isCompleted(i) }">
              <v-icon
                v-if="isCompleted(i)"
                class="step-icon mr-2"
                color="teal-accent-4"
                size="26"
              >
                mdi-check-circle
              </v-icon>
              <v-icon
                v-else
                class="step-number mr-2"
                size="26"
                :icon="`mdi-numeric-${i + 1}-circle-outline`"
              />
              <span>{{ step.title }}</span>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <collaborator-step
                v-if="step.id === 'collaborator'"
                :data="fd.collaborator"
                :errors="stepErrors.collaborator || {}"
              />
              <institution-step
                v-else-if="step.id === 'institution'"
                :data="fd.institution"
                :errors="stepErrors.institution || {}"
              />
              <test-agent-step
                v-else-if="step.id === 'testAgent'"
                :data="fd.testAgent"
                :errors="stepErrors.testAgent || {}"
                :screen-type="screenType"
                :submitted="attemptedSteps[i] ?? 0"
              />
              <acknowledgments-step
                v-else-if="step.id === 'acknowledgments'"
                :data="fd.acknowledgments"
                :errors="stepErrors.acknowledgments || {}"
                :screen-type="screenType"
              />
              <review-step
                v-else-if="step.id === 'review'"
                :data="fd.review"
                :form-data="fd"
                :errors="stepErrors.review || {}"
                :screen-type="screenType"
                :screen-name="screenName"
              />

              <div
                v-if="step.id !== 'review'"
                class="d-flex align-center justify-end mt-4 gap-3"
              >
                <v-btn
                  color="primary-base"
                  flat
                  rounded
                  @click="completeStep(i)"
                >
                  Continue
                </v-btn>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </screen-gate>
    </app-container>
  </page>
</template>

<script>
  import { FORM_STEPS, useFormProgressStore } from '@/submissions/store';
  import ScreenGate from '@/submissions/ScreenGate.vue';
  import { getTestData } from './testFixtures.js';
  import { STEP_REGISTRY } from './steps/registry';
  import CollaboratorStep from './steps/CollaboratorStep.vue';
  import InstitutionStep from './steps/InstitutionStep.vue';
  import TestAgentStep from './steps/TestAgentStep.vue';
  import AcknowledgmentsStep from './steps/AcknowledgmentsStep.vue';
  import ReviewStep from './steps/ReviewStep.vue';

  export default {
    name: 'FormsScreen',
    components: {
      ScreenGate,
      CollaboratorStep,
      InstitutionStep,
      TestAgentStep,
      AcknowledgmentsStep,
      ReviewStep,
    },
    setup() {
      return {
        formStore: useFormProgressStore(),
      };
    },
    data() {
      return {
        steps: FORM_STEPS,
        attemptedSteps: {},
        stepIsValid: {},
      };
    },
    computed: {
      screenType() {
        return this.$route.params.screenType ?? null;
      },
      screenName() {
        return this.$route.params.screen ?? this.screenType;
      },
      isDev() {
        return import.meta.env.DEV;
      },
      openPanel: {
        get() {
          return this.screenName ? this.formStore.openPanel(this.screenName) : null;
        },
        set(val) {
          if (this.screenName) {
            this.formStore.setOpenPanel(this.screenName, this.screenType, val ?? null);
          }
        },
      },
      fd() {
        if (!this.screenType || !this.screenName) return null;
        this.formStore._ensure(this.screenName, this.screenType);
        return this.formStore.screens[this.screenName].formData;
      },
      maxOpenIndex() {
        return this.screenName ? this.formStore.maxOpenIndex(this.screenName) : 0;
      },
      stepErrors() {
        if (!this.fd) return {};
        return Object.fromEntries(
          this.steps.map((step, i) => [
            step.id,
            this.attemptedSteps[i]
              ? STEP_REGISTRY[step.id].validate(this.fd[step.id], this.screenType)
              : {},
          ]),
        );
      },
      stepValidity() {
        if (!this.fd) return {};
        return Object.fromEntries(
          this.steps.map((step) => [
            step.id,
            Object.keys(STEP_REGISTRY[step.id].validate(this.fd[step.id], this.screenType))
              .length === 0,
          ]),
        );
      },
    },
    watch: {
      screenName() {
        this.attemptedSteps = {};
      },
      fd: {
        deep: true,
        immediate: true,
        handler() {
          if (!this.screenType || !this.fd) return;
          const validity = {};
          this.steps.forEach((step, i) => {
            const errors = STEP_REGISTRY[step.id].validate(this.fd[step.id], this.screenType);
            const hasErrors = Object.keys(errors).length > 0;
            validity[step.id] = !hasErrors;
            const status = this.formStore.stepStatus(this.screenName, i);
            if (hasErrors && status === 'completed') {
              this.formStore.uncompleteStep(this.screenName, i);
            } else if (!hasErrors && status !== 'completed') {
              this.formStore.markStepValid(this.screenName, this.screenType, i);
            }
          });
          this.stepIsValid = validity;
        },
      },
    },
    methods: {
      fillTestData() {
        const testData = getTestData(this.screenType);
        for (const [stepId, stepData] of Object.entries(testData)) {
          Object.assign(this.fd[stepId], stepData);
        }
      },
      isCompleted(i) {
        const step = this.steps[i];
        if (step.id === 'review') {
          return this.steps.every((s) => this.stepIsValid[s.id] ?? false);
        }
        return this.stepIsValid[step.id] ?? false;
      },
      completeStep(i) {
        this.attemptedSteps = { ...this.attemptedSteps, [i]: (this.attemptedSteps[i] ?? 0) + 1 };
        if (!this.stepIsValid[this.steps[i].id]) return;
        this.formStore.completeStep(this.screenName, this.screenType, i);
      },
    },
  };
</script>

<style scoped>
  /* ── Step indicator ──────────────────────────────────────── */
  .step-number {
    flex-shrink: 0;
    color: rgba(var(--v-theme-on-surface), 0.35);
  }
  .step-icon {
    flex-shrink: 0;
  }

  /* ── Accordion typography ─────────────────────────────────── */
  .v-expansion-panel-title {
    font-size: 0.925rem;
    font-weight: var(--prism-font-weight-semibold);
    letter-spacing: 0.01em;
  }
  .v-expansion-panel-title span {
    color: var(--prism-color-text) !important;
  }
  .v-expansion-panel-title.is-completed span {
    color: rgba(var(--v-theme-on-surface), 0.45) !important;
  }
  .v-expansion-panel-title.v-expansion-panel-title--active .step-number {
    color: var(--prism-color-primary);
  }
  .v-expansion-panel-title.v-expansion-panel-title--active {
    background-color: rgba(var(--v-theme-on-surface), 0.03);
  }
  .v-expansion-panel {
    margin-top: -1px;
    /* margin-top: 8px;
    margin-bottom: 8px; */
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    box-shadow: none !important;
  }
  .v-expansion-panel:not(:first-child)::after {
    display: none;
  }

  /* ── Step footer ──────────────────────────────────────────── */
  .step-footer-hint {
    font-size: 0.8rem;
    color: rgba(var(--v-theme-error), 0.75);
  }
</style>
