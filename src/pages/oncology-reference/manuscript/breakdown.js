// Counting logic for the test agent breakdown explorer (AgentBreakdown.vue and
// its facets and matrix). Plain rows in, plain data out: no Vue, no DOM and no
// page config, so every function here can be run on its own.
//
// Vocabulary, shared with the prism-charts axis configs:
//   dimension  { field, title, domain, format }: one CSV column. `domain` is
//              the raw values in display order, `format` maps a raw value to
//              its display name.
//   filters    { [field]: string[] }: the raw values selected per field. A row
//              matches when, for every field with a selection, its value is
//              one of the selected ones (OR within a field, AND across fields).

// Shown for rows where a field is empty
export const BLANK = '(blank)';

// Color for a value the color scale does not list
export const NEUTRAL_COLOR = '#9a9a9a';

/** A row's value for a field; empty values read as BLANK. */
export const valueOf = (row, field) => row[field] || BLANK;

/**
 * Whether a row passes every field's selection.
 *
 * @param {Object} row
 * @param {Object<string, string[]>} filters
 * @param {string} [except] - a field whose selection is ignored, for counting
 *   what each of that field's values would give
 */
export function matchesFilters(row, filters, except = null) {
  for (const field in filters) {
    if (field === except) continue;
    const selected = filters[field];
    if (selected?.length && !selected.includes(valueOf(row, field))) return false;
  }
  return true;
}

/** Whether any field has a selection. */
export const hasFilters = (filters) => Object.values(filters).some((v) => v?.length);

/**
 * The values of a dimension found in `rows`, in display order: the dimension's
 * `domain` first, then anything unlisted by count descending, then by name.
 *
 * @param {Object[]} rows
 * @param {{ field: string, domain?: string[], format?: Function }} dimension
 * @returns {{ value: string, label: string, total: number }[]}
 */
export function orderedValues(rows, dimension) {
  const counts = new Map();
  for (const row of rows) {
    const value = valueOf(row, dimension.field);
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  const domain = dimension.domain ?? [];
  const rank = (value) => {
    const i = domain.indexOf(value);
    return i < 0 ? domain.length : i;
  };
  return Array.from(counts, ([value, total]) => ({
    value,
    total,
    label: dimension.format ? dimension.format(value) : value,
  })).sort(
    (a, b) => rank(a.value) - rank(b.value) || b.total - a.total || a.label.localeCompare(b.label),
  );
}

/**
 * Per dimension, every value with two counts: `total` over all rows, and
 * `count` over the rows that pass every *other* field's selection, so a value's
 * count is what selecting it would leave.
 *
 * @param {Object[]} rows
 * @param {Object[]} dimensions
 * @param {Object<string, string[]>} filters
 * @returns {{
 *   field: string, title: string, max: number, selectedCount: number,
 *   values: { value: string, label: string, total: number, count: number,
 *             selected: boolean, disabled: boolean }[]
 * }[]} `max` is the largest total, for a shared bar scale. A value is
 *   `disabled` when selecting it would leave nothing.
 */
export function facetCounts(rows, dimensions, filters) {
  return dimensions.map((dimension) => {
    const { field } = dimension;
    const selected = new Set(filters[field] ?? []);
    const counts = new Map();
    for (const row of rows) {
      if (!matchesFilters(row, filters, field)) continue;
      const value = valueOf(row, field);
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    const values = orderedValues(rows, dimension).map((item) => {
      const count = counts.get(item.value) ?? 0;
      const isSelected = selected.has(item.value);
      return { ...item, count, selected: isSelected, disabled: count === 0 && !isSelected };
    });
    return {
      field,
      title: dimension.title ?? field,
      max: Math.max(1, ...values.map((v) => v.total)),
      selectedCount: selected.size,
      values,
    };
  });
}

/**
 * Color of a raw value on a `{ domain, range }` scale: domain[i] takes
 * range[i]. Values off the domain, or past the end of the range, are neutral
 * (the range is never cycled, so two values never share a hue by accident).
 */
export function colorOf(scale, value) {
  const i = scale?.domain ? scale.domain.indexOf(value) : -1;
  return (i >= 0 && scale.range?.[i]) || NEUTRAL_COLOR;
}

/**
 * Cross-tabulate rows into a matrix of unit cells.
 *
 * @param {Object[]} rows - the records to place, one unit each
 * @param {Object} axis
 * @param {Object} axis.y - dimension for the matrix rows
 * @param {Object} [axis.x] - dimension for the columns; null for one column
 * @param {Object} [axis.color] - `{ field, domain, range }` unit colors
 * @param {Object} [options]
 * @param {Function} [options.highlight] - `(row) => boolean`; units failing it
 *   are flagged `matched: false`. Null matches everything.
 * @param {Function} [options.key] - `(row) => id`, unique per row
 * @param {Function} [options.label] - `(row) => string`, the unit's name
 * @returns {{
 *   columns: { value, label, matched, total, weight }[],
 *   rows: { value, label, matched, total,
 *           cells: { x, y, matched, total, units }[] }[],
 *   matched: number, total: number,
 * }} Units are `{ key, label, row, color, matched }`, ordered matched first,
 *   then by color order, then by name. A column's `weight` grows with its
 *   fullest cell, for sharing out the width.
 */
export function buildMatrix(rows, axis, { highlight = null, key, label } = {}) {
  const { x = null, y, color = null } = axis;
  const keyOf = key ?? ((row) => rows.indexOf(row));
  const labelOf = label ?? ((row) => String(keyOf(row)));

  const xValues = x ? orderedValues(rows, x) : [{ value: null, label: null, total: rows.length }];
  const yValues = orderedValues(rows, y);
  const xIndex = new Map(xValues.map((v, i) => [v.value, i]));
  const yIndex = new Map(yValues.map((v, i) => [v.value, i]));
  const colorRank = new Map((color?.domain ?? []).map((v, i) => [v, i]));

  const columns = xValues.map((v) => ({ ...v, matched: 0, weight: 1 }));
  const matrixRows = yValues.map((v) => ({
    ...v,
    matched: 0,
    cells: xValues.map((c) => ({ x: c.value, y: v.value, matched: 0, total: 0, units: [] })),
  }));

  let matchedTotal = 0;
  for (const row of rows) {
    const xi = x ? xIndex.get(valueOf(row, x.field)) : 0;
    const matrixRow = matrixRows[yIndex.get(valueOf(row, y.field))];
    const cell = matrixRow.cells[xi];
    const matched = highlight ? !!highlight(row) : true;
    const colorValue = color ? valueOf(row, color.field) : null;
    cell.units.push({
      key: keyOf(row),
      label: labelOf(row),
      row,
      color: color ? colorOf(color, colorValue) : NEUTRAL_COLOR,
      rank: colorRank.get(colorValue) ?? colorRank.size,
      matched,
    });
    cell.total += 1;
    if (matched) {
      cell.matched += 1;
      matrixRow.matched += 1;
      columns[xi].matched += 1;
      matchedTotal += 1;
    }
  }

  for (const matrixRow of matrixRows) {
    for (const cell of matrixRow.cells) {
      cell.units.sort(
        (a, b) => b.matched - a.matched || a.rank - b.rank || a.label.localeCompare(b.label),
      );
    }
  }
  columns.forEach((column, i) => {
    const fullest = Math.max(...matrixRows.map((r) => r.cells[i].total), 1);
    // Square root: a cell's units wrap, so its width grows with the root of its count
    column.weight = Math.sqrt(fullest);
  });

  return { columns, rows: matrixRows, matched: matchedTotal, total: rows.length };
}
