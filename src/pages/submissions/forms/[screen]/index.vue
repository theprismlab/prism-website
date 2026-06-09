<template>
  <page>
    <container-md>
      <page-title>Forms — {{ screen }}</page-title>
      <v-expansion-panels :model-value="openPanel" @update:model-value="onPanelChange">
        <v-expansion-panel
          v-for="(step, i) in steps"
          :key="step.id"
          :value="i"
          :disabled="isLocked(i)"
        >
          <v-expansion-panel-title>
            <v-icon :color="iconColor(i)" class="mr-2" size="20">{{ step.icon }}</v-icon>
            <span :class="{ 'text-medium-emphasis': isLocked(i) }">{{ step.title }}</span>
            <template #actions>
              <v-chip v-if="isCompleted(i)" color="success" size="x-small" class="mr-1">Done</v-chip>
              <v-icon v-else-if="isLocked(i)" size="18" color="medium-emphasis">mdi-lock-outline</v-icon>
              <v-icon v-else>$expand</v-icon>
            </template>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <contact-step v-if="i === 0" :data="fd.contact" />
            <screen-details-step v-else-if="i === 1" :data="fd['screen-details']" />
            <application-step v-else-if="i === 2" :data="fd.application" />
            <documents-step v-else-if="i === 3" :data="fd.documents" />
            <review-step v-else-if="i === 4" :data="fd.review" />

            <div class="d-flex justify-end mt-4">
              <v-btn color="primary" @click="completeStep(i)">
                {{ i === steps.length - 1 ? 'Submit' : 'Continue' }}
              </v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </container-md>
  </page>
</template>

<script>
  import { FORM_STEPS, useFormProgressStore } from '@/submissions/store';
  import ContactStep from '@/submissions/form-steps/ContactStep.vue';
  import ScreenDetailsStep from '@/submissions/form-steps/ScreenDetailsStep.vue';
  import ApplicationStep from '@/submissions/form-steps/ApplicationStep.vue';
  import DocumentsStep from '@/submissions/form-steps/DocumentsStep.vue';
  import ReviewStep from '@/submissions/form-steps/ReviewStep.vue';

  export default {
    name: 'FormsScreen',
    components: { ContactStep, ScreenDetailsStep, ApplicationStep, DocumentsStep, ReviewStep },
    setup() {
      return { formStore: useFormProgressStore() };
    },
    data() {
      return { steps: FORM_STEPS };
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
    },
    methods: {
      isCompleted(i) {
        return this.formStore.stepStatus(this.screen, i) === 'completed';
      },
      isLocked(i) {
        return this.formStore.stepStatus(this.screen, i) === 'locked';
      },
      iconColor(i) {
        const s = this.formStore.stepStatus(this.screen, i);
        if (s === 'completed') return 'success';
        if (s === 'current') return 'primary';
        return undefined;
      },
      onPanelChange(val) {
        if (this.screen && val !== undefined) {
          this.formStore.setOpenPanel(this.screen, val);
        }
      },
      completeStep(i) {
        this.formStore.completeStep(this.screen, i);
      },
    },
  };
</script>
