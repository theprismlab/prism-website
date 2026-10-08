<template>
  <page>
    <page-header background="multi-focal-cool">
      <template #title> Oncology Reference<br />Nominations </template>
      <p class="prism-text-body-large">
        Based on our in-process manuscript of creating a living resource of Oncology Reference test
        agents, we are accepting nominations to be included in this library. We will screen 150 test
        agents per year inclusive of small molecules, antibodies, andor ADC’s, in our PRISM cell set
        of over 950 cancer cell lines at 8 doses in triplicate using our DepMap Consortium funding.
        <br /><br />
        Researchers may nominate publicly available oncology test agents to keep this dataset
        growing. Please note that only a limited number of nominations will be selected per year and
        submitting a nomination does not guarantee its inclusion, and it may be several years before
        data becomes available, will not own any data generated from selected nominations.
        <br /><br />
        The PRISM team appreciates whenever nominators can provide QC’d test agents as doing so
        makes it possible to accept more and can expedite the selection and data generation
        processes.
        <br /><br />
        To screen a test agent (proprietary or public) sooner, you can learn more about
        participating in PRISM consortium screens
        <a href="https://theprismlab.org/consortium-screens/collaborating" target="_blank">here</a>.
      </p>
    </page-header>
    <page-section width="default">
      <!-- The form is one card: a tinted header strip for context, the steps as the body. -->
      <v-card class="nomination-card" variant="outlined">
        <div class="nomination-card__header">
          <div>
            <section-overline gradient> ONCOLOGY REFERENCE </section-overline>
            <h2 class="prism-text-display-small mt-1 mb-1">Submit your nominations</h2>
            <p class="nomination-card__subtitle mb-0">
              Fill out the form below to submit your nominations.
            </p>
          </div>
          <!-- Dev only: fills every step with valid sample data so the submit flow can be tested quickly. -->
          <v-btn
            v-if="isDev"
            size="small"
            variant="tonal"
            color="secondary"
            prepend-icon="mdi-flask-outline"
            class="flex-shrink-0"
            @click="fillTestData"
          >
            Fill with test data
          </v-btn>
        </div>

        <div class="nomination-card__body">
          <prism-expansion-panels v-model="openPanel">
            <v-expansion-panel v-for="(step, i) in steps" :key="step.id" :value="i">
              <v-expansion-panel-title>
                <v-icon
                  class="step-number mr-2"
                  size="26"
                  :icon="`mdi-numeric-${i + 1}-circle-outline`"
                />
                <span>{{ step.title }}</span>
                <!-- Status badge: number stays constant; the badge says complete or error.
                 Green is Okabe-Ito bluish green (colour-blind safe against red); the
                 error badge uses the theme's error colour so it matches the field
                 messages. The icon and text also carry the meaning. -->
                <v-chip
                  v-if="stepStatus[step.id] === 'valid'"
                  class="ml-auto mr-2"
                  color="#009E73"
                  variant="tonal"
                  size="x-small"
                  prepend-icon="mdi-check"
                  label
                >
                  Complete
                </v-chip>
                <v-chip
                  v-else-if="stepStatus[step.id] === 'invalid'"
                  class="ml-auto mr-2"
                  color="error"
                  variant="tonal"
                  size="x-small"
                  prepend-icon="mdi-alert-circle-outline"
                  label
                >
                  Error
                </v-chip>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <!-- Step 1: Collaborator -->
                <v-row v-if="step.id === 'collaborator'" dense class="mt-2">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="collaborator.name"
                      label="Name"
                      variant="outlined"
                      :error-messages="collaboratorErrors.name"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      :model-value="collaborator.email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      :error-messages="collaboratorErrors.email"
                      @update:model-value="(v) => (collaborator.email = normalizeEmail(v))"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="collaborator.institutionType"
                      label="Institution Type"
                      :items="institutionTypeOptions"
                      variant="outlined"
                      :error-messages="collaboratorErrors.institutionType"
                      @update:model-value="collaborator.institutionName = ''"
                    />
                  </v-col>
                  <v-col v-if="collaborator.institutionType" cols="12" sm="6">
                    <v-select
                      v-if="hasDropdownNames"
                      v-model="collaborator.institutionName"
                      label="Institution Name"
                      :items="institutionNames"
                      variant="outlined"
                      :error-messages="collaboratorErrors.institutionName"
                    />
                    <v-text-field
                      v-else
                      v-model="collaborator.institutionName"
                      label="Institution Name"
                      variant="outlined"
                      :error-messages="collaboratorErrors.institutionName"
                    />
                  </v-col>
                </v-row>

                <!-- Step 2: Test agents -->
                <div v-else-if="step.id === 'testAgent'" class="mt-2">
                  <p>
                    Please list all of your test agent nominations in the table below. All test
                    agents will be considered individually, and you do not need to fill out separate
                    forms for each nomination.
                  </p>
                  <nomination-table
                    :fields="testAgentFields"
                    :rows="testAgents"
                    :errors="testAgentErrors"
                    multi-row
                    add-label="Add test agent"
                    @add-row="testAgents.push(emptyTestAgent())"
                    @remove-row="(i) => testAgents.splice(i, 1)"
                  />
                </div>

                <!-- Step 3: Confirm & Submit (read-only terms; the submit button lives here) -->
                <div v-else-if="step.id === 'terms'" class="mt-2">
                  <!-- eslint-disable-next-line vue/no-v-html -- static copy from nominationSchema.js, not user input -->
                  <div class="terms-copy" v-html="termsHtml" />

                  <v-alert v-if="schemaUnavailable" type="warning" variant="tonal" class="mt-4">
                    {{ SCHEMA_UNAVAILABLE }}
                  </v-alert>
                  <v-alert
                    v-else-if="schemaErrors.length"
                    type="error"
                    variant="tonal"
                    class="mt-4"
                  >
                    <p class="mb-2">The nomination did not pass schema validation:</p>
                    <ul class="pl-4">
                      <li v-for="e in schemaErrors" :key="e.row">
                        Test agent {{ e.row + 1 }}: {{ e.errors.join('; ') }}
                      </li>
                    </ul>
                  </v-alert>
                </div>

                <!-- Last step submits; earlier steps validate and advance. -->
                <p
                  v-if="i === steps.length - 1 && hasStepErrors"
                  class="text-error text-body-2 text-right mt-4 mb-0"
                >
                  Please fix errors before submitting
                </p>
                <div class="d-flex justify-end mt-4">
                  <v-btn
                    v-if="i === steps.length - 1"
                    color="primary"
                    size="large"
                    :loading="submitting"
                    @click="submit"
                  >
                    Submit nomination
                  </v-btn>
                  <v-btn v-else color="primary" variant="flat" @click="finishStep(i)">
                    Continue
                  </v-btn>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </prism-expansion-panels>
        </div>
      </v-card>
    </page-section>

    <!-- Result of the API post. Persistent so the user has to acknowledge it;
         closing a success dialog resets the form for a fresh nomination. -->
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
          <v-btn variant="text" @click="closeDialog"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </page>
</template>

<script>
  import NominationTable from './nominations/NominationTable.vue';
  import { getCollaboratorList, postNominations } from '@/utils/api.js';
  import {
    INSTITUTION_TYPE_OPTIONS,
    DROPDOWN_NAME_TYPES,
  } from './nominations/institutionOptions.js';
  import { testCollaborator, testAgents } from './nominations/testData.js';
  import {
    TEST_AGENT_FIELDS,
    TERMS_HTML,
    emptyCollaborator,
    emptyTestAgent,
    normalizeEmail,
    validateCollaborator,
    validateTestAgents,
    hasNoErrors,
    buildPayload,
  } from './nominations/nominationSchema.js';
  import { loadRDKit } from './nominations/smiles.js';
  // Schema validator: both files export the same API. Using the bundled copy while
  // assets.clue.io blocks CORS; swap to ajv.js (remote fetch) once that is fixed.
  import { validateNominationPayload, SCHEMA_UNAVAILABLE } from './nominations/validateBundled.js';
  // import { validateNominationPayload, SCHEMA_UNAVAILABLE } from './nominations/ajv.js';

  const API_URL = import.meta.env.VITE_API_URL;

  export default {
    name: 'OncologyReferenceNominations',
    components: { NominationTable },
    data() {
      return {
        isDev: false,
        openPanel: 0,
        steps: [
          { id: 'collaborator', title: 'Collaborator' },
          { id: 'testAgent', title: 'Test Agent' },
          { id: 'terms', title: 'Review & Submit' },
        ],

        // Step 1
        collaborator: emptyCollaborator(),
        institutionTypeOptions: INSTITUTION_TYPE_OPTIONS,
        allInstitutions: [],

        // Step 2
        testAgentFields: TEST_AGENT_FIELDS,
        testAgents: [emptyTestAgent()],
        rdkitReady: false, // reactive hook so testAgentErrors re-runs once RDKit loads

        // Step 3
        termsHtml: TERMS_HTML,

        // A step is "touched" once Continue was pressed on it, or Submit was pressed.
        // Errors and status are computed live from the data, but only for touched steps.
        touched: { collaborator: false, testAgent: false },
        schemaErrors: [], // from the JSON schema check at submit
        schemaUnavailable: false, // schema could not be loaded at all (remote validator only)
        SCHEMA_UNAVAILABLE,
        submitting: false,

        // Post result dialog
        showDialog: false,
        dialogSuccess: false,
        dialog: { title: '', body: '' },
      };
    },
    computed: {
      hasDropdownNames() {
        return DROPDOWN_NAME_TYPES.includes(this.collaborator.institutionType);
      },
      institutionNames() {
        return this.allInstitutions
          .filter(
            (i) =>
              i.collaboration_type === this.collaborator.institutionType &&
              i.name !== 'Other please specify',
          )
          .map((i) => i.name)
          .sort((a, b) => a.localeCompare(b));
      },
      // ---- Live validation. Empty until the step is touched, then recomputed on every edit. ----
      collaboratorErrors() {
        return this.touched.collaborator ? validateCollaborator(this.collaborator) : {};
      },
      testAgentErrors() {
        this.rdkitReady; // dependency: SMILES check is skipped until RDKit is loaded
        return this.touched.testAgent ? validateTestAgents(this.testAgents) : [];
      },
      // 'untouched' | 'valid' | 'invalid' per step, driving the header icon and label.
      // The last step has nothing to validate, so it stays 'untouched' (number only).
      stepStatus() {
        const status = (touched, ok) => (!touched ? 'untouched' : ok ? 'valid' : 'invalid');
        return {
          collaborator: status(this.touched.collaborator, hasNoErrors(this.collaboratorErrors)),
          testAgent: status(this.touched.testAgent, this.testAgentErrors.every(hasNoErrors)),
          terms: 'untouched',
        };
      },
      hasStepErrors() {
        return Object.values(this.stepStatus).includes('invalid');
      },
    },
    async created() {
      this.ensureRDKit(); // start the ~7 MB WASM download early; awaited again before validating
      try {
        this.allInstitutions = await getCollaboratorList(API_URL);
      } catch (error) {
        console.error('Failed to load institution names', error);
      }
    },
    methods: {
      normalizeEmail,
      emptyTestAgent,

      // Dev helper: fills all steps from testData.js and marks them touched so the
      // status badges show and Submit can be tested straight away.
      fillTestData() {
        this.collaborator = testCollaborator();
        this.testAgents = testAgents();
        this.touched = { collaborator: true, testAgent: true };
        this.schemaErrors = [];
        this.schemaUnavailable = false;
        this.openPanel = this.steps.length - 1; // open the submit step
      },

      // Returns every step to its initial, empty state (used after a successful post).
      resetForm() {
        this.collaborator = emptyCollaborator();
        this.testAgents = [emptyTestAgent()];
        this.touched = { collaborator: false, testAgent: false };
        this.schemaErrors = [];
        this.schemaUnavailable = false;
        this.openPanel = 0;
      },

      async ensureRDKit() {
        try {
          await loadRDKit();
          this.rdkitReady = true;
        } catch (error) {
          console.warn('RDKit failed to load; SMILES syntax will not be checked', error);
        }
      },
      // Continue on steps 1 and 2: mark the step touched (which turns on its live
      // errors) and advance only if it is valid. The last step has no Continue.
      async finishStep(i) {
        const id = this.steps[i].id;
        this.touched[id] = true;
        if (id === 'testAgent') await this.ensureRDKit(); // SMILES check needs RDKit loaded
        if (this.stepStatus[id] !== 'valid') return;
        this.openPanel = i + 1 < this.steps.length ? i + 1 : null;
      },

      async submit() {
        // Touch both steps so every step's errors show, not just the first failing one.
        this.touched = { collaborator: true, testAgent: true };
        await this.ensureRDKit();
        if (this.stepStatus.collaborator !== 'valid' || this.stepStatus.testAgent !== 'valid')
          return;
        this.schemaErrors = [];
        this.schemaUnavailable = false;
        this.submitting = true;
        try {
          // Flat array, one entry per test agent, each repeating the submitter fields.
          const payload = buildPayload(this.collaborator, this.testAgents);
          const { valid, errors, unavailable } = await validateNominationPayload(payload);
          if (!valid) {
            // Schema problems stay inline (per-row list) rather than in the dialog.
            this.schemaUnavailable = unavailable;
            this.schemaErrors = errors;
            return;
          }
          await postNominations(API_URL, payload);
          this.dialogSuccess = true;
          this.dialog = {
            title: 'Nomination submitted',
            body: `Your nomination of ${payload.length} test agent${payload.length === 1 ? '' : 's'} has been received. You will receive an email confirmation shortly.`,
          };
          this.showDialog = true;
        } catch (error) {
          console.error('Nomination post failed', error, error.response?.data);
          this.dialogSuccess = false;
          this.dialog = {
            title: 'Submission failed',
            body:
              error.response?.data?.message ??
              error.response?.data?.error?.message ??
              'There was an error submitting your nomination. Please try again later.',
          };
          this.showDialog = true;
        } finally {
          this.submitting = false;
        }
      },
      closeDialog() {
        this.showDialog = false;
        if (this.dialogSuccess) this.resetForm();
      },
    },
  };
</script>

<style scoped>
  /* ── Form card ─────────────────────────────────────────────── */
  .nomination-card {
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: var(--prism-radius-lg);
    overflow: hidden;
  }
  .nomination-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 28px 32px 24px;
    background: linear-gradient(
      180deg,
      rgba(var(--v-theme-on-surface), 0.035) 0%,
      rgba(var(--v-theme-on-surface), 0.015) 100%
    );
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  }
  .nomination-card__subtitle {
    color: var(--prism-color-text-muted);
    font-size: 0.95rem;
    line-height: 1.5;
    max-width: 560px;
  }
  .nomination-card__body {
    padding: 24px 32px 32px;
  }

  /* v-html content is not scoped, so target the paragraphs via :deep */
  .terms-copy :deep(p) {
    margin-bottom: 12px;
  }

  /* xs */
  @media (max-width: 600px) {
    .nomination-card__header {
      flex-direction: column;
      padding: 20px 16px 16px;
    }
    .nomination-card__body {
      padding: 16px 12px 20px;
    }
  }
</style>
