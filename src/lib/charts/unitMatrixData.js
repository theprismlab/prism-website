import * as d3 from 'd3';
import { resolveAxis, categoryDomain } from './chartAxis.js';
import { defaultColors } from './prism-charts.js';

/**
 * Data for UnitMatrixChart, in one step:
 *
 *   records ──prepareUnitMatrix()──▶ rows and columns of categories, the cell
 *                                    where each pair meets, and one unit per
 *                                    record placed in its cell
 *
 * Records are what the chart's `data` option takes: plain objects, one per item
 * (a table row), drawn as they are. There is no rows step: the chart counts the
 * records itself. The y axis names the categorical field whose categories are
 * the matrix rows, the x axis the field whose categories are its columns, and
 * the color axis the field the units are colored by. Every record is one unit,
 * in the cell for its y and x categories.
 * prepareUnitMatrix is the chart's own transform, run on every draw, and
 * exported so an app can see or test what the chart will draw.
 */

/** Category for a record with nothing in an axis' field. */
export const BLANK = '(blank)';

// A category axis (x and y): `field` names the record field, `title` heads the
// axis, `domain` lists the categories to show first (in that order), `format` is
// the label text from a category, and `sort` orders the categories not in
// `domain`: 'descending' (default) or 'ascending' by record count, or null for
// order of first appearance. Without a field the axis has one unlabelled
// category holding every record.
const CATEGORY_AXIS = { field: null, title: null, domain: null, format: null, sort: 'descending' };
const COLOR_AXIS = {
  field: null,
  title: null,
  type: 'categorical',
  domain: null,
  range: null,
  tickValues: null,
  format: null,
  sort: 'descending',
};

const categoryOf = (accessor, record) => {
  const value = accessor?.(record);
  return value == null || value === '' ? BLANK : String(value);
};

// Categories of an axis in display order: the configured `domain` first (those
// present), then the rest by `sort`
function orderCategories(counts, axis) {
  const rest = [...counts.keys()];
  if (axis.sort === 'descending') rest.sort((a, b) => counts.get(b) - counts.get(a));
  else if (axis.sort === 'ascending') rest.sort((a, b) => counts.get(a) - counts.get(b));
  const listed = (axis.domain ?? []).filter((key) => counts.has(key));
  return [...listed, ...rest.filter((key) => !listed.includes(key))];
}

// The categories of a row or column axis as bands: { key, label, index, count }.
// An axis without a field is one band with a null key, as long as there are records.
function bands(data, axis) {
  if (!axis.accessor) {
    return data.length ? [{ key: null, label: '', index: 0, count: data.length }] : [];
  }
  const counts = d3.rollup(
    data,
    (group) => group.length,
    (record) => categoryOf(axis.accessor, record),
  );
  return orderCategories(counts, axis).map((key, index) => ({
    key,
    label: axis.format ? axis.format(key) : key,
    index,
    count: counts.get(key),
  }));
}

/**
 * What UnitMatrixChart draws, resolved from its records and options:
 *
 *   axes     { x, y, color }: each axis config with its accessor and data-derived
 *            domain (its categories in order) filled in, and the color range.
 *   columns  One per x category, left to right: { key, label, index, count }.
 *            `key` is the raw category, `label` its formatted text and `count`
 *            how many records it holds. One column with a null key when the x
 *            axis has no field.
 *   rows     One per y category, top to bottom: { key, label, index, count,
 *            cells }, with one cell per column: { row, column, count, units }
 *            (`row` and `column` are indexes).
 *   units    Every unit, cell by cell: { record, index, row, column, rowKey,
 *            columnKey, colorKey }. `index` is the record's position in `data`.
 *            Within a cell, units are ordered by their color category, so each
 *            color sits together, then by `index`.
 *   total    How many records.
 *
 * @param {Object[]} data records, one per item
 * @param {Object} options the UnitMatrixChart options (axis is used)
 */
export function prepareUnitMatrix(data = [], options = {}) {
  const x = resolveAxis(CATEGORY_AXIS, options.axis?.x);
  const y = resolveAxis(CATEGORY_AXIS, options.axis?.y);
  const color = resolveAxis(COLOR_AXIS, options.axis?.color);

  const columns = bands(data, x);
  const rows = bands(data, y).map((row) => ({
    ...row,
    cells: columns.map((column) => ({ row: row.index, column: column.index, count: 0, units: [] })),
  }));
  x.domain = columns.map((column) => column.key);
  y.domain = rows.map((row) => row.key);

  // Color axis: its categories in order, on the default colors
  const colorOf = color.accessor ? (record) => categoryOf(color.accessor, record) : () => null;
  if (color.accessor) {
    const counts = d3.rollup(data, (group) => group.length, colorOf);
    color.domain = categoryDomain(color.domain, orderCategories(counts, color));
    color.range ??= defaultColors(color.domain.length);
  } else {
    color.domain = [];
  }
  const colorRank = new Map(color.domain.map((key, i) => [key, i]));

  // One unit per record, in the cell for its row and column categories
  const rowIndex = new Map(rows.map((row) => [row.key, row.index]));
  const columnIndex = new Map(columns.map((column) => [column.key, column.index]));
  data.forEach((record, index) => {
    const rowKey = y.accessor ? categoryOf(y.accessor, record) : null;
    const columnKey = x.accessor ? categoryOf(x.accessor, record) : null;
    const row = rowIndex.get(rowKey);
    const column = columnIndex.get(columnKey);
    const cell = rows[row].cells[column];
    cell.units.push({ record, index, row, column, rowKey, columnKey, colorKey: colorOf(record) });
    cell.count += 1;
  });
  const rank = (unit) => colorRank.get(unit.colorKey) ?? colorRank.size;
  const units = [];
  for (const row of rows) {
    for (const cell of row.cells) {
      cell.units.sort((a, b) => rank(a) - rank(b) || a.index - b.index);
      units.push(...cell.units);
    }
  }

  return { axes: { x, y, color }, columns, rows, units, total: data.length };
}
