import httpService from "./httpService";
import config from "../config.json";

const apiEnd = config.apiUrl + "/movies";
export function getMovies() {
  return httpService.get(apiEnd);
}
function movieUrl(id) {
  return `${apiEnd}/${id}`;
}
export function getMovie(id) {
  return httpService.get(movieUrl(id));
}
export function saveMovie(movie) {
  console.log(movie);
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(movieUrl(movie._id), body);
  }

  return httpService.post(apiEnd, movie);
}
export function deleteMovie(id) {
  return httpService.delete(movieUrl(id));
}
