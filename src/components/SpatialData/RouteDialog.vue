<template>
  <v-dialog hide-overlay v-model="RouteDialog" max-width="290">
    <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div> some text </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
<script>
import LineString from "ol/geom/LineString";
import Feature from "ol/Feature";

export default {
  data() {
    return {
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
  },
};
</script>
<style>
.v-text-field__slot {
  width: 150px !important;
}
</style>
