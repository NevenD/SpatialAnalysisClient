import {
  vectorDrawLayer,
  drawInteractionPointStart,
  drawInteractionPointEnd,
  snapVectorDraw,
} from "../../../scripts/mapConfig";

const state = {
  VECTOR_DRAW_LAYER: vectorDrawLayer,
  DRAW_INTERACTION_POINT_START: drawInteractionPointStart,
  DRAW_INTERACTION_POINT_END: drawInteractionPointEnd,
  SNAP_VECTOR_DRAW: snapVectorDraw,
};

const getters = {
  _VECTOR_DRAW_LAYER: (state) => {
    return state.VECTOR_DRAW_LAYER;
  },
  _DRAW_INTERACTION_POINT_START: (state) => {
    return state.DRAW_INTERACTION_POINT_START;
  },
  _DRAW_INTERACTION_POINT_END: (state) => {
    return state.DRAW_INTERACTION_POINT_END;
  },
  _SNAP_VECTOR_DRAW: (state) => {
    return state.SNAP_VECTOR_DRAW;
  },
};

export default {
  state,
  getters,
};
