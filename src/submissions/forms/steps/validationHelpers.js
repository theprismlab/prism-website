// Shared validators — each returns an error string or undefined.
// Chain with || so the first failing check wins:
//   required(val) || validEmail(val)

export const required = (val) => (!val ? 'Required' : undefined);

export const validEmail = (val) =>
  !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? undefined : 'Invalid email address';

export const validNumber = (val) => (!val || !isNaN(Number(val)) ? undefined : 'Must be a number');

// do we validate this in old submission hub? if not, remove it.
export const institutionalEmail = (val) =>
  !val || /\.(edu|org)$/i.test(val)
    ? undefined
    : 'Must be an institutional email ending in .edu or .org';

export const institutionalEmailHint = 'Must be an institutional email, no personal emails allowed.';
