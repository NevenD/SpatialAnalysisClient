const state = {
    DialogLegend: false,
    DialogLayers: false,
    DialogFeatures: false,
    DialogAddFeatures: false,
    DialogShpFeatures: false,
    DialogDraw: false,
    DialogMeasure: false,
    DialogSettings: false,
    UploadDialog: false,
    DialogVectorList: false,
    DialogShpVectorList: false,
}

const getters = {
    dialogLegend: state => {
        return state.DialogLegend;
    },
    dialogLayers: state => {
        return state.DialogLayers;
    },
    dialogFeatures: state => {
        return state.DialogFeatures;
    },
    dialogAddFeatures: state => {
        return state.DialogAddFeatures;
    },
    dialogShpFeatures: state => {
        return state.DialogShpFeatures;
    },
    dialogVectorList: state => {
        return state.DialogVectorList;
    },
    dialogDraw: state => {
        return state.DialogDraw;
    },
    dialogMeasure: state => {
        return state.DialogMeasure;
    },
    dialogSettings: state => {
        return state.DialogSettings;
    },


}

const mutations = {

    _UpdateDialogLegend_: (state, payload) => {
        state.DialogLegend = payload;
    },
    _UpdateDialogLayers_: (state, payload) => {
        state.DialogLayers = payload;
    },
    _UpdateDialogFeatures_: (state, payload) => {
        state.DialogFeatures = payload;
    },
    _UpdateDialogAddFeatures_: (state, payload) => {
        state.DialogAddFeatures = payload;
    },
    _UpdateShpDialogFeatures_: (state, payload) => {
        state.DialogShpFeatures = payload;
    },
    _UpdateDialogDraw_: (state, payload) => {
        state.DialogDraw = payload;
    },
    _UpdateUploadDialog_: (state, payload) => {
        state.UploadDialog = payload;
    },
    _UpdateDialogMeasure_: (state, payload) => {
        state.DialogMeasure = payload;
    },
    _UpdateDialogSettings_: (state, payload) => {
        state.DialogSettings = payload;
    },
    _UpdateDialogVectorList_: (state, payload) => {
        state.DialogVectorList = payload;
    },
}

const actions = {
    _UpdateDialogLegend_({ commit }, payload) {
        commit("_UpdateDialogLegend_", payload);
    },
    _UpdateDialogLayers_({ commit }, payload) {
        commit("_UpdateDialogLayers_", payload);
    },
    _UpdateDialogFeatures_({ commit }, payload) {
        commit("_UpdateDialogFeatures_", payload);
    },
    _UpdateDialogAddFeatures_({ commit }, payload) {
        commit("_UpdateDialogAddFeatures_", payload);
    },

    _UpdateDialogDraw_({ commit }, payload) {
        commit("_UpdateDialogDraw_", payload);
    },

    _UpdateDialogSettings_({ commit }, payload) {
        commit("_UpdateDialogSettings_", payload);
    },
    _UpdateUploadDialog_({ commit }, payload) {
        commit("_UpdateUploadDialog_", payload);
    },


    _UpdateDialogMeasure_({ commit }, payload) {
        commit("_UpdateDialogMeasure_", payload);
    },

    _UpdateDialogVectorList_({ commit }, payload) {
        commit("_UpdateDialogVectorList_", payload);
    },

}


export default {
    state,
    getters,
    mutations,
    actions
};