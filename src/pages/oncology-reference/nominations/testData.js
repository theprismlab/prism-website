// Sample data for the dev-only "Fill with test data" button in nominations.vue.
// Shapes match the form state (collaborator + test agent rows), not the API payload.
// Uses a free-text institution type so it does not depend on the collaborator
// list having loaded. Each export returns a fresh object so the form can mutate it.
import { COLLABORATOR_TYPE_OPTIONS } from './institutionOptions.js';

export const testCollaborator = () => ({
  name: 'Test Submitter',
  email: 'test.submitter@example.org',
  institutionType: COLLABORATOR_TYPE_OPTIONS.ACADEMIC.key,
  institutionName: 'Example University',
});

// Two agents: one DMSO with a PubChem CID, one aqueous with SMILES only.
export const testAgents = () => [
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
