// Config for the test agent bar matrix card (AgentBarMatrix.vue): the card copy,
// which CSV columns the reader can put on each axis, and the inputs the card
// shows. The columns, their labels and order, and their color scales are the
// breakdown card's (see agentBreakdown.js), so a field reads and is colored the
// same in both.
import { AGENT_BREAKDOWN } from './agentBreakdown.js';

export const AGENT_BAR_MATRIX = {
  title: 'Test agents by group',
  description:
    'Every bar counts the test agents in its group, on one scale across the whole chart. ' +
    'Click a legend entry to highlight its bars, and hover a bar for its count.',

  // The columns the reader can put on the axes, in the order the inputs list them
  dimensions: AGENT_BREAKDOWN.dimensions,

  // The fields on each axis when the card first renders. Any of `y`, `x`,
  // `group` and `series` may be null: a single row, a single column, one group
  // per cell, or one bar per group.
  defaults: {
    // Matrix rows and columns
    y: null,
    x: 'HighestClinicalStage_summarized',
    // Bar groups inside every cell, and the bars side by side within a group
    group: 'Class',
    series: 'PreviouslyScreened',
    color: 'PreviouslyScreened',
  },

  // Which inputs the card's toolbar gives the reader, in this order: any of
  // 'rows', 'columns', 'groups', 'series', 'color' and 'swap' (a button trading
  // rows and columns). Leave one out to fix that axis to its default; an empty
  // list shows no inputs.
  controls: ['rows', 'swap', 'columns', 'groups', 'series', 'color'],

  // Whether every row lists every bar group, and every group every series, even
  // the empty ones (true), or each lists only its own (false), so rows and
  // groups differ in size but nothing empty is drawn.
  shared: { groups: false, series: false },

  // Which axes show their tick labels: the row, column, group and series names,
  // and the count axis under the plot. Series are off because the color legend
  // names them when the bars are colored by series; turn them on to label
  // every bar.
  ticks: { rows: true, columns: true, groups: true, series: true, value: true },

  // Where the bar group names sit: 'column' in a column of their own left of
  // the bars, or 'heading' on a line above each group's bars, which also sets
  // the groups apart.
  groupLabels: 'heading',

  colors: AGENT_BREAKDOWN.colors,
  // Scale for a dimension with no entry in `colors`
  defaultColors: AGENT_BREAKDOWN.defaultColors,

  // Px thickness of a bar, px between the bars of a group, px between groups
  barSize: 10,
  barPadding: 2,
  groupPadding: 8,
  // The count at the end of every bar
  showValues: true,
  // Noun for the counts, and the title of the value axis
  unit: 'agents',
};
