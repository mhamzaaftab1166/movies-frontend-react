import Axios from "axios";
import { toast } from "react-toastify";
import logger from "./logger";

Axios.interceptors.response.use(null, (error) => {
  const expectedErr =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErr) {
    logger.log(error);
    toast.error("UNEXPECTED ERROR OCCUR ");
  }
  console.log("int");
  return Promise.reject(error);
});
function setJWT(jwt) {
  Axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: Axios.get,
  put: Axios.put,
  delete: Axios.delete,
  post: Axios.post,
  setJWT,
};
