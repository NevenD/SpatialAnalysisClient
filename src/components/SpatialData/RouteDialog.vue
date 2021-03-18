<template>
  <v-dialog hide-overlay v-model="RouteDialog" max-width="450">
    <v-card>
           <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Route settings</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon>
              <v-icon>moving</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-card-text>
      <v-layout row>
          <v-flex xs12 sm12 d-flex>
            <v-select v-model="profileRoute" prepend-icon="create" single-line :items="routeTypes" hint="Pick route profile"  ></v-select>
          </v-flex>
        </v-layout>
        </v-card-text>
            <div class="text-xs-center">
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
     <span>Delete route point</span>
    </v-tooltip>
  </div>
  <br>
      </v-card>
  </v-dialog>
</template>
<script>
import LineString from "ol/geom/LineString";
import { Icon, Style } from "ol/style";
import Feature from "ol/Feature";
import { mapActions } from "vuex";
import Point from "ol/geom/Point";
import _startPoint from "@/assets/images/number_1.png";
import _endPoint from "@/assets/images/number_2.png";
export default {
  data() {
    return {
      startPoint: _startPoint,
      endPoint: _endPoint,
      addStartRouteDisabled: false,
      addEndRouteDisabled: true,
      fetchRouteDisabled: true,
      profileRoute: { text: "Car", value: "driving-car" },
      startLong: null,
      startLat: null,
      endLong: null,
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
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      rotation: 0,
      get: this.$store.getters,
      dispatch: this.$store.dispatch,
    };
  },
  computed: {
    RouteDialog: {
      get: function() {
        return this.get.dialogRouteSettings;
      },
      set: function() {
        this.dispatch("_UpdateDialogRouteSettings_", false);
      },
    },
  },
  methods: {
    ...mapActions(["LOAD_ASYNC_DIRECTION_DATA"]),
    async fetchRouteData() {
      this.get.olMap.removeInteraction(this.get._DRAW_INTERACTION_POINT);
      this.deletePreviousRoute();

      let profileSelected = "";
      if (this.profileRoute.value === undefined) {
        profileSelected = this.profileRoute;
      } else {
        profileSelected = this.profileRoute.value;
      }

      const getRouteDTO = {
        Profile: profileSelected,
        StartLongitude: this.startLong, //15.710697,
        StartLatitude: this.startLat, //46.183814,
        EndLongitude: this.endLong,
        EndLatitude: this.endLat,
      };

      await this.LOAD_ASYNC_DIRECTION_DATA(getRouteDTO);

      // fetch coordinates
      const coords = this.get._DIRECTION_COORDINATES_;

      const featureCoords = [];
      for (let coord of coords) {
        featureCoords.push(coord);
      }
      const vectorRouteLayer = this.get._VECTOR_ROUTE_LAYER;
      const vectorRouteSource = vectorRouteLayer.getSource();

      const linestring = new Feature(new LineString(featureCoords));
      let extent = linestring.getGeometry().getExtent();
      linestring.getGeometry().transform("EPSG:4326", "EPSG:3857");
      vectorRouteSource.addFeature(linestring);
      this.generateRouteStarEndPoints();
      this.get.olMap.getView().fit(extent, { duration: 1500 });

      this.deletePointRoutes();

      // add vector source to vector layer and show it on map
      this.dispatch("_UpdateSideBarePanel_", true);
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
    addFirstRoute() {
      // pohraniti točku na sloj
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
          this.get.olMap.removeInteraction(
            this.get._DRAW_INTERACTION_POINT_START
          );
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
          this.get.olMap.removeInteraction(
            this.get._DRAW_INTERACTION_POINT_END
          );
        }, 50);
      });
    },
    deletePointRoutes() {
      // izbrisati točke iz sloja
      const vectorSelectPoints = this.get._VECTOR_DRAW_LAYER;
      vectorSelectPoints.getSource().clear();

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
  },
};
</script>
<style>
.v-text-field__slot {
  width: 150px !important;
}
</style>
