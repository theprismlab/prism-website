// Derived statistics for the OncRef manuscript page. Everything here takes the
// test agent rows from getOncRefData() and returns plain data in the shape the
// page components consume.
//
// Stat groups are plain exported constants so the page can import just the
// ones a section needs. Each entry is { label, value, color } where `value` is
// either a number or a function of the agent rows and `color` is any CSS color
// (StatGrid falls back to grey when it is left out). resolveStats() turns a
// group into the [{ label, value, color }] array StatGrid takes.
import { countBy, countByStacked } from '@/lib/charts/prism-charts.js';
import { CLASS_LABELS, countValue } from './oncref.js';

// Test agents minus the control compounds (inactive analogs etc.)
export const nonControlAgents = (agents) => agents.filter((a) => a.Class !== 'control');

// Columns for the test agent parallel sets chart, left to right. Ribbons are
// colored by the first entry. See parallelSets.js for the dimension options.
export const AGENT_PARALLEL_SETS = [
  { field: 'Class', label: 'Class', labels: CLASS_LABELS },
  { field: 'Modality_summarized', label: 'Modality' },
  {
    field: 'HighestClinicalStage_summarized',
    label: 'Clinical stage',
    order: ['Approved', 'Phase III', 'Phase II', 'Phase I', 'Preclinical'],
  },
];

// Shorthand for a stat that counts rows where `field` equals `match`
const count = (field, match) => (agents) => countValue(agents, field, match);

// Dataset totals cited in the page text. Cell lines and lineages are not in the
// test agent CSV, so these stay hardcoded.
export const OVERVIEW_STATS = [
  { label: 'Test agents', value: 265, color: 'var(--v-teal-darken-1)' },
  { label: 'Cell lines', value: 891, color: 'var(--v-blue-darken-1)' },
  { label: 'Lineages', value: 29, color: 'var(--v-purple-darken-1)' },
];

// Test agents by Class (controls left out)
export const AGENT_CLASS_STATS = [
  {
    label: 'Targeted small molecules',
    value: count('Class', 'targeted small molecule'),
    color: 'var(--v-teal-darken-1)',
  },
  {
    label: 'Biologics / ADCs',
    value: count('Class', 'biologic'),
    color: 'var(--v-blue-darken-1)',
  },
  {
    label: 'Cytotoxic agents',
    value: count('Class', 'cytotoxic/genotoxic'),
    color: 'var(--v-purple-darken-1)',
  },
  {
    label: 'Phenotypic agents',
    value: count('Class', 'phenotypic'),
    color: 'var(--v-indigo-darken-1)',
  },
];

// Single-value highlights on other columns
export const AGENT_HIGHLIGHT_STATS = [
  {
    label: 'Approved agents',
    value: count('HighestClinicalStage_summarized', 'Approved'),
    color: 'var(--v-green-darken-1)',
  },
  {
    label: 'New to PRISM',
    value: count('PreviouslyScreened', 'FALSE'),
    color: 'var(--v-orange-darken-1)',
  },
];

/**
 * Resolve a stat group against the agent rows.
 *
 * @param {{ label: string, value: number | function, color?: string }[]} group
 * @param {Object[]} [agents=[]] - rows from getOncRefData().agents; only needed
 *   when the group has function values
 * @returns {{ label: string, value: number, color?: string }[]} every other
 *   field on the entry (color etc.) is passed through unchanged
 */
export function resolveStats(group, agents = []) {
  return group.map(({ value, ...rest }) => ({
    ...rest,
    value: typeof value === 'function' ? value(agents) : value,
  }));
}

// Clinical stages from most to least advanced, used to order the stage chart
export const CLINICAL_STAGE_ORDER = [
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

/**
 * Count data for every chart on the page, keyed by chart. Each value is in the
 * shape the matching chart component takes (see countBy / countByStacked in
 * prism-charts).
 *
 * @param {Object[]} agents - rows from getOncRefData().agents
 */
export function chartCounts(agents) {
  return {
    previouslyScreened: countBy(agents, 'PreviouslyScreened'),
    clinicalStage: countBy(agents, 'HighestClinicalStage'),
    targetPathway: countBy(agents, 'TargetPathway', { sort: 'descending' }),
    modality: countBy(agents, 'Modality', { sort: 'descending' }),
    targetPathwayByModality: countByStacked(agents, 'TargetPathway', 'Modality', {
      sort: 'descending',
    }),
  };
}
