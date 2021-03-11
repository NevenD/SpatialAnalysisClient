

const state = {
    SideBarPanel: false,
};

const getters = {
    sideBarPanel: state => {
        return state.SideBarPanel;
    }
};

const mutations = {
    _UpdateSideBarePanel_: (state, payload) => {
        state.SideBarPanel = payload;
    }
};

const actions = {
    _UpdateSideBarePanel_({ commit }, payload) {
        commit('_UpdateSideBarePanel_', payload);
    },
};



export default {
    state,
    getters,
    mutations,
    actions
};