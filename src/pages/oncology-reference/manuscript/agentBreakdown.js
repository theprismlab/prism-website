// Config for the test agent breakdown card (AgentBreakdown.vue): the card copy,
// which CSV columns the matrix can use as rows, columns or color, and the color
// scale of each. Column labels, value names and value order come from fields.js
// via toDimension, as for the parallel sets.
import { categoryColors } from '@/lib/charts/prism-charts.js';
import { NEUTRAL_COLOR as NEUTRAL } from './breakdown.js';
import { fieldLabel, toDimension, valueLabel, valueOrder } from './fields.js';

// Categorical hues, in an order where neighbors stay distinct under color
// vision deficiency. Never cycled: a field with more values than hues draws
// its smallest values in NEUTRAL.
const BLUE = '#2a78d6';
const ORANGE = '#eb6834';
const AQUA = '#1baf7a';
const YELLOW = '#eda100';
const MAGENTA = '#e87ba4';
const GREEN = '#008300';
const VIOLET = '#6250d6';
const RED = '#e34948';
const SERIES = [BLUE, ORANGE, AQUA, YELLOW, MAGENTA, GREEN, VIOLET, RED];

// One blue from dark to light, for values that have an order
const BLUE_RAMP = ['#104281', '#1c5cab', '#2a78d6', '#5598e7', '#86b6ef'];

/**
 * A scale for a field with no natural order: its values by count descending,
 * the largest on the SERIES hues and the rest neutral.
 */
function seriesByCount(agents, field) {
  const counts = new Map();
  for (const row of agents) counts.set(row[field], (counts.get(row[field]) ?? 0) + 1);
  const domain = [...counts.keys()].sort(
    (a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b),
  );
  return { domain, range: domain.map((_, i) => SERIES[i] ?? NEUTRAL) };
}

// Color scale per field, as a function of the agent rows: { domain, range },
// where domain[i] is drawn in range[i]. A field left out falls back to
// seriesByCount.
const COLORS = {
  // Four hues that stay apart in any pairing; controls are not a drug class
  Class: () => ({
    domain: ['targeted small molecule', 'biologic', 'cytotoxic/genotoxic', 'phenotypic', 'control'],
    range: [BLUE, GREEN, MAGENTA, YELLOW, NEUTRAL],
  }),
  // Stages in clinical order on one blue, most advanced darkest
  HighestClinicalStage_summarized: () => ({
    domain: valueOrder('HighestClinicalStage_summarized'),
    range: BLUE_RAMP,
  }),
  PreviouslyScreened: () => ({ domain: ['FALSE', 'TRUE'], range: [BLUE, ORANGE] }),
  Modality_summarized: (agents) => seriesByCount(agents, 'Modality_summarized'),
  // Pathway colors from the shared mapping, so the squares match the UMAP
  TargetPathway: (agents) => categoryColors(agents, 'TargetPathway'),
};

// Semicolon-delimited list cell as readable text, cut off after `max` entries
function formatList(value, max = 6) {
  const items = (value || '')
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
  const shown = items.slice(0, max).join(', ');
  return items.length > max ? `${shown} +${items.length - max} more` : shown;
}

// Columns listed in an agent's tooltip, in order. The detailed modality and
// clinical stage columns, not the summarized ones the matrix groups by.
const TOOLTIP_FIELDS = [
  'TargetOrMechanism',
  'GeneSymbolOfTargets',
  'Class',
  'Modality',
  'TargetPathway',
  'HighestClinicalStage',
  'PreviouslyScreened',
];

export const AGENT_BREAKDOWN = {
  title: 'Test agent composition',
  // Shown above the matrix until something is selected
  hint: 'Each square is one test agent. Click a color in the legend to focus on that group.',

  // The columns offered for rows, columns and color, in the order the selects
  // list them. Pass an object ({ field, title, domain, format }) in place of a
  // name to override the lookup for this card only.
  dimensions: [
    'Class',
    'Modality_summarized',
    'TargetPathway',
    'HighestClinicalStage_summarized',
    'PreviouslyScreened',
  ].map(toDimension),

  // What the matrix shows when the card first renders: a small grid to start
  // from. `x` may be null for a single column.
  defaults: {
    y: 'Class',
    x: 'HighestClinicalStage_summarized',
    color: 'PreviouslyScreened',
  },

  colors: COLORS,
  // Scale for a dimension with no entry in `colors`
  defaultColors: seriesByCount,

  // Agent name shown as the tooltip heading, and the unique key per agent
  labelField: 'FormattedName',
  keyField: 'CompoundName',
  // Tooltip rows: { field, title, format }
  tooltip: TOOLTIP_FIELDS.map((field) => ({
    field,
    title: fieldLabel(field),
    format:
      field === 'GeneSymbolOfTargets'
        ? (value) => formatList(value)
        : (value) => valueLabel(field, value),
  })),

  // Noun for the counts
  unit: 'agents',
};
