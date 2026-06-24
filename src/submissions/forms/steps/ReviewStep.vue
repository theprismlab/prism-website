<template>
  <div>
    <div v-for="step in summarySteps" :key="step.id" class="mb-5">
      <h3 class="prism-text-form-group-label d-flex align-center ga-1">
        {{ step.title }}
        <v-icon v-if="!stepValidity[step.id]" color="warning" size="18">mdi-alert-circle</v-icon>
      </h3>

      <!-- Test Agent: columnar table per agent row -->
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

      <!-- All other steps: label / value table -->
      <v-table v-else density="compact">
        <tbody>
          <tr v-for="item in stepSummary(step.id)" :key="item.label">
            <td class="label-col text-medium-emphasis">{{ item.label }}</td>
            <td>{{ item.value }}</td>
          </tr>
          <tr v-if="stepSummary(step.id).length === 0">
            <td class="text-medium-emphasis font-italic">No information provided</td>
          </tr>
        </tbody>
      </v-table>
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
      <v-btn color="primary" :disabled="!data.reviewed || !allStepsValid" :loading="submitting" @click="submitForm">
        Submit
      </v-btn>
    </div>

    <v-dialog v-model="showDialog" max-width="480" persistent>
      <v-card>
        <v-card-title class="d-flex align-center ga-2">
          <v-icon :color="dialogSuccess ? 'success' : 'error'">
            {{ dialogSuccess ? 'mdi-check-circle' : 'mdi-alert-circle' }}
          </v-icon>
          {{ dialogSuccess ? 'Submission received' : 'Submission failed' }}
        </v-card-title>
        <v-card-text>{{ dialogMessage }}</v-card-text>
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

  export default {
    name: 'ReviewStep',
    props: {
      data: { type: Object, required: true },
      formData: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
      screenType: { type: String, default: null },
    },
    computed: {
      agentFields() {
        return buildScreenFields(this.screenType);
      },
      combinationFields() {
        return buildCombinationFields(this.screenType);
      },
      stepValidity() {
        return Object.fromEntries(
          this.summarySteps.map((step) => [
            step.id,
            Object.keys(STEP_REGISTRY[step.id].validate(this.formData[step.id], this.screenType)).length === 0,
          ]),
        );
      },
      allStepsValid() {
        return Object.values(this.stepValidity).every((v) => v);
      },
    },
    data() {
      return {
        summarySteps: FORM_STEPS.filter((s) => s.id !== 'review'),
        submitting: false,
        showDialog: false,
        dialogSuccess: false,
        dialogMessage: '',
      };
    },
    methods: {
      stepSummary(stepId) {
        return STEP_REGISTRY[stepId].getSummary(this.formData[stepId]);
      },
      async submitForm() {
        this.submitting = true;
        try {
          // TODO: replace with real API call, e.g.:
          // const result = await ApiClasses.postSubmission(apiURL, this.formData);
          await new Promise((resolve) => setTimeout(resolve, 800)); // placeholder
          this.dialogSuccess = true;
          this.dialogMessage =
            'Your submission has been received. You will be contacted with next steps.';
        } catch (err) {
          this.dialogSuccess = false;
          this.dialogMessage =
            err?.response?.data?.message ||
            err?.message ||
            'An unexpected error occurred. Please try again.';
        } finally {
          this.submitting = false;
          this.showDialog = true;
        }
      },
    },
  };
</script>

<style scoped>
  .label-col {
    width: 40%;
    font-size: 0.8rem;
  }
  .agent-table th {
    font-size: 0.7rem;
    white-space: nowrap;
  }
  .agent-table td {
    font-size: 0.8rem;
    white-space: nowrap;
  }
</style>
