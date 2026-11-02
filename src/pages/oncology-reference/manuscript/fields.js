// Single source of display text for the test agent CSV columns, keyed by column
// name. Every chart, table, filter and stat on the manuscript page reads its
// wording from here so the same field is named the same way everywhere.
//
// Each entry may have:
//   label   human name for the column
//   values  display name per raw value (anything unlisted shows the raw value)
//   order   raw values in display order (anything unlisted follows, by count)

const CLASS_VALUES = {
  'targeted small molecule': 'Targeted small molecules',
  biologic: 'Biologics / ADCs',
  'cytotoxic/genotoxic': 'Cytotoxic agents',
  phenotypic: 'Phenotypic agents',
  control: 'Controls',
};

// Most to least advanced
const CLINICAL_STAGE_ORDER = [
  'Approved',
  'Approved (non-oncology)',
  'Phase III',
  'Phase II/III',
  'Phase IIa',
  'Phase II',
  'Phase Ib/II',
  'Phase I/II',
  'Phase I/IIa',
  'Phase Ib',
  'Phase I',
  'Preclinical',
];

export const FIELDS = {
  FormattedName: { label: 'Agent' },
  CompoundName: { label: 'Agent' },
  GeneSymbolOfTargets: { label: 'Targets' },
  TargetOrMechanism: { label: 'Mechanism' },
  Class: { label: 'Class', values: CLASS_VALUES },
  Modality: { label: 'Modality' },
  Modality_summarized: { label: 'Modality' },
  TargetPathway: { label: 'Target pathway' },
  HighestClinicalStage: { label: 'Clinical stage', order: CLINICAL_STAGE_ORDER },
  HighestClinicalStage_summarized: {
    label: 'Clinical stage',
    order: ['Approved', 'Phase III', 'Phase II', 'Phase I', 'Preclinical'],
  },
  PreviouslyScreened: {
    label: 'Novel to public data',
    // The column records whether an agent was screened before, so the heading
    // reads inverted relative to the raw TRUE/FALSE
    values: { FALSE: 'Novel', TRUE: 'Previously screened' },
    order: ['FALSE', 'TRUE'],
  },
};

/** Display name for a column; falls back to the column name itself. */
export const fieldLabel = (field) => FIELDS[field]?.label ?? field;

/** Display name for one raw value of a column; falls back to the raw value. */
export const valueLabel = (field, value) => FIELDS[field]?.values?.[value] ?? value;

/** Raw-value display order for a column, or null when there is none. */
export const valueOrder = (field) => FIELDS[field]?.order ?? null;
