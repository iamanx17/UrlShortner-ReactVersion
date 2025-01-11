import CONSTANTS from "../constants";

const shortUrl = async (source_url, token) => {
  if (token) {
    const url = await shortAPI(source_url, token);
    return url;
  } else {
    const url = await shortApiWithoutUser(source_url);
    return url;
  }
};

const shortApiWithoutUser = async (source_url) => {
  let endpoint = CONSTANTS.baseUrl + "/shorturl/userfree";
  let payload = {
    source: [source_url],
  };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json_response = await res.json();
    return json_response.data[0].shortUrl;
  } catch (err) {
    return err;
  }
};

const shortAPI = async (source_url, token) => {
  const access_token = token;
  let endpoint = CONSTANTS.baseUrl + "/shorturl";
  let payload = {
    source: [source_url],
  };
  let header = {
    "Content-Type": "application/json",
    Authorization: access_token,
  };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: header,
      body: JSON.stringify(payload),
    });
    const json_response = await res.json();
    return json_response.data[0].shortUrl;
  } catch (err) {
    return err;
  }
};

const fetchAllShortUrl = async (token) => {
  const endpoint = CONSTANTS.baseUrl + "/shorturl";
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: headers,
    });
    const response = await res.json();
    return response.data;
  } catch (err) {
    return err;
  }
};

export { shortUrl, fetchAllShortUrl };
