import crossfilter from "crossfilter2";

/**
 * CrossfilterManager
 * - data: array of objects (rows)
 * - filters: { [field]: { options: [], active: [] } }
 */
export default class CrossfilterManager {
  constructor(data = [], filters = {}) {
    this.data = data;
    this.filters = filters; // { field: { options: [], active: [] } }
    this.cf = crossfilter(this.data);
    this.dimensions = {};
    this._initDimensions();
    this.updateAllOptions();
  }

  // Initialize crossfilter dimensions for each filter field
  _initDimensions() {
    Object.keys(this.filters).forEach(field => {
      this.dimensions[field] = this.cf.dimension(d => d[field]);
    });
  }

  // Set the active values for a filter and update all options
  setActive(field, values) {
    if (!this.filters[field]) return;
    this.filters[field].active = Array.isArray(values) ? values : [];
    this._applyFilters();
    this.updateAllOptions();
  }

  // Set all active filters at once (e.g., from a v-model object)
  setAllActive(activeObj) {
    Object.keys(this.filters).forEach(field => {
      this.filters[field].active = Array.isArray(activeObj[field]) ? activeObj[field] : [];
    });
    this._applyFilters();
    this.updateAllOptions();
  }

  // Apply all active filters to crossfilter dimensions
  _applyFilters() {
    Object.keys(this.filters).forEach(field => {
      const selected = this.filters[field].active;
      if (selected && selected.length > 0) {
        this.dimensions[field].filter(v => selected.includes(v));
      } else {
        this.dimensions[field].filterAll();
      }
    });

  }

  // Get the filtered data (after all filters applied)
//   getFilteredData() {
//     try {
//       return this.cf.allFiltered();
//     } catch {
//       return this.data;
//     }
//   }

  // Update options for all filters, sorted and labeled by counts
  updateAllOptions() {
    Object.keys(this.filters).forEach(field => {
      this.filters[field].options = this._buildOptions(field);
    });
  }

  // Build menu options for a single filter, with counts and labels
  _buildOptions(field) {
    if (!this.dimensions[field]) return [];
    // Save current filters
    const prevFilters = {};
    Object.keys(this.filters).forEach(f => {
      prevFilters[f] = this.dimensions[f].filter();
    });

    // Get all possible values for this field
    const allValues = [...new Set(this.data.map(d => d[field]))];
    // For each value, count how many records would match if this value were selected (with other filters applied)
    const options = allValues.map(value => {
      // Apply all other filters, but not this one
      Object.keys(this.filters).forEach(f => {
        if (f !== field) {
          const selected = this.filters[f].active;
          if (selected && selected.length > 0) {
            this.dimensions[f].filter(v => selected.includes(v));
          } else {
            this.dimensions[f].filterAll();
          }
        }
      });
      // Apply this value as the only filter for this field
      this.dimensions[field].filterExact(value);

      // Count filtered results
      let count = 0;
      try {
        count = this.cf.allFiltered().length;
      } catch {
        count = 0;
      }

      // Restore previous filter for this field
      this.dimensions[field].filter(prevFilters[field]);

      // Calculate total (unfiltered) count for this value
      const total = this.data.filter(d => d[field] === value).length;

      return {
        value: value,
        count: count,
        total: total,
        text: `${value} (${count}/${total})`
      };
    });

    // Restore all previous filters
    Object.keys(this.filters).forEach(f => {
      this.dimensions[f].filter(prevFilters[f]);
    });

    // Sort: by filtered count desc, then total count desc, then value
    options.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      if (b.total !== a.total) return b.total - a.total;
      return String(a.value).localeCompare(String(b.value));
    });

    return options;
  }

  // Utility: update data and reinitialize everything
  updateData(newData) {
    this.data = newData;
    this.cf = crossfilter(this.data);
    this._initDimensions();
    this._applyFilters();
    this.updateAllOptions();
  }
    get filteredData() {
    const self = this;
    return self.data.filter(item => {
      return Object.keys(self.filters).every(field => {
        const selected = self.filters[field].active;
        // Compare as string for robustness
        return !selected.length || selected.map(String).includes(String(item[field]));
      });
    });
  }
}