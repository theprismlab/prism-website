<template>
  <page>
    <app-container wide>
      <header class="doc-header mb-5">
        <div class="doc-header__band">
          <span class="doc-header__eyebrow">PRISM Submission Form</span>
          <v-chip
            v-if="screenStatus"
            :color="screenStatus.color"
            size="small"
            variant="flat"
          >{{ screenStatus.label }}</v-chip>
        </div>
        <div class="doc-header__title-block">
          <h1 class="doc-header__title">
            <span class="doc-header__type">{{ screenType }}</span>
            <span class="doc-header__sep" aria-hidden="true"> · </span>
            <span class="doc-header__name">{{ screenName }}</span>
          </h1>
        </div>
        <div v-if="docMeta.length" class="doc-meta">
          <div v-for="item in docMeta" :key="item.label" class="doc-meta__field">
            <span class="doc-meta__label">{{ item.label }}</span>
            <span class="doc-meta__value">{{ item.value }}</span>
          </div>
        </div>
      </header>

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

        if (!d) return [];
        return FORM_FIELD_KEYS.map((key) =>
          d[key] ? { key, label: FIELD_LABELS[key], value: d[key] } : null,
        ).filter(Boolean);
      },
      docMeta() {
        return this.screenMeta.filter((item) => item.key !== 'status');
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
  /* ── Document header ─────────────────────────────────────── */
  .doc-header {
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    border-top: 3px solid rgb(var(--v-theme-primary));
    border-radius: 2px 2px 6px 6px;
    overflow: hidden;
  }
  .doc-header__band {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 16px;
    background: rgba(var(--v-theme-on-surface), 0.025);
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.07);
  }
  .doc-header__eyebrow {
    font-size: 0.68rem;
    font-weight: var(--prism-font-weight-semibold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--prism-color-primary);
  }
  .doc-header__title-block {
    padding: 16px 18px 14px;
  }
  .doc-header__title {
    font-size: var(--prism-text-h3-size);
    font-weight: var(--prism-font-weight-bold);
    color: var(--prism-color-text);
    line-height: 1.2;
    margin: 0;
  }
  .doc-header__sep {
    color: rgba(var(--v-theme-on-surface), 0.25);
    font-weight: 300;
    margin: 0 1px;
  }
  .doc-header__name {
    color: rgba(var(--v-theme-on-surface), 0.6);
    font-weight: var(--prism-font-weight-medium);
  }

  /* ── Metadata strip ───────────────────────────────────────── */
  .doc-meta {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
    background: rgba(var(--v-theme-on-surface), 0.018);
  }
  .doc-meta__field {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 10px 16px;
    min-width: 0;
    box-shadow: 1px 0 0 rgba(var(--v-theme-on-surface), 0.07);
  }
  .doc-meta__label {
    font-size: 0.62rem;
    font-weight: var(--prism-font-weight-semibold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), 0.42);
  }
  .doc-meta__value {
    font-size: 0.875rem;
    font-weight: var(--prism-font-weight-semibold);
    color: rgba(var(--v-theme-on-surface), 0.87);
    overflow-wrap: break-word;
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
