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
  </div>
</template>

<script>
  import { FORM_STEPS } from '@/submissions/store';
  import { STEP_REGISTRY } from './registry';

  export function getInitialData() {
    return { confirmed: false };
  }

  export function validate(_data, _screenType) {
    return {};
  }

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
      };
    },
    methods: {
      stepSummary(stepId) {
        return STEP_REGISTRY[stepId].getSummary(this.formData[stepId]);
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
