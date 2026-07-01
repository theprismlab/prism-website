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

// export async function postSubmission(apiURL, payload) {
//   console.log(apiURL, 'mts_compound_submissions/createSubmission', payload);
//   return authedPost(apiURL, 'mts_compound_submissions/createSubmission', payload);
// }
export async function postSubmission(apiURL, payload) {
  const url = apiURL + 'mts_compound_submissions/createSubmission';
  const userKey = await getTempApiKey(apiURL);
  console.log(url, payload, userKey);
  // log the fully formatted request as a json
  console.log(
    'Request:',
    JSON.stringify({ url, payload, headers: { ...JSON_HEADERS, user_key: userKey } }),
  );
  // console.log('Request:', { url, payload, headers: { ...JSON_HEADERS, user_key: userKey } });

  const res = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      user_key: userKey,
    },
  });
  return res.data;
}
//{"error":"Model::findById requires the id argument"}

export async function findScreens(apiURL) {
  const path =
    'prism_screens?filter=' + JSON.stringify({ where: { screen_category: 'EXTERNAL' } });
  return authedGet(apiURL, path);
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

export async function validateScreen(apiURL, screen, screenType) {
  try {
    const foundRecord = await findScreen(apiURL, screen);
    const foundType = foundRecord?.screen_type?.endsWith('_SEQ')
      ? foundRecord.screen_type.replace('_SEQ', '')
      : foundRecord?.screen_type;
    if (foundRecord && foundRecord.name === screen && foundType === screenType) {
      return;
    }
    throw "Screen '" + screen + "' is not associated with submission type '" + screenType + "'";
  } catch (err) {
    console.log(err);
    throw "Screen '" + screen + "' is not associated with submission type '" + screenType + "'";
  }
}
