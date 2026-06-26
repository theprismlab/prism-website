<template>
  <div>
    <div v-for="step in summarySteps" :key="step.id" class="review-section mb-6">
      <h3 class="prism-text-form-group-label d-flex align-center ga-1 mb-2">
        {{ step.title }}
        <v-icon v-if="!stepValidity[step.id]" color="warning" size="18">mdi-alert-circle</v-icon>
      </h3>

      <!-- Test Agent: columnar table per agent row (unchanged) -->
      <template v-if="step.id === 'testAgent'">
        <v-table v-if="agentFields.length" density="compact" class="agent-table">
          <thead>
            <tr>
              <th v-for="f in agentFields" :key="f.key">{{ f.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in formData.testAgent.rows" :key="i">
              <td v-for="f in agentFields" :key="f.key">{{ row[f.key] || '—' }}</td>
            </tr>
          </tbody>
        </v-table>

        <template v-if="combinationFields.length && formData.testAgent.combinations?.length">
          <p class="text-medium-emphasis text-caption mt-3 mb-1">Combinations</p>
          <v-table density="compact" class="agent-table">
            <thead>
              <tr>
                <th v-for="f in combinationFields" :key="f.key">{{ f.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in formData.testAgent.combinations" :key="i">
                <td v-for="f in combinationFields" :key="f.key">{{ row[f.key] || '—' }}</td>
              </tr>
            </tbody>
          </v-table>
        </template>
      </template>

      <!-- Acknowledgments: grouped checklist -->
      <template v-else-if="step.id === 'acknowledgments'">
        <div
          v-for="(items, section) in groupedAcknowledgments"
          :key="section"
          class="ack-group mb-3"
        >
          <p class="ack-section-label text-medium-emphasis mb-1">{{ section }}</p>
          <div v-for="item in items" :key="item.label" class="ack-item mb-2">
            <p class="text-body-2 mb-0">{{ item.label }}</p>
            <p
              class="text-caption font-weight-medium mb-0"
              :class="
                item.value === 'Confirmed'
                  ? 'text-teal-accent-4'
                  : 'text-medium-emphasis font-italic'
              "
            >
              {{ item.value }}
            </p>
          </div>
        </div>
        <p
          v-if="stepSummary(step.id).length === 0"
          class="text-medium-emphasis font-italic text-body-2"
        >
          No acknowledgments confirmed
        </p>
      </template>

      <!-- Collaborator / Institution: lightweight key-value grid -->
      <template v-else>
        <div v-if="stepSummary(step.id).length" class="kv-grid">
          <template v-for="item in stepSummary(step.id)" :key="item.label">
            <span class="kv-label text-medium-emphasis">{{ item.label }}</span>
            <span
              class="kv-value"
              :class="{ 'text-medium-emphasis font-italic': item.value === 'No response' }"
              >{{ item.value }}</span
            >
          </template>
        </div>
        <p v-else class="text-medium-emphasis font-italic text-body-2">No information provided</p>
      </template>
    </div>

    <v-divider class="my-4" />

    <v-checkbox
      v-model="data.reviewed"
      label="I have reviewed my submission and confirm it is correct."
      :error-messages="errors.reviewed ? [errors.reviewed] : []"
      :disabled="!allStepsValid"
      hide-details="auto"
    />

    <div class="d-flex justify-end mt-4">
      <v-btn
        color="primary"
        :disabled="!data.reviewed || !allStepsValid || screenValidation?.status === 'INVALID'"
        :loading="submitting"
        @click="submitForm"
      >
        Submit
      </v-btn>
    </div>

    <v-dialog v-model="showDialog" max-width="480" persistent>
      <v-card>
        <v-card-title class="d-flex align-center ga-2">
          <v-icon :color="dialogSuccess ? 'teal-accent-4' : 'error'">
            {{ dialogSuccess ? 'mdi-check-circle' : 'mdi-alert-circle' }}
          </v-icon>
          {{ dialog.title }}
        </v-card-title>
        <v-card-text>{{ dialog.body }}</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="showDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { FORM_STEPS } from '@/submissions/store';
  import { STEP_REGISTRY } from './registry';
  import { buildScreenFields, buildCombinationFields } from './testAgentSchema.js';
  import { parseFormDataForApi } from './parseApiPayload.js';
  import * as api from '@/submissions/api';

  export default {
    name: 'ReviewStep',
    props: {
      data: { type: Object, required: true },
      formData: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
      screenType: { type: String, default: null },
      screenValidation: { type: Object, default: null },
    },
    mounted() {
      if (!this.allStepsValid && this.data.reviewed) {
        this.data.reviewed = false;
      }
    },
    watch: {
      nonReviewSnapshot() {
        if (this.data.reviewed) {
          this.data.reviewed = false;
        }
      },
    },
    computed: {
      nonReviewSnapshot() {
        const { review, ...rest } = this.formData;
        return JSON.stringify(rest);
      },
      agentFields() {
        return buildScreenFields(this.screenType);
      },
      combinationFields() {
        return buildCombinationFields(this.screenType);
      },
      stepErrors() {
        // Reference nonReviewSnapshot so this computed re-runs on any deep formData change.
        // Without this, Vue may not track property accesses inside validate() reliably.
        void this.nonReviewSnapshot;
        return Object.fromEntries(
          this.summarySteps.map((step) => [
            step.id,
            STEP_REGISTRY[step.id].validate(this.formData[step.id], this.screenType),
          ]),
        );
      },
      stepValidity() {
        return Object.fromEntries(
          this.summarySteps.map((step) => [
            step.id,
            Object.keys(this.stepErrors[step.id]).length === 0,
          ]),
        );
      },
      allStepsValid() {
        return Object.values(this.stepValidity).every((v) => v);
      },
      groupedAcknowledgments() {
        void this.nonReviewSnapshot; // ensure deep reactivity when checkboxes change
        const items = this.stepSummary('acknowledgments');
        return items.reduce((groups, item) => {
          const key = item.section ?? 'General';
          if (!groups[key]) groups[key] = [];
          groups[key].push(item);
          return groups;
        }, {});
      },
    },
    data() {
      return {
        summarySteps: FORM_STEPS.filter((s) => s.id !== 'review'),
        submitting: false,
        showDialog: false,
        dialogSuccess: false,
        dialog: { title: '', body: '' },
      };
    },
    methods: {
      stepSummary(stepId) {
        return STEP_REGISTRY[stepId].getSummary(this.formData[stepId]);
      },
      async submitForm() {
        const apiPayload = this.parseResponseForApi();
        this.submitting = true;

        try {
          // TODO: replace with real API call, e.g.:
          const result = await api.postSubmission(import.meta.env.VITE_API_URL, apiPayload);
          this.dialogSuccess = true;
          this.dialog = {
            title: 'Submission successful',
            body: 'Your submission has been successfully received. You will receive an email confirmation shortly.',
          };
        } catch (err) {
          console.log('err', err, err.response?.data);
          this.dialogSuccess = false;
          this.dialog = {
            title: 'Submission failed',
            body:
              err.response?.data?.message ??
              'There was an error submitting your form. Please try again later.',
          };
        } finally {
          this.submitting = false;
          this.showDialog = true;
        }
      },
      parseResponseForApi() {
        return parseFormDataForApi(this.formData, this.screenType);
      },
    },
  };
</script>

<style scoped>
  .review-section + .review-section {
    padding-top: 8px;
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  }

  /* Key-value grid for collaborator / institution */
  .kv-grid {
    display: grid;
    grid-template-columns: 200px 1fr;
    row-gap: 6px;
    column-gap: 16px;
  }
  .kv-label {
    font-size: 0.8rem;
    padding-top: 1px;
  }
  .kv-value {
    font-size: 0.85rem;
  }

  /* Acknowledgments checklist */
  .ack-section-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* Test agent table */
  .agent-table th {
    font-size: 0.7rem;
    white-space: normal;
  }
  .agent-table td {
    font-size: 0.8rem;
    white-space: normal;
  }
</style>
