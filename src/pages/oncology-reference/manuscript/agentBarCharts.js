// Config for the test agent bar charts (AgentBarCharts.vue): one card per CSV
// column, each a horizontal bar chart of agent counts. Titles come from
// fields.js; the count data comes from chartCounts in stats.js, keyed by `counts`.
import { interpolateBlues, quantize, schemeDark2 } from 'd3';
import { categoryColors } from '@/lib/charts/prism-charts.js';
import { valueOrder } from './fields.js';

// The counts axis, shared by every card: title above the plot, pointing up it
const COUNT_AXIS = { title: 'Test agents', titlePosition: 'top' };

export const AGENT_BAR_CHARTS = {
  // Props shared by every bar chart
  chart: { barLabel: 'count', fontSize: 'medium' },

  // One card each, left to right. `axis` is a function of the agent rows because
  // some color scales are derived from the data.
  charts: [
    {
      field: 'TargetPathway',
      counts: 'targetPathway',
      // Pathway colors from the shared mapping, so the bars match the UMAP
      axis: (agents) => ({ y: COUNT_AXIS, color: categoryColors(agents, 'TargetPathway') }),
    },
    {
      field: 'Modality_summarized',
      counts: 'modality',
      axis: () => ({ y: COUNT_AXIS, color: { range: [schemeDark2[0]] } }),
    },
    {
      field: 'HighestClinicalStage_summarized',
      counts: 'clinicalStage',
      // Stages in clinical order on a blue ramp, most advanced darkest
      axis: () => {
        const stages = valueOrder('HighestClinicalStage_summarized');
        return {
          y: COUNT_AXIS,
          x: { domain: stages },
          color: {
            domain: stages,
            range: quantize((t) => interpolateBlues(0.33 + 0.7 * t), stages.length),
          },
        };
      },
    },
  ],
};
