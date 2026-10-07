// Submit-time gate: validates each test agent against the remote JSON schema.
// The inline validators in nominationSchema.js give per-cell feedback; this
// confirms the final payload matches what the backend accepts.
//
// Caching, two layers:
//   1. Memory: the compiled validate function is built once per page load.
//   2. localStorage: the schema JSON is stored with a timestamp. It is used
//      directly while fresh, and as a fallback when the network fetch fails
//      (offline, CORS, CDN hiccup) so a known-good schema still validates.
import Ajv from 'ajv';

const SCHEMA_URL = 'https://assets.clue.io/prism/schema/onc-ref-nomination-schema.json';
const STORAGE_KEY = 'oncref-nomination-schema';
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // re-fetch after 24h

export const SCHEMA_UNAVAILABLE =
  'Could not load the validation schema. Check your connection and try again.';

let validatorPromise = null;

// ---- localStorage helpers (all guarded: storage can be blocked or full) ----
function readStoredSchema() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null; // { schema, fetchedAt }
  } catch {
    return null;
  }
}

function writeStoredSchema(schema) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ schema, fetchedAt: Date.now() }));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

async function fetchSchema() {
  const res = await fetch(SCHEMA_URL);
  if (!res.ok) throw new Error(`HTTP Error ${res.status} loading schema`);
  return res.json();
}

// Fresh stored copy → use it. Otherwise fetch; on failure fall back to any stored copy.
async function loadSchema() {
  const stored = readStoredSchema();
  if (stored && Date.now() - stored.fetchedAt < MAX_AGE_MS) return stored.schema;

  try {
    const schema = await fetchSchema();
    writeStoredSchema(schema);
    return schema;
  } catch (error) {
    if (stored) {
      console.warn('Using cached nomination schema; fetch failed:', error.message);
      return stored.schema;
    }
    throw new Error(SCHEMA_UNAVAILABLE);
  }
}

async function getValidator() {
  if (!validatorPromise) {
    validatorPromise = loadSchema()
      .then((schema) => new Ajv({ allErrors: true }).compile(schema))
      .catch((error) => {
        validatorPromise = null; // allow a retry on the next call
        throw error;
      });
  }
  return validatorPromise;
}

// AJV 6 error → "/path message", e.g. ".top_dose_unit should be equal to constant"
const formatError = (e) => `${e.dataPath || '(row)'} ${e.message}`.trim();

/**
 * Validates one test agent object (an entry of payload.test_agents).
 * Returns { valid: boolean, errors: string[] | null }.
 */
export async function validateTestAgentPayload(testAgent) {
  try {
    const validate = await getValidator();
    if (validate(testAgent)) return { valid: true, errors: null };
    return { valid: false, errors: validate.errors.map(formatError) };
  } catch (error) {
    return { valid: false, errors: [error.message] };
  }
}

/**
 * Validates every test agent in the payload.
 * Returns { valid, errors: { row, errors }[], unavailable }.
 * `unavailable` is true when the schema itself could not be loaded, so the
 * caller can show a connection message instead of per-row errors.
 */
export async function validateNominationPayload(payload) {
  const results = await Promise.all(payload.test_agents.map(validateTestAgentPayload));
  const errors = results.map((r, row) => ({ row, errors: r.errors })).filter((r) => r.errors);
  const unavailable = errors.some((r) => r.errors.includes(SCHEMA_UNAVAILABLE));
  return { valid: errors.length === 0, errors, unavailable };
}
