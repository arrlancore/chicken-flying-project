import { LOGIN_URL, SIGNUP_URL } from "../../../constants";
import axios from "axios";

async function login(payload) {
  return axios.post(LOGIN_URL, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function signUp(payload) {
  return axios.post(SIGNUP_URL, payload, {
    headers: { "Content-Type": "application/json" },
  });
}

const authService = {
  login,
  signUp,
};

export default authService;
