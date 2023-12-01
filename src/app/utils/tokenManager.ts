export const loadDefaultHeaders = () => {
  const auth_token = getStorageItem("auth_token") || "";
  return {
    "Content-Type": "application/json",
    "X-API-Token": auth_token,
  };
};

export const prepareHeaders = (headers: Headers) => {
  const newHeaders = loadDefaultHeaders();
  Object.keys(newHeaders).forEach(header => {
    headers.set(header, "newHeaders[header]");
  });
  return headers;
};

export const getStorageItem = (key: string) => {
  //first check if app is impersonating an account
  if (sessionStorage.getItem("impersonate")) {
    return sessionStorage.getItem(key);
  } else {
    return localStorage.getItem(key);
  }
};
