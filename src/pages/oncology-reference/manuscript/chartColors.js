import * as d3 from 'd3';

// 14 colors for charts with more than 10 bars: 7 hues (blue, orange, aqua, magenta,
// green, violet, red), each once dark (OKLCH L 0.48) and once light (L 0.75). The
// order alternates dark and light while stepping through the hues, so neighboring
// bars always differ strongly in both lightness and hue. Colors are assigned by bar
// position, so this relies on the bars being stacked next to each other.
//
// Passes validate_palette.js (light surface, adjacent pairs): lightness band and
// chroma floor OK, worst adjacent color-blind separation ΔE 18 (target 8), worst
// normal-vision ΔE 34.8 (floor 15). The light variants sit below 3:1 contrast on a
// white surface, so every bar must keep its visible label and value text.
const DARK_LIGHT_PAIRS = [
  '#115caf', // blue, dark
  '#fc8a60', // orange, light
  '#046f4b', // aqua, dark
  '#f782af', // magenta, light
  '#177114', // green, dark
  '#a3a2fe', // violet, light
  '#a12f2f', // red, dark
  '#74b0ff', // blue, light
  '#9f3701', // orange, dark
  '#34cb91', // aqua, light
  '#9b2e5e', // magenta, dark
  '#71c66b', // green, light
  '#564cae', // violet, dark
  '#ff847d', // red, light
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
