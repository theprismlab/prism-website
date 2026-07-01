import axios from 'axios';

const JSON_HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' };

// Temp keys are cheap to reuse and expensive to refetch — every authed call used to fetch its
// own, even when several fire within the same page load. Cache the in-flight/resolved promise
// per apiURL (same shared-promise trick the Pinia stores use) so concurrent and sequential
// callers within a session share one fetch.
const tempApiKeyCache = new Map(); // apiURL -> Promise<string>

function getTempApiKey(apiURL) {
  if (!tempApiKeyCache.has(apiURL)) {
    const url = apiURL.replace('/api/', '/') + 'temp_api_key';
    const promise = axios
      .get(url, { headers: JSON_HEADERS })
      .then((res) => res.data.user_key)
      .catch((err) => {
        tempApiKeyCache.delete(apiURL); // don't cache a failed fetch — allow the next call to retry
        throw err;
      });
    tempApiKeyCache.set(apiURL, promise);
  }
  return tempApiKeyCache.get(apiURL);
}

function isAuthError(err) {
  return err.response?.status === 401 || err.response?.status === 403;
}

async function authedGet(apiURL, path) {
  const userKey = await getTempApiKey(apiURL);
  try {
    const res = await axios.get(apiURL + path, {
      headers: { ...JSON_HEADERS, user_key: userKey },
    });
    return res.data;
  } catch (err) {
    if (!isAuthError(err)) throw err;
    // Cached key expired mid-session — drop it and retry once with a fresh one.
    tempApiKeyCache.delete(apiURL);
    const freshKey = await getTempApiKey(apiURL);
    const res = await axios.get(apiURL + path, {
      headers: { ...JSON_HEADERS, user_key: freshKey },
    });
    return res.data;
  }
}

export async function fetchSubmissionMessage(apiURL, submission_type) {
  let path = 'prism_submission_window_message';
  if (submission_type) {
    path += '?filter=' + JSON.stringify({ where: { submission_type } });
  }
  return authedGet(apiURL, path);
}

export async function getCollaboratorList(apiURL) {
  return authedGet(apiURL, 'mts_institutions');
}

export async function postSubmission(apiURL, payload) {
  const url = apiURL + 'mts_compound_submissions/createSubmission';
  const userKey = await getTempApiKey(apiURL);
  console.log(url, payload, userKey);
  // log the fully formatted request as a json
  console.log(
    'Request:',
    JSON.stringify({ url, payload, headers: { ...JSON_HEADERS, user_key: userKey } }),
  );

  const res = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      user_key: userKey,
    },
  });
  return res.data;
}

export async function findScreens(apiURL) {
  const path = 'prism_screens?filter=' + JSON.stringify({ where: { screen_category: 'EXTERNAL' } });
  return authedGet(apiURL, path);
}

// Some screen/submission types come back from the API with a '_SEQ' suffix variant
// (e.g. 'MTS_SEQ'). Everywhere we compare against a plain type ('MTS'), strip it first.
export function stripSeqSuffix(type) {
  return type?.endsWith('_SEQ') ? type.replace('_SEQ', '') : type;
}
