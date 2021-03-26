<template>
<div>   
  <v-snackbar
      v-model="showError" color="#f5f5f5"
      style="color: black"
      :right="true"
      :top="true"
      :multi-line="true"
      :timeout="8500"
    >
    {{ StatusMsg }}
        <v-btn fab dark color="red" small @click="showError = false" >
        <v-icon dark>close</v-icon>
        </v-btn>
    </v-snackbar>
      <v-dialog
      v-model="RouteLoader"
      hide-overlay
      persistent
      width="300"
    >
      <v-card color="white">
        <v-card-text>
          Fetching data, please wait...
          <v-progress-linear
            indeterminate
            color="black"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  <v-dialog hide-overlay v-model="RouteDialog" persistent max-width="400">
    <v-card>
      <v-card-title class="header-padding" primary-title></v-card-title>
      <v-spacer></v-spacer>
        <v-btn icon style="float: right;" @click="closeRouteDialog()">
              <v-icon>close</v-icon>
        </v-btn>
        <v-card-text>
           <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Route & isochrone settings</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
          </v-list-tile-action>
        </v-list-tile>
        <v-card-text>
          <v-layout row>
                <v-slider
            v-model="rangeIsochroneTime"
            label="Isochrone time "
            thumb-label="always"
            color="success"
            max="2000"
            min="100"
          ></v-slider>
          </v-layout>
               <v-layout row>
                <v-slider
            v-model="rangeIsochroneDistance"
            label="Isochrone meters"
            thumb-label="always"
            color="success"
            max="2000"
            min="100"
          ></v-slider>
          </v-layout>
      <v-layout row>
          <v-flex  sm12 d-flex>
            <v-select v-model="profileRoute" label="Profile routes" prepend-icon="edit_road" single-line :items="routeTypes" hint="Pick route profile"  ></v-select>
          </v-flex>
        </v-layout>
        </v-card-text>
    <div class="text-xs-center">
          <v-tooltip top>
      <v-btn fab light color="success" small @click="generatePointForIsochronePolygonDialog()" slot="activator">
        <v-icon dark>trip_origin</v-icon>
      </v-btn>
     <span>Generate isochrone polygon</span>
    </v-tooltip>
    <v-tooltip top>
      <v-btn fab :disabled="fetchRouteDisabled" light color="success" small @click="fetchRouteData()" slot="activator">
        <v-icon dark>moving</v-icon>
      </v-btn>
     <span>Fetch route</span>
    </v-tooltip>
    <v-tooltip top>
      <v-btn fab :disabled="addStartRouteDisabled" light small @click="addFirstRoute()" slot="activator">
        <v-icon dark>add_location</v-icon>
      </v-btn>
     <span>Add first route point</span>
    </v-tooltip>
    <v-tooltip top>
      <v-btn fab light :disabled="addEndRouteDisabled" @click="addSecondRoute()" small slot="activator">
        <v-icon dark >pin_drop</v-icon>
      </v-btn>
     <span>Add second route point</span>
    </v-tooltip>
      <v-tooltip top>
      <v-btn fab dark color="red" small @click="deletePointRoutes()" slot="activator">
        <v-icon dark>delete_forever</v-icon>
      </v-btn>
     <span>Delete route point & isochrone polygon</span>
    </v-tooltip>
  </div>
    </v-card-text>
  </v-card>
  </v-dialog>
  </div>
</template>
<script>
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import { Icon, Style, Text, Fill, Stroke } from "ol/style";
import Feature from "ol/Feature";
import { mapActions } from "vuex";
import Point from "ol/geom/Point";
import _startPoint from "@/assets/images/number_1.png";
import _endPoint from "@/assets/images/number_2.png";
import _centerMap from "@/assets/images/center_map.png";

const mapMenu = require("ol-contextmenu");

export default {
  data() {
    return {
      rangeIsochroneTime: 200,
      rangeIsochroneDistance: 300,
      showError: false,
      showLoader: false,
      startPoint: _startPoint,
      endPoint: _endPoint,
      enableFirstRoutePoint: true,
      enableSecondRoutePoint: true,
      addStartRouteDisabled: false,
      addEndRouteDisabled: true,
      fetchRouteDisabled: true,
      profileRoute: { text: "Car", value: "driving-car" },
      startLong: null,
      startLat: null,
      endLong: null,
      contextmenuItems: [
        {
          text: "Center map here",
          classname: "bold",
          icon: "https://cdn.jsdelivr.net/gh/jonataswalker/ol-contextmenu@604befc46d737d814505b5d90fc171932f747043/examples/img/center.png",
          callback: this.centerMap,
        },
        {
          text: "Route points",
          icon: "https://cdn.jsdelivr.net/gh/jonataswalker/ol-contextmenu@604befc46d737d814505b5d90fc171932f747043/examples/img/view_list.png",
          items: [
            {
              text: "Start point",
              icon: "https://cdn.jsdelivr.net/gh/jonataswalker/ol-contextmenu@604befc46d737d814505b5d90fc171932f747043/examples/img/pin_drop.png",
              callback: this.addFirstRoutePoint,
            },
            {
              text: "End point",
              icon: "https://cdn.jsdelivr.net/gh/jonataswalker/ol-contextmenu@604befc46d737d814505b5d90fc171932f747043/examples/img/pin_drop.png",
              callback: this.addSecondRoutePoint,
            },
            {
              text: "Delete route points",
              classname: "bold",
              icon: "",
              callback: this.deleteContextPointRoutes,
            },
          ],
        },
        {
          text: "Isochrones",
          icon: "https://cdn.jsdelivr.net/gh/jonataswalker/ol-contextmenu@604befc46d737d814505b5d90fc171932f747043/examples/img/view_list.png",
          items: [
            {
              text: "Generate isochrone",
              icon: "https://cdn.jsdelivr.net/gh/jonataswalker/ol-contextmenu@604befc46d737d814505b5d90fc171932f747043/examples/img/pin_drop.png",
              callback: this.generatePointForIsochronePolygon,
            },
            {
              text: "Delete isochrones",
              classname: "bold",
              icon: "",
              callback: this.deleteIsochronePolygon,
            },
          ],
        },
        "-", // this is a separator
      ],
      endLat: null,
      routeTypes: [
        { text: "Car", value: "driving-car" },
        { text: "Heavy vehicle", value: "driving-hgv" },
        { text: "Cycling regular", value: "cycling-regular" },
        { text: "Cycling road", value: "cycling-road" },
        { text: "Cycling mountain", value: "cycling-mountain" },
        { text: "Cycling eletric", value: "cycling-eletric" },
        { text: "Foot walking", value: "foot-walking" },
        { text: "Foot hiking", value: "foot-hiking" },
        { text: "Wheelchair", value: "wheelchair" },
      ],
      rotation: 0,
      get: this.$store.getters,
      dispatch: this.$store.dispatch,
    };
  },
  computed: {
    RouteDialog() {
      return this.get.dialogRouteSettings;
    },
    RouteLoader() {
      return this.get._ROUTE_LOADER_;
    },
    StatusMsg() {
      const msg = this.get._STATUS_MSG_ === null ? "" : this.get._STATUS_MSG_.msg;
      return msg;
    },
    RouteFetchingMsg() {
      return "Fetching route...";
    },
    ProfileSelected() {
      let profileSelected = "";
      if (this.profileRoute.value === undefined) {
        profileSelected = this.profileRoute;
      } else {
        profileSelected = this.profileRoute.value;
      }
      return profileSelected;
    },
  },
  methods: {
    ...mapActions(["LOAD_ASYNC_DIRECTION_DATA", "LOAD_ASYNC_ISOCHRONE_DATA"]),
    async fetchRouteData() {
      this.get.olMap.removeInteraction(this.get._DRAW_INTERACTION_POINT);
      this.deletePreviousRoute();

      const getRouteDTO = {
        Profile: this.ProfileSelected,
        StartLongitude: this.startLong, //15.710697,
        StartLatitude: this.startLat, //46.183814,
        EndLongitude: this.endLong,
        EndLatitude: this.endLat,
      };
      this.showLoader = true;
      await this.LOAD_ASYNC_DIRECTION_DATA(getRouteDTO);
      if (this.get._STATUS_MSG_.status === "success") {
        const featureCoords = this.generateFeatureCoordinates(this.get._DIRECTION_COORDINATES_);
        const vectorRouteLayer = this.get._VECTOR_ROUTE_LAYER;
        const vectorRouteSource = vectorRouteLayer.getSource();
        const linestring = new Feature(new LineString(featureCoords));
        let extent = linestring.getGeometry().getExtent();
        linestring.getGeometry().transform("EPSG:4326", "EPSG:3857");
        vectorRouteSource.addFeature(linestring);
        this.generateRouteStarEndPoints();
        this.get.olMap.getView().fit(extent, { duration: 1500 });

        this.deletePointRoutes();
        this.showLoader = false;

        const geometryLine = linestring
          .clone()
          .getGeometry()
          .transform("EPSG:3857", "EPSG:4326");
        const geometryCoords = geometryLine.getCoordinates().join(";");
        // save route coordinates to store
        this.dispatch("_SAVE_ROUTE_COORDINATES_", geometryCoords);

        // add vector source to vector layer and show it on map
        this.dispatch("_UpdateSideBarePanel_", true);
        this.dispatch("_SET_ROUTE_LOADER_", false);
      } else {
        this.showLoader = false;
        this.dispatch("_SET_ROUTE_LOADER_", false);

        this.showError = true;
      }

      // enable right click
      this.enableFirstRoutePoint = true;
      this.enableSecondRoutePoint = true;
    },
    async fetchIsochronePolygon(fetchIsochroneDTO) {
      //delete previous
      // this.deleteIsochronePolygon();

      await this.LOAD_ASYNC_ISOCHRONE_DATA(fetchIsochroneDTO);

      const featureCoords = this.generateFeatureCoordinates(this.get._ISOCHRONE_COORDINATES_);
      const vectorRouteLayer = this.get._VECTOR_ISOCHRONE_POLYGON;
      const vectorRouteSource = vectorRouteLayer.getSource();

      const polygon = new Feature(new Polygon(featureCoords));
      polygon.setProperties({
        Range: this.rangeIsochroneTime,
      });

      const textRange = `Maximum range value of analysis in seconds for time (${this.durationRoute(
        this.rangeIsochroneTime
      )}) and  meters for distance (${this.rangeIsochroneDistance} m)`;
      let isochroneFeature = new Style({
        fill: new Fill({
          color: "#5df184ab",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 3,
          lineCap: "square",
        }),
        text: new Text({
          font: "15px Calibri",
          fill: new Fill({ color: "black" }),
          stroke: new Stroke({ color: "white" }),
          text: textRange,
          offsetY: 24,
          overflow: true,
        }),
      });

      let extent = polygon.getGeometry().getExtent();
      polygon.getGeometry().transform("EPSG:4326", "EPSG:3857");
      polygon.setStyle(isochroneFeature);
      vectorRouteSource.addFeature(polygon);
      this.get.olMap.getView().fit(extent, { duration: 1500 });

      this.dispatch("_SET_ROUTE_LOADER_", false);
    },
    durationRoute(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return `Duration: ${minutes} min and ${Math.round(seconds, 0)} sec`;
    },
    closeRouteDialog() {
      this.dispatch("_UpdateDialogRouteSettings_", false);
    },
    createFeatureForIsochrone(coordinate) {
      const isochromeFeature = new Feature({
        geometry: new Point(coordinate),
        name: "End Point",
      });

      const iconIsochromeFeature = new Style({
        image: new Icon({
          anchor: [0.5, 40],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: this.startPoint,
        }),
      });
      isochromeFeature.setStyle(iconIsochromeFeature);
      this.get._VECTOR_ISOCHRONE_POLYGON.getSource().addFeature(isochromeFeature);

      return isochromeFeature;
    },
    generateRouteStarEndPoints() {
      const vectorPointsLayer = this.get._VECTOR_ROUTE_POINTS_LAYER;
      const vectorPointsLayerSource = vectorPointsLayer.getSource();
      // add feature to vectorsource
      const startFeature = new Feature({
        geometry: new Point(this.get._START_POINT_),
        name: "Start Point",
      });
      startFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");

      const iconStartPoint = new Style({
        image: new Icon({
          anchor: [0.5, 40],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: this.startPoint,
        }),
      });
      startFeature.setStyle(iconStartPoint);

      const endFeature = new Feature({
        geometry: new Point(this.get._END_POINT_),
        name: "End Point",
      });
      endFeature.getGeometry().transform("EPSG:4326", "EPSG:3857");
      const iconEndPoint = new Style({
        image: new Icon({
          anchor: [0.5, 26],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: this.endPoint,
        }),
      });
      endFeature.setStyle(iconEndPoint);
      vectorPointsLayerSource.addFeature(startFeature);
      vectorPointsLayerSource.addFeature(endFeature);
    },

    centerMap(map) {
      this.get.olMap.getView().animate({
        duration: 700,
        center: map.coordinate,
      });
    },
    generatePointForIsochronePolygon(obj) {
      const transformedFeature = this.transformingFeatureCoordinates(this.createFeatureForIsochrone(obj.coordinate));

      const fetchIsochroneDTO = {
        range: this.rangeIsochroneTime,
        distance: this.rangeIsochroneDistance,
        pointLongitude: transformedFeature[0], //15.710697,
        pointLatitude: transformedFeature[1], //46.183814,
        isochroneProfile: this.ProfileSelected,
      };

      this.fetchIsochronePolygon(fetchIsochroneDTO);

      // send tranfo
    },
    generatePointForIsochronePolygonDialog() {
      this.get.olMap.getTargetElement().style.cursor = "pointer";
      const singleClickEvent = this.get.olMap.once("singleclick", (evt) => {
        const transformedFeature = this.transformingFeatureCoordinates(this.createFeatureForIsochrone(evt.coordinate));

        const fetchIsochroneDTO = {
          range: this.rangeIsochroneTime,
          distance: this.rangeIsochroneDistance,
          pointLongitude: transformedFeature[0], //15.710697,
          pointLatitude: transformedFeature[1], //46.183814,
          isochroneProfile: this.ProfileSelected,
        };
        this.fetchIsochronePolygon(fetchIsochroneDTO);
      });
    },
    deleteIsochronePolygon() {
      this.get._VECTOR_ISOCHRONE_POLYGON.getSource().clear();
    },
    transformingFeatureCoordinates(feature) {
      return feature
        .clone()
        .getGeometry()
        .transform("EPSG:3857", "EPSG:4326")
        .getCoordinates();
    },
    generateFeatureCoordinates(coords) {
      const featureCoords = [];
      for (let coord of coords) {
        featureCoords.push(coord);
      }

      return featureCoords;
    },
    addFirstRoute() {
      // pohraniti točku na sloj
      this.enableFirstRoutePoint = false;

      this.get.olMap.addInteraction(this.get._DRAW_INTERACTION_POINT_START);
      this.get._DRAW_INTERACTION_POINT_START.on("drawend", (e) => {
        const pointFeature = e.feature;
        const transformedFeature = pointFeature
          .clone()
          .getGeometry()
          .transform("EPSG:3857", "EPSG:4326")
          .getCoordinates();

        this.startLong = transformedFeature[0];
        this.startLat = transformedFeature[1];

        setTimeout(() => {
          this.addEndRouteDisabled = false;
          this.addStartRouteDisabled = true;
          this.get.olMap.removeInteraction(this.get._DRAW_INTERACTION_POINT_START);
        }, 200);
      });
    },
    addSecondRoute() {
      this.get.olMap.addInteraction(this.get._DRAW_INTERACTION_POINT_END);
      this.get._DRAW_INTERACTION_POINT_END.on("drawend", (e) => {
        const pointFeatureEnd = e.feature;
        const transformedFeatureEnd = pointFeatureEnd
          .clone()
          .getGeometry()
          .transform("EPSG:3857", "EPSG:4326")
          .getCoordinates();

        this.endLong = transformedFeatureEnd[0];
        this.endLat = transformedFeatureEnd[1];
        setTimeout(() => {
          this.addEndRouteDisabled = true;
          this.fetchRouteDisabled = false;
          this.get.olMap.removeInteraction(this.get._DRAW_INTERACTION_POINT_END);
        }, 50);
      });
    },
    deletePointRoutes() {
      // izbrisati točke iz sloja
      const vectorSelectPoints = this.get._VECTOR_DRAW_LAYER;
      vectorSelectPoints.getSource().clear();
      this.deleteIsochronePolygon();
      this.addEndRouteDisabled = true;
      this.addStartRouteDisabled = false;
      this.fetchRouteDisabled = true;

      // enablati početnu točku
    },
    deletePreviousRoute() {
      this.dispatch("_DELETE_DIRECTION_WAYPOINTS_", []);

      const vectorRoute = this.get._VECTOR_ROUTE_LAYER;
      const vectorRouteSource = vectorRoute.getSource();
      vectorRouteSource.clear();

      const vectorRoutePoint = this.get._VECTOR_ROUTE_POINTS_LAYER;
      const vectorRoutePointSource = vectorRoutePoint.getSource();
      vectorRoutePointSource.clear();
    },
    addFirstRoutePoint(obj) {
      if (this.enableFirstRoutePoint) {
        this.addEndRouteDisabled = false;
        this.addStartRouteDisabled = true;
        const pointFeature = new Feature(new Point(obj.coordinate));
        // dodati feature na source
        const vectorSource = this.get._VECTOR_DRAW_LAYER.getSource();
        vectorSource.addFeature(pointFeature);
        const transformedFeature = this.transformingFeatureCoordinates(pointFeature);
        this.startLong = transformedFeature[0];
        this.startLat = transformedFeature[1];

        this.enableFirstRoutePoint = false;

        // ako je disablana prva i druga ruta znaci da mozemo dohvatiti rutu
        if (this.enableFirstRoutePoint === false && this.enableSecondRoutePoint === false) {
          this.fetchRouteData();
        }
      }
    },
    addSecondRoutePoint(obj) {
      if (this.enableSecondRoutePoint) {
        const pointFeature = new Feature(new Point(obj.coordinate));
        // dodati feature na source
        const vectorSource = this.get._VECTOR_DRAW_LAYER.getSource();
        vectorSource.addFeature(pointFeature);
        const transformedFeature = this.transformingFeatureCoordinates(pointFeature);
        this.endLong = transformedFeature[0];
        this.endLat = transformedFeature[1];
        this.enableSecondRoutePoint = false;

        if (this.enableFirstRoutePoint === false && this.enableSecondRoutePoint === false) {
          this.fetchRouteData();
        }
      }
    },
    deleteContextPointRoutes() {
      this.enableFirstRoutePoint = true;
      this.enableSecondRoutePoint = true;

      this.get._VECTOR_DRAW_LAYER.getSource().clear();
    },
  },
  mounted() {
    const contextmenu = new mapMenu({
      width: 180,
      items: this.contextmenuItems,
    });
    this.get.olMap.addControl(contextmenu);

    var that = this;
    var highlight;

    contextmenu.on("open", function(evt) {
      var feature = that.get.olMap.forEachFeatureAtPixel(evt.pixel, (ft) => ft);

      if (feature && feature.get("type") === "removable") {
        contextmenu.clear();
        // removeMarkerItem.data = { marker: feature };
        // contextmenu.push(removeMarkerItem);
      } else {
        contextmenu.clear();
        contextmenu.extend(that.contextmenuItems);
        contextmenu.extend(contextmenu.getDefaultItems());
      }
    });
  },
};
</script>
<style scoped>
.v-text-field__slot {
  width: 150px !important;
}
.header-padding {
  padding: 7px !important;
}
</style>
