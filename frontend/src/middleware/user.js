import constants from "../constants";

export async function registerAPI(
  email,
  password,
  firstName = null,
  lastName = null
) {
  let endpoint = constants.baseUrl + "/user/register";
  let payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json_response = await res.json();
    return json_response.success;
  } catch (err) {
    return err;
  }
}

export async function loginAPi(email, password) {
  let endpoint = constants.baseUrl + "/user/login";
  let payload = {
    email: email,
    password: password,
  };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await res.json();
    return response.access_token;
  } catch (err) {
    return err;
  }
}
