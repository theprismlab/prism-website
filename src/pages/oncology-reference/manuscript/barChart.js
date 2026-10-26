import * as d3 from 'd3';

/**
 * Data for BarChart: how many rows have each value in a column, one bar per distinct
 * value. Empty cells are counted as "(blank)" so the bars add up to the row total.
 *
 * @param {Object[]} rows one object per CSV row
 * @param {string} column column to count by
 * @param {Object} [options]
 * @param {'ascending'|'descending'} [options.sort] order the bars by count; by default
 *   they follow the order the values first appear in the rows
 * @returns {{ label: string, count: number }[]}
 */
export function countBy(rows, column, { sort } = {}) {
  const counts = d3.rollup(
    rows,
    (group) => group.length,
    (row) => row[column] || '(blank)',
  );
  const bars = Array.from(counts, ([label, count]) => ({ label, count }));
  // Array.sort is stable, so ties keep their order of first appearance
  if (sort === 'descending') bars.sort((a, b) => b.count - a.count);
  else if (sort === 'ascending') bars.sort((a, b) => a.count - b.count);
  return bars;
}
