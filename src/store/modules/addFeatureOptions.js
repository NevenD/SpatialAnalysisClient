

const state = {
    SHOW_VECTOR_BUILD_OPTIONS: false,
    FEATURE_COUNTER: 1,
    NAME_FEATURE: null,
    LOCATION_FEATURE: null,
    CADASTRAL_PLOT_FEATURE: null,
    AGRICULTURAL_ID_FEATURE: null,
    SOIL_TYPES_FEATURE: null,
    OWNERSHIP_TYPES_FEATURE: null,
    // for building shp,kml and geojson
    GEOJSON_FORMAT_FEATURE: null
}

const getters = {
    _FEATURE_COUNTER: state => {
        return state.FEATURE_COUNTER
    },
    _NAME_FEATURE: state => {
        return state.NAME_FEATURE
    },
    _LOCATION_FETURE: state => {
        return state.LOCATION_FEATURE;
    },
    _CADASTRAL_PLOT_FEATURE: state => {
        return state.CADASTRAL_PLOT_FEATURE
    },
    _AGRICULTURAL_ID_FEATURE: state => {
        return state.AGRICULTURAL_ID_FEATURE;
    },
    _SOIL_TYPES_FEATURE: state => {
        return state.SOIL_TYPES_FEATURE
    },
    _OWNERSHIP_TYPES_FEATURE: state => {
        return state.OWNERSHIP_TYPES_FEATURE
    },
    _GEOJSON_FORMAT_FEATURE: state => {
        return state.GEOJSON_FORMAT_FEATURE;
    },
    _SHOW_VECTOR_BUILD_OPTIONS: state => {
        return state.SHOW_VECTOR_BUILD_OPTIONS;
    }
}

const mutations = {
    _UPDATE_FEATURE_COUNTER_: (state, payload) => {
        state.FEATURE_COUNTER = payload
    },
    _UPDATE_NAME_FEATURE_: (state, payload) => {
        state.NAME_FEATURE = payload
    },
    _UPDATE_LOCATION_FETURE_: (state, payload) => {
        state.LOCATION_FEATURE = payload
    },
    _UPDATE_CADASTRAL_PLOT_FEATURE_: (state, payload) => {
        state.CADASTRAL_PLOT_FEATURE = payload
    },
    _UPDATE_AGRICULTURAL_ID_FEATURE_: (state, payload) => {
        state.AGRICULTURAL_ID_FEATURE = payload
    },
    _UPDATE_SOIL_TYPES_FEATURE_: (state, payload) => {
        state.SOIL_TYPES_FEATURE = payload
    },
    _UPDATE_OWNERSHIP_TYPES_FEATURE_: (state, payload) => {
        state.OWNERSHIP_TYPES_FEATURE = payload
    },
    _UPDATE_GEOJSON_FORMAT_FEATURE_: (state, payload) => {
        state.GEOJSON_FORMAT_FEATURE = payload
    },
    _UPDATE_SHOW_VECTOR_BUILD_OPTIONS_: (state, payload) => {
        state.SHOW_VECTOR_BUILD_OPTIONS = payload
    },
}


const actions = {
    _UPDATE_FEATURE_COUNTER_({ commit }, payload) {
        commit('_UPDATE_FEATURE_COUNTER_', payload);
    },
    _UPDATE_NAME_FEATURE_({ commit }, payload) {
        commit('_UPDATE_NAME_FEATURE_', payload);
    },
    _UPDATE_LOCATION_FETURE_({ commit }, payload) {
        commit('_UPDATE_LOCATION_FETURE_', payload);
    },
    _UPDATE_CADASTRAL_PLOT_FEATURE_({ commit }, payload) {
        commit('_UPDATE_CADASTRAL_PLOT_FEATURE_', payload);
    },
    _UPDATE_AGRICULTURAL_ID_FEATURE_({ commit }, payload) {
        commit('_UPDATE_AGRICULTURAL_ID_FEATURE_', payload);
    },
    _UPDATE_SOIL_TYPES_FEATURE_({ commit }, payload) {
        commit('_UPDATE_SOIL_TYPES_FEATURE_', payload);
    },
    _UPDATE_OWNERSHIP_TYPES_FEATURE_({ commit }, payload) {
        commit('_UPDATE_OWNERSHIP_TYPES_FEATURE_', payload);
    },
    _UPDATE_GEOJSON_FORMAT_FEATURE_({ commit }, payload) {
        commit('_UPDATE_GEOJSON_FORMAT_FEATURE_', payload);
    },
    _UPDATE_SHOW_VECTOR_BUILD_OPTIONS_({ commit }, payload) {
        commit('_UPDATE_SHOW_VECTOR_BUILD_OPTIONS_', payload);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
};