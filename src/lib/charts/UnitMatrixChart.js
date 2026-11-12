import * as d3 from 'd3';
import './UnitMatrixChart.css';
import { prepareUnitMatrix } from './unitMatrixData.js';
import { axisLabel, colorScale } from './chartAxis.js';
import { Highlight, Tooltip, drawLegend, measureText, resolveFontSize } from './prism-charts.js';

// Spacing, in px or in em of the font size (see fontSize)
const COUNT_EM = 0.92; // the counts and axis titles, relative to the font
const TITLE_EM = 1.7; // the lane of an axis title
const HEADER_EM = 1.9; // the lane of the column labels, when they sit level
const ROW_EM = 1.9; // least height of a row: its label's line
const CELL_PAD_X_EM = 0.67; // between a column's edge and its units
const CELL_PAD_Y_EM = 0.5; // between a row's edge and its units
const LABEL_GAP_EM = 1; // between the row labels and the first column
const TITLE_SPACING = 1.08; // how much the titles' letter spacing (see the CSS) widens them
const COUNT_GAP = 3; // px between a cell's last unit and its count
const LABEL_SHARE = 0.4; // most of the width the row labels take before they are cut
const TILT = 40; // degrees the column labels rise at when they don't fit level
const TILT_COS = Math.cos((TILT * Math.PI) / 180);
const TILT_SIN = Math.sin((TILT * Math.PI) / 180);
const UNIT_RADIUS = 2; // px corner radius of a unit
const MIN_PER_LINE = 3; // units a line per column the plot always has room for (see layoutUnitMatrix)

/**
 * Options, all optional. Change any of them later with `update()`.
 *
 * data         Records, one per item, drawn as they are: every record is one unit
 *              square. prepareUnitMatrix in unitMatrixData.js is the transform
 *              from records to the rows, columns, cells and units drawn.
 * axis         { x, y, color }: axis configs (see chartAxis.js).
 *              `y` names the categorical field whose categories are the rows and
 *              `x` the field whose categories are the columns; without a field,
 *              that axis is a single row or column of every record. Both take
 *              `field`, `title` (drawn above the labels), `domain` (the
 *              categories to show first, in that order), `format` (label text
 *              from a category) and `sort` for the categories not in `domain`:
 *              'descending' (default) or 'ascending' by record count, or null
 *              for order of first appearance.
 *              `color` names the field the units are colored by (default: none,
 *              one color). Its domain defaults to its categories by record count
 *              and its range to the default colors; `title` shows a legend of
 *              them above the plot.
 * unitSize     Px side of a unit square. Default 12.
 * unitPadding  Px between two units. Default 2.
 * showCounts   Write each category's count after its label, and each cell's
 *              count after its last unit. Default true.
 * tooltip      Tooltip content: `(unit, defaultRows) => rows | htmlString`, where
 *              `unit` is the hovered unit as prepareUnitMatrix makes it ({ record,
 *              rowKey, columnKey, colorKey, … }) and `defaultRows` the [label,
 *              value] pairs the chart would show: its row, column and color
 *              categories. Default null: the default rows.
 * onHover      Called with the hovered unit (as the tooltip receives it) when it
 *              changes, and with null when the cursor leaves. Default null.
 * unit         Noun for the records in the description, e.g. 'agents'. Default
 *              'records'.
 * fontSize     Size of every text in the chart (titles, labels, counts, legend,
 *              tooltip): 'small', 'medium' (default) or 'large' (see
 *              chartText.js), or a number of pixels. The spacing scales with it.
 * width        Pixels; null (default) fits the container and follows its resizes.
 * onHighlightChange  Called with the chart's Highlight (see chartHighlight.js)
 *              after a legend click or `setHighlight`.
 *
 * There is no `height`: the chart is as tall as its rows need.
 */
const DEFAULTS = {
  data: [],
  axis: {},
  unitSize: 12,
  unitPadding: 2,
  showCounts: true,
  tooltip: null,
  onHover: null,
  unit: 'records',
  fontSize: 'medium',
  width: null,
  onHighlightChange: null,
};

/**
 * Unit matrix of two categorical fields, drawn into a container element:
 *
 *   const chart = new UnitMatrixChart(el, { data: rows, axis: { x, y, color } });
 *   chart.setData(newRows);
 *   chart.update({ axis: { x, y, color: { field: 'region', title: 'Region' } } });
 *   chart.setHighlight((record) => record.flagged);
 *   chart.destroy();
 *
 * A table whose rows are the categories of the y field and whose columns are
 * those of the x field. Every record is one small square in the cell for its two
 * categories, colored by the color field, so a cell's count reads as an area and
 * its makeup as bands of color. Squares fill a cell left to right and wrap onto
 * more lines; a column is wide enough for more squares per line the fuller its
 * fullest cell is, and a row is as tall as its fullest cell needs. Column labels
 * sit level above their columns, or all rise at an angle when one doesn't fit.
 *
 * Clicking a legend entry highlights that category's units and mutes the rest
 * (see chartHighlight.js); `setHighlight` does the same from a predicate, which
 * receives each record. A legend selection is dropped when the color axis no
 * longer has any of its categories, e.g. after it is given another field.
 */
export default class UnitMatrixChart {
  constructor(container, options = {}) {
    if (!container) throw new Error('UnitMatrixChart: a container element is required');
    this.container = container;
    this.options = { ...DEFAULTS, ...options };
    this.highlight = new Highlight(() => this._onHighlightChange());
    this.hovered = null;

    this.root = d3.select(container).classed('unit-matrix', true);
    this.legend = this.root.append('div');
    // Scrolls sideways when the columns can't all fit even one unit per line
    this.svg = this.root
      .append('div')
      .attr('class', 'unit-matrix__scroll')
      .append('svg')
      .attr('class', 'unit-matrix__svg')
      .attr('role', 'img')
      .on('mouseleave', () => this._setHovered(null));
    this.tooltip = new Tooltip(container);
    this.draw();
    this._observeResize();
  }

  /** Replace the records and redraw. */
  setData(data) {
    this.update({ data });
  }

  /** Change any of the constructor options and redraw. Each option given replaces the old one whole. */
  update(options) {
    this.options = { ...this.options, ...options };
    this.draw();
  }

  /**
   * Emphasise the units whose record passes `predicate`, drawing the rest grey.
   * Combines with the legend's selection. Pass null to drop the predicate.
   * @param {((record: object) => boolean) | null} predicate
   */
  setHighlight(predicate) {
    this.highlight.setPredicate(predicate);
  }

  /** Drop the highlight predicate and the legend selection. */
  clearHighlight() {
    this.highlight.clear();
  }

  _onHighlightChange() {
    this.draw();
    this.options.onHighlightChange?.(this.highlight);
  }

  destroy() {
    this.resizeObserver?.disconnect();
    this.root.selectAll('*').remove();
    this.root.classed('unit-matrix', false);
  }

  _observeResize() {
    if (typeof ResizeObserver === 'undefined') return;
    this.resizeObserver = new ResizeObserver(() => {
      if (this.options.width == null && this.container.clientWidth !== this.width) {
        this.draw();
      }
    });
    this.resizeObserver.observe(this.container);
  }

  draw() {
    const { unitSize, unitPadding, showCounts, unit } = this.options;
    const fs = resolveFontSize(this.options.fontSize);
    const width = this.options.width ?? (this.container.clientWidth || 640);
    this.width = width;
    this.tooltip.fontSize(fs);

    // Everything that depends on the data; from here on, only pixels
    const prepared = prepareUnitMatrix(this.options.data, this.options);
    this.prepared = prepared;
    const { axes, columns, rows, total } = prepared;
    this._dropStaleSelection(axes.color);
    const color = colorScale(axes.color);

    this.svg.selectAll('*').remove();
    this._setHovered(null);
    this._drawLegend(color, fs);
    if (!rows.length || !columns.length) {
      this.svg.attr('width', width).attr('height', 0).attr('aria-label', 'Empty unit matrix');
      return;
    }

    const svgElement = this.svg.node();
    const layout = layoutUnitMatrix(prepared, {
      width,
      fontSize: fs,
      unitSize,
      unitPadding,
      showCounts,
      measure: (text, size, weight) => measureText(text, size, svgElement, weight),
    });
    this.layout = layout;

    const by = [axes.y, axes.x]
      .filter((axis) => axis.accessor)
      .map((axis, i) => axisLabel(axis, i ? 'column' : 'row'));
    const svg = this.svg
      .attr('width', layout.width)
      .attr('height', layout.height)
      .attr('font-size', fs)
      .attr(
        'aria-label',
        `Unit matrix of ${total} ${unit}${by.length ? ` by ${by.join(' and ')}` : ''}`,
      );

    // Rules: one above every row, the first one firmer, and one left of every column
    svg
      .append('g')
      .selectAll('line')
      .data(layout.columns)
      .join('line')
      .attr('class', 'unit-matrix__rule unit-matrix__rule--column')
      .attr('x1', (d) => d.x + 0.5)
      .attr('x2', (d) => d.x + 0.5)
      .attr('y1', layout.headerHeight)
      .attr('y2', layout.height);
    svg
      .append('g')
      .selectAll('line')
      .data(layout.rows)
      .join('line')
      .attr('class', 'unit-matrix__rule')
      .classed('unit-matrix__rule--first', (_, i) => i === 0)
      .attr('x1', 0)
      .attr('x2', layout.plotRight)
      .attr('y1', (d) => d.y + 0.5)
      .attr('y2', (d) => d.y + 0.5);

    // Axis titles: the x title above the column labels, the y title above the row labels
    svg
      .append('g')
      .selectAll('text')
      .data(layout.titles)
      .join('text')
      .attr('class', 'unit-matrix__title')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('text-anchor', 'start')
      .attr('font-size', fs * COUNT_EM)
      .text((d) => d.text);

    // Category labels, each followed by its count: columns level or tilted, rows
    // on the line of their first units
    const label = svg
      .append('g')
      .selectAll('text')
      .data([...layout.columns, ...layout.rows].filter((d) => d.label))
      .join('text')
      .attr('class', 'unit-matrix__label')
      .attr('x', (d) => d.label.x)
      .attr('y', (d) => d.label.y)
      .attr('dy', (d) => (d.label.middle ? '0.35em' : null))
      .attr('text-anchor', 'start')
      .attr('transform', (d) =>
        d.label.tilt ? `rotate(${-TILT},${d.label.x},${d.label.y})` : null,
      )
      .text((d) => `${d.label.text} `);
    if (showCounts) {
      label
        .append('tspan')
        .attr('class', 'unit-matrix__label-count')
        .attr('font-size', fs * COUNT_EM)
        .text((d) => d.band.count);
    }
    // A label cut to fit names its whole category on hover
    label
      .filter((d) => d.label.text !== d.band.label)
      .append('title')
      .text((d) => d.band.label);

    // Units: one square per record, drawn half a pixel inside its box so the 1px
    // outline stays within it
    const mark = svg
      .append('g')
      .selectAll('rect')
      .data(layout.units)
      .join('rect')
      .attr('class', 'unit-matrix__unit')
      .attr('x', (d) => d.x + 0.5)
      .attr('y', (d) => d.y + 0.5)
      .attr('width', unitSize - 1)
      .attr('height', unitSize - 1)
      .attr('rx', UNIT_RADIUS)
      .attr('fill', (d) =>
        this.highlight.color(color(d.unit.colorKey), d.unit.record, { color: d.unit.colorKey }),
      );

    // Each cell's count, after its last unit like the label at the end of a bar
    svg
      .append('g')
      .selectAll('text')
      .data(layout.counts)
      .join('text')
      .attr('class', 'unit-matrix__count')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'start')
      .attr('font-size', fs * COUNT_EM)
      .text((d) => d.count);

    this._bindHover(mark);
  }

  // ── Highlight ───────────────────────────────────────────────────────────────

  // A legend selection only names categories of the color axis it was made on.
  // Once the axis has none of them (it was given another field), nothing could
  // be highlighted and every unit would be muted, so the selection is dropped.
  _dropStaleSelection(axis) {
    const selected = this.highlight.selected('color');
    if (!selected || [...selected].some((key) => axis.domain.includes(key))) return;
    this.highlight.selection.delete('color');
    this.options.onHighlightChange?.(this.highlight);
  }

  // ── Hover / tooltip ─────────────────────────────────────────────────────────

  _bindHover(mark) {
    mark
      .on('mouseenter', (event, d) => {
        this._setHovered(d.unit);
        this.tooltip.show(this._unitTooltip(d.unit), event, d.unit);
      })
      .on('mousemove', (event) => this.tooltip.move(event));
  }

  // The hovered unit: hides the tooltip when nothing is hovered, and reports a
  // change through onHover
  _setHovered(hovered) {
    const changed = hovered !== this.hovered;
    this.hovered = hovered;
    if (!hovered) this.tooltip.hide();
    if (changed) this.options.onHover?.(hovered);
  }

  // Default rows: the unit's row, column and color categories, the color one
  // left out when it repeats the row or column field
  _unitTooltip(unit) {
    const { axes, columns, rows } = this.prepared;
    const out = [];
    if (axes.y.accessor) out.push([axisLabel(axes.y, 'Row'), rows[unit.row].label]);
    if (axes.x.accessor) out.push([axisLabel(axes.x, 'Column'), columns[unit.column].label]);
    const repeated = [axes.x, axes.y].some(
      (axis) => typeof axis.field === 'string' && axis.field === axes.color.field,
    );
    if (axes.color.accessor && !repeated) {
      const format = axes.color.format ?? ((value) => value);
      out.push([axisLabel(axes.color, 'Color'), format(unit.colorKey)]);
    }
    return this.options.tooltip ? this.options.tooltip(unit, out) : out;
  }

  /** The color axis legend above the plot, when the axis has a title. */
  _drawLegend(color, fs) {
    const axis = this.prepared.axes.color;
    const title = axis.accessor ? axis.title : null;
    drawLegend(this.legend, color, { ...axis, title, fontSize: fs, highlight: this.highlight });
    // drawLegend resets the element's classes
    this.legend.classed('unit-matrix__legend', true);
  }
}

/**
 * `text` cut to at most `maxWidth` px, ending in an ellipsis when it had to be cut.
 * `measure` gives the width of a string.
 */
function fitText(text, maxWidth, measure) {
  if (measure(text) <= maxWidth) return text;
  let cut = text.length - 1;
  while (cut > 1 && measure(`${text.slice(0, cut).trimEnd()}…`) > maxWidth) cut -= 1;
  return `${text.slice(0, cut).trimEnd()}…`;
}

// Lines of units a cell of `count` units takes with `perLine` units a line. The
// cell's count label takes `slots` units of room after the last unit, or a line
// of its own when the last line has less left.
function cellLines(count, perLine, slots) {
  if (!count) return 0;
  const lines = Math.ceil(count / perLine);
  const left = lines * perLine - count;
  return slots > left ? lines + 1 : lines;
}

/**
 * Where everything in a unit matrix goes, in pixels: a pure function of what
 * prepareUnitMatrix returns and the sizes, exported so the layout can be tested
 * without a DOM.
 *
 * Each column gets a whole number of units per line. Starting from one each (or,
 * while the column labels sit level, from what a column as wide as its label
 * holds), the spare width goes a unit at a time to the column whose fullest cell
 * needs the most lines, until the width is used up or every cell fits one line;
 * what is left over is shared equally, so the columns always span the plot. A
 * row is as tall as the most lines any of its cells needs.
 *
 * @param {Object} prepared what prepareUnitMatrix returns
 * @param {Object} config
 * @param {number} config.width px available
 * @param {number} config.fontSize px
 * @param {number} config.unitSize px side of a unit
 * @param {number} config.unitPadding px between units
 * @param {boolean} config.showCounts whether labels and cells carry their counts
 * @param {(text: string, fontSize: number, fontWeight?: number) => number} config.measure
 *   rendered width of a text in px
 * @returns {{
 *   width: number, height: number, headerHeight: number, plotLeft: number,
 *   plotRight: number, tilt: boolean,
 *   titles: { text: string, x: number, y: number }[],
 *   columns: { band: Object, x: number, width: number, perLine: number, label: Object | null }[],
 *   rows: { band: Object, y: number, height: number, label: Object | null }[],
 *   units: { unit: Object, x: number, y: number }[],
 *   counts: { count: number, x: number, y: number }[],
 * }} `width` is wider than the width given when the columns can't fit it. A
 *   label is { text, x, y, tilt, middle }: `text` may be cut to fit, `tilt`
 *   labels rotate about (x, y), `middle` ones are centred on y.
 */
export function layoutUnitMatrix(prepared, config) {
  const { axes, columns, rows } = prepared;
  const { width, fontSize: fs, unitSize, unitPadding, showCounts, measure } = config;
  const pitch = unitSize + unitPadding;
  const countSize = fs * COUNT_EM;
  const padX = Math.round(fs * CELL_PAD_X_EM);
  const padY = Math.round(fs * CELL_PAD_Y_EM);
  const hasColumns = axes.x.accessor != null;
  const hasRows = axes.y.accessor != null;
  const xTitle = (hasColumns && axes.x.title) || null;
  const yTitle = (hasRows && axes.y.title) || null;

  const countWidth = (count) => (showCounts ? measure(count, countSize) : 0);
  const labelWidth = (band) => measure(`${band.label} `, fs) + countWidth(band.count);
  const titleWidth = (title) =>
    title ? measure(title.toUpperCase(), countSize, 600) * TITLE_SPACING : 0;
  // Units of room a cell's count label takes after its last unit
  const slots = (count) => (showCounts ? Math.ceil((countWidth(count) + COUNT_GAP) / pitch) : 0);

  // Row labels: as wide as the widest needs, up to a share of the width
  const widestRow = hasRows ? Math.max(0, ...rows.map(labelWidth)) : 0;
  const rowLabelWidth = Math.ceil(
    Math.max(Math.min(widestRow, width * LABEL_SHARE), titleWidth(yTitle)),
  );
  const plotLeft = rowLabelWidth ? rowLabelWidth + Math.round(fs * LABEL_GAP_EM) : 0;

  // Columns: units per line and px width for each, within `available` px, none
  // narrower than its entry in `least`
  const columnCells = columns.map((_, j) => rows.map((row) => row.cells[j]));
  const linesNeeded = (j, perLine) =>
    Math.max(1, ...columnCells[j].map((cell) => cellLines(cell.count, perLine, slots(cell.count))));
  // Units per line past which a column gains nothing: its fullest cell on one line
  const mostUseful = columnCells.map((cells) =>
    Math.max(1, ...cells.map((cell) => cell.count + slots(cell.count))),
  );
  const unitsWidth = (perLine) => 2 * padX + perLine * unitSize + (perLine - 1) * unitPadding;
  const sizeColumns = (available, least) => {
    const widthOf = (j, perLine) => Math.max(unitsWidth(perLine), least[j]);
    // Start from one unit per line, or as many as a column's least width has
    // room for anyway
    const perLine = columns.map((_, j) => {
      const roomFor = Math.floor((least[j] - 2 * padX + unitPadding) / pitch);
      return Math.min(mostUseful[j], Math.max(1, roomFor));
    });
    let used = perLine.reduce((sum, n, j) => sum + widthOf(j, n), 0);
    for (;;) {
      let next = -1;
      let most = 1;
      perLine.forEach((n, j) => {
        if (n >= mostUseful[j] || used + widthOf(j, n + 1) - widthOf(j, n) > available) return;
        const lines = linesNeeded(j, n);
        if (lines > most) {
          next = j;
          most = lines;
        }
      });
      if (next < 0) break;
      used += widthOf(next, perLine[next] + 1) - widthOf(next, perLine[next]);
      perLine[next] += 1;
    }
    const spare = Math.max(0, available - used) / columns.length;
    const widths = perLine.map((n, j) => widthOf(j, n) + spare);
    return { perLine, widths, total: widths.reduce((sum, w) => sum + w, 0) };
  };
  // The plot is never narrower than MIN_PER_LINE units a line in every column
  // would need: a chart with less room scrolls sideways instead of growing very
  // tall. The width is still shared out by need, so sparse columns may get less.
  const leastPlot = columns.reduce(
    (sum, _, j) => sum + unitsWidth(Math.min(MIN_PER_LINE, mostUseful[j])),
    0,
  );
  const room = (margin) => Math.max(width - plotLeft - margin, leastPlot);

  // Column labels sit level when every column can be as wide as its label and
  // they still fit the plot. Otherwise they all tilt and the columns are sized by
  // their units alone.
  const columnText = columns.map((band) => (hasColumns ? labelWidth(band) : 0));
  const level = columnText.map((w) => (hasColumns ? Math.ceil(w) + padX : 0));
  let sized = sizeColumns(room(0), level);
  const tilt = hasColumns && sized.total > room(0) + 0.5;
  const tiltOffset = padX + fs * 0.35; // from a column's left edge to where its tilted label starts
  let marginRight = 0;
  if (tilt) {
    // Tilted labels reach past the plot's right edge, so the plot gives up that
    // width: what each label needs beyond the columns to its right, were those
    // as narrow as they can get
    let toRight = 0;
    for (let j = columns.length - 1; j >= 0; j -= 1) {
      toRight += unitsWidth(1);
      marginRight = Math.max(
        marginRight,
        Math.ceil(tiltOffset + TILT_COS * columnText[j] - toRight),
      );
    }
    sized = sizeColumns(
      room(marginRight),
      columns.map(() => 0),
    );
  }
  const plotRight = plotLeft + sized.total;

  // Header: the x title's lane, then the column labels' lane; the y title shares
  // the bottom of it, over the row labels
  const titleLane = xTitle ? Math.round(fs * TITLE_EM) : 0;
  let labelLane = 0;
  if (hasColumns) {
    labelLane = tilt
      ? Math.ceil(TILT_SIN * Math.max(...columnText) + TILT_COS * fs) + Math.round(fs * 0.6)
      : Math.round(fs * HEADER_EM);
  }
  const headerHeight = Math.max(
    titleLane + labelLane,
    yTitle ? Math.round(fs * TITLE_EM) : 0,
    Math.round(fs * 0.5),
  );
  const titles = [];
  if (xTitle) titles.push({ text: xTitle, x: plotLeft + padX, y: Math.round(fs * 1.05) });
  if (yTitle) titles.push({ text: yTitle, x: 0, y: headerHeight - Math.round(fs * 0.6) });

  let x = plotLeft;
  const columnLayouts = columns.map((band, j) => {
    const out = { band, x, width: sized.widths[j], perLine: sized.perLine[j], label: null };
    if (hasColumns) {
      out.label = tilt
        ? {
            text: band.label,
            x: x + tiltOffset,
            y: headerHeight - Math.round(fs * 0.45),
            tilt: true,
            middle: false,
          }
        : {
            text: band.label,
            x: x + padX,
            y: headerHeight - Math.round(fs * 0.6),
            tilt: false,
            middle: false,
          };
    }
    x += sized.widths[j];
    return out;
  });

  // Rows, each as tall as its fullest cell, with its units and cell counts
  const units = [];
  const counts = [];
  let y = headerHeight;
  const rowLayouts = rows.map((band) => {
    const lines = Math.max(
      1,
      ...band.cells.map((cell, j) => cellLines(cell.count, sized.perLine[j], slots(cell.count))),
    );
    const height = Math.max(
      2 * padY + lines * unitSize + (lines - 1) * unitPadding,
      Math.ceil(fs * ROW_EM),
    );
    const firstLine = y + padY + unitSize / 2;
    const out = { band, y, height, label: null };
    if (hasRows) {
      // Cut only a label wider than the label column, to what its count leaves
      const room = rowLabelWidth - countWidth(band.count) - measure(' ', fs);
      const text =
        labelWidth(band) <= rowLabelWidth
          ? band.label
          : fitText(band.label, room, (label) => measure(label, fs));
      out.label = {
        text,
        x: 0,
        y: firstLine,
        tilt: false,
        middle: true,
      };
    }
    band.cells.forEach((cell, j) => {
      const column = columnLayouts[j];
      const left = column.x + padX;
      cell.units.forEach((unit, k) => {
        units.push({
          unit,
          x: left + (k % column.perLine) * pitch,
          y: y + padY + Math.floor(k / column.perLine) * pitch,
        });
      });
      if (!showCounts || !cell.count) return;
      // After the last unit, or at the start of a line of its own when the
      // last line has too little left
      const lastLine = Math.ceil(cell.count / column.perLine) - 1;
      const onLastLine = cell.count - lastLine * column.perLine;
      const fits = column.perLine - onLastLine >= slots(cell.count);
      counts.push({
        count: cell.count,
        x: fits ? left + onLastLine * pitch - unitPadding + COUNT_GAP : left,
        y: firstLine + (fits ? lastLine : lastLine + 1) * pitch,
      });
    });
    y += height;
    return out;
  });

  return {
    // The small allowance keeps a float sum from rounding a fitting chart up a pixel
    width: Math.max(width, Math.ceil(plotRight + marginRight - 0.01)),
    height: y + 1,
    headerHeight,
    plotLeft,
    plotRight,
    tilt,
    titles,
    columns: columnLayouts,
    rows: rowLayouts,
    units,
    counts,
  };
}
