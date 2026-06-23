<template>
  <page>
    <app-container wide>
      <prism-page-title>Forms — {{ screen }}</prism-page-title>

      <v-alert
        v-if="windowStatus && windowStatus !== 'OPEN'"
        :type="windowStatus === 'CLOSED' ? 'error' : 'warning'"
        variant="tonal"
        class="mb-4"
        :icon="windowStatus === 'CLOSED' ? 'mdi-lock-outline' : 'mdi-clock-outline'"
      >
        <template #title>
          {{
            windowStatus === 'CLOSED' ? 'Submission window closed' : 'Submission window not yet open'
          }}
        </template>
        {{ windowMessage || defaultWindowMessage }}
      </v-alert>

      <v-expansion-panels :model-value="openPanel" @update:model-value="onPanelChange">
        <v-expansion-panel v-for="(step, i) in steps" :key="step.id" :value="i">
          <v-expansion-panel-title>
            <v-icon :color="iconColor(i)" class="mr-2" size="20">{{ step.icon }}</v-icon>
            <span>{{ step.title }}</span>
            <template #actions>
              <v-chip v-if="isCompleted(i)" color="success" size="x-small" class="mr-1"
                >Done</v-chip
              >
              <template v-else>
                <v-icon color="warning" size="18" class="mr-1">mdi-alert-circle-outline</v-icon>
                <v-icon>$expand</v-icon>
              </template>
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
  import { STEP_REGISTRY } from './steps/registry';
  import { fetchSubmissionMessage } from '@/submissions/submissions-page-api.js';
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
      return {
        steps: FORM_STEPS,
        attemptedSteps: {},
        windowStatus: null,
        windowMessage: '',
        apiUrl: import.meta.env.VITE_API_URL,
      };
    },
    computed: {
      screen() {
        return this.$route.params.screen;
      },
      openPanel() {
        return this.screen ? this.formStore.openPanel(this.screen) : 0;
      },
      fd() {
        if (!this.screen) return null;
        this.formStore._ensure(this.screen);
        return this.formStore.screens[this.screen].formData;
      },
      screenType() {
        const s = this.screen;
        if (!s) return null;
        if (s.startsWith('APS')) return 'APS';
        if (s.startsWith('AIR')) return 'AIR';
        if (s.startsWith('EPS')) return 'EPS';
        if (s.startsWith('MTS')) return 'MTS';
        if (s.startsWith('CPS')) return 'CPS';
        return null;
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
      defaultWindowMessage() {
        if (this.windowStatus === 'CLOSED') {
          return `The submission window for ${this.screenType || 'this screen'} is currently closed. Please check the Submission Hub for upcoming windows.`;
        }
        return `The submission window for ${this.screenType || 'this screen'} is not yet open.`;
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
      await this.fetchWindowStatus();
    },
    watch: {
      screenType(val, old) {
        if (val !== old) this.fetchWindowStatus();
      },
      screen() {
        this.attemptedSteps = {};
      },
      fd: {
        deep: true,
        handler() {
          if (!this.screen || !this.fd) return;
          this.steps.forEach((step, i) => {
            const errors = STEP_REGISTRY[step.id].validate(this.fd[step.id], this.screenType);
            const hasErrors = Object.keys(errors).length > 0;
            const status = this.formStore.stepStatus(this.screen, i);
            if (hasErrors && status === 'completed') {
              this.formStore.uncompleteStep(this.screen, i);
            } else if (!hasErrors && status !== 'completed') {
              this.formStore.markStepValid(this.screen, i);
            }
          });
        },
      },
    },
    methods: {
      async fetchWindowStatus() {
        if (!this.screenType) return;
        try {
          const messages = await fetchSubmissionMessage(this.apiUrl, this.screenType);
          const msg = Array.isArray(messages) ? messages[0] : messages;
          if (msg) {
            this.windowStatus = this.normalizeWindowStatus(msg.status);
            this.windowMessage = msg.message || '';
          } else {
            this.windowStatus = null;
            this.windowMessage = '';
          }
        } catch (e) {
          console.error('Failed to load window status', e);
        }
      },
      normalizeWindowStatus(status) {
        const s = (status || '').toUpperCase();
        if (s === 'OPEN' || s === 'ACTIVE') return 'OPEN';
        if (s === 'ACTIVE - WINDOW CLOSED' || s === 'IN-PROGRESS' || s === 'IN PROGRESS') return 'IN-PROGRESS';
        if (s === 'CLOSED' || s === 'COMPLETE') return 'CLOSED';
        if (s === 'SCHEDULED') return 'SCHEDULED';
        return null;
      },
      isCompleted(i) {
        return this.stepValidity[this.steps[i].id] ?? false;
      },
      iconColor(i) {
        if (this.isCompleted(i)) return 'success';
        if (this.formStore.stepStatus(this.screen, i) === 'current') return 'primary';
        return undefined;
      },
      onPanelChange(val) {
        if (this.screen && val !== undefined) {
          this.formStore.setOpenPanel(this.screen, val);
        }
      },
      completeStep(i) {
        this.attemptedSteps = { ...this.attemptedSteps, [i]: true };
        if (!this.stepValidity[this.steps[i].id]) return;
        this.formStore.completeStep(this.screen, i);
      },
    },
  };
</script>
