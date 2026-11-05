// Config for the test agent grouped bar chart (AgentGroupedBars.vue): one
// BarChart with a group of bars per CSV column, each group headed by the
// column's label from fields.js. The records come from groupedCounts in
// stats.js.
//
// Each group has its own color scale. The library colors every bar through one
// ordinal scale (domain[i] -> range[i]), so groupedColorAxis() keys each bar by
// group and label together and lays the groups' scales end to end.
import { interpolateBlues, quantize, schemeDark2 } from 'd3';
import { categoryColors } from '@/lib/charts/prism-charts.js';
import { fieldLabel, valueOrder } from './fields.js';

// Columns to group by, in display order. `color` gives the group's scale as a
// function of the agent rows: { domain?, range }. Without a domain the range is
// cycled over the group's bars, so a one-color range paints the whole group.
const GROUPS = [
  {
    field: 'TargetPathway',
    // Pathway colors from the shared mapping, so the bars match the UMAP
    color: (agents) => categoryColors(agents, 'TargetPathway'),
  },
  {
    field: 'Modality_summarized',
    color: () => ({ range: [schemeDark2[0]] }),
  },
  {
    field: 'HighestClinicalStage_summarized',
    // Stages in clinical order on a blue ramp, most advanced darkest
    color: () => {
      const stages = valueOrder('HighestClinicalStage_summarized');
      return {
        domain: stages,
        range: quantize((t) => interpolateBlues(0.33 + 0.7 * t), stages.length),
      };
    },
  },
];

export const AGENT_GROUPED_BARS = {
  title: 'Test agents by pathway, modality and clinical stage',
  groups: GROUPS,

  border: true,
  // Props for the BarChart wrapper
  chart: {
    orientation: 'vertical',
    barLabel: 'count',
    fontSize: 'medium',
    // groupPadding: 50,
  },
  // Axes other than color, which groupedColorAxis() builds from the records
  axis: {
    value: { title: 'Test agents' },
    // Groups in GROUPS order, headed by the field label
    group: {
      field: 'group',
      domain: GROUPS.map((g) => fieldLabel(g.field)),
      position: 'outside',
    },
  },
};

// Color key of a grouped bar record: unique across groups even when labels repeat
const colorKey = (d) => `${d.group}|${d.label}`;

/**
 * The BarChart color axis for a grouped chart whose groups each have their own
 * color scale: one ordinal scale keyed by group and label, with every group's
 * scale concatenated in record order.
 *
 * @param {{ field: string, color: function }[]} groups - the config's groups
 * @param {{ group: string, label: string }[]} records - from groupedCounts()
 * @param {Object[]} agents - rows from getOncRefData().agents, for data-derived scales
 * @returns {{ field: function, domain: string[], range: string[] }}
 */
export function groupedColorAxis(groups, records, agents) {
  const domain = [];
  const range = [];
  for (const group of groups) {
    const heading = fieldLabel(group.field);
    const scale = group.color(agents);
    records
      .filter((d) => d.group === heading)
      .forEach((d, i) => {
        const index = scale.domain ? scale.domain.indexOf(d.label) : -1;
        domain.push(colorKey(d));
        range.push(scale.range[(index < 0 ? i : index) % scale.range.length]);
      });
  }
  return { field: colorKey, domain, range };
}
