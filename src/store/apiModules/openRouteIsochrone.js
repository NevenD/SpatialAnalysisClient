import { Repository } from "../../repositories/RepositoryFactory";
const _openRouteRepository = Repository.get("IOpenRouteRepository");

export default {
  state: {
    _ISOCHRONE_COORDINATES: [],
    _ISOCHRONE_RANGE: [],
    _STATUS_ISOCHRONE_MSG: null,
  },
  getters: {
    _ISOCHRONE_COORDINATES_: (state) => {
      return state._ISOCHRONE_COORDINATES;
    },
    _ISOCHRONE_RANGE_: (state) => {
      return state._ISOCHRONE_RANGE;
    },
    _STATUS_ISOCHRONE_STATUS_MSG_: (state) => {
      return state._STATUS_ISOCHRONE_MSG;
    },
  },
  mutations: {
    SET_ASYNC_ISOCHRONE_COORDINATES(state, data) {
      state._ISOCHRONE_COORDINATES = data;
    },
    SET_ASYNC_ISOCHRONE_RANGE(state, data) {
      state._ISOCHRONE_RANGE = data;
    },
    SET_ASYNC_STATUS_ISOCHRONE_MSG(state, data) {
      state._STATUS_ISOCHRONE_MSG = data;
    },
  },
  actions: {
    async LOAD_ASYNC_ISOCHRONE_DATA({ commit }, payload) {
      console.log(payload);
      await _openRouteRepository.getIsochronePolygon(payload).then((data) => {
        console.log(data);
        const statusRoute = { status: "success", msg: "" };
        commit("SET_ROUTE_LOADER", true);
        if (data.data.error === null) {
          const routeData = data.data;
          const routeCoordinates = routeData.isochroneFeatures[0].geometry.coordinates;

          commit("SET_ASYNC_ISOCHRONE_COORDINATES", routeCoordinates);
          commit("SET_ASYNC_STATUS_ISOCHRONE_MSG", statusRoute);

          commit("SET_ROUTE_LOADER", false);
        } else {
          statusRoute.status = "error";
          statusRoute.msg = `Could not isochrone polygon. Please, select another point.Server error: ${data.data.error}`;
          commit("SET_ASYNC_STATUS_ISOCHRONE_MSG", statusRoute);
        }
      });
    },
  },
};
