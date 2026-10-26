// Text helpers shared by every chart: the font size presets, and measuring text
// so margins can fit the labels they hold instead of guessing.

// Pixel sizes for the chart `fontSize` presets
export const FONT_SIZES = { small: 10, medium: 12, large: 14 };

/**
 * Pixel font size from a chart's `fontSize` config: a preset name, or a number of
 * pixels passed through as is.
 *
 * @param {'small'|'medium'|'large'|number} [size='medium']
 * @returns {number}
 */
export function resolveFontSize(size = 'medium') {
  if (typeof size === 'number') return size;
  if (!(size in FONT_SIZES)) throw new Error(`Unknown chart font size "${size}"`);
  return FONT_SIZES[size];
}

let context = null;

/**
 * Rendered width of `text` in pixels. The font family is read from `element` so the
 * measurement matches what the chart draws in (defaults to sans-serif).
 *
 * @param {string} text
 * @param {number} fontSize in pixels
 * @param {Element} [element] element whose font family the text is drawn in
 * @param {number} [fontWeight=400]
 * @returns {number}
 */
export function measureText(text, fontSize, element, fontWeight = 400) {
  context ??= document.createElement('canvas').getContext('2d');
  const family = element ? getComputedStyle(element).fontFamily : 'sans-serif';
  context.font = `${fontWeight} ${fontSize}px ${family}`;
  return context.measureText(String(text)).width;
}

/**
 * Width of the widest of `labels`, for sizing the margin an axis needs. Same
 * arguments as measureText.
 *
 * @returns {number} 0 when there are no labels
 */
export function maxTextWidth(labels, fontSize, element, fontWeight) {
  let max = 0;
  for (const label of labels) {
    max = Math.max(max, measureText(label, fontSize, element, fontWeight));
  }
  return max;
}
