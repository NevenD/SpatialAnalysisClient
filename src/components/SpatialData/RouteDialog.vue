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
            <v-select v-model="profileRoute" item-disabled="customDisabled" prepend-icon="create" single-line :items="routeTypes" hint="Pick route profile" persistent-hint label="Profile type"></v-select>
          </v-flex>
        </v-layout>
        </v-card-text>
            <div class="text-xs-center">
    <v-tooltip top>
      <v-btn fab light small  slot="activator">
        <v-icon dark>add_location</v-icon>
      </v-btn>
     <span>Add first route point</span>
    </v-tooltip>
    <v-tooltip top>
      <v-btn fab light small slot="activator">
        <v-icon dark :disabled="true">pin_drop</v-icon>
      </v-btn>
     <span>Add second route point</span>
    </v-tooltip>
      <v-tooltip top>
      <v-btn fab dark color="red" small slot="activator">
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
import Feature from "ol/Feature";

export default {
  data() {
    return {
      profileRoute: null,
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
    async fetchRouteData() {
      const getRouteDTO = {
        Profile: "driving-car",
        StartLongitude: 15.710697,
        StartLatitude: 46.183814,
        EndLongitude: 15.727079,
        EndLatitude: 46.169287,
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
      // add vector source to vector layer and show it on map
      this.dispatch("_UpdateSideBarePanel_", true);
    },
    addFirstRoute() {
      // pohraniti točku na sloj
      // izvuci koordinate za start lat i long, transformirati
      // enablati zavrsnu tocku
      // disablati pocetnu tocku i pofarbati zeleno
    },
    addSecondRoute() {
      // pohraniti točku na sloj s drugačijim stilom
      // izvuci koordinate za start lat i long,transformirati
      // disablati i pofarbati zeleno
    },
    deletePointRoutes() {
      // izbrisati točke iz sloja
      const vectorSelectPoints = this.get._VECTOR_ROUTE_SELECT_POINTS;
      vectorSelectPoints.getSource().clear();
      // enablati početnu točku
    },
  },
};
</script>
<style>
.v-text-field__slot {
  width: 150px !important;
}
</style>
