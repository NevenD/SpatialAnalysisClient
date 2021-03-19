import { Repository } from "./../../repositories/RepositoryFactory";
const _openRouteRepository = Repository.get("IOpenRouteRepository");

export default {
  state: {
    _DIRECTION_DATA: null,
    _DIRECTION_COORDINATES: [],
    _DIRECTION_WAYPOINTS: [],
    _START_POINT: [],
    _END_POINT: [],
    _SUMMARY_ROUTE: null,
    _BBOX_ROUTE: [],
    _PROFILE_ROUTE: null,
    _STATUS_MSG: null,
    _ROUTE_LOADER: false,
  },
  getters: {
    _DIRECTION_DATA_: (state) => {
      return state._DIRECTION_DATA;
    },
    _DIRECTION_COORDINATES_: (state) => {
      return state._DIRECTION_COORDINATES;
    },
    _DIRECTION_WAYPOINTS_: (state) => {
      return state._DIRECTION_WAYPOINTS;
    },
    _START_POINT_: (state) => {
      return state._START_POINT;
    },
    _END_POINT_: (state) => {
      return state._END_POINT;
    },
    _SUMMARY_ROUTE_: (state) => {
      return state._SUMMARY_ROUTE;
    },
    _BBOX_ROUTE_: (state) => {
      return state._BBOX_ROUTE;
    },
    _PROFILE_ROUTE_: (state) => {
      return state._PROFILE_ROUTE;
    },
    _STATUS_MSG_: (state) => {
      return state._STATUS_MSG;
    },
    _ROUTE_LOADER_: (state) => {
      return state._ROUTE_LOADER;
    },
  },
  mutations: {
    SET_ASYNC_DIRECTION_DATA(state, data) {
      state._DIRECTION_DATA = data;
    },
    SET_ASYNC_DIRECTION_COORDINATES(state, data) {
      state._DIRECTION_COORDINATES = data;
    },
    SET_ASYNC_DIRECTION_WAYPOINTS(state, data) {
      state._DIRECTION_WAYPOINTS = data;
    },
    SET_ASYNC_START_POINT(state, data) {
      state._START_POINT = data;
    },
    SET_ASYNC_END_POINT(state, data) {
      state._END_POINT = data;
    },
    SET_ASYNC_SUMMARY(state, data) {
      state._SUMMARY_ROUTE = data;
    },
    SET_ASYNC_BBOX(state, data) {
      state._BBOX_ROUTE = data;
    },
    SET_ASYNC_PROFILE_ROUTE(state, data) {
      state._PROFILE_ROUTE = data;
    },
    SET_ASYNC_STATUS_MSG(state, data) {
      state._STATUS_MSG = data;
    },
    DELETE_DIRECTION_WAYPOINTS(state, data) {
      state._DIRECTION_WAYPOINTS = data;
    },
    SET_ROUTE_LOADER(state, data) {
      state._ROUTE_LOADER = data;
    },
  },
  actions: {
    async LOAD_ASYNC_DIRECTION_DATA({ commit }, payload) {
      await _openRouteRepository.getDirectionData(payload).then((data) => {
        const statusRoute = { status: "success", msg: "" };
        commit("SET_ROUTE_LOADER", true);
        if (data.data.error === null) {
          const routeData = data.data;
          const routeCoordinates = routeData.features[0].geometry.coordinates;
          const routeWaypoints =
            routeData.features[0].properties.segments[0].steps;

          const summary = routeData.features[0].properties.summary;
          const startPoint = routeData.metadata.query.coordinates[0];
          const endPoint = routeData.metadata.query.coordinates[1];
          const profileRoute = routeData.metadata.query.profile;
          commit("SET_ASYNC_DIRECTION_DATA", routeData);
          commit("SET_ASYNC_DIRECTION_COORDINATES", routeCoordinates);
          commit("SET_ASYNC_DIRECTION_WAYPOINTS", routeWaypoints);
          commit("SET_ASYNC_START_POINT", startPoint);
          commit("SET_ASYNC_END_POINT", endPoint);
          commit("SET_ASYNC_SUMMARY", summary);
          commit("SET_ASYNC_BBOX", routeData.bbox);
          commit("SET_ASYNC_PROFILE_ROUTE", profileRoute);
          commit("SET_ASYNC_STATUS_MSG", statusRoute);
        } else {
          statusRoute.status = "error";
          statusRoute.msg = `Could not generate route, try defining another start and end point. Server error: ${
            data.data.error
          }`;
          commit("SET_ASYNC_STATUS_MSG", statusRoute);
        }
      });
    },
    _DELETE_DIRECTION_WAYPOINTS_({ commit }, payload) {
      commit("DELETE_DIRECTION_WAYPOINTS", payload);
    },
    _SET_ROUTE_LOADER_({ commit }, payload) {
      commit("SET_ROUTE_LOADER", payload);
    },
  },
};
