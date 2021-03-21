import { Repository } from "./../../repositories/RepositoryFactory";
const _openRouteRepository = Repository.get("IRouteRepository");

export default {
  state: {
    _POST_RETURN_MSG: null,
    _SAVE_ROUTE_COORDINATES: null,
    _SAVE_ROUTE_DURATION: null,
    _SAVE_ROUTE_LENGHT: null,
  },
  getters: {
    _POST_RETURN_MSG_: (state) => {
      return state._POST_RETURN_MSG;
    },
    _SAVE_ROUTE_COORDINATES_: (state) => {
      return state._SAVE_ROUTE_COORDINATES;
    },
    _SAVE_ROUTE_DURATION_: (state) => {
      return state._SAVE_ROUTE_DURATION;
    },
    _SAVE_ROUTE_LENGHT_: (state) => {
      return state._SAVE_ROUTE_LENGHT;
    },
  },
  mutations: {
    SET_ASYNC_POST_RETURN_MSG(state, data) {
      state._POST_RETURN_MSG = data;
    },
    SAVE_ROUTE_COORDINATES(state, data) {
      state._SAVE_ROUTE_COORDINATES = data;
    },
    SAVE_ROUTE_DURATION(state, data) {
      state._SAVE_ROUTE_DURATION = data;
    },
    SAVE_ROUTE_LENGHT(state, data) {
      state._SAVE_ROUTE_LENGHT = data;
    },
  },
  actions: {
    async SAVE_ASYNC_DIRECTION_DATA({ commit }, payload) {
      await _openRouteRepository.saveRouteData(payload).then((data) => {
        const statusRoute = { msg: "" };
        if (data.data) {
          const routeData = data.data;

          commit("SET_ASYNC_POST_RETURN_MSG", routeData);
        } else {
          statusRoute.msg = `Error: Could not save data`;
          commit("SET_ASYNC_POST_RETURN_MSG", statusRoute);
        }
      });
    },
    _SAVE_ROUTE_COORDINATES_({ commit }, payload) {
      commit("SAVE_ROUTE_COORDINATES", payload);
    },
    _SAVE_ROUTE_COORDINATES_({ commit }, payload) {
      commit("SAVE_ROUTE_COORDINATES", payload);
    },
    _SAVE_ROUTE_DURATION_({ commit }, payload) {
      commit("SAVE_ROUTE_DURATION", payload);
    },
    _SAVE_ROUTE_LENGHT_({ commit }, payload) {
      commit("SAVE_ROUTE_LENGHT", payload);
    },
  },
};
