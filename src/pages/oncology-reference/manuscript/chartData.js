import * as d3 from 'd3';

// Label for rows with an empty cell, so counts add up to the row total
export const BLANK = '(blank)';

/** Value of a CSV column for a row, with empty cells as "(blank)". */
export function valueOf(row, column) {
  return row[column] || BLANK;
}

// Array.sort is stable, so ties keep the order they had (first appearance in the rows)
function sortByCount(items, sort) {
  if (sort === 'descending') items.sort((a, b) => b.count - a.count);
  else if (sort === 'ascending') items.sort((a, b) => a.count - b.count);
  return items;
}

/**
 * Data for BarChart and HorizontalBarChart: how many rows have each value in a column.
 *
 * @param {Object[]} rows one object per CSV row
 * @param {string} column column to count by, one bar per distinct value
 * @param {Object} [options]
 * @param {'ascending'|'descending'} [options.sort] order by count; default is the order
 *   the values first appear in the rows
 * @returns {{ label: string, count: number }[]}
 */
export function countBy(rows, column, { sort } = {}) {
  const counts = d3.rollup(
    rows,
    (group) => group.length,
    (row) => valueOf(row, column),
  );
  return sortByCount(
    Array.from(counts, ([label, count]) => ({ label, count })),
    sort,
  );
}

/**
 * Data for HorizontalStackedBarChart: like countBy, with each bar split into one
 * segment per distinct value of a second column.
 *
 * @param {Object[]} rows one object per CSV row
 * @param {string} column column to count by, one bar per distinct value
 * @param {string} stackColumn column to split each bar by
 * @param {Object} [options]
 * @param {'ascending'|'descending'} [options.sort] order bars by their total count
 * @returns {{ label: string, count: number, segments: { key: string, count: number }[] }[]}
 */
export function countByStacked(rows, column, stackColumn, { sort } = {}) {
  const bars = Array.from(
    d3.group(rows, (row) => valueOf(row, column)),
    ([label, group]) => ({
      label,
      count: group.length,
      segments: Array.from(
        d3.rollup(
          group,
          (g) => g.length,
          (row) => valueOf(row, stackColumn),
        ),
        ([key, count]) => ({ key, count }),
      ),
    }),
  );
  return sortByCount(bars, sort);
}
