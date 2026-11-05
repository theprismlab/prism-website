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
    // 'Modality_summarized',
    'Class',
    // 'TargetPathway',
    'HighestClinicalStage_summarized',
    'PreviouslyScreened',
  ].map(toDimension),

  // Field that colors the ribbons when the card first renders
  defaultColorBy: 'PreviouslyScreened',
  // Plot height in pixels
  height: 480,
  // Node width in pixels, wide enough to hold the labels drawn inside them
  nodeWidth: 150,
  // 'inside' draws each category label in its node; 'outside' to its right
  labelPosition: 'inside',
  // Node fill and outline
  nodeFill: '#fff',
  nodeStroke: '#000',
  // Counts hidden for now: true brings back the counts in the tooltips (and in
  // the node labels when labelPosition is 'outside')
  showCounts: false,
  // Merge ribbons that share a source, target and color, ordered to cross less
  bundleLinks: true,
  // Noun for the tooltip counts
  unit: 'agents',
};
