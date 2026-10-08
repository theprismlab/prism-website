// BUNDLED schema validator. Drop-in alternative to ajv.js (same exports), chosen
// by the import in nominations.vue. Validates against onc-ref-nomination-schema.json
// in this folder, a local copy of
// https://assets.clue.io/prism/schema/onc-ref-nomination-schema.json. Used while
// that URL is blocked by CORS. Keep the local copy in sync with the remote one
// for as long as this file is imported; delete both once ajv.js is back in use.
import Ajv from 'ajv';
import schema from './onc-ref-nomination-schema.json';

// Kept for API parity with ajv.js; a bundled schema is never unavailable.
export const SCHEMA_UNAVAILABLE =
  'Could not load the validation schema. Check your connection and try again.';

// Compiled once per page load.
const validate = new Ajv({ allErrors: true }).compile(schema);

// AJV 6 error → "/path message", e.g. ".top_dose_unit should be equal to constant"
const formatError = (e) => `${e.dataPath || '(row)'} ${e.message}`.trim();

/**
 * Validates every entry of the payload array (one per test agent). Entries are
 * checked one at a time so errors can be attributed to a row.
 * Returns { valid, errors: { row, errors }[], unavailable }. Async only to
 * match ajv.js, so callers always `await` regardless of source.
 */
export async function validateNominationPayload(payload) {
  const errors = payload
    .map((entry, row) =>
      validate(entry) ? null : { row, errors: validate.errors.map(formatError) },
    )
    .filter(Boolean);
  return { valid: errors.length === 0, errors, unavailable: false };
}
