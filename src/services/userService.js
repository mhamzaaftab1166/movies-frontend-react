import httpService from "./httpService";
import config from "../config.json";

const apiEnd = config.apiUrl + "/users";
export function register(user) {
  return httpService.post(apiEnd, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
