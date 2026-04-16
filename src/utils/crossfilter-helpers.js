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
    this.searchQuery = '';
    this._initDimensions();
    this.updateAllOptions();
  }

  // Initialize crossfilter dimensions for each filter field
  _initDimensions() {
    Object.keys(this.filters).forEach(field => {
      this.dimensions[field] = this.cf.dimension(d => d[field]);
    });
    // Create search dimension for title searching
    this.dimensions['search'] = this.cf.dimension(d => d.title);
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
    
    // Apply search filter to title
    if (this.searchQuery) {
      this.dimensions['search'].filter(title =>
        title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.dimensions['search'].filterAll();
    }
  }

  // Set search query and update filters
  setSearchQuery(query) {
    this.searchQuery = query;
    this._applyFilters();
    this.updateAllOptions();
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

    // Get all possible values for this field
    const allValues = [...new Set(this.data.map(d => d[field]))];
    
    // For each value, count how many records would match if this value were selected
    // (considering all OTHER filters are active)
    const options = allValues.map(value => {
      // Save current active selections for all fields
      const savedActive = {};
      Object.keys(this.filters).forEach(f => {
        savedActive[f] = [...this.filters[f].active];
      });
      const savedSearch = this.searchQuery;

      // Clear the filter for THIS field only, keep all others
      this.dimensions[field].filterAll();
      
      // Apply all OTHER filters
      Object.keys(this.filters).forEach(f => {
        if (f !== field) {
          const selected = this.filters[f].active;
          if (selected && selected.length > 0) {
            this.dimensions[f].filter(v => selected.includes(v));
          }
        }
      });
      
      // Apply search filter if exists
      if (this.searchQuery) {
        this.dimensions['search'].filter(title =>
          title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Apply this field's specific value to count
      this.dimensions[field].filterExact(value);
      
      // Count filtered results
      let count = 0;
      try {
        count = this.cf.allFiltered().length;
      } catch {
        count = 0;
      }

      // Calculate total (unfiltered) count for this value
      const total = this.data.filter(d => d[field] === value).length;

      // Restore all filters to original state
      this._applyFilters();

      const text = `${count}/${total}`;
      return {
        value: value,
        count: count,
        total: total,
        text: `${value} (${text})`
      };
    });

    // Sort: available (count > 0) first, then alphabetically or numerically
    options.sort((a, b) => {
      const aHas = a.count > 0;
      const bHas = b.count > 0;
      if (aHas !== bHas) return Number(bHas) - Number(aHas);

      const isNumeric = v => {
        const num = Number(v);
        return !Number.isNaN(num) && String(v).trim() !== "";
      };

      const aIsNum = isNumeric(a.value);
      const bIsNum = isNumeric(b.value);
      if (aIsNum && bIsNum) return Number(a.value) - Number(b.value);
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
  // Get filtered data using crossfilter
  get filteredData() {
    try {
      return this.cf.allFiltered();
    } catch {
      return this.data;
    }
  }
}