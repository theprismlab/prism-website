import * as d3 from 'd3';

// 14 colors for charts with more than 10 bars, named after their IBM Carbon palette steps.
const COLOR_CATEGORICAL_14 = [
  '#6929c4', // Purple 70
  '#1192e8', // Cyan 50
  '#005d5d', // Teal 70
  '#9f1853', // Magenta 70
  '#fa4d56', // Red 50
  '#570408', // Red 90
  '#198038', // Green 60
  '#002d9c', // Blue 80
  '#ee538b', // Magenta 50
  '#b28600', // Yellow 50
  '#009d9a', // Teal 50
  '#012749', // Cyan 90
  '#8a3800', // Orange 70
  '#a56eff', // Purple 50
];

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
// Second iteration of the palette above. Order alternates dark and light so neighbors
// differ strongly in lightness, and similar hues (reds/oranges/magentas, cyan/teal/green)
// are placed far apart or given very different lightness. Checked in OKLab with
// deuteranopia/protanopia/tritanopia simulation: worst adjacent ΔE is 13 (old: 6).
const COLOR_CATEGORICAL_14_V2 = [
  '#6929c4', // Purple 70
  '#d2a106', // Yellow 40
  '#005d5d', // Teal 70
  '#ff7eb6', // Magenta 40
  '#8a3800', // Orange 70
  '#33b1ff', // Cyan 40
  '#da1e28', // Red 60
  '#42be65', // Green 40
  '#002d9c', // Blue 80
  '#ffb784', // Orange 30
  '#9f1853', // Magenta 70
  '#3ddbd9', // Teal 30
  '#570408', // Red 90
  '#be95ff', // Purple 40
];

/**
 * Default colors for a categorical color scale with `count` values: the 10 Tableau
 * colors when they are enough, otherwise the 14-color palette above. Beyond 14 values the colors repeat, which d3's ordinal scale does by itself.
 *
 * @param {number} count how many values need a color
 * @returns {string[]}
 */
export function defaultColors(count) {
  return count <= d3.schemeTableau10.length ? d3.schemeTableau10 : COLOR_CATEGORICAL_14_V2;
}

/**
 * Color scale config for coloring by a CSV column, shared by every chart that shows
 * the column so a value gets the same color everywhere. Values are ordered by row
 * count, high to low (ties keep their order of first appearance), and take the
 * default colors in that order. Pass the same rows to every chart.
 *
 * @param {Object[]} rows one object per test agent
 * @param {string} column CSV column to color by; empty cells count as "(blank)"
 * @returns {{ domain: string[], range: string[] }} color axis `domain` and `range`
 */
export function categoryColors(rows, column) {
  const counts = d3.rollup(
    rows,
    (group) => group.length,
    (row) => row[column] || '(blank)',
  );
  // Array.sort is stable, so ties keep the order the values first appear in
  const domain = Array.from(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([value]) => value);
  return { domain, range: defaultColors(domain.length) };
}
