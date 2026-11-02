// Config for the test agent parallel sets chart on the manuscript page: the
// card copy plus the props handed to ParallelSetsChart. Keeping it here leaves
// manuscript.vue with only the rendering.

export const AGENT_PARALLEL_SETS = {
  title: 'Test agent breakdown',
  description:
    'Each ribbon follows a set of test agents from their class through target pathway and ' +
    'modality to highest clinical stage. Ribbon width is the number of agents. Hover a ' +
    'category to trace its agents across the chart.',

  // Bound straight onto <parallel-sets-chart> with v-bind. `rows` is passed
  // separately by the page since it depends on the loaded data.
  chart: {
    // Field that colors the ribbons initially; the chart's "Color by" select
    // can change it
    colorBy: 'Class',
    height: 480,
    // Columns left to right, as CSV field names. Labels, value names and value
    // order come from fields.js; pass an object ({ field, label, labels, order })
    // instead of a string to override any of them for this chart only.
    dimensions: [
      'PreviouslyScreened',
      'Class',
      'TargetPathway',
      'Modality_summarized',
      'HighestClinicalStage_summarized',
    ],
  },
};
