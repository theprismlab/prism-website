import axios from 'axios';
// import { _ } from 'vue-underscore';

class ApiClasses {
  constructor() {}

  /**
   *
   * @param urls
   * @param user_key
   * @return {Promise<unknown[]>}
   */
  static async axiosGETWithUserKey(urls, user_key) {
    const promises = [];
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user_key: user_key,
      },
    };
    for (let url of urls) {
      promises.push(axios.get(url, config));
    }
    return await axios.all(promises);
  }

  /**
   *
   * @param urls
   * @param user_key
   * @returns {Promise<unknown[]>}
   */
  static async axiosGET(urls, user_key) {
    const promises = [];
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        portal_key: user_key,
      },
    };
    for (let url of urls) {
      promises.push(axios.get(url, config));
    }
    return await axios.all(promises);
  }

  /**
   *
   * @param apiURL
   * @return {Promise<*>}
   */
  static async findScreens(apiURL) {
    const userKey = await ApiClasses.getTempApiKey(apiURL);
    const filter = { where: { screen_category: 'EXTERNAL' } };
    const url = apiURL + 'prism_screens?filter=' + JSON.stringify(filter);
    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user_key: userKey,
      },
    });
    return res.data;
  }
  static async findScreenType(apiURL, screen) {
    const userKey = await ApiClasses.getTempApiKey(apiURL);
    const filter = { screens: [screen] };
    const url = apiURL + 'prism-portal/portal-screen-types?filter=' + JSON.stringify(filter);
    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user_key: userKey,
      },
    });
    return res.data;
  }

  /**
   *
   * @param apiURL
   * @param screen
   * @return {Promise<*>}
   */
  static async findScreen(apiURL, screen) {
    const userKey = await ApiClasses.getTempApiKey(apiURL);
    const filter = { where: { name: screen } };
    const url = apiURL + 'prism_screens?filter=' + JSON.stringify(filter);
    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user_key: userKey,
      },
    });
    const foundScreen = res.data;
    if (foundScreen && foundScreen.length > 0) {
      //if user is not logged in, and screen includes closed
      if (foundScreen[0].status !== 'ACTIVE') {
        throw "Screen '" + screen + "' is not an ACTIVE screen in CLUE";
      } else {
        return foundScreen[0];
      }
    }
    throw 'Screen ' + screen + ' is not registered or not an ACTIVE screen in CLUE';
  }

  /**
   *
   * @param apiURL
   * @return {Promise<any>}
   */
  static async getCollaboratorList(apiURL) {
    const url = apiURL + 'mts_institutions';
    const userKey = await ApiClasses.getTempApiKey(apiURL);
    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user_key: userKey,
      },
    });
    return res.data;
  }

  /**
   *
   * @param apiURL
   * @param payload
   * @return {Promise<any>}
   */
  static async postSubmission(apiURL, payload) {
    const url = apiURL + 'mts_compound_submissions/createSubmission';
    const userKey = await ApiClasses.getTempApiKey(apiURL);
    const res = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user_key: userKey,
      },
    });
    return res.data;
  }

  /**
   *
   * @param apiURL
   * @param submission_type
   * @return {Promise<any>}
   */
  static async fetchSubmissionMessage(apiURL, submission_type) {
    let url = apiURL + 'prism_submission_window_message';
    if (submission_type) {
      const filter = { where: { submission_type: submission_type } };
      url = url + '?filter=' + JSON.stringify(filter);
    }
    const userKey = await ApiClasses.getTempApiKey(apiURL);
    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user_key: userKey,
      },
    });
    return res.data;
  }

  /**
   *
   * @param url
   * @param api_key
   * @returns {Promise<*>}
   */
  static async getAPI(url, api_key) {
    const options = {
      method: 'GET',
      headers: {
        user_key: api_key,
      },
    };
    const response = await fetch(url, options);
    if (response.ok && response.status < 400) {
      return await response.json();
    }
    throw 'url ' + url + ' not found';
  }

  /**
   *
   * @param apiURL
   * @return {Promise<*>}
   */
  static async getTempApiKey(apiURL) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const url = apiURL.replace('/api/', '/') + 'temp_api_key';
    const resp = await axios.get(url, config);
    return resp.data.user_key;
  }

  /**
   *
   * @param resource
   * @param apiURL
   * @return {Promise<boolean>}
   */
  static async anonymousResources(resource, apiURL) {
    const anonResources = await ApiClasses.getPublicResources(apiURL);
    const re = new RegExp(anonResources.join('|'), 'i');
    return re.test(resource);
  }
  /**
   *
   * @param url
   * @param user_key
   * @param payload
   * @returns {Promise<axios.AxiosResponse<any>>}
   */
  static async axiosPost(url, user_key, payload) {
    if (user_key) {
      return await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          portal_key: user_key,
        },
      });
    }
    return await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
  // static async findCollaborationType(project, apiURL, userKey){
  //     const filter = {"where":{"project": project}}
  //     const url = apiURL + "prism-portal/compounds?filter=" + JSON.stringify(filter);
  //     const resp = await ApiClasses.axiosGETWithUserKey([url], userKey);
  //     return _.uniq(_.pluck(resp[0].data, "collab_type"));
  // }

  static async findCollaborationType(project, apiURL, userKey) {
    const filter = { where: { project: project } };
    const url = apiURL + 'prism-portal/collaboration-type?filter=' + JSON.stringify(filter);
    const resp = await ApiClasses.axiosGETWithUserKey([url], userKey);
    return _.uniq(_.pluck(resp[0].data, 'collab_type'));
  }

  /**
   *
   * @param error
   * @param redirect_url
   */
  static handleAxiosError(error, redirect_url) {
    if (error.response) {
      console.log(error.response.status);
      if (error.response.status === 401) {
        //redirect to not authorized page
        console.log('Error message', error.response.data.error);
        router.push({ path: '/notAuthorized' });
      } else if (error.response.status === 400) {
        router.push({ path: '/notAuthorized' });
        //Display message on current page if there is one
      } else if (
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.startsWith('jwt')
      ) {
        auth.clearUser();
        console.log('jwt error');
        router.push({ name: 'LoginPage', query: { redirect: redirect_url, jwt: 'jwt' } });
      } else {
        console.log('Error message', error.response.data.error);
        router.push({ path: '/notFound' });
      }
    } else if (error.request) {
      //response not received though the request was sent
      console.log(error.request);
    } else {
      //an error occurred when setting up the request
      console.log(error.message);
    }
  }

  /**
   *
   * @return {*|null}
   */
  static get_USER_KEY() {
    return auth.getUserKey();
  }

  /**
   * Fetch all screens
   * @param {string} apiURL - The API base URL
   * @return {Promise<string[]>} Array of unique screen names
   */
  static async fetchScreens(apiURL) {
    const userKey = ApiClasses.get_USER_KEY();
    const url = `${apiURL}prism-portal/screens`;
    const responses = await ApiClasses.axiosGET([url], userKey);
    return [...new Set(responses[0].data.map((d) => d.screen))];
  }
}

export default ApiClasses;
