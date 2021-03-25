<template>
  <v-layout v-on:scroll.passive="onScroll" fill-height @mousemove="Interactions()" id="map">
    <div id="feature-popup" class="ol-popup" style="display:none">
      <div style="font-weight: 300;" id="feature-popup-content"></div>
   </div>
    <DialogSettings></DialogSettings>
    <DialogRouteSettings></DialogRouteSettings>
    <Attributions></Attributions>
    <MeasureDialog></MeasureDialog>
    <MeasureValuesDialog></MeasureValuesDialog>
    <LayersDialog></LayersDialog>
    <QueryDialog></QueryDialog>
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
        <v-btn absolute id="home" @click="home()" light fab top left small class="mt-8" slot="activator">
          <v-icon>home</v-icon>
        </v-btn>
        <span>Home view</span>
      </v-tooltip>
    <v-tooltip right>
             <v-btn absolute id="route" @click="routeDialog" fab top left small light class="mt-10" slot="activator">
          <v-icon>timeline</v-icon>
        </v-btn>
        <span>Route settings</span>
      </v-tooltip>
      <v-fab-transition>
        <v-btn v-show="!fabRotation" @click="setRotation()" absolute light fab top left small class="mt-9">
          <v-icon>screen_rotation</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-speed-dial class="mb-5" fixed bottom right direction="top" transition="slide-y-reverse-transition">
        <v-btn slot="activator" light fab>
          <v-icon>apps</v-icon>
        </v-btn>
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
          <v-btn fab dark small @click="queryDialog()" color="red" slot="activator">
            <v-icon>download</v-icon>
          </v-btn>
          <span>Fetch saved route</span>
        </v-tooltip>
          <v-tooltip left>
          <v-btn fab dark small @click="settingsDialog()" color="red" slot="activator">
            <v-icon>settings</v-icon>
          </v-btn>
          <span>Map settings</span>
        </v-tooltip>
      </v-speed-dial>
    </v-flex>
  </v-layout>
</template>

<script>
import Overlay from "ol/Overlay";

import DialogSettings from "@/components/SpatialData/DialogSettings";
import DialogRouteSettings from "@/components/SpatialData/RouteDialog";
import Attributions from "@/components/SpatialData/Attributions";
import MeasureDialog from "@/components/SpatialData/MeasureDialog";
import MeasureValuesDialog from "@/components/SpatialData/MeasureValuesDialog";
import LayersDialog from "@/components/SpatialData/LayersDialog";
import QueryDialog from "@/components/SpatialData/DialogQueryRoute";

import { homeViewMap, attributionControl, formatArea, formatLength } from "../../scripts/mapConfig";

import { MoveDialogs } from "../helpers/vuetifyHelper";

const movebleDialogs = MoveDialogs();
movebleDialogs;
export default {
  components: {
    DialogSettings,
    DialogRouteSettings,
    Attributions,
    MeasureDialog,
    MeasureValuesDialog,
    LayersDialog,
    QueryDialog,
  },
  data() {
    return {
      featurePopupElement: null,
      featurePopupContent: null,
      toggleMapDragZoomInteraction: 0,
      fabRotation: true,
      homeView: homeViewMap,
      AT: attributionControl,
      dispatch: this.$store.dispatch,
      get: this.$store.getters,
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
        duration: 750,
      });
    },
    queryDialog() {
      this.dispatch("_UpdateDialogQuery_", true);
    },
    settingsDialog() {
      this.dispatch("_UpdateDialogSettings_", true);
    },
    measureDialog() {
      this.dispatch("_UpdateDialogMeasure_", true);
    },
    layerDialog() {
      this.dispatch("_UpdateDialogLayers_", true);
    },
    routeDialog() {
      this.dispatch("_UpdateDialogRouteSettings_", true);
    },
    zoomOut() {
      var view = this.get.olMap.getView();
      var zoom = this.get.view.getZoom();
      view.animate({
        zoom: zoom - 1,
        duration: 750,
      });
    },
    home() {
      var view = this.get.olMap.getView();
      view.animate({
        zoom: 8,
        center: this.homeView,
        duration: 1000,
      });
    },
    distanceRoute(val) {
      if (val > 1000) {
        let kilometers = val / 1000;
        return `Route distance: ${Math.round(kilometers, 2)} km`;
      } else {
        return `Route distance: ${val} m`;
      }
    },
    durationRoute(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return `Duration: ${minutes} min and ${Math.round(seconds, 0)} sec`;
    },
    firstLetterUpper(text) {
      const removeDash = text.replace("-", " ");
      const firstLetter = removeDash.substr(0, 1);
      return `${firstLetter.toUpperCase()}${removeDash.substr(1)}`;
    },
    setRotation() {
      var view = this.get.olMap.getView();
      view.animate({
        rotation: 0,
        duration: 1200,
      });
      this.dispatch("_UPDATE_ROTATION_", 0);
    },
    generateRouteOverlay(e, feature) {
      this.featurePopupElement.style.display = "inline";
      const overlayPopup = new Overlay({
        element: this.featurePopupElement,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });
      if (feature) {
        //add elements and into content
        const contentDistance = this.distanceRoute(this.get._SUMMARY_ROUTE_.distance);
        const contentDuration = this.durationRoute(this.get._SUMMARY_ROUTE_.duration);
        const tripProfile = this.firstLetterUpper(this.get._PROFILE_ROUTE_);

        this.featurePopupContent.innerHTML = `<span>${contentDistance}</span><br><span>${contentDuration}</span><hr><span>Trip profile: ${tripProfile}</span>`;
        overlayPopup.setPosition(e.coordinate);
        this.get.olMap.addOverlay(overlayPopup);
      } else {
        this.featurePopupElement.style.display = "none";
        this.get.olMap.removeOverlay(overlayPopup);
      }
    },
  },
  computed: {
    ShowRouterMap() {
      return this.get.vectorListFAB;
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
    },
  },
  watch: {
    GetRotation: function(val) {
      let rotationValue = val;

      this.get.view.animate({
        rotation: rotationValue,
        duration: 1200,
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
    },
  },
  mounted() {
    this.featurePopupElement = document.getElementById("feature-popup");
    this.featurePopupContent = document.getElementById("feature-popup-content");
    var that = this;
    var highlight;

    if (this.get._MEASURE_OPTIONS_ACTIVE) {
      this.get.olMap.on("pointermove", function(e) {
        if (e.dragging) {
          return;
        }
        let pixel = that.get.olMap.getEventPixel(e.originalEvent);
        let feature = that.get.olMap.forEachFeatureAtPixel(
          pixel,
          function(feature) {
            return feature;
          },
          {
            layerFilter: function(layer) {
              return layer.get("layer_name") === "routes";
            },
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
        that.get.olMap.getTargetElement().style.cursor = feature ? "pointer" : "";
      });

      // Read geojson properties on click
      this.get.olMap.on("click", (e) => {
        let pixel = that.get.olMap.getEventPixel(e.originalEvent);
        let feature = that.get.olMap.forEachFeatureAtPixel(
          pixel,
          function(feature) {
            return feature;
          },
          {
            layerFilter: function(layer) {
              return layer.get("layer_name") === "routes";
            },
          }
        );
        this.generateRouteOverlay(e, feature);
      });
    }

    this.$nextTick(() => {
      this.get.olMap.setView(this.get.view);
      this.get.olMap.setTarget("map");
    });
  },
};
</script>

<style>
.ol-popup {
  position: absolute;
  min-width: 200px;
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

.ol-ctx-menu-container {
  font-weight: 320 !important;
  background: #f5f5f5;
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
