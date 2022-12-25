const TOKEN_KEY = "userToken";

const getToken = () => {
  const userToken = localStorage.getItem(TOKEN_KEY);
  if (userToken) {
    return "Bearer " + userToken;
  }
  return null;
};

const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const localStorageService = { getToken, saveToken, clearToken };

export default localStorageService;
