<template>
  <page>
    <app-container wide>
      <div class="form-header mb-4">
        <span class="form-header__eyebrow">Submission Form</span>
        <h1 class="form-header__title">{{ screenType }} ({{ screenName }})</h1>
      </div>

      <div v-if="screenMeta.length" class="screen-meta mb-5">
        <div v-for="item in screenMeta" :key="item.label" class="screen-meta__item">
          <span class="screen-meta__label">{{ item.label }}</span>
          <v-chip
            v-if="item.key === 'status'"
            :color="screenStatus.color"
            size="small"
            variant="flat"
            class="screen-meta__chip"
            >{{ screenStatus.label }}</v-chip
          >
          <span v-else class="screen-meta__value">{{ item.value }}</span>
        </div>
      </div>

      <v-alert
        v-if="apiStatus?.message"
        :color="screenStatus?.color"
        variant="tonal"
        density="compact"
        class="mb-4"
        >{{ apiStatus.message }}</v-alert
      >

      <v-alert
        v-if="screenValidation?.status === 'INVALID'"
        type="error"
        variant="tonal"
        density="compact"
        class="mb-4"
        >{{ screenValidation.message }}</v-alert
      >

      <!-- <div v-if="isDev" class="mb-4">
        <v-btn size="small" variant="outlined" color="warning" @click="fillTestData">
          Fill test data
        </v-btn>
      </div> -->

      <v-expansion-panels v-else v-model="openPanel">
        <v-expansion-panel v-for="(step, i) in steps" :key="step.id" :value="i">
          <v-expansion-panel-title>
            <v-icon class="mr-2" size="28">{{ step.icon }}</v-icon>
            <span>{{ step.title }}</span>
            <template #actions>
              <v-icon v-if="isCompleted(i)" color="teal-accent-4" size="28" class="mr-1"
                >mdi-check-circle</v-icon
              >
              <v-icon>$expand</v-icon>
            </template>
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
              :screen-validation="screenValidation"
            />

            <div v-if="step.id !== 'review'" class="d-flex justify-end mt-4">
              <v-btn color="primary" @click="completeStep(i)">Continue</v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </app-container>
  </page>
</template>

<script>
  import { FORM_STEPS, useFormProgressStore } from '@/submissions/store';
  import { useWindowStatusStore } from '@/submissions/window-status-store.js';
  import { resolveScreenDisplay, FIELD_LABELS, FORM_FIELD_KEYS } from '@/submissions/schedule.js';
  import * as api from '@/submissions/api';
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
      CollaboratorStep,
      InstitutionStep,
      TestAgentStep,
      AcknowledgmentsStep,
      ReviewStep,
    },
    setup() {
      return { formStore: useFormProgressStore(), windowStore: useWindowStatusStore() };
    },
    data() {
      return {
        steps: FORM_STEPS,
        attemptedSteps: {},
        screenValidation: null,
        stepIsValid: {},
      };
    },
    computed: {
      screenType() {
        return this.$route.params.screenType ?? null;
      },
      screenDisplay() {
        return resolveScreenDisplay(this.screenType);
      },
      screenName() {
        return this.screenDisplay?.screen_name ?? this.screenType;
      },
      screenStatus() {
        return this.screenDisplay?.statusMeta ?? null;
      },
      screenMeta() {
        const d = this.screenDisplay;
        console.log('screenMeta', d, FORM_FIELD_KEYS, FIELD_LABELS);
        if (!d) return [];
        return FORM_FIELD_KEYS.map((key) =>
          d[key] ? { key, label: FIELD_LABELS[key], value: d[key] } : null,
        ).filter(Boolean);
      },
      apiStatus() {
        return this.screenType ? this.windowStore.statuses[this.screenType] : null;
      },
      isDev() {
        return import.meta.env.DEV;
      },
      openPanel: {
        get() {
          return this.screenType ? this.formStore.openPanel(this.screenType) : null;
        },
        set(val) {
          if (this.screenType) this.formStore.setOpenPanel(this.screenType, val ?? null);
        },
      },
      fd() {
        if (!this.screenType) return null;
        this.formStore._ensure(this.screenType);
        return this.formStore.screenTypes[this.screenType].formData;
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
    async mounted() {
      this.windowStore.load(import.meta.env.VITE_API_URL);
      this.screenValidation = await this.validateScreen();
    },
    watch: {
      async screenType() {
        this.attemptedSteps = {};
        this.screenValidation = await this.validateScreen();
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
            const status = this.formStore.stepStatus(this.screenType, i);
            if (hasErrors && status === 'completed') {
              this.formStore.uncompleteStep(this.screenType, i);
            } else if (!hasErrors && status !== 'completed') {
              this.formStore.markStepValid(this.screenType, i);
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
      async validateScreen() {
        const response = {};
        try {
          await api.validateScreen(import.meta.env.VITE_API_URL, this.screenName, this.screenType);
        } catch (error) {
          response.message = error;
          response.status = 'INVALID';
        }
        return { status: response.status, message: response.message };
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
        this.formStore.completeStep(this.screenType, i);
      },
    },
  };
</script>

<style scoped>
  /* ── Page header ─────────────────────────────────────────── */
  .form-header__eyebrow {
    display: block;
    font-size: 0.68rem;
    font-weight: var(--prism-font-weight-semibold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--prism-color-primary);
    margin-bottom: 5px;
  }
  .form-header__title {
    font-size: var(--prism-text-h3-size);
    font-weight: var(--prism-font-weight-bold);
    color: var(--prism-color-text);
    line-height: 1.2;
    margin: 0;
  }

  /* ── Screen metadata bar ──────────────────────────────────── */
  .screen-meta {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
    gap: 10px 20px;
    padding: 12px 14px;
    background: rgba(var(--v-theme-on-surface), 0.025);
    border-left: 3px solid rgba(var(--v-theme-on-surface), 0.08);
    border-radius: 0 4px 4px 0;
  }
  .screen-meta__item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .screen-meta__label {
    font-size: 0.65rem;
    font-weight: var(--prism-font-weight-semibold);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }
  .screen-meta__value {
    font-size: 0.875rem;
    font-weight: var(--prism-font-weight-medium);
    color: rgba(var(--v-theme-on-surface), 0.87);
  }
  .screen-meta__chip {
    margin-top: 2px;
    align-self: flex-start;
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
  .v-expansion-panel-title.v-expansion-panel-title--active {
    background-color: rgba(var(--v-theme-on-surface), 0.03);
  }
</style>
