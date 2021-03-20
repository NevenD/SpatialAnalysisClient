import _repository from "./IRepository";

const route = "/api/Route";
export default {
  async getDirectionData(getRouteDTO) {
    const postReturn = _repository.post(`${route}/SaveRoute/`, getRouteDTO).catch((error) => console.log(error));
    return postReturn;
  },
};
