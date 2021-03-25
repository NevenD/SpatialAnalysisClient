import _repository from "./IRepository";

const route = "/api/Route";
export default {
  async saveRouteData(getRouteDTO) {
    const postReturn = _repository.post(`${route}/SaveRoute/`, getRouteDTO).catch((error) => console.log(error));
    return postReturn;
  },

  async getSavedRouteData(author) {
    const fromQuery = `author=${author}`;
    const getReturn = _repository.get(`${route}/GetRouteByAuthor/?${fromQuery}`).catch((error) => console.log(error));
    return getReturn;
  },
};
