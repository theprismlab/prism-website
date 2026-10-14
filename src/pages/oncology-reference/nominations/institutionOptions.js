// Institution options for the OncRef nomination form.
// Copied from src/submissions/forms/steps/institutionSchema.js so this form
// can diverge from the submissions hub without affecting it.

export const COLLABORATOR_TYPE_OPTIONS = {
  DMC: { key: 'DMC', label: 'Dependency Map Consortium' },
  BROAD: { key: 'NFP', label: 'Broad Institute & Affiliated Institutions' },
  ACADEMIC: { key: 'ACADEMIC', label: 'Academic Institution (Non-Broad or Broad Affiliates)' },
  INDUSTRY: { key: 'INDUSTRY', label: 'Industry' },
};

// Shape expected by <v-select :items>
export const INSTITUTION_TYPE_OPTIONS = Object.values(COLLABORATOR_TYPE_OPTIONS).map((o) => ({
  title: o.label,
  value: o.key,
}));

// Types whose institution name comes from the collaborator list (dropdown)
// rather than free text.
export const DROPDOWN_NAME_TYPES = [
  COLLABORATOR_TYPE_OPTIONS.DMC.key,
  COLLABORATOR_TYPE_OPTIONS.BROAD.key,
];
