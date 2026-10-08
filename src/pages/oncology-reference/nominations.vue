<template>
  <page>
    <page-header background="multi-focal-cool">
      <template #title>Oncology Reference Nomination</template>
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
        <v-expansion-panel
          v-for="(step, i) in steps"
          :key="step.id"
          :value="i"
          :disabled="isLocked(i)"
          :class="{ 'is-completed': completed[step.id] }"
        >
          <v-expansion-panel-title>
            <v-icon
              v-if="completed[step.id]"
              class="step-icon mr-2"
              color="teal-accent-4"
              size="26"
            >
              mdi-check-circle
            </v-icon>
            <v-icon
              v-else
              class="step-number mr-2"
              size="26"
              :icon="`mdi-numeric-${i + 1}-circle-outline`"
            />
            <span>{{ step.title }}</span>
            <v-icon
              v-if="isLocked(i)"
              class="step-lock ml-auto"
              size="20"
              icon="mdi-lock-outline"
            />
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

            <!-- Step 3: Terms & conditions -->
            <div v-else-if="step.id === 'terms'" class="mt-2">
              <v-checkbox
                v-for="(term, t) in terms"
                :key="t"
                v-model="termsAccepted[t]"
                :label="term"
                hide-details
                density="comfortable"
              />
              <p v-if="errors.terms" class="text-error text-caption mt-2">{{ errors.terms }}</p>
            </div>

            <div class="d-flex justify-end mt-4">
              <v-btn color="primary" variant="flat" @click="finishStep(i)">
                {{ i === steps.length - 1 ? 'Done' : 'Continue' }}
              </v-btn>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </prism-expansion-panels>

      <div class="d-flex justify-end mt-6">
        <v-btn
          color="primary"
          size="large"
          :disabled="!allCompleted"
          :loading="submitting"
          @click="submit"
        >
          Submit nomination
        </v-btn>
      </div>

      <v-alert v-if="submittedPayload" type="success" variant="tonal" class="mt-6">
        Nomination ready to send. Payload logged to the console.
      </v-alert>
      <v-alert v-if="schemaUnavailable" type="warning" variant="tonal" class="mt-6">
        {{ SCHEMA_UNAVAILABLE }}
      </v-alert>
      <v-alert v-else-if="schemaErrors.length" type="error" variant="tonal" class="mt-6">
        <p class="mb-2">The nomination did not pass schema validation:</p>
        <ul class="pl-4">
          <li v-for="e in schemaErrors" :key="e.row">
            Test agent {{ e.row + 1 }}: {{ e.errors.join('; ') }}
          </li>
        </ul>
      </v-alert>
    </page-section>
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
    TERMS,
    TERMS_ERROR,
    emptyCollaborator,
    emptyTestAgent,
    normalizeEmail,
    validateCollaborator,
    validateTestAgents,
    hasNoErrors,
    buildPayload,
  } from './nominations/nominationSchema.js';
  import { validateNominationPayload, SCHEMA_UNAVAILABLE } from './nominations/ajv.js';
  import { loadRDKit } from './nominations/smiles.js';
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
          { id: 'terms', title: 'Terms & Conditions' },
        ],
        completed: { collaborator: false, testAgent: false, terms: false },

        // Step 1
        collaborator: emptyCollaborator(),
        institutionTypeOptions: INSTITUTION_TYPE_OPTIONS,
        allInstitutions: [],

        // Step 2
        testAgentFields: TEST_AGENT_FIELDS,
        testAgents: [emptyTestAgent()],
        testAgentsSubmitted: 0, // NominationTable only shows errors after this increments

        // Step 3
        terms: TERMS,
        termsAccepted: TERMS.map(() => false),

        errors: { collaborator: {}, testAgents: [], terms: '' },
        submittedPayload: null,
        schemaErrors: [], // from the remote JSON schema check at submit
        schemaUnavailable: false, // schema could not be loaded at all
        SCHEMA_UNAVAILABLE,
        submitting: false,
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
      allCompleted() {
        return Object.values(this.completed).every(Boolean);
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
      isLocked(i) {
        return i > 0 && !this.completed[this.steps[i - 1].id];
      },

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
        this.termsAccepted = TERMS.map(() => true);
        this.errors = { collaborator: {}, testAgents: [], terms: '' };
        this.completed = { collaborator: true, testAgent: true, terms: true };
        this.submittedPayload = null;
        this.schemaErrors = [];
        this.schemaUnavailable = false;
        this.openPanel = null;
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
      validateTerms() {
        const ok = this.termsAccepted.every(Boolean);
        this.errors.terms = ok ? '' : TERMS_ERROR;
        return ok;
      },

      async finishStep(i) {
        const id = this.steps[i].id;
        const validators = {
          collaborator: this.validateCollaborator,
          testAgent: this.validateTestAgents,
          terms: this.validateTerms,
        };
        if (!(await validators[id]())) return;
        this.completed[id] = true;
        this.openPanel = i + 1 < this.steps.length ? i + 1 : null;
      },

      async submit() {
        // Run all three so every step's errors show, not just the first failing one.
        const collaboratorOk = this.validateCollaborator();
        const testAgentsOk = await this.validateTestAgents();
        const termsOk = this.validateTerms();
        if (!collaboratorOk || !testAgentsOk || !termsOk) return;
        this.submittedPayload = null;
        this.schemaErrors = [];
        this.schemaUnavailable = false;
        this.submitting = true;
        try {
          // Flat array, one entry per test agent, each repeating the submitter fields.
          const payload = buildPayload(this.collaborator, this.testAgents);
          const { valid, errors, unavailable } = await validateNominationPayload(payload);
          if (!valid) {
            this.schemaUnavailable = unavailable;
            this.schemaErrors = errors;
            return;
          }
          this.submittedPayload = payload;
          await postNominations(API_URL, payload);
        } finally {
          this.submitting = false;
        }
      },
    },
  };
</script>

<style scoped>
  /* xs */
  @media (max-width: 600px) {
  }
</style>
