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
import { countValue } from './oncref.js';
import { fieldLabel, valueLabel, valueOrder } from './fields.js';

// Test agents minus the control compounds (inactive analogs etc.)
export const nonControlAgents = (agents) => agents.filter((a) => a.Class !== 'control');

// Shorthand for a stat that counts rows where `field` equals `match`
const count = (field, match) => (agents) => countValue(agents, field, match);
// A stat tile for one value of a field, labelled from fields.js
const valueStat = (field, match, color) => ({
  label: valueLabel(field, match),
  value: count(field, match),
  color,
});

// Dataset totals cited in the page text. Cell lines and lineages are not in the
// test agent CSV, so these stay hardcoded.
export const OVERVIEW_STATS = [
  { label: 'Test agents', value: 265, color: 'var(--v-teal-darken-1)' },
  { label: 'Cell lines', value: 891, color: 'var(--v-blue-darken-1)' },
  { label: 'Lineages', value: 29, color: 'var(--v-purple-darken-1)' },
];

// Test agents by Class (controls left out)
export const AGENT_CLASS_STATS = [
  valueStat('Class', 'targeted small molecule', 'var(--v-teal-darken-1)'),
  valueStat('Class', 'biologic', 'var(--v-blue-darken-1)'),
  valueStat('Class', 'cytotoxic/genotoxic', 'var(--v-purple-darken-1)'),
  valueStat('Class', 'phenotypic', 'var(--v-indigo-darken-1)'),
];

// Single-value highlights on other columns
export const AGENT_HIGHLIGHT_STATS = [
  {
    label: 'Approved agents',
    value: count('HighestClinicalStage_summarized', 'Approved'),
    color: 'var(--v-green-darken-1)',
  },
  {
    label: 'Novel to Public Data',
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

/**
 * Count data for every chart on the page, keyed by chart. Each value is in the
 * shape the matching chart component takes (see countBy / countByStacked in
 * prism-charts).
 *
 * @param {Object[]} agents - rows from getOncRefData().agents
 */
/**
 * Records for a grouped BarChart: the value counts of several columns at once,
 * one group per column headed by its field label. Within a group the bars
 * follow the column's value order from fields.js when it has one, else count
 * descending.
 *
 * @param {Object[]} agents - rows from getOncRefData().agents
 * @param {string[]} fields - CSV columns, one group each, in group order
 * @returns {{ group: string, label: string, count: number }[]}
 */
export function groupedCounts(agents, fields) {
  return fields.flatMap((field) => {
    const order = valueOrder(field);
    const bars = countBy(agents, field, order ? {} : { sort: 'descending' });
    if (order) {
      const rank = (label) => {
        const i = order.indexOf(label);
        return i < 0 ? order.length : i;
      };
      bars.sort((a, b) => rank(a.label) - rank(b.label) || b.count - a.count);
    }
    return bars.map((bar) => ({ ...bar, group: fieldLabel(field) }));
  });
}

export function chartCounts(agents) {
  return {
    previouslyScreened: countBy(agents, 'PreviouslyScreened'),
    // The summarized columns, so the charts group the same way as the parallel sets
    clinicalStage: countBy(agents, 'HighestClinicalStage_summarized'),
    targetPathway: countBy(agents, 'TargetPathway', { sort: 'descending' }),
    modality: countBy(agents, 'Modality_summarized', { sort: 'descending' }),
    targetPathwayByModality: countByStacked(agents, 'TargetPathway', 'Modality_summarized', {
      sort: 'descending',
    }),
  };
}
