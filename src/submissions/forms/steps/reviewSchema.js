// Review step schema.
// The review step is read-only (summarises other steps) so there is no form
// data to initialise or validate — the step is always considered complete.

export function getInitialData() {
  return {};
}

export function getSummary() {
  return [];
}

export function validate() {
  return {};
}
