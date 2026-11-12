import * as d3 from 'd3';
import { defaultColors } from './prism-charts.js';

// The parts of prism-charts' src/chartAxis.js that the charts written in this
// folder need and the vendored bundle (prism-charts.js) does not export. They are
// copied as they are in the library, so a chart written here moves into the
// library by changing its import paths only. Recheck them against the library
// when prism-charts.js is updated.

/** Accessor for a `field`: a function as is, a name as `(d) => d[name]`, null as null. */
export function toAccessor(field) {
  if (field == null) return null;
  return typeof field === 'function' ? field : (d) => d[field];
}

/**
 * An axis config merged over a chart's defaults for it, with `accessor` added from
 * `field`. The result is a copy, so the prepare functions can fill it in.
 */
export function resolveAxis(defaults, config = {}) {
  const axis = { ...defaults, ...config };
  axis.accessor = toAccessor(axis.field);
  return axis;
}

/** Name for an axis in tooltips and descriptions: its title, else its field, else `fallback`. */
export function axisLabel(axis, fallback) {
  return axis.title ?? (typeof axis.field === 'string' ? axis.field : fallback);
}

/**
 * Domain of a categorical axis: the configured `domain` values in order, then every
 * other distinct value in `values`, in order of first appearance.
 */
export function categoryDomain(domain, values) {
  return [...new Set([...(domain ?? []), ...values])];
}

/**
 * The color scale of a resolved color axis (its domain and range filled in): a
 * function of a record's color value. Without a field, every mark gets range[0] or
 * the first default color. A sequential axis interpolates its range (an
 * interpolator, or colors to interpolate between) over its domain; a categorical
 * one maps its domain onto its range in order.
 */
export function colorScale(axis) {
  if (!axis.accessor) {
    return () => (Array.isArray(axis.range) ? axis.range[0] : defaultColors(1)[0]);
  }
  if (axis.type === 'sequential') {
    const interpolator =
      typeof axis.range === 'function' ? axis.range : d3.interpolateRgbBasis(axis.range);
    return d3.scaleSequential(axis.domain, interpolator);
  }
  return d3.scaleOrdinal(axis.domain, axis.range);
}
