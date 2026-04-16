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

  // Update options for all filters, sorted and labeled by counts
  updateAllOptions() {
    Object.keys(this.filters).forEach(field => {
      this.filters[field].options = this._buildOptions(field);
    });
  }

  // Build menu options for a single filter, with counts and labels.
  // Counts reflect how many items have each value given all OTHER active filters.
  _buildOptions(field) {
    if (!this.dimensions[field]) return [];

    // Temporarily remove THIS field's filter so we count against all other filters only
    this.dimensions[field].filterAll();

    // Get data filtered by all other dimensions (+ search)
    const crossFiltered = this.cf.allFiltered();

    // Get all possible values for this field
    const allValues = [...new Set(this.data.map(d => d[field]))];

    const options = allValues.map(value => {
      const count = crossFiltered.filter(item => item[field] === value).length;
      const total = this.data.filter(d => d[field] === value).length;
      return {
        value,
        count,
        total,
        text: `${value} (${count}/${total})`
      };
    });

    // Restore this field's filter
    const selected = this.filters[field].active;
    if (selected && selected.length > 0) {
      this.dimensions[field].filter(v => selected.includes(v));
    }

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