import { vectorDrawLayer, drawInteractionPolygon, snapVectorDraw } from "../../../scripts/mapConfig";


const state = {
    VECTOR_DRAW_LAYER: vectorDrawLayer,
    DRAW_INTERACTION_POLYGON: drawInteractionPolygon,
    SNAP_VECTOR_DRAW: snapVectorDraw
}

const getters = {
    _VECTOR_DRAW_LAYER: state => {
        return state.VECTOR_DRAW_LAYER;
    },
    _DRAW_INTERACTION_POLYGON: state => {
        return state.DRAW_INTERACTION_POLYGON;
    },
    _SNAP_VECTOR_DRAW: state => {
        return state.SNAP_VECTOR_DRAW
    }
}


export default {
    state,
    getters
};