import Cookies from "js-cookie";

const tokenStorageKey = "SHL_FOCUS_TOKEN";

/* istanbul ignore next */
const getToken = () => Cookies.get(tokenStorageKey);

const setToken = (value: string) => {
  Cookies.set(tokenStorageKey, value);
};

const clearToken = () => {
  Cookies.remove(tokenStorageKey);
};

export default {
  getToken,
  clearToken,
  setToken
};
