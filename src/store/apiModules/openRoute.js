import { Repository } from './../../repositories/RepositoryFactory'
const _openRouteRepository = Repository.get('IOpenRouteRepository')

export default {

    state: {
        _DIRECTION_DATA: null,
        _DIRECTION_COORDINATES: [],
        _DIRECTION_WAYPOINTS: []
    },
    getters: {
        _DIRECTION_DATA_: state => {
            return state._DIRECTION_DATA;
        },
        _DIRECTION_COORDINATES_: state => {
            return state._DIRECTION_COORDINATES;
        },
        _DIRECTION_WAYPOINTS_: state => {
            return state._DIRECTION_WAYPOINTS;
        },
    },
    mutations: {
        SET_ASYNC_DIRECTION_DATA(state, data) {
            state._DIRECTION_DATA = data
        },
        SET_ASYNC_DIRECTION_COORDINATES(state, data) {
            state._DIRECTION_COORDINATES = data
        },
        SET_ASYNC_DIRECTION_WAYPOINTS(state, data) {
            state._DIRECTION_WAYPOINTS = data
        }
    },
    actions: {
        async LOAD_ASYNC_DIRECTION_DATA({ commit }, payload) {
            await _openRouteRepository.getDirectionData(payload)
                .then(data => {
                    if (data.data) {
                        const routeData = data.data;
                        console.log(routeData);
                        const routeCoordinates = routeData.features[0].geometry.coordinates;
                        const routeWaypoints = routeData.features[0].properties.segments[0].steps;
                        commit('SET_ASYNC_DIRECTION_DATA', routeData);
                        commit('SET_ASYNC_DIRECTION_COORDINATES', routeCoordinates);
                        commit('SET_ASYNC_DIRECTION_WAYPOINTS', routeWaypoints);
                    }
                });
        }
    },
};