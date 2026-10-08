<template>
  <page>
    <page-header background="multi-focal-cool">
      <template #title>Oncology Reference Nominations</template>
      <p class="prism-text-body-large">Blah blah blah.</p>
    </page-header>

    <page-section width="default">
      <section-overline gradient>NOMINATION</section-overline>
      <prism-section-title>Nomination Steps</prism-section-title>
      <p class="prism-text-body-large mb-10" style="max-width: 760px">
        Placeholder copy describing the nomination process.
      </p>

      <!-- Dev only: fills every step with valid sample data so the submit flow can be tested quickly. -->
      <div v-if="isDev" class="d-flex justify-end mb-2">
        <v-btn
          size="small"
          variant="tonal"
          color="secondary"
          prepend-icon="mdi-flask-outline"
          @click="fillTestData"
        >
          Fill with test data
        </v-btn>
      </div>

      <prism-expansion-panels v-model="openPanel">
        <v-expansion-panel v-for="(step, i) in steps" :key="step.id" :value="i">
          <v-expansion-panel-title>
            <v-icon
              class="step-number mr-2"
              size="26"
              :icon="`mdi-numeric-${i + 1}-circle-outline`"
            />
            <span>{{ step.title }}</span>
            <span v-if="submitAttempted && stepHasErrors[step.id]" class="step-error ml-auto mr-2">
              Error
            </span>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <!-- Step 1: Collaborator -->
            <v-row v-if="step.id === 'collaborator'" dense class="mt-2">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="collaborator.name"
                  label="Name"
                  variant="outlined"
                  :error-messages="errors.collaborator.name"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :model-value="collaborator.email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  :error-messages="errors.collaborator.email"
                  @update:model-value="(v) => (collaborator.email = normalizeEmail(v))"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="collaborator.institutionType"
                  label="Institution Type"
                  :items="institutionTypeOptions"
                  variant="outlined"
                  :error-messages="errors.collaborator.institutionType"
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
                  :error-messages="errors.collaborator.institutionName"
                />
                <v-text-field
                  v-else
                  v-model="collaborator.institutionName"
                  label="Institution Name"
                  variant="outlined"
                  :error-messages="errors.collaborator.institutionName"
                />
              </v-col>
            </v-row>

            <!-- Step 2: Test agents -->
            <div v-else-if="step.id === 'testAgent'" class="mt-2">
              <nomination-table
                :fields="testAgentFields"
                :rows="testAgents"
                :errors="errors.testAgents"
                :submitted="testAgentsSubmitted"
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
              <v-alert v-else-if="schemaErrors.length" type="error" variant="tonal" class="mt-4">
                <p class="mb-2">The nomination did not pass schema validation:</p>
                <ul class="pl-4">
                  <li v-for="e in schemaErrors" :key="e.row">
                    Test agent {{ e.row + 1 }}: {{ e.errors.join('; ') }}
                  </li>
                </ul>
              </v-alert>
            </div>

            <!-- Last step submits; earlier steps validate and advance. -->
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
              <v-btn v-else color="primary" variant="flat" @click="finishStep(i)">Continue</v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </prism-expansion-panels>
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
          <v-btn variant="text" @click="closeDialog">Close</v-btn>
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
    COLLABORATOR_TYPE_OPTIONS,
  } from './nominations/institutionOptions.js';
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
        isDev: import.meta.env.DEV,
        openPanel: 0,
        steps: [
          { id: 'collaborator', title: 'Collaborator' },
          { id: 'testAgent', title: 'Test Agent' },
          { id: 'terms', title: 'Confirm & Submit' },
        ],

        // Step 1
        collaborator: emptyCollaborator(),
        institutionTypeOptions: INSTITUTION_TYPE_OPTIONS,
        allInstitutions: [],

        // Step 2
        testAgentFields: TEST_AGENT_FIELDS,
        testAgents: [emptyTestAgent()],
        testAgentsSubmitted: 0, // NominationTable only shows errors after this increments

        // Step 3
        termsHtml: TERMS_HTML,

        errors: { collaborator: {}, testAgents: [] },
        submitAttempted: false, // gates the "Error" label in step titles
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
      // Per-step flag from the stored errors (set by the validators on Continue/Submit).
      // The last step has nothing to validate, so it is never flagged.
      stepHasErrors() {
        return {
          collaborator: !hasNoErrors(this.errors.collaborator),
          testAgent: !this.errors.testAgents.every(hasNoErrors),
          terms: false,
        };
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

      // Dev helper: populates all three steps with valid data (two test agents,
      // one DMSO and one aqueous) and marks them complete so Submit is enabled.
      // Uses a free-text institution type so it does not depend on the
      // collaborator list having loaded.
      fillTestData() {
        this.collaborator = {
          name: 'Test Submitter',
          email: 'test.submitter@example.org',
          institutionType: COLLABORATOR_TYPE_OPTIONS.ACADEMIC.key,
          institutionName: 'Example University',
        };
        this.testAgents = [
          {
            nominated_compound_name: 'Erlotinib',
            pubchem_cid: '176870',
            smiles_string: 'COCCOC1=C(C=C2C(=C1)C(=NC=N2)NC3=CC=CC(=C3)C#C)OCCOC',
            can_provide_qc_agent: 'Yes',
            vendor_ordering_info: 'N/A',
            modality: 'Inhibitor',
            drug_targets: 'EGFR',
            test_agent_type: 'DMSO',
            top_dose: '10',
            top_dose_unit: 'uM',
          },
          {
            nominated_compound_name: 'Gefitinib',
            pubchem_cid: '',
            smiles_string: 'COC1=C(C=C2C(=C1)N=CN=C2NC3=CC(=C(C=C3)F)Cl)OCCCN4CCOCC4',
            can_provide_qc_agent: 'No',
            vendor_ordering_info: 'Sigma Aldrich Cat# SML1657',
            modality: 'Inhibitor',
            drug_targets: 'EGFR; KRAS',
            test_agent_type: 'Aqueous',
            top_dose: '50',
            top_dose_unit: 'ug/mL',
          },
        ];
        this.errors = { collaborator: {}, testAgents: [] };
        this.submitAttempted = false;
        this.schemaErrors = [];
        this.schemaUnavailable = false;
        this.openPanel = this.steps.length - 1; // open the submit step
      },

      // Returns every step to its initial, empty state (used after a successful post).
      resetForm() {
        this.collaborator = emptyCollaborator();
        this.testAgents = [emptyTestAgent()];
        this.testAgentsSubmitted = 0;
        this.errors = { collaborator: {}, testAgents: [] };
        this.submitAttempted = false;
        this.schemaErrors = [];
        this.schemaUnavailable = false;
        this.openPanel = 0;
      },

      // ---- Per-step validation: store errors, return true when the step is valid. ----
      validateCollaborator() {
        this.errors.collaborator = validateCollaborator(this.collaborator);
        return hasNoErrors(this.errors.collaborator);
      },
      async validateTestAgents() {
        await this.ensureRDKit(); // SMILES check needs RDKit loaded
        this.testAgentsSubmitted++;
        this.errors.testAgents = validateTestAgents(this.testAgents);
        return this.errors.testAgents.every(hasNoErrors);
      },
      async ensureRDKit() {
        try {
          await loadRDKit();
        } catch (error) {
          console.warn('RDKit failed to load; SMILES syntax will not be checked', error);
        }
      },
      // Continue on steps 1 and 2. The last step has no validator; it submits.
      async finishStep(i) {
        const id = this.steps[i].id;
        const validators = {
          collaborator: this.validateCollaborator,
          testAgent: this.validateTestAgents,
        };
        if (!(await validators[id]())) return;
        this.openPanel = i + 1 < this.steps.length ? i + 1 : null;
      },

      async submit() {
        // Run both so every step's errors show, not just the first failing one.
        const collaboratorOk = this.validateCollaborator();
        const testAgentsOk = await this.validateTestAgents();
        this.submitAttempted = true;
        if (!collaboratorOk || !testAgentsOk) return;
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
  .step-error {
    color: rgb(var(--v-theme-error));
    font-size: 0.875rem;
    font-weight: 600;
  }

  /* v-html content is not scoped, so target the paragraphs via :deep */
  .terms-copy :deep(p) {
    margin-bottom: 12px;
  }

  /* xs */
  @media (max-width: 600px) {
  }
</style>
