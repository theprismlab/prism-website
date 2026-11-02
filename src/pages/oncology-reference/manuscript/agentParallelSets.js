// Config for the test agent breakdown card (AgentParallelSets.vue): the card copy
// and which CSV columns the parallel sets chart shows. Column labels, value
// names and value order come from fields.js via toDimension, so the chart
// receives fully described dimensions and never consults the lookup itself.
import { toDimension } from './fields.js';

export const AGENT_PARALLEL_SETS = {
  title: 'Test agent breakdown',
  description:
    'Each ribbon follows a set of test agents from their class through target pathway and ' +
    'modality to highest clinical stage. Ribbon width is the number of agents. Hover a ' +
    'category to trace its agents across the chart.',

  // Columns left to right. Pass an object ({ field, title, domain, format }) in
  // place of a name to override the lookup for this chart only.
  dimensions: [
    'PreviouslyScreened',
    'Class',
    'TargetPathway',
    'Modality_summarized',
    'HighestClinicalStage_summarized',
  ].map(toDimension),

  // Field that colors the ribbons when the card first renders
  defaultColorBy: 'Class',
  // Plot height in pixels
  height: 480,
  // Noun for the tooltip counts
  unit: 'agents',
};
