// Config for the test agent explorer (AgentExplorer.vue): which CSV columns the
// table shows and which get a filter, plus the UMAP it embeds (AgentExplorerUmap.vue).
// Header and filter labels come from fields.js.
import { fieldLabel } from './fields.js';

// Table columns, in order
const TABLE_COLUMNS = [
  'FormattedName',
  'GeneSymbolOfTargets',
  'Modality',
  'Class',
  'TargetPathway',
  'TargetOrMechanism',
  'HighestClinicalStage',
];

// Semicolon-delimited CSV fields, where a row matches a filter if any value is selected
const LIST_FIELDS = new Set(['GeneSymbolOfTargets', 'TargetOrMechanism']);

export const AGENT_EXPLORER = {
  // v-data-table headers: `key` is the CSV column, `title` what the header shows
  headers: TABLE_COLUMNS.map((key) => ({ key, title: fieldLabel(key) })),
  // Every table column except the agent name gets a multiselect filter
  filterFields: TABLE_COLUMNS.filter((key) => key !== 'FormattedName').map((key) => ({
    key,
    label: fieldLabel(key),
    list: LIST_FIELDS.has(key),
  })),
  // Column the table sorts by at first
  sortBy: 'FormattedName',
  unit: 'agents',

  // The UMAP scatter above the table
  umap: {
    title: 'Test agent UMAP',
    // Axis titles; the UMAP coordinates have no units
    axisTitles: { x: 'X Axis', y: 'Y Axis' },
    // CSV column the agent points are colored by (legend title from fields.js)
    colorField: 'TargetPathway',
    // The overlaid CRISPR gene layer
    genes: { label: 'CRISPR gene', color: '#555' },
  },
};
