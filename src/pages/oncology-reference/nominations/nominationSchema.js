// OncRef nomination form schema: field definitions, validators, and payload shape.
// Pure JS — no Vue dependencies — so it can be unit tested and kept in sync with
// the JSON schema used by ajv.js / validateBundled.js.
//
// Column details, dropdown options and rules come from the nomination form CSV
// in this folder. Payload keys match example-payload.json.
import { validSmiles } from './smiles.js';

// ---- Validators: each returns an error string or undefined. Chain with ||. ----
export const required = (v) => (!v ? 'Required' : undefined);
export const validEmail = (v) =>
  !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? undefined : 'Invalid email address';
export const validNumber = (v) => (!v || !isNaN(Number(v)) ? undefined : 'Must be a number');
export const validPositiveNumber = (v) =>
  !v || (!isNaN(Number(v)) && Number(v) > 0) ? undefined : 'Must be a positive number';
export const normalizeEmail = (v) => (v == null ? '' : String(v).toLowerCase());

// ---- Step 1: collaborator ----
export const emptyCollaborator = () => ({
  name: '',
  email: '',
  institutionType: '',
  institutionName: '',
});

// Returns { field: errorString | undefined }
export function validateCollaborator(c) {
  return {
    name: required(c.name),
    email: required(c.email) || validEmail(c.email),
    institutionType: required(c.institutionType),
    institutionName: required(c.institutionName),
  };
}

// ---- Step 2: test agent table ----
// validate(value, row) → error string or undefined; `row` enables cross-field rules.
export const DOSE_UNITS = { UM: 'uM', UG_ML: 'ug/mL' };
export const AGENT_TYPES = { DMSO: 'DMSO', AQUEOUS: 'Aqueous' };

// Splits "EGFR; KRAS" → ['EGFR', 'KRAS'] (used for validation and the payload).
const splitGenes = (v) =>
  String(v ?? '')
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);

// Each gene must match the remote JSON schema pattern ^[A-Za-z0-9-]+$.
const GENE_PATTERN = /^[A-Za-z0-9-]+$/;
const validGeneList = (v) =>
  splitGenes(v).every((g) => GENE_PATTERN.test(g))
    ? undefined
    : 'Use letters, numbers and dashes only, separated by semicolons';

// Either PubChem CID or SMILES must be given.
const cidOrSmiles = (row) =>
  !row.pubchem_cid && !row.smiles_string ? 'PubChem CID or SMILES required' : undefined;

export const TEST_AGENT_FIELDS = [
  {
    key: 'nominated_compound_name',
    label: 'Nominated compound name',
    tooltip: 'Please use International Nonproprietary Names (INN) where available.',
    validate: required,
  },
  {
    key: 'pubchem_cid',
    label: 'PubChem CID',
    tooltip: 'If available. Either PubChem CID or SMILE string is required.',
    inputmode: 'numeric',
    validate: (v, row) => validNumber(v) || cidOrSmiles(row),
  },
  {
    key: 'smiles_string',
    label: 'SMILE string',
    tooltip: 'Either PubChem CID or SMILE string is required. Checked with RDKit.',
    validate: (v, row) => cidOrSmiles(row) || validSmiles(v),
  },
  {
    key: 'can_provide_qc_agent',
    label: "Can provide QC'd test agent?",
    tooltip:
      "Are you able to provide PRISM with the already QC'd test agent should your nomination be selected?",
    options: ['Yes', 'No'],
    validate: required,
  },
  {
    key: 'vendor_ordering_info',
    label: 'Vendor ordering info',
    tooltip:
      'Provide a link or the vendor + catalog number from where the test agent can be ordered. If you are able to provide the test agent, put N/A.',
    placeholder: 'Link or vendor + catalog #',
    validate: required,
  },
  {
    key: 'modality',
    label: 'Modality',
    options: [
      'Inhibitor',
      'Degrader/glue',
      'Activator/agonist',
      'Biologic',
      'Cytotoxic/genotoxic',
      'Other',
    ],
    validate: required,
  },
  {
    key: 'drug_targets',
    label: 'Drug target(s)',
    tooltip: 'Please use semicolon-separated HUGO gene names.',
    placeholder: 'EGFR; KRAS',
    validate: (v) => required(v) || validGeneList(v),
  },
  {
    key: 'test_agent_type',
    label: 'Test agent type',
    tooltip:
      'DMSO-soluble small molecule, or aqueous test agent (including antibodies, ADCs, and cytokines).',
    options: Object.values(AGENT_TYPES),
    validate: required,
  },
  {
    key: 'top_dose',
    label: 'Top dose',
    tooltip:
      'Top doses for DMSO-soluble must be provided in uM. For aqueous test agents, the top dose must be in uM or ug/mL.',
    inputmode: 'decimal',
    validate: (v) => required(v) || validPositiveNumber(v),
  },
  {
    key: 'top_dose_unit',
    label: 'Top dose unit',
    tooltip: 'DMSO-soluble: uM only. Aqueous: uM or ug/mL.',
    options: Object.values(DOSE_UNITS),
    validate: (v, row) =>
      required(v) ||
      (row.test_agent_type === AGENT_TYPES.DMSO && v !== DOSE_UNITS.UM
        ? 'DMSO-soluble agents must use uM'
        : undefined),
  },
];

export const emptyTestAgent = () => Object.fromEntries(TEST_AGENT_FIELDS.map((f) => [f.key, '']));

// True when no field in the row has a value (the user has not started it).
export const isBlankTestAgent = (row) =>
  TEST_AGENT_FIELDS.every((f) => !String(row[f.key] ?? '').trim());

export const NO_TEST_AGENTS_ERROR = 'At least 1 test agent must be entered';

// Returns one { field: errorString | undefined } object per row (shape NominationTable expects).
export function validateTestAgents(rows) {
  return rows.map((row) =>
    Object.fromEntries(
      TEST_AGENT_FIELDS.filter((f) => f.validate).map((f) => [f.key, f.validate(row[f.key], row)]),
    ),
  );
}

// ---- Step 3: terms shown to the nominator ----
// Rendered with v-html in nominations.vue, so this is trusted markup authored
// here, never user input. Edit the copy freely; keep it to simple tags.
export const TERMS_HTML = `
  <p>Nominating a test agent does not guarantee its inclusion in any OncRef screens.
<br><br>
PRISM will only contact you if your nomination was selected. The selection process may take over one year depending upon screening bandwidth and test agent availability.
<br><br>
If your nomination is selected and screened, it may take several years before the data becomes publicly available due to the funding source used for this data. Please note that your institution will not hold ownership of any data generated as part of an OncRef screen.
<br><br>
Additionally, while your institution is not responsible for screening costs or the shipment of selected test agents, test agents that are cost-prohibitive may not be screened unless you are able to QC and provide them.
<br><br>
By clicking Submit, you are acknowledging the terms above.
</p>
`;

// ---- Helpers ----
export const hasNoErrors = (errors) => Object.values(errors).every((e) => !e);

// Converts form state into the payload shape in example-payload.json: a flat
// array with one nomination per test agent. Every entry repeats the submitter
// fields, so a two-compound submission is two objects with identical submitter
// info and different compound info. Each entry matches the remote JSON schema
// (see ajv.js): optional identifiers are null when blank, never ''.
// Server-managed fields in the example (id, status, cost, dates) are not sent.
export function buildPayload(collaborator, testAgents) {
  const submitter = {
    submitter_name: collaborator.name,
    submitter_email: collaborator.email,
    institution_company_name: collaborator.institutionName,
    institution_company_type: collaborator.institutionType,
  };
  return testAgents.map((r) => ({
    ...submitter,
    ...r,
    pubchem_cid: r.pubchem_cid ? Number(r.pubchem_cid) : null,
    smiles_string: r.smiles_string ? r.smiles_string.trim() : null,
    top_dose: Number(r.top_dose),
    drug_targets: splitGenes(r.drug_targets),
  }));
}
