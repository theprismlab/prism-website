<route lang="yaml">
meta:
  layout: submissions
</route>

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
            <!-- Step 0: Contact Info -->
            <template v-if="i === 0">
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="fd.contact.firstName"
                    label="First Name"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="fd.contact.lastName"
                    label="Last Name"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="fd.contact.email"
                    label="Email"
                    variant="outlined"
                    density="compact"
                    type="email"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="fd.contact.company"
                    label="Company"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
              </v-row>
            </template>

            <!-- Step 1: Screen Details -->
            <template v-else-if="i === 1">
              <v-row dense>
                <v-col cols="12">
                  <v-select
                    v-model="fd['screen-details'].screenType"
                    label="Screen Type"
                    :items="['Digital', 'Static', 'Interactive', 'Programmatic']"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="fd['screen-details'].location"
                    label="Location / Address"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="fd['screen-details'].weeklyImpressions"
                    label="Weekly Impressions (est.)"
                    variant="outlined"
                    density="compact"
                    type="number"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="fd['screen-details'].audienceCategory"
                    label="Audience Category"
                    :items="['General', 'Commuters', 'Shoppers', 'Sports Fans']"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
              </v-row>
            </template>

            <!-- Step 2: Application -->
            <template v-else-if="i === 2">
              <v-row dense>
                <v-col cols="12">
                  <v-textarea
                    v-model="fd.application.campaignDescription"
                    label="Campaign Description"
                    variant="outlined"
                    density="compact"
                    rows="3"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="fd.application.campaignStartDate"
                    label="Campaign Start Date"
                    variant="outlined"
                    density="compact"
                    type="date"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="fd.application.duration"
                    label="Duration"
                    :items="['1 week', '2 weeks', '1 month', '3 months', '6 months']"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
              </v-row>
            </template>

            <!-- Step 3: Supporting Documents -->
            <template v-else-if="i === 3">
              <v-row dense>
                <v-col cols="12">
                  <v-file-input
                    label="Upload creative assets"
                    variant="outlined"
                    density="compact"
                    multiple
                    prepend-icon=""
                    prepend-inner-icon="mdi-paperclip"
                  />
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    label="Upload supporting documentation"
                    variant="outlined"
                    density="compact"
                    prepend-icon=""
                    prepend-inner-icon="mdi-file-document-outline"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="fd.documents.notes"
                    label="Notes"
                    variant="outlined"
                    density="compact"
                    rows="2"
                  />
                </v-col>
              </v-row>
            </template>

            <!-- Step 4: Review & Submit -->
            <template v-else-if="i === 4">
              <p class="text-body-2 text-medium-emphasis mb-4">
                Review your submission details before sending.
              </p>
              <v-list lines="one" density="compact" class="mb-4">
                <v-list-subheader>Summary</v-list-subheader>
                <v-list-item
                  title="Contact Info"
                  subtitle="Completed"
                  prepend-icon="mdi-check-circle-outline"
                />
                <v-list-item
                  title="Screen Details"
                  subtitle="Completed"
                  prepend-icon="mdi-check-circle-outline"
                />
                <v-list-item
                  title="Application"
                  subtitle="Completed"
                  prepend-icon="mdi-check-circle-outline"
                />
                <v-list-item
                  title="Supporting Documents"
                  subtitle="Completed"
                  prepend-icon="mdi-check-circle-outline"
                />
              </v-list>
              <v-checkbox
                v-model="fd.review.confirmed"
                label="I confirm all information is accurate and complete."
                hide-details
                class="mb-2"
              />
            </template>

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
  import { FORM_STEPS, useFormProgressStore } from '@/stores/formProgress';

  export default {
    name: 'FormsScreen',
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
