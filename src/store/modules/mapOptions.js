import { map, view, attributionControl, miniMap, tempMap, dguDofCro, dguCadastral, bingMap, mapboxMap, openTopoMap, tileOSMMap, dguDofCro2016, dguTK25Cro, corineCro, scaleLine, mousePositionControl, geojson, vector, vectorShapes, drawMeasureArea, drawMeasureLength, vectorMeasure, vectorCroFields, vectorOverlayCro, dragZoom } from "../../../scripts/mapConfig";

const state = {


  ShowDownloadKMLButton: false,
  CorineFAB: false,
  DrawVectorFAB: true,
  VectorListFAB: true,
  VectorShpListFAB: false,
  OLMAP: map,
  VIEW: view,
  DGU_DOF: dguDofCro,
  DGU_CADASTRAL: dguCadastral,
  BING: bingMap,
  MAPBOX: mapboxMap,
  OPENTOPO_MAP: openTopoMap,
  AIR_TEMP_OPEN_WEATHER: tempMap,
  OSM_MAP: tileOSMMap,
  DGU_DOF_2016: dguDofCro2016,
  DGU_TK25: dguTK25Cro,
  CORINE: corineCro,
  ATTRIBUTIONCONTROL: attributionControl,
  ATTRIBUTIONS_PANEL: false,
  MEASURE_PANEL: false,
  MOUSE_POSITION_CONTROL: mousePositionControl,
  SCALELINE: scaleLine,
  MINIMAP: miniMap,
  DOF_ATTRIBUTIONS: null,
  TK_ATTRIBUTIONS: null,
  CORINE_ATTRIBUTIONS: null,
  BING_ATTRIBUTIONS: null,
  ROTATION: 0,
  VECTOR: vector,
  VECTOR_SHAPES: vectorShapes,
  GEOJSON_OBJECT: geojson,
  GEOJSON_VECTOR: [],
  WKT_VECTOR: [],
  EXTENT_VECTOR: [],
  KML_VECTOR: null,
  DRAW_VALUE: "",
  DRAW_SHAPE_VALUE: "",
  DRAG_ZOOM_INTERACTION: dragZoom,
  DRAW_MEASURE_AREA: drawMeasureArea,
  DRAW_MEASURE_LENGTH: drawMeasureLength,
  DRAW_OPTIONS: true,
  MEASURE_VALUE: "",
  MEASURE_VALUE_AREA: "",
  MEASURE_VALUE_LENGTH: "",
  MEASURE_VECTOR: vectorMeasure,
  GEOJSON_CRO_FIELDS: vectorCroFields,
  VECTOR_OVERLAY_CRO: vectorOverlayCro,
  MEASURE_OPTIONS_ACTIVE: true,
  // FEATURE PROPERTIES
  PROPERTY_NAME: null,
  PROPERTY_DESC: null,
  PROPERTY_LOCATION: null,
  PROPERTY_AREA: null,
  PROPERTY_CATEGORY_TYPE: null,
  PROPERTY_DATE: null,
  VECTOR_LIST: null,

};

const getters = {
  showDownloadKMLButton: state => {
    return state.ShowDownloadKMLButton;
  },
  corineFAB: state => {
    return state.CorineFAB;
  },
  vectorListFAB: state => {
    return state.VectorListFAB;
  },
  drawVectorFAB: state => {
    return state.DrawVectorFAB
  },
  olMap: state => {
    return state.OLMAP;
  },
  view: state => {
    return state.VIEW;
  },
  miniMap: state => {
    return state.MINIMAP;
  },
  _DGU_DOF: state => {
    return state.DGU_DOF;
  },
  _DGU_CADASTRAL: state => {
    return state.DGU_CADASTRAL;
  },
  _DRAG_ZOOM_INTERACTION: state => {
    return state.DRAG_ZOOM_INTERACTION;
  },
  _BING: state => {
    return state.BING;
  },
  _MAPBOX: state => {
    return state.MAPBOX;
  },
  _OPENTOPO_MAP: state => {
    return state.OPENTOPO_MAP;
  },
  _OSM_MAP: state => {
    return state.OSM_MAP;
  },
  _AIR_TEMP_OPEN_WEATHER: state => {
    return state.AIR_TEMP_OPEN_WEATHER;
  },
  _DGU_DOF_2016: state => {
    return state.DGU_DOF_2016;
  },
  _DGU_TK25: state => {
    return state.DGU_TK25;
  },
  _CORINE: state => {
    return state.CORINE;
  },
  _ATTRIBUTION_CONTROL: state => {
    return state.ATTRIBUTIONCONTROL;
  },
  _ATTRIBUTIONS_PANEL: state => {
    return state.ATTRIBUTIONS_PANEL;
  },
  _MEASURE_PANEL: state => {
    return state.MEASURE_PANEL;
  },
  _SCALE_LINE: state => {
    return state.SCALELINE;
  },
  _MOUSE_POSITION_CONTROL: state => {
    return state.MOUSE_POSITION_CONTROL;
  },
  _DOF_ATTRIBUTIONS: state => {
    return state.DOF_ATTRIBUTIONS;
  },
  _TK_ATTRIBUTIONS: state => {
    return state.TK_ATTRIBUTIONS;
  },
  _CORINE_ATTRIBUTIONS: state => {
    return state.CORINE_ATTRIBUTIONS;
  },
  _BING_ATTRIBUTIONS: state => {
    return state.BING_ATTRIBUTIONS;
  },
  _DRAW_OPTIONS: state => {
    return state.DRAW_OPTIONS;
  },
  _GEOJSON_OBJECT: state => {
    return state.GEOJSON_OBJECT;
  },
  _GEOJSON_VECTOR: state => {
    return state.GEOJSON_VECTOR;
  },
  _EXTENT_VECTOR: state => {
    return state.EXTENT_VECTOR;
  },
  _ROTATION: state => {
    return state.ROTATION;
  },
  _DRAW_VALUE: state => {
    return state.DRAW_VALUE;
  },
  _DRAW_SHAPE_VALUE: state => {
    return state.DRAW_SHAPE_VALUE;
  },
  _DRAW_MEASURE_AREA: state => {
    return state.DRAW_MEASURE_AREA;
  },
  _DRAW_MEASURE_LENGTH: state => {
    return state.DRAW_MEASURE_LENGTH;
  },
  _MEASURE_VALUE: state => {
    return state.MEASURE_VALUE;
  },
  _MEASURE_OPTIONS_ACTIVE: state => {
    return state.MEASURE_OPTIONS_ACTIVE;
  },
  _MEASURE_VALUE_AREA: state => {
    return state.MEASURE_VALUE_AREA;
  },
  _MEASURE_VALUE_LENGTH: state => {
    return state.MEASURE_VALUE_LENGTH;
  },
  _MEASURE_VECTOR: state => {
    return state.MEASURE_VECTOR;
  },
  _GEOJSON_CRO_FIELDS: state => {
    return state.GEOJSON_CRO_FIELDS;
  },
  _VECTOR_OVERLAY_CRO: state => {
    return state.VECTOR_OVERLAY_CRO;
  },
  _PROPERTY_NAME: state => {
    return state.PROPERTY_NAME;
  },
  _PROPERTY_LOCATION: state => {
    return state.PROPERTY_LOCATION;
  },
  _PROPERTY_DESC: state => {
    return state.PROPERTY_DESC;
  },
  _PROPERTY_AREA: state => {
    return state.PROPERTY_AREA;
  },
  _PROPERTY_CATEGORY_TYPE: state => {
    return state.PROPERTY_CATEGORY_TYPE;
  },
  _PROPERTY_DATE: state => {
    return state.PROPERTY_DATE;
  },
  _VECTOR_LIST: state => {
    return state.VECTOR_LIST;
  },

};

const mutations = {

  _UpdateDownloadKMLButton_: (state, payload) => {
    state.ShowDownloadKMLButton = payload;
  },
  _UpdateCorineFAB_: (state, payload) => {
    state.CorineFAB = payload;
  },
  _UpdateVectorListFAB_: (state, payload) => {
    state.VectorListFAB = payload;
  },
  _UpdateDrawVectorFAB_: (state, payload) => {
    state.DrawVectorFAB = payload;
  },
  _UPDATE_ATTRIBUTIONS_PANEL_: (state, payload) => {
    state.ATTRIBUTIONS_PANEL = payload;
  },
  _UPDATE_MEASURE_PANEL_: (state, payload) => {
    state.MEASURE_PANEL = payload;
  },
  _UPDATE_MOUSE_POSITION_: (state, payload) => {
    state.MOUSE_POSITION_CONTROL = payload;
  },
  _UPDATE_DOF_ATTRIBUTIONS_: (state, payload) => {
    state.DOF_ATTRIBUTIONS = payload;
  },
  _UPDATE_TK_ATTRIBUTIONS_: (state, payload) => {
    state.TK_ATTRIBUTIONS = payload;
  },
  _UPDATE_CORINE_ATTRIBUTIONS_: (state, payload) => {
    state.CORINE_ATTRIBUTIONS = payload;
  },
  _UPDATE_BING_ATTRIBUTIONS_: (state, payload) => {
    state.BING_ATTRIBUTIONS = payload;
  },
  _UPDATE_ROTATION_: (state, payload) => {
    state.ROTATION = payload;
  },
  _UPDATE_GEOJSON_VECTOR: (state, payload) => {
    state.GEOJSON_VECTOR = payload;
  },
  _UPDATE_EXTENT_VECTOR: (state, payload) => {
    state.EXTENT_VECTOR = payload;
  },
  _UPDATE_DRAW_VALUE_: (state, payload) => {
    state.DRAW_VALUE = payload;
  },
  _UPDATE_DRAW_SHAPE_VALUE_: (state, payload) => {
    state.DRAW_SHAPE_VALUE = payload;
  },
  _UPDATE_DRAW_OPTIONS_: (state, payload) => {
    state.DRAW_OPTIONS = payload;
  },
  _UPDATE_MEASURE_VALUE_: (state, payload) => {
    state.MEASURE_VALUE = payload;
  },
  _UPDATE_MEASURE_VALUE_AREA_: (state, payload) => {
    state.MEASURE_VALUE_AREA = payload;
  },
  _UPDATE_MEASURE_OPTIONS_ACTIVE_: (state, payload) => {
    state.MEASURE_OPTIONS_ACTIVE = payload;
  },
  _UPDATE_MEASURE_VALUE_LENGTH_: (state, payload) => {
    state.MEASURE_VALUE_LENGTH = payload;
  },
  _UPDATE_PROPERTY_NAME_: (state, payload) => {
    state.PROPERTY_NAME = payload;
  },
  _UPDATE_PROPERTY_LOCATION_: (state, payload) => {
    state.PROPERTY_LOCATION = payload;
  },
  _UPDATE_PROPERTY_DESC_: (state, payload) => {
    state.PROPERTY_DESC = payload;
  },
  _UPDATE_PROPERTY_AREA_: (state, payload) => {
    state.PROPERTY_AREA = payload;
  },
  _UPDATE_PROPERTY_CATEGORY_TYPE_: (state, payload) => {
    state.PROPERTY_CATEGORY_TYPE = payload;
  },
  _UPDATE_PROPERTY_DATE_: (state, payload) => {
    state.PROPERTY_DATE = payload;
  },
  _MEASURE_OPTIONS_ACTIVE_: (state, payload) => {
    state.MEASURE_OPTIONS_ACTIVE = payload;
  },
  _DELETE_ALL_PROPERTIES_: (state, payload) => {
    state.PROPERTY_AREA = payload;
    state.PROPERTY_LOCATION = payload;
    state.PROPERTY_DESC = payload;
    state.PROPERTY_NAME = payload;
  },
  _UPDATE_VECTOR_LIST: (state, payload) => {
    state.VECTOR_LIST = payload;
  },

};

const actions = {

  _UpdateCorineFAB_({ commit }, payload) {
    commit("_UpdateCorineFAB_", payload);
  },
  _UpdateVectorListFAB_({ commit }, payload) {
    commit("_UpdateVectorListFAB_", payload);
  },
  _UpdateDrawVectorFAB_({ commit }, payload) {
    commit("_UpdateDrawVectorFAB_", payload);
  },
  _UPDATE_ATTRIBUTIONS_PANEL_({ commit }, payload) {
    commit("_UPDATE_ATTRIBUTIONS_PANEL_", payload);
  },
  _UPDATE_MEASURE_PANEL_({ commit }, payload) {
    commit("_UPDATE_MEASURE_PANEL_", payload);
  },
  _UPDATE_MOUSE_POSITION_({ commit }, payload) {
    commit("_UPDATE_MOUSE_POSITION_", payload);
  },
  _UPDATE_DOF_ATTRIBUTIONS_({ commit }, payload) {
    commit("_UPDATE_DOF_ATTRIBUTIONS_", payload);
  },
  _UPDATE_TK_ATTRIBUTIONS_({ commit }, payload) {
    commit("_UPDATE_TK_ATTRIBUTIONS_", payload);
  },
  _UPDATE_CORINE_ATTRIBUTIONS_({ commit }, payload) {
    commit("_UPDATE_CORINE_ATTRIBUTIONS_", payload);
  },
  _UPDATE_BING_ATTRIBUTIONS_({ commit }, payload) {
    commit("_UPDATE_BING_ATTRIBUTIONS_", payload);
  },
  _UPDATE_ROTATION_({ commit }, payload) {
    commit("_UPDATE_ROTATION_", payload);
  },
  _UPDATE_DRAW_SHAPE_VALUE_({ commit }, payload) {
    commit("_UPDATE_DRAW_SHAPE_VALUE_", payload);
  },
  _UPDATE_DRAW_OPTIONS_({ commit }, payload) {
    commit("_UPDATE_DRAW_OPTIONS_", payload);
  },
  _UPDATE_GEOJSON_VECTOR({ commit }, payload) {
    let jsonPayload = JSON.parse(JSON.stringify(payload));
    commit("_UPDATE_GEOJSON_VECTOR", jsonPayload);
  },
  _UPDATE_MEASURE_VALUE_({ commit }, payload) {
    commit("_UPDATE_MEASURE_VALUE_", payload);
  },
  _UPDATE_MEASURE_OPTIONS_ACTIVE_({ commit }, payload) {
    commit("_UPDATE_MEASURE_OPTIONS_ACTIVE_", payload);
  },
  _UPDATE_MEASURE_VALUE_AREA_({ commit }, payload) {
    commit("_UPDATE_MEASURE_VALUE_AREA_", payload);
  },
  _UPDATE_MEASURE_VALUE_LENGTH_({ commit }, payload) {
    commit("_UPDATE_MEASURE_VALUE_LENGTH_", payload);
  },
  _UPDATE_PROPERTY_NAME_({ commit }, payload) {
    commit("_UPDATE_PROPERTY_NAME_", payload);
  },
  _UPDATE_PROPERTY_LOCATION_({ commit }, payload) {
    commit("_UPDATE_PROPERTY_LOCATION_", payload);
  },
  _UPDATE_PROPERTY_DESC_({ commit }, payload) {
    commit("_UPDATE_PROPERTY_DESC_", payload);
  },
  _UPDATE_PROPERTY_AREA_({ commit }, payload) {
    commit("_UPDATE_PROPERTY_AREA_", payload);
  },
  _UPDATE_PROPERTY_CATEGORY_TYPE_({ commit }, payload) {
    commit("_UPDATE_PROPERTY_CATEGORY_TYPE_", payload);
  },
  _UPDATE_PROPERTY_DATE_({ commit }, payload) {
    commit("_UPDATE_PROPERTY_DATE_", payload);
  },
  _DELETE_ALL_PROPERTIES_({ commit }, payload) {
    commit("_DELETE_ALL_PROPERTIES_", payload);
  },
  _UPDATE_VECTOR_LIST({ commit }, payload) {
    commit("_UPDATE_VECTOR_LIST", payload);
  },


};

export default {
  state,
  getters,
  mutations,
  actions
};
