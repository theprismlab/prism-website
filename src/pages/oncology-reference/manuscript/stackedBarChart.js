import * as d3 from 'd3';

/**
 * Data for StackedBarChart: how many rows have each value in a column, one bar per
 * distinct value, with each bar split into one segment per distinct value of a second
 * column. Empty cells are counted as "(blank)" so the bars add up to the row total.
 *
 * @param {Object[]} rows one object per CSV row
 * @param {string} column column to count by
 * @param {string} stackColumn column to split each bar by
 * @param {Object} [options]
 * @param {'ascending'|'descending'} [options.sort] order the bars by their total count;
 *   by default they follow the order the values first appear in the rows
 * @returns {{ label: string, count: number, segments: { key: string, count: number }[] }[]}
 */
export function countByStacked(rows, column, stackColumn, { sort } = {}) {
  const groups = d3.group(rows, (row) => row[column] || '(blank)');
  const bars = Array.from(groups, ([label, group]) => ({
    label,
    count: group.length,
    segments: Array.from(
      d3.rollup(
        group,
        (g) => g.length,
        (row) => row[stackColumn] || '(blank)',
      ),
      ([key, count]) => ({ key, count }),
    ),
  }));
  // Array.sort is stable, so ties keep their order of first appearance
  if (sort === 'descending') bars.sort((a, b) => b.count - a.count);
  else if (sort === 'ascending') bars.sort((a, b) => a.count - b.count);
  return bars;
}
