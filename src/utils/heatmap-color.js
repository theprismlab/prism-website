import { interpolateYlOrRd, scaleSequential, scaleSequentialSymlog } from 'd3';

// The color scale shared by Heatmap and HeatmapLegend: value -> color over
// `domain` [min, max]. `log` is symlog: like log, but zero is allowed.
export function heatmapColor(domain, log = false) {
  const scale = log ? scaleSequentialSymlog(interpolateYlOrRd) : scaleSequential(interpolateYlOrRd);
  return scale.domain(domain);
}
