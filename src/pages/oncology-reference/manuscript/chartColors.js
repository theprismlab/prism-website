import * as d3 from 'd3';

// 14 colors for charts with more than 10 bars: 7 hues (blue, orange, aqua, magenta,
// yellow-green, violet, red), each once dark (OKLCH L 0.48) and once light (L 0.75). The
// order alternates dark and light while stepping through the hues, so neighboring
// bars always differ strongly in both lightness and hue. Colors are assigned by bar
// position, so this relies on the bars being stacked next to each other.
//
// Passes validate_palette.js (light surface, adjacent pairs): lightness band and
// chroma floor OK, worst adjacent color-blind separation ΔE 21 (target 8), worst
// normal-vision ΔE 33.5 (floor 15). The hues are spread around the wheel so no two
// colors of the same lightness are close: the nearest pair is ΔE 8.6 (dark) and
// 10.2 (light). The light variants sit below 3:1 contrast on a white surface, so
// every bar must keep its visible label and value text.
const DARK_LIGHT_PAIRS = [
  '#0e5caf', // blue, dark
  '#f09638', // orange, light
  '#006f50', // aqua, dark
  '#ea86cf', // magenta, light
  '#586500', // olive green, dark
  '#ba98ff', // violet, light
  '#a12f35', // red, dark
  '#73b1ff', // blue, light
  '#884d01', // orange, dark
  '#20cb98', // aqua, light
  '#90347a', // magenta, dark
  '#a6ba3c', // yellow-green, light
  '#6a45a6', // violet, dark
  '#ff8482', // red, light
];

/**
 * Default colors for a categorical color scale with `count` values: the 10 Tableau
 * colors when they are enough, otherwise the 14-color alternating-lightness palette
 * above. Beyond 14 values the colors repeat, which d3's ordinal scale does by itself.
 *
 * @param {number} count how many values need a color
 * @returns {string[]}
 */
export function defaultColors(count) {
  return count <= d3.schemeTableau10.length ? d3.schemeTableau10 : DARK_LIGHT_PAIRS;
}
