import { Repository } from "./../../repositories/RepositoryFactory";
const _openRouteRepository = Repository.get("IRouteRepository");

export default {
  state: {
    _POST_RETURN_MSG: null,
  },
  getters: {
    _POST_RETURN_MSG_: (state) => {
      return state._POST_RETURN_MSG;
    },
  },
  mutations: {
    SET_ASYNC_POST_RETURN_MSG(state, data) {
      state._POST_RETURN_MSG = data;
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
  },
};
