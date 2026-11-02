// Config for the test agent parallel sets chart on the manuscript page: the
// card copy plus the props handed to ParallelSetsChart. Keeping it here leaves
// manuscript.vue with only the rendering.
import { CLASS_LABELS } from './oncref.js';

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
    // Columns left to right. See parallelSets.js for the dimension options.
    dimensions: [
      {
        field: 'PreviouslyScreened',
        label: 'Novel to Public Data',
        // The column is "previously screened", so the heading reads inverted
        labels: { FALSE: 'Novel', TRUE: 'Previously screened' },
        order: ['FALSE', 'TRUE'],
      },
      { field: 'Class', label: 'Class', labels: CLASS_LABELS },
      { field: 'TargetPathway', label: 'Target pathway' },
      { field: 'Modality_summarized', label: 'Modality' },
      {
        field: 'HighestClinicalStage_summarized',
        label: 'Clinical stage',
        order: ['Approved', 'Phase III', 'Phase II', 'Phase I', 'Preclinical'],
      },
    ],
  },
};
