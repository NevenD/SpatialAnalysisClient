<template>
  <v-layout v-on:scroll.passive="onScroll" fill-height @mousemove="Interactions()" id="map">
    <CorineLegend></CorineLegend>
    <DialogSettings></DialogSettings>
    <Attributions></Attributions>
    <DrawDialog></DrawDialog>
    <MeasureDialog></MeasureDialog>
    <MeasureValuesDialog></MeasureValuesDialog>
    <LayersDialog></LayersDialog>
    <VectorLayersListDialog></VectorLayersListDialog>
    <VectorFeaturesDialog></VectorFeaturesDialog>
    <AddFeaturesDialog></AddFeaturesDialog>
    <v-flex>
      <v-tooltip right>
        <v-btn absolute id="zoomIn" @click="zoomIn()" dark fab top left small color="red" class="mt-5" slot="activator">
          <v-icon>add</v-icon>
        </v-btn>
        <span>Zoom in</span>
      </v-tooltip>

      <v-tooltip right>
        <v-btn absolute id="zoomOut" @click="zoomOut()" dark fab top left small color="red" class="mt-6" slot="activator">
          <v-icon>remove</v-icon>
        </v-btn>
        <span>Zoom out</span>
      </v-tooltip>

      <v-tooltip right>
        <v-btn absolute id="zoomOut" @click="zoomToRectangle()" dark fab top left small color="purple" class="mt-7" slot="activator">
          <v-icon>tab_unselected</v-icon>
        </v-btn>
        <span>{{enableDragZoom}}</span>
      </v-tooltip>

      <v-tooltip right>
        <v-btn absolute id="home" @click="home()" light fab top left small class="mt-8" slot="activator">
          <v-icon>home</v-icon>
        </v-btn>
        <span>Home view</span>
      </v-tooltip>

      <v-fab-transition>
        <v-btn v-show="!fabRotation" @click="setRotation()" absolute light fab top left small class="mt-9">
          <v-icon>screen_rotation</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-fab-transition>
        <v-btn @click.prevent="vectorList()" v-show="ShowVectorList" absolute light fab top left small class="mt-10">
          <v-icon>list</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-fab-transition>
        <v-btn @click.prevent="vectorShpList()" v-show="ShowVectorShpList" absolute light fab top left small class="mt-11">
          <v-icon>subject</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-speed-dial class="mb-5" fixed bottom right direction="top" transition="slide-y-reverse-transition">
        <v-btn slot="activator" light fab>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-tooltip left>
          <v-btn fab dark small v-show="GetDrawFAB" @click="drawDialog" color="red" slot="activator">
            <v-icon>edit</v-icon>
          </v-btn>
          <span>Draw geometry</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn fab @click="layerDialog" dark small color="red" slot="activator">
            <v-icon>layers</v-icon>
          </v-btn>
          <span>Select layers</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn fab dark small @click="measureDialog" color="red" slot="activator">
            <v-icon>timeline</v-icon>
          </v-btn>
          <span>Measure area/length</span>
        </v-tooltip>
        <v-tooltip left>
          <v-btn fab dark small @click="settingsDialog" color="red" slot="activator">
            <v-icon>settings</v-icon>
          </v-btn>
          <span>Map settings</span>
        </v-tooltip>
      </v-speed-dial>
    </v-flex>
  </v-layout>
</template>

<script>
import Vector from "ol/layer/Vector";

import CorineLegend from "@/components/WildLandFills/CorineLegend";
import DialogSettings from "@/components/WildLandFills/DialogSettings";
import Attributions from "@/components/WildLandFills/Attributions";
import DrawDialog from "@/components/WildLandFills/DrawDialog";
import MeasureDialog from "@/components/WildLandFills/MeasureDialog";
import MeasureValuesDialog from "@/components/WildLandFills/MeasureValuesDialog";
import LayersDialog from "@/components/WildLandFills/LayersDialog";
import VectorLayersListDialog from "@/components/WildLandFills/VectorLayersListDialog";
import VectorFeaturesDialog from "@/components/WildLandFills/VectorFeaturesDialog";
import AddFeaturesDialog from "@/components/WildLandFills/AddFeaturesDialog";

import {
  homeViewMap,
  attributionControl,
  formatArea,
  formatLength
} from "../../scripts/mapConfig";

(function() {
  // make vuetify dialogs movable
  const d = {};
  document.addEventListener("mousedown", e => {
    const closestDialog = e.target.closest(".v-dialog.v-dialog--active");
    if (
      e.button === 0 &&
      closestDialog != null &&
      e.target.classList.contains("v-card__title")
    ) {
      // element which can be used to move element
      d.el = closestDialog; // element which should be moved
      d.mouseStartX = e.clientX;
      d.mouseStartY = e.clientY;
      d.elStartX = d.el.getBoundingClientRect().left;
      d.elStartY = d.el.getBoundingClientRect().top;
      d.el.style.position = "fixed";
      d.el.style.margin = 0;
      d.oldTransition = d.el.style.transition;
      d.el.style.transition = "none";
    }
  });
  document.addEventListener("mousemove", e => {
    if (d.el === undefined) return;
    d.el.style.left =
      Math.min(
        Math.max(d.elStartX + e.clientX - d.mouseStartX, 0),
        window.innerWidth - d.el.getBoundingClientRect().width
      ) + "px";
    d.el.style.top =
      Math.min(
        Math.max(d.elStartY + e.clientY - d.mouseStartY, 0),
        window.innerHeight - d.el.getBoundingClientRect().height
      ) + "px";
  });
  document.addEventListener("mouseup", () => {
    if (d.el === undefined) return;
    d.el.style.transition = d.oldTransition;
    d.el = undefined;
  });
  setInterval(() => {
    // prevent out of bounds
    const dialog = document.querySelector(".v-dialog.v-dialog--active");
    if (dialog === null) return;
    dialog.style.left =
      Math.min(
        parseInt(dialog.style.left),
        window.innerWidth - dialog.getBoundingClientRect().width
      ) + "px";
    dialog.style.top =
      Math.min(
        parseInt(dialog.style.top),
        window.innerHeight - dialog.getBoundingClientRect().height
      ) + "px";
  }, 100);
})();
export default {
  components: {
    CorineLegend,
    DialogSettings,
    Attributions,
    DrawDialog,
    MeasureDialog,
    MeasureValuesDialog,
    LayersDialog,
    VectorLayersListDialog,
    VectorFeaturesDialog,
    AddFeaturesDialog
  },
  data() {
    return {
      toggleMapDragZoomInteraction: 0,
      fabRotation: true,
      is3d: false,
      homeView: homeViewMap,
      AT: attributionControl,
      VECTOR_LIST: [],
      dispatch: this.$store.dispatch,
      get: this.$store.getters,
      SHAPE_FILES: new Vector(),
      enableDragZoom: "Enable zoom to rectangle"
    };
  },
  methods: {
    Interactions() {
      // show button for reseting rotation if rotation exists
      if (this.get.view.getRotation() > 0 || this.get.view.getRotation() < 0) {
        this.fabRotation = false;
      } else if (this.get.view.getRotation() == 0) {
        this.fabRotation = true;
      } else {
        this.fabRotation = true;
      }
    },
    zoomIn() {
      var view = this.get.olMap.getView();
      var zoom = this.get.view.getZoom();
      view.animate({
        zoom: zoom + 1,
        duration: 750
      });
    },
    legendCorine() {
      this.dispatch("_UpdateDialogLegend_", true);
    },
    vectorList() {
      this.dispatch("_UpdateDialogVectorList_", true);
    },
    vectorShpList() {
      this.dispatch("_UpdateDialogShpVectorList_", true);
    },
    settingsDialog() {
      this.dispatch("_UpdateDialogSettings_", true);
    },
    drawDialog() {
      this.dispatch("_UpdateDialogDraw_", true);
    },
    measureDialog() {
      this.dispatch("_UpdateDialogMeasure_", true);
    },
    layerDialog() {
      this.dispatch("_UpdateDialogLayers_", true);
    },
    zoomOut() {
      var view = this.get.olMap.getView();
      var zoom = this.get.view.getZoom();
      view.animate({
        zoom: zoom - 1,
        duration: 750
      });
    },
    home() {
      var view = this.get.olMap.getView();
      view.animate({
        zoom: 8,
        center: this.homeView,
        duration: 2000
      });
    },
    zoomToRectangle() {
      if (this.toggleMapDragZoomInteraction == 0) {
        this.get.olMap.addInteraction(this.get._DRAG_ZOOM_INTERACTION);
        this.toggleMapDragZoomInteraction = 1;
        this.enableDragZoom = "Disable zoom to rectangle";
      } else {
        this.get.olMap.removeInteraction(this.get._DRAG_ZOOM_INTERACTION);
        this.toggleMapDragZoomInteraction = 0;
        this.enableDragZoom = "Enable zoom to rectangle";
      }
    },
    setRotation() {
      var view = this.get.olMap.getView();
      view.animate({
        rotation: 0,
        duration: 1200
      });
      this.dispatch("_UPDATE_ROTATION_", 0);
    }
  },
  computed: {
    ShowVectorList() {
      return this.get.vectorListFAB;
    },
    ShowVectorShpList() {
      return this.get.vectorShpListFAB;
    },
    GetRotation() {
      return this.get._ROTATION;
    },
    GetDrawFAB() {
      return this.get.drawVectorFAB;
    },
    GetDrawerValue() {
      return this.get.sideBarPanel;
    },
    GetMeasure() {
      return this.get._MEASURE_VALUE;
    }
  },
  watch: {
    GetRotation: function(val) {
      let rotationValue = val;

      this.get.view.animate({
        rotation: rotationValue,
        duration: 1200
      });
    },
    GetMeasure: function(val) {
      // remove all interaction from map
      this.get.olMap.removeInteraction(this.get._DRAW_POINT);
      this.get.olMap.removeInteraction(this.get._DRAW_LINESTRING);
      this.get.olMap.removeInteraction(this.get._DRAW_AREA);

      if (val === "area") {
        var that = this;
        // start draw interaction
        this.get._DRAW_MEASURE_AREA.on("drawstart", function(evt) {
          // erase vector measurements if exists
          that.get._MEASURE_VECTOR.getSource().clear();
          var sketch = evt.feature;

          // add values
          sketch.getGeometry().on("change", function(evt) {
            var geom = evt.target;
            // format geometry
            var output = formatArea(geom);
            // concatonate values
            var measuredArea = `Measured area: ${output}`;

            // update area values to vuex store
            that.dispatch("_UPDATE_MEASURE_VALUE_AREA_", measuredArea);
            // show panel on change if close before finished with measuring
            that.dispatch("_UPDATE_MEASURE_PANEL_", true);
          });
        });
      } else {
        var that_ = this;
        // start draw interaction
        this.get._DRAW_MEASURE_LENGTH.on("drawstart", function(evt) {
          // erase vector measurements if exists
          that_.get._MEASURE_VECTOR.getSource().clear();
          var sketch = evt.feature;

          // add values
          sketch.getGeometry().on("change", function(evt) {
            var geom = evt.target;
            // format geometry
            var output = formatLength(geom);
            // concatonate values
            var measuredLength = `Measured length: ${output}`;

            // update area values to vuex store
            that_.dispatch("_UPDATE_MEASURE_VALUE_LENGTH_", measuredLength);
            // show panel on change if close before finished with measuring
            that_.dispatch("_UPDATE_MEASURE_PANEL_", true);
          });
        });
      }
    },
    GetDrawerValue: function() {
      this.$nextTick(() => {
        this.get.olMap.updateSize();
      });
    }
  },
  mounted() {
    var that = this;
    var highlight;
    if (this.get._MEASURE_OPTIONS_ACTIVE) {
      this.get.olMap.on("pointermove", function(e) {
        if (e.dragging) {
          return;
        }
        var pixel = that.get.olMap.getEventPixel(e.originalEvent);
        var feature = that.get.olMap.forEachFeatureAtPixel(
          pixel,
          function(feature) {
            return feature;
          },
          {
            layerFilter: function(layer) {
              return layer.get("layer_name") === "fields";
            }
          }
        );
        if (feature !== highlight) {
          if (highlight) {
            that.get._VECTOR_OVERLAY_CRO.getSource().removeFeature(highlight);
          }
          if (feature) {
            that.get._VECTOR_OVERLAY_CRO.getSource().addFeature(feature);
          }
          highlight = feature;
        }
        // if there is any element (returns true or false) then add pointer
        that.get.olMap.getTargetElement().style.cursor = feature
          ? "pointer"
          : "";
      });
      // Read geojson properties on click
      this.get.olMap.on("click", function(e) {
        // delete all previous data properties
        that.dispatch("_DELETE_ALL_PROPERTIES_", null);

        // get vector fields
        let vectorSource = that.get._GEOJSON_CRO_FIELDS.getSource();

        //get vectors on clicked coordinates
        let features = vectorSource.getFeaturesAtCoordinate(e.coordinate);
        if (features.length > 0) {
          let data = features[0];
          // save data properties to vuex state

          // save properties to vuex
          that.dispatch("_UPDATE_PROPERTY_NAME_", data.get("Name"));
          that.dispatch("_UPDATE_PROPERTY_DESC_", data.get("Description"));
          that.dispatch("_UPDATE_PROPERTY_LOCATION_", data.get("Location"));
          that.dispatch(
            "_UPDATE_PROPERTY_CATEGORY_TYPE_",
            data.get("Category_Type")
          );
          that.dispatch("_UPDATE_PROPERTY_AREA_", data.get("Area"));
          that.dispatch("_UPDATE_PROPERTY_DATE_", data.get("Date"));

          setTimeout(() => {
            // open modal with data properties
            that.dispatch("_UpdateDialogFeatures_", true);
          }, 100);
        }
      });
    }

    // not good looking hack on updating features on start
    this.get.olMap.on("pointermove", function(e) {
      if (!e.dragging) {
        let source = that.get._GEOJSON_CRO_FIELDS.getSource();
        // update vector value features to vuex store
        // update vector value features to vuex store
        that.dispatch("_UPDATE_VECTOR_LIST", source.getFeatures());
      }
    });

    this.$nextTick(() => {
      this.get.olMap.setView(this.get.view);
      this.get.olMap.setTarget("map");
    });
  }
};
</script>

<style>
.ol-popup {
  position: absolute;
  min-width: 180px;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  bottom: 12px;
  left: -50px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}

.slider-width {
  width: 200px;
}
.mt-6 {
  margin-top: 98px !important;
}
.mt-7 {
  margin-top: 168px !important;
}
.mt-8 {
  margin-top: 298px !important;
}
.mt-9 {
  margin-top: 220px !important;
}
.mt-10 {
  margin-top: 352px !important;
}
.mt-11 {
  margin-top: 406px !important;
}
.ol-custom-overviewmap,
.ol-custom-overviewmap.ol-uncollapsible {
  margin-left: 5px;
  bottom: auto;
  right: auto;
  left: 0;
  top: 665px;
}

.ol-custom-overviewmap .ol-overviewmap-map {
  border: none;
  width: 200px;
}

.ol-custom-overviewmap .ol-overviewmap-box {
  border: 2px solid #4caf50;
}

.ol-rotate {
  top: 170px;
  right: 0;
}

.ol-scale-line-vue {
  background: #4caf507a;
  border-radius: 4px;
  top: 34px !important;
  right: 8px !important;
  padding: 2px !important;
  position: absolute;
  border: 1px solid #f5f5f5;
  border-top: none;
  color: #eee;
  font-size: 10px;
  text-align: center;
  margin: 1px;
  will-change: contents, width;
}

.v-dialog.v-dialog--active .v-card__title--primary {
  cursor: grab;
}
.v-dialog.v-dialog--active .v-card__title--primary:active {
  cursor: grabbing;
}

.ol-mouse-position {
  top: 8px;
  right: 8px;
  position: absolute;
  font-weight: bold;
  color: #424242 !important;
  text-shadow: 2px 2px 8px #f5f5f5 !important;
}
</style>

