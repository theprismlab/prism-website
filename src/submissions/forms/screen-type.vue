<template>
  <page>
    <app-container wide>
      <prism-page-title>
        {{ screenName ?? screenType }}<template v-if="screenFullName"> — {{ screenFullName }}</template>
      </prism-page-title>

      <v-expansion-panels :model-value="openPanel" @update:model-value="onPanelChange">
        <v-expansion-panel v-for="(step, i) in steps" :key="step.id" :value="i">
          <v-expansion-panel-title>
            <v-icon class="mr-2" size="28">{{ step.icon }}</v-icon>
            <span>{{ step.title }}</span>
            <template #actions>
              <v-icon v-if="isCompleted(i)" color="teal-accent-4" size="28" class="mr-1"
                >mdi-check-circle</v-icon
              >
              <v-icon v-else>$expand</v-icon>
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
  import { ASSAYS } from '@/utils/assays';
  import { resolveScreenEntry } from '@/submissions/schedule.js';
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
      return { formStore: useFormProgressStore() };
    },
    data() {
      return { steps: FORM_STEPS, attemptedSteps: {} };
    },
    computed: {
      screenType() {
        return this.$route.params.screenType ?? null;
      },
      resolvedEntry() {
        return resolveScreenEntry(this.screenType);
      },
      screenName() {
        return this.resolvedEntry?.screen_name ?? null;
      },
      screenFullName() {
        return ASSAYS[this.screenType]?.screen_full ?? null;
      },
      openPanel() {
        return this.screenType ? this.formStore.openPanel(this.screenType) : 0;
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
    watch: {
      screenType() {
        this.attemptedSteps = {};
      },
      fd: {
        deep: true,
        handler() {
          if (!this.screenType || !this.fd) return;
          this.steps.forEach((step, i) => {
            const errors = STEP_REGISTRY[step.id].validate(this.fd[step.id], this.screenType);
            const hasErrors = Object.keys(errors).length > 0;
            const status = this.formStore.stepStatus(this.screenType, i);
            if (hasErrors && status === 'completed') {
              this.formStore.uncompleteStep(this.screenType, i);
            } else if (!hasErrors && status !== 'completed') {
              this.formStore.markStepValid(this.screenType, i);
            }
          });
        },
      },
    },
    methods: {
      isCompleted(i) {
        return this.stepValidity[this.steps[i].id] ?? false;
      },
      onPanelChange(val) {
        if (this.screenType && val !== undefined) {
          this.formStore.setOpenPanel(this.screenType, val);
        }
      },
      completeStep(i) {
        this.attemptedSteps = { ...this.attemptedSteps, [i]: (this.attemptedSteps[i] ?? 0) + 1 };
        if (!this.stepValidity[this.steps[i].id]) return;
        this.formStore.completeStep(this.screenType, i);
      },
    },
  };
</script>
