import Vue from "vue";
import Vuex from "vuex";

// Importing default/additional & responseData parameters --> input & merging them with Vuex Store
import mapOptions from "./modules/mapOptions";
import appOptions from "./modules/appOptions";
import drawOptions from "./modules/drawOptions";
import addFeatureOptions from "./modules/addFeatureOptions";
import dialogOptions from "./modules/dialogOptions";

Vue.use(Vuex);

export default new Vuex.Store({
  // Defined & merged values
  state: {},

  // Defined & merged getters
  getters: {},

  // Defined & merged mutations/setters
  mutations: {},

  // Calling action methods in components
  // Enabling mutations to run asynchronously
  // Defined & merged actions
  actions: {},

  // Merging input & default parameters from exported modules
  modules: {
    mapOptions,
    appOptions,
    drawOptions,
    addFeatureOptions,
    dialogOptions,
  }
});
