import './chartLegend.css';

/**
 * Draw a categorical color legend into an HTML element, shared by the bar charts and
 * the UMAP plot: the title on its own row, then a swatch and name per entry, wrapping
 * onto more rows when they don't fit the width.
 *
 * @param container d3 selection of the element to draw into; it is cleared first
 * @param color d3 ordinal color scale
 * @param {Object} config
 * @param {string} [config.title] legend title; without one, nothing is drawn
 * @param {string[]} [config.ticks] limits which entries are listed (default: the whole
 *   color domain)
 * @param {(value: string) => string} [config.format] entry name from its value
 * @param {'square'|'circle'} [config.shape] swatch shape: 'square' for bars, 'circle'
 *   for points (default 'square')
 */
export function drawLegend(container, color, config) {
  const { title, ticks, format = (value) => value, shape = 'square' } = config;
  container.selectAll('*').remove();
  if (!title) {
    container.style('display', 'none');
    return;
  }
  container.attr('class', 'chart-legend').style('display', null);
  container.append('div').attr('class', 'chart-legend__title').text(title);

  const items = container
    .append('div')
    .attr('class', 'chart-legend__items')
    .selectAll('span')
    .data(ticks || color.domain())
    .join('span')
    .attr('class', 'chart-legend__item');
  items
    .append('i')
    .attr('class', `chart-legend__swatch chart-legend__swatch--${shape}`)
    .style('background', (value) => color(value));
  items.append('span').text((value) => format(value));
}
