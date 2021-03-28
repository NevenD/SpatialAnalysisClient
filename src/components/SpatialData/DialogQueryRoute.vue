<template>
  <v-layout row justify-center>
    <v-dialog hide-overlay v-model="FetchRouteDialog" persistent max-width="300px">
      <v-card>
      <v-card-title class="headline" primary-title>Fetch routes by author</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Route author" v-model="routeAuthor"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-text>
        <div class="text-xs-right">
            <v-tooltip top v-for="btn in buttons" :key="btn.title" >
              <v-btn fab :dark="btn.dark" small :color="btn.color" @click.once="btn.clickEvent" slot="activator" >
                <v-icon dark>{{btn.icon}}</v-icon>
              </v-btn>
              <span>{{btn.title}}</span>
            </v-tooltip>
       </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapActions } from "vuex";
import distanceDurationMixin from "../../mixins/distanceDurationMixin";
import fabButtonsMixin from "../../mixins/fabButtonsMixin";

import LineString from "ol/geom/LineString";
import { Icon, Style, Text, Fill, Stroke } from "ol/style";
import Feature from "ol/Feature";
export default {
  data() {
    return {
      routeAuthor: "",
      get: this.$store.getters,
      dispatch: this.$store.dispatch,
    };
  },
  computed: {
    FetchRouteDialog() {
      return this.get.dialogQuery;
    },
  },
  mixins: [distanceDurationMixin, fabButtonsMixin],
  methods: {
    ...mapActions(["GET_SAVED_ASYNC_DIRECTION_DATA"]),
    CloseDialog() {
      this.dispatch("_UpdateDialogQuery_", false);
    },
    generateFeatureCoordinates(coords) {
      const featureCoords = [];
      for (let coord of coords) {
        let polygonPoints = [coord.latitude, coord.longitude];
        featureCoords.push(polygonPoints);
      }
      return featureCoords;
    },
    async QueryRoute() {
      this.dispatch("_SET_ROUTE_LOADER_", true);

      await this.GET_SAVED_ASYNC_DIRECTION_DATA(this.routeAuthor);
      this.saveMessage = this.get._POST_RETURN_MSG_;

      // fetch and parse data
      const fetchedData = this.get._FETCHED_ROUTES_;
      const fetchedSource = this.get._FETCHED_ROUTES.getSource();

      for (const route of fetchedData) {
        const featureCoords = this.generateFeatureCoordinates(route.routeCoordinates);
        const polygon = new Feature(new LineString(featureCoords));

        const textRange = `Route author: ${route.createdBy}
                           Route distance: ${this.distanceRoute(route.tripLength)}
                           Route time: ${this.durationRoute(route.tripDuration)}
                           Route name: ${route.routeName}
                           `;

        let style = new Style({
          stroke: new Stroke({
            color: "red",
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

        polygon.getGeometry().transform("EPSG:4326", "EPSG:3857");
        polygon.setStyle(style);
        fetchedSource.addFeature(polygon);
      }
      let extent = fetchedSource.getExtent();
      if (extent[0] !== Infinity) {
        this.get.olMap.getView().fit(extent, { duration: 1500 });
      }
      this.dispatch("_SET_ROUTE_LOADER_", false);

      this.showSaveMessage = true;
      setTimeout(() => {
        this.CloseDialog();
      }, 200);
    },
    DeleteFetchedRoutes() {
      this.get._FETCHED_ROUTES.getSource().clear();
    },
  },
};
</script>
