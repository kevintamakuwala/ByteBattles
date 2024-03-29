
const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
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
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/verify?code=${verificationCode}`,
    method: "GET",
  });
}

export function login(loginRequest) {
  return request({
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/login`,
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/register`,
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/`,
    method: "GET",
  });
}

export function getUserProfile(username) {
  return request({
    url: import.meta.env.VITE_REACT_APP_BASE_URL + "/users/" + username,
    method: "GET",
  });
}
