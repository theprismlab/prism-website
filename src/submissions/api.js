import axios from 'axios';

const JSON_HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' };

async function getTempApiKey(apiURL) {
  const url = apiURL.replace('/api/', '/') + 'temp_api_key';
  const res = await axios.get(url, { headers: JSON_HEADERS });
  return res.data.user_key;
}

async function authedGet(apiURL, path) {
  const userKey = await getTempApiKey(apiURL);
  const res = await axios.get(apiURL + path, {
    headers: { ...JSON_HEADERS, user_key: userKey },
  });
  return res.data;
}

async function authedPost(apiURL, path, payload) {
  const userKey = await getTempApiKey(apiURL);
  const res = await axios.post(apiURL + path, payload, {
    headers: { ...JSON_HEADERS, user_key: userKey },
  });
  return res.data;
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
  return authedPost(apiURL, 'mts_compound_submissions/createSubmission', payload);
}

export async function findScreen(apiURL, screen) {
  const path = 'prism_screens?filter=' + JSON.stringify({ where: { name: screen } });
  const found = await authedGet(apiURL, path);
  if (found?.length > 0) {
    if (found[0].status !== 'ACTIVE') throw `Screen '${screen}' is not an ACTIVE screen`;
    return found[0];
  }
  throw `Screen '${screen}' is not registered or not an ACTIVE screen`;
}
