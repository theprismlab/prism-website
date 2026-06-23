import axios from "axios";

// Fetches a temporary API key required by all authenticated endpoints.
async function getTempApiKey(apiURL) {
    const url = apiURL.replace("/api/", "/") + "temp_api_key";
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json", "Accept": "application/json" }
    });
    return res.data.user_key;
}

// Fetches all EXTERNAL screens from the API.
export async function findScreens(apiURL) {
    const userKey = await getTempApiKey(apiURL);
    const filter = { where: { screen_category: "EXTERNAL" } };
    const url = apiURL + "prism_screens?filter=" + JSON.stringify(filter);
    const res = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "user_key": userKey
        }
    });
    return res.data;
}

// Fetches the submission window message records for all (or one) submission type(s).
export async function fetchSubmissionMessage(apiURL, submission_type) {
    let url = apiURL + "prism_submission_window_message";
    if (submission_type) {
        const filter = { where: { submission_type } };
        url += "?filter=" + JSON.stringify(filter);
    }
    const userKey = await getTempApiKey(apiURL);
    const res = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "user_key": userKey
        }
    });
    return res.data;
}

// Returns the screen with the most recent value of `attr` (e.g. "date_created" or "date_updated").
export function sortScreens(screens, attr) {
    const sorted = [...screens].sort((a, b) => new Date(b[attr]) - new Date(a[attr]));
    return sorted[0];
}

// Groups an array of objects by the value of `key`.
export function groupBy(arr, key) {
    return arr.reduce((acc, item) => {
        const group = item[key];
        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
    }, {});
}

// Filters out falsy values from an array.
export function compact(arr) {
    return arr.filter(Boolean);
}

// Returns items from `arr` whose properties match all key/value pairs in `props`.
export function where(arr, props) {
    return arr.filter(item =>
        Object.entries(props).every(([k, v]) => item[k] === v)
    );
}
