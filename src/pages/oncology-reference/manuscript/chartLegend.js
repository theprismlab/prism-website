/**
 * Draw a color legend row into an SVG: the title, then a swatch and name per entry.
 *
 * @param svg d3 selection of the chart's <svg>
 * @param color d3 ordinal color scale
 * @param {{ title: string, ticks?: string[] }} config color axis config; `ticks`
 *   limits which entries are listed (default: the whole color domain)
 * @param {number} left x position of the legend's left edge
 */
export function drawLegend(svg, color, config, left) {
  const entries = config.ticks || color.domain();
  const legend = svg.append('g').attr('transform', `translate(${left},14)`);
  const title = legend
    .append('text')
    .attr('font-size', 12)
    .attr('font-weight', 600)
    .attr('fill', 'rgba(0,0,0,0.6)')
    .text(config.title);

  let offset = title.node().getComputedTextLength() + 16;
  for (const entry of entries) {
    legend
      .append('rect')
      .attr('x', offset)
      .attr('y', -10)
      .attr('width', 12)
      .attr('height', 12)
      .attr('rx', 2)
      .attr('fill', color(entry));
    const label = legend
      .append('text')
      .attr('x', offset + 18)
      .attr('font-size', 12)
      .attr('fill', 'rgba(0,0,0,0.7)')
      .text(entry);
    offset += 18 + label.node().getComputedTextLength() + 16;
  }
}
