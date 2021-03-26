import { Repository } from "./../../repositories/RepositoryFactory";
const _openRouteRepository = Repository.get("IRouteRepository");

export default {
  state: {
    _POST_RETURN_MSG: null,
    _SAVE_ROUTE_COORDINATES: null,
    _SAVE_ROUTE_DURATION: null,
    _SAVE_ROUTE_LENGHT: null,
    _FETCHED_ROUTES: null,
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
    _FETCHED_ROUTES_: (state) => {
      return state._FETCHED_ROUTES;
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
    FETCHED_ASYNC_ROUTES(state, data) {
      state._FETCHED_ROUTES = data;
    },
  },
  actions: {
    async SAVE_ASYNC_DIRECTION_DATA({ commit }, payload) {
      await _openRouteRepository.saveRouteData(payload).then((data) => {
        const statusRoute = { msg: "" };
        if (data.data) {
          const routeSaveData = data.data;
          const routeData = `Route name ${routeSaveData.name} is saved for ${routeSaveData.createdBy}`;
          commit("SET_ASYNC_POST_RETURN_MSG", routeData);
        } else {
          statusRoute.msg = `Error: Could not save data`;
          commit("SET_ASYNC_POST_RETURN_MSG", statusRoute);
        }
      });
    },
    async GET_SAVED_ASYNC_DIRECTION_DATA({ commit }, payload) {
      await _openRouteRepository.getSavedRouteData(payload).then((data) => {
        const statusRoute = { msg: "" };
        if (data.data) {
          const fetchedRoutes = [];
          for (let savedRoute of data.data) {
            fetchedRoutes.push(savedRoute);
          }
          commit("FETCHED_ASYNC_ROUTES", fetchedRoutes);
        } else {
          statusRoute.status = "error";
          statusRoute.msg = `Could not fetch routes.`;
          commit("SET_ASYNC_STATUS_MSG", statusRoute);
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
    _FETCHED_ASYNC_ROUTES_({ commit }, payload) {
      commit("FETCHED_ASYNC_ROUTES", payload);
    },
  },
};
