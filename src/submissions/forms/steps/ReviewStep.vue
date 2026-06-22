<template>
  <div>
    <div v-for="step in summarySteps" :key="step.id" class="mb-5">
      <div class="text-subtitle-2 font-weight-bold text-medium-emphasis mb-2 text-uppercase">
        {{ step.title }}
      </div>
      <v-table density="compact">
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
      hide-details="auto"
    />

    <div class="d-flex justify-end mt-4">
      <v-btn
        color="primary"
        :disabled="!data.reviewed"
        :loading="submitting"
        @click="submitForm"
      >
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

  export default {
    name: 'ReviewStep',
    props: {
      data: { type: Object, required: true },
      formData: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
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
          this.dialogMessage = 'Your submission has been received. You will be contacted with next steps.';
        } catch (err) {
          this.dialogSuccess = false;
          this.dialogMessage = err?.response?.data?.message || err?.message || 'An unexpected error occurred. Please try again.';
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
</style>
