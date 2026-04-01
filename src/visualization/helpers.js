import * as d3 from 'd3';

export function customInterpolateGnBuYlOrRdPu() {
    // Custom interpolator that blends two d3 schemes across the [0, 1] color range.
    // t ∈ [0, 0.5] → GnBu reversed (dark blue → light green) rescaled so 0→1 and 0.5→0
    // t ∈ [0.5, 1] → YlOrRd        (light yellow → dark red)  rescaled so 0.5→0 and 1→1
    //
    // Reversing GnBu aligns the light end of GnBu (t≈0.5 → green) with the light end
    // of YlOrRd (t≈0.5 → yellow), so the junction stays in the light/pastel range on
    // both sides and the dark anchors sit at the extremes (t=0 deep blue, t=1 dark red).
    // This gives a visually ordered cool→warm progression around the full circle.
    const minLight  = 0.18;  // clamp lightest values
    const maxDark   = 0.8;  // clamp darkest values
    const blendZone = 0.09;  // fraction of range over which blue and red blend into purple at the seam

    // Pre-compute the two extreme colors and their midpoint (purple) so they're
    // calculated once rather than on every interpolator call.
    const _blueMax = d3.interpolateYlGnBu(maxDark);
    const _redMax  = d3.interpolateYlOrRd(maxDark);
    const _purple  = d3.interpolateRgb(_blueMax, _redMax)(0.5); // purple seam blend

    // color(t): cool-to-warm interpolator with a purple blend at the circular seam.
    //   t ∈ [0,   0.5] → YlGnBu reversed [maxDark → minLight]  (dark blue → light green)
    //   t ∈ [0.5, 1  ] → YlOrRd forward  [minLight → maxDark]  (light yellow → dark red)
    //   near t=0 and t=1: fades through purple so the angle wrap-around is smooth.
    const interpolateGnBuYlOrRd = t => {
        const shade = t < 0.5
            ? d3.interpolateYlGnBu(maxDark - t * 2 * (maxDark - minLight))
            : d3.interpolateYlOrRd(minLight + (t - 0.5) * 2 * (maxDark - minLight));
        if (t < blendZone)         return d3.interpolateRgb(_purple, shade)(t / blendZone);
        if (t > 1 - blendZone)     return d3.interpolateRgb(shade, _purple)((t - (1 - blendZone)) / blendZone);
        return shade;
    };
    return interpolateGnBuYlOrRd;
}



export function customInterpolateGnBuYlOrRd() {
    // Custom interpolator that blends two d3 schemes across the [0, 1] color range.
    // t ∈ [0, 0.5] → GnBu reversed (dark blue → light green) rescaled so 0→1 and 0.5→0
    // t ∈ [0.5, 1] → YlOrRd        (light yellow → dark red)  rescaled so 0.5→0 and 1→1
    //
    // Reversing GnBu aligns the light end of GnBu (t≈0.5 → green) with the light end
    // of YlOrRd (t≈0.5 → yellow), so the junction stays in the light/pastel range on
    // both sides and the dark anchors sit at the extremes (t=0 deep blue, t=1 dark red).
    // This gives a visually ordered cool→warm progression around the full circle.
    const minLight = 0.18; // clamp lightest values: 0 = allow full white/yellow, higher = cut pale tones
    const maxDark = 0.78; // clamp darkest values: 1 = allow full black, lower = cut deep tones
    const maxDarkBlue = 0.7;
    const interpolateGnBuYlOrRd = t =>
        t < 0.5
            ? d3.interpolateYlGnBu(maxDarkBlue - t * 2 * (maxDarkBlue - minLight)) // reversed, range [maxDark → minLight]
            : d3.interpolateYlOrRd(minLight + (t - 0.5) * 2 * (maxDark - minLight)); // forward, range [minLight → 1]
    return interpolateGnBuYlOrRd;

}