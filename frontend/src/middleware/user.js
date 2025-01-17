import constants from "../constants";

const registerAPI = async (
  email,
  password,
  firstName = null,
  lastName = null
) => {
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
};

const loginAPi = async (email, password) => {
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
    return response;
  } catch (err) {
    return err;
  }
};

export { registerAPI, loginAPi };
