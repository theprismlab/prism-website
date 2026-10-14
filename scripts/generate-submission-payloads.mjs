// Generates the exact JSON payload the submission form POSTs to the API, one file per screen
// type, using the same dummy data the "fill test data" button uses (src/submissions/forms/
// testFixtures.js) and the same payload builder the Review step uses (parseFormDataForApi).
//
// The `screen` field is resolved to each type's currently active screen name (e.g. 'MTS034')
// by calling the same submission-screen-info endpoint the app uses, via VITE_API_URL from .env.
// Pass --offline to skip the API call and use a '<TYPE>000' placeholder instead.
//
// Run from the repo root (vite-node resolves the '@/' alias and extensionless imports):
//   npx vite-node scripts/generate-submission-payloads.mjs [--offline] [outDir] [screenType...]
//
// Examples:
//   npx vite-node scripts/generate-submission-payloads.mjs
//   npx vite-node scripts/generate-submission-payloads.mjs ./payloads EPS APS
//   npx vite-node scripts/generate-submission-payloads.mjs --offline
//
// Output: <outDir>/<TYPE>-submission-payload.json (default outDir: scripts/submission-payloads).
// Each fixture is run through every step validator first so a payload is only written when the
// dummy data would actually pass the form's own validation.

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { loadEnv } from 'vite';
import { getTestData } from '../src/submissions/forms/testFixtures.js';
import { parseFormDataForApi } from '../src/submissions/forms/steps/parseApiPayload.js';
import { STEP_REGISTRY } from '../src/submissions/forms/steps/registry.js';
import { SCREEN_DEFINITIONS } from '../src/submissions/forms/steps/testAgentSchema.js';
import { getSubbmissionScreenInfo, stripSeqSuffix } from '../src/utils/api.js';

const ALL_TYPES = Object.keys(SCREEN_DEFINITIONS);
const args = process.argv.slice(2);
const offline = args.includes('--offline');
const [outArg, ...typeArgs] = args.filter((a) => a !== '--offline');
const outDir = resolve(outArg ?? 'scripts/submission-payloads');
const types = typeArgs.length ? typeArgs.map((t) => t.toUpperCase()) : ALL_TYPES;

// Same mapping screen-status-store.js builds: { [TYPE]: activeScreenName }.
async function fetchActiveScreenNames() {
  const apiUrl = loadEnv('development', process.cwd(), 'VITE').VITE_API_URL;
  if (!apiUrl) throw new Error('VITE_API_URL is not set in .env');
  const data = await getSubbmissionScreenInfo(apiUrl);
  const names = {};
  for (const [type, info] of Object.entries(data || {})) {
    const key = stripSeqSuffix(type)?.toUpperCase();
    if (key && info?.name) names[key] = info.name;
  }
  return names;
}

let activeNames = {};
if (!offline) {
  try {
    activeNames = await fetchActiveScreenNames();
    console.log('Active screen names:', activeNames);
  } catch (err) {
    console.error(`Could not fetch active screen names (${err.message}); using placeholders.`);
  }
}

mkdirSync(outDir, { recursive: true });

let failures = 0;
for (const screenType of types) {
  if (!SCREEN_DEFINITIONS[screenType]) {
    console.error(`Unknown screen type '${screenType}'. Known: ${ALL_TYPES.join(', ')}`);
    failures++;
    continue;
  }

  const screenName = activeNames[screenType] ?? `${screenType}000`;
  if (!activeNames[screenType]) {
    console.warn(`${screenType}: no active screen name from API, using placeholder ${screenName}`);
  }
  const formData = getTestData(screenType);

  const errors = {};
  for (const [stepId, step] of Object.entries(STEP_REGISTRY)) {
    const stepErrors = step.validate(formData[stepId], screenType);
    if (stepErrors && Object.keys(stepErrors).length > 0) errors[stepId] = stepErrors;
  }
  if (Object.keys(errors).length > 0) {
    console.error(`${screenType}: fixture fails validation, skipping:`);
    console.error(JSON.stringify(errors, null, 2));
    failures++;
    continue;
  }

  const payload = parseFormDataForApi(formData, screenType, screenName);
  const file = resolve(outDir, `${screenType}-submission-payload.json`);
  writeFileSync(file, JSON.stringify(payload, null, 2) + '\n');
  console.log(`${screenType} (${screenName}): wrote ${file}`);
}

process.exit(failures ? 1 : 0);
