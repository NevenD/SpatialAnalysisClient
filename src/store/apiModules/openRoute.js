import { Repository } from './../../repositories/RepositoryFactory'
const _openRouteRepository = Repository.get('IOpenRouteRepository')

export default {

    state: {
        _DIRECTION_DATA: null
    },
    getters: {
        _DIRECTION_DATA_: state => {
            return state._DIRECTION_DATA;
        },
    },
    mutations: {
        SET_ASYNC_DIRECTION_DATA(state, data) {
            state._DIRECTION_DATA = data
        }
    },
    actions: {
        async LOAD_ASYNC_DIRECTION_DATA({ commit }, payload) {
            await _openRouteRepository.getDirectionData(payload)
                .then(data => {
                    console.log(payload);
                    if (data) {
                        commit('SET_ASYNC_DIRECTION_DATA', data);
                    }
                });
        }
    },
};