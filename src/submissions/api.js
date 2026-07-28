import axios from 'axios';

const JSON_HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' };

async function getTempApiKey(apiURL) {
  const url = apiURL.replace('/api/', '/') + 'temp_api_key';
  const res = await axios.get(url, { headers: JSON_HEADERS });
  return res.data.user_key;
}

async function authedGet(apiURL, path) {
  const userKey = await getTempApiKey(apiURL);
  const url = apiURL + path;
  const headers = { ...JSON_HEADERS, user_key: userKey };
  const res = await axios.get(url, { headers });

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
export async function getCellLines(apiURL) {
  return authedGet(apiURL, 'cell-db/cell-lines');
}
export async function postSubmission(apiURL, payload) {
  const url = apiURL + 'mts_compound_submissions/createSubmission';
  const userKey = await getTempApiKey(apiURL);

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

// this is a new endpoint that will replace the fetchSubmissionMessage + screenName from findScreens
// export async function getSubbmissionScreenInfo(apiUrl, submission_type) {
//   let path = 'prism_screens/submission-screen-info';
//   if (submission_type) {
//     path += '?submission_type=' + encodeURIComponent(submission_type);
//   }
//   return authedGet(apiUrl, path);
// }

export async function getSubbmissionScreenInfo(apiURL, submission_type) {
  let path = 'prism_screens/submission-screen-info';
  if (submission_type) {
    path += '?filter=' + JSON.stringify({ where: { submission_type } });
  }
  return authedGet(apiURL, path);
}
