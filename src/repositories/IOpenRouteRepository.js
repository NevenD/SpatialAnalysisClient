import _repository from "./IRepository";

const route = "/api/OpenRoute";
export default {
  async getDirectionData(getRouteDTO) {
    const fromQuery = `Profile=${getRouteDTO.Profile}&StartLongitude=${getRouteDTO.StartLongitude}&StartLatitude=${
      getRouteDTO.StartLatitude
    }&EndLongitude=${getRouteDTO.EndLongitude}&EndLatitude=${getRouteDTO.EndLatitude}`;
    return _repository.get(`${route}/GetDirections/?${fromQuery}`).catch((error) => console.log(error));
  },

  async getIsochronePolygon(fetchIsochroneDTO) {
    const postReturn = _repository.post(`${route}/GetIsochrones/`, fetchIsochroneDTO).catch((error) => console.log(error));
    return postReturn;
  },
};
