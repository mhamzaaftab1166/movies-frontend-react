import httpService from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";
const apiEnd = config.apiUrl + "/auth";
const tokenKey = "token";

httpService.setJWT(getJWT());
export async function login(email, password) {
  const { data: JWT } = await httpService.post(apiEnd, { email, password });
  localStorage.setItem(tokenKey, JWT);
}
export function loginWithJWT(JWT) {
  localStorage.setItem(tokenKey, JWT);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}
export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJWT,
  getJWT,
};
