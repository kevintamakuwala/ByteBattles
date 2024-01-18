import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",'Bearer ' +  localStorage.getItem(ACCESS_TOKEN)
    );
    console.log(localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};
export function verify(verificationCode) {
  return request({
    url: `http://localhost:8000/verify?code=${verificationCode}`,
    method: "GET",
  });
}
export function login(loginRequest) {
  return request({
    url: "http://localhost:8000/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: "http://localhost:8000/auth/register",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: "http://localhost:8000/user/",
    method: "GET",
  });
}

export function getUserProfile(username) {
  return request({
    url: API_BASE_URL + "/users/" + username,
    method: "GET",
  });
}
