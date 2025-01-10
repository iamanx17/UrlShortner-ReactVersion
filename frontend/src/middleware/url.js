import CONSTANTS from "../constants";
import { useSelector } from "react-redux";

export default async function shortUrl(source_url) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    const url = await shortAPI(source_url);
    return url;
  } else {
    const url = await shortApiWithoutUser(source_url);
    return url;
  }
}

const shortApiWithoutUser = async (source_url) => {
  let endpoint = CONSTANTS.baseUrl + "/shorturl/userfree";
  let payload = {
    source: [source_url],
  };
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json_response = await res.json();
  return json_response.data[0].shortUrl;
};

const shortAPI = async (source_url) => {
  const access_token = useSelector((state) => state.auth.token);
  let endpoint = CONSTANTS.baseUrl + "/shorturl";
  let payload = {
    source: [source_url],
  };
  let header = {
    "Content-Type": "application/json",
    Authorization: access_token,
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: header,
    body: JSON.stringify(payload),
  });
  const json_response = await res.json();
  return json_response.data[0].shortUrl;
};
