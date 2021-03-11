   <template>
  <v-dialog hide-overlay v-model="DialogDraw" persistent width="550px">

    <v-card>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-light">Draw polygons for wild landfills</v-list-tile-title>
            <v-list-tile-sub-title>Select a geometry type from below to start drawing.<small> (point entity is disable)</small></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn class="green--text" icon>
              <v-icon>edit</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout row>
          <v-flex xs12 sm12 d-flex>
            <v-select v-model="DrawGeometryValue" item-disabled="customDisabled" prepend-icon="create" single-line :items="geometryTypes" hint="Pick geometry type" persistent-hint label="Geometry type"></v-select>
          </v-flex>
        </v-layout>
        <br />
        <v-layout row wrap>
          <v-flex>
            <v-btn color="green darken-1" flat @click="AddVectors()">
              <span>Draw LandFill</span>
              <v-icon right>add</v-icon>
            </v-btn>
          </v-flex>
          <v-flex offset-xs2>
            <v-btn color="red darken-1" flat :disabled="enableRemoveInteraction" @click="RemoveInteraction()">
              <span>Remove interaction</span>
              <v-icon right>remove</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex>
            <v-btn color="red darken-1" flat @click="RemoveVectorValues()">
              <span>Delete Vectors</span>
              <v-icon right>delete_forever</v-icon>
            </v-btn>
          </v-flex>
          <v-flex offset-xs3 align-end>
            <v-btn color="red darken-1" flat @click="DialogDraw = false">
              <span>Close dialog</span>
              <v-icon right>close</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script>
import GeoJSON from "ol/format/GeoJSON";
export default {
  data() {
    return {
      geometryTypes: [
        { text: "Point", value: "Point", customDisabled: true },
        "Polygon"
      ],
      enableRemoveInteraction: true,
      GEOJSON: new GeoJSON({ featureProjection: "EPSG:3857" }),
      GEOJSON_VECTOR: null,
      VECTOR_SOURCE: null,
      VECTOR_LAYER: null,
      DRAW_AREA: null,
      DrawGeometryValue: null,
      get: this.$store.getters,
      dispatch: this.$store.dispatch
    };
  },
  methods: {
    AddVectors() {
      var that = this;
      // function for drawing interaction
      if (this.DrawGeometryValue === "Polygon") {
        // hide dialog draw
        this.dispatch("_UpdateDialogDraw_", false);

        // remove point,circle and linestring interaction
        this.get.olMap.removeInteraction(this.get._DRAW_POINT);
        setTimeout(() => {
          that.enableRemoveInteraction = false;
          this.get.olMap.addInteraction(this.get._DRAW_INTERACTION_POLYGON);

          this.get.olMap.addInteraction(this.get._SNAP_VECTOR_DRAW);

          // on end drawing we can add feature and set up properties
          this.get._VECTOR_DRAW_LAYER.getSource().on("addfeature", function(e) {
            let feature = e.feature;
            let counter = that.FeatureDrawCounter;

            // incrementing id of added objects by 1
            feature.setId(counter);
            setTimeout(() => {
              that.dispatch("_UpdateDialogAddFeatures_", true);
            }, 20);
          });
        });

        this.get._DRAW_INTERACTION_POLYGON.on("drawend", function() {
          let counter = that.FeatureDrawCounter;
          that.dispatch("_UPDATE_FEATURE_COUNTER_", counter + 1);
        });
        // DrawInteraction(this.get._DRAW_AREA);
        // enable modify and snap
        this.dispatch("_UPDATE_DRAW_OPTIONS_", false);
      }
    },
    RemoveInteraction() {
      this.get.olMap.removeInteraction(this.get._DRAW_INTERACTION_POLYGON);
      this.get.olMap.addInteraction(this.get._SNAP_VECTOR_DRAW);

      setTimeout(() => {
        this.enableRemoveInteraction = true;
      }, 100);
    },
    RemoveVectorValues() {
      // disable vector build options
      this.dispatch("_UPDATE_SHOW_VECTOR_BUILD_OPTIONS_", false);
      // implement remove

      this.get._VECTOR_DRAW_LAYER.getSource().clear();
      // https://stackoverflow.com/questions/46234138/openlayers-3-deleting-features
      //  removes drawinteraction
      this.get.olMap.removeInteraction(this.get._DRAW_INTERACTION_POLYGON);
    }
  },
  computed: {
    DialogDraw: {
      get: function() {
        return this.get.dialogDraw;
      },
      set: function() {
        // update
        this.dispatch("_UpdateDialogDraw_", false);
      }
    },
    FeatureDrawCounter() {
      return parseInt(this.get._FEATURE_COUNTER);
    },
    ShowVectorBuildOptions() {
      return this.get._SHOW_VECTOR_BUILD_OPTIONS;
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
