// Derived statistics for the OncRef manuscript page. Everything here takes the
// test agent rows from getOncRefData() and returns plain data in the shape the
// page components consume. No colors or layout: that stays in manuscript.vue.
//
// Stat groups are plain exported constants so the page can import just the
// ones a section needs. Each entry is { label, value } where `value` is either
// a number or a function of the agent rows; resolveStats() turns a group into
// the [{ label, value }] array StatGrid takes.
import { countBy, countByStacked } from '@/lib/charts/prism-charts.js';
import { countValue } from './oncref.js';

// Shorthand for a stat that counts rows where `field` equals `match`
const count = (field, match) => (agents) => countValue(agents, field, match);

// Dataset totals cited in the page text. Cell lines and lineages are not in the
// test agent CSV, so these stay hardcoded.
export const OVERVIEW_STATS = [
  { label: 'Test agents', value: 265 },
  { label: 'Cell lines', value: 891 },
  { label: 'Lineages', value: 29 },
];

// Test agents by Class (controls left out)
export const AGENT_CLASS_STATS = [
  { label: 'Targeted small molecules', value: count('Class', 'targeted small molecule') },
  { label: 'Biologics / ADCs', value: count('Class', 'biologic') },
  { label: 'Cytotoxic agents', value: count('Class', 'cytotoxic/genotoxic') },
  { label: 'Phenotypic agents', value: count('Class', 'phenotypic') },
];

// Single-value highlights on other columns
export const AGENT_HIGHLIGHT_STATS = [
  { label: 'Approved agents', value: count('HighestClinicalStage_summarized', 'Approved') },
  { label: 'New to PRISM', value: count('PreviouslyScreened', 'FALSE') },
];

/**
 * Resolve a stat group against the agent rows.
 *
 * @param {{ label: string, value: number | function }[]} group
 * @param {Object[]} [agents=[]] - rows from getOncRefData().agents; only needed
 *   when the group has function values
 * @returns {{ label: string, value: number }[]}
 */
export function resolveStats(group, agents = []) {
  return group.map(({ label, value }) => ({
    label,
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
