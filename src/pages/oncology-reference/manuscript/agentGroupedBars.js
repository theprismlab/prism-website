// Config for the test agent grouped bar chart (AgentGroupedBars.vue): one
// horizontal BarChart with a group of bars per CSV column, each group headed by
// the column's label from fields.js. The records come from groupedCounts in
// stats.js.
import { fieldLabel } from './fields.js';

// Every bar the same blue (the library's first default color)
const BLUE = '#4e79a7';

// Columns to group by, in display order
const GROUPS = ['TargetPathway', 'Modality_summarized', 'HighestClinicalStage_summarized'];

export const AGENT_GROUPED_BARS = {
  title: 'Test agents by pathway, modality and clinical stage',
  groups: GROUPS,

  // Props for the BarChart wrapper
  chart: {
    orientation: 'vertical',
    barLabel: 'count',
    fontSize: 'medium',
    // groupPadding: 50,
  },
  axis: {
    value: { title: 'Test agents' },
    // Groups top to bottom in GROUPS order, headed by the field label
    group: { field: 'group', domain: GROUPS.map(fieldLabel) },
    // One color reused for every bar
    color: { range: [BLUE] },
  },
};
