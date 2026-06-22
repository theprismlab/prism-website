// Review step schema.

export function getInitialData() {
  return { reviewed: false };
}

export function getSummary() {
  return [];
}

export function validate(data) {
  if (!data.reviewed) return { reviewed: 'Required' };
  return {};
}
