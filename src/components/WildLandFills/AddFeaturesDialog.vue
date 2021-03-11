   <template>
  <v-dialog v-model="DialogAddFeatures" persistent width="410">
    <v-card>
      <v-card-title primary-title>
        <div>
          <div class="headline">Populate features</div>
          <span class="grey--text">*indicates required field</span>
        </div>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field :rules="namePropertyRules" v-model="nameProperty" required label="Name*"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="descriptionProperty" label="Description"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field :rules="locationPropertyRules" v-model="locationProperty" required label="Location"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select :rules="categoryTypePropertyRules" v-model="categoryTypes" :items="types" required label="Category Types"></v-select>
              </v-flex>
              <v-flex xs12>
                <v-date-picker locale="hr-HR" :rules="datePropertyRules" v-model="dateRecorded" required></v-date-picker>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="SaveProperties">
          <span>Save</span>
          <v-icon right>save</v-icon>
        </v-btn>
        <v-btn color="red darken-1" flat @click="CloseAddFeaturesDialog"><span>Close</span>
          <v-icon right>close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import GeoJSON from "ol/format/GeoJSON";
import { getArea } from "ol/sphere";

export default {
  data() {
    return {
      valid: false,
      get: this.$store.getters,
      dispatch: this.$store.dispatch,
      GEOJSON: new GeoJSON({ featureProjection: "EPSG:3857" }),
      nameProperty: null,
      locationProperty: null,
      descriptionProperty: null,
      categoryTypes: null,
      dateRecorded: null,
      types: [
        "Građevinski materijal",
        "Staklo",
        "Bio - otpad",
        "Ostalo",
        "Plastika",
        "Željezo"
      ],
      namePropertyRules: [v => !!v || "Name is required"],
      locationPropertyRules: [v => !!v || "Location is required"],
      categoryTypePropertyRules: [v => !!v || "Category Type is required"],
      datePropertyRules: [v => !!v || "Date is required"]
    };
  },
  computed: {
    DialogAddFeatures() {
      return this.get.dialogAddFeatures;
    },
    FeatureCounter() {
      return parseInt(this.get._FEATURE_COUNTER);
    }
  },
  methods: {
    SaveProperties() {
      if (this.$refs.form.validate()) {
        let featureCounter = this.FeatureCounter;
        // get source of drawn vector
        let source = this.get._VECTOR_DRAW_LAYER.getSource();
        // get polygon by ID
        let feature = source.getFeatureById(featureCounter);
        // get geo type
        let geometry = feature.getGeometry();
        let areaGeometry = getArea(geometry);

        // set properties to drawn polygon
        feature.setProperties({
          id: this.FeatureCounter,
          Name: this.nameProperty,
          Description: this.descriptionProperty,
          Location: this.locationProperty,
          Category_Type: this.categoryTypes,
          Area: areaGeometry,
          Date: this.dateRecorded
        });

        // save feature with properties to source
        this.get._GEOJSON_CRO_FIELDS.getSource().addFeature(feature);

        // get source
        let sourceVector = this.get._GEOJSON_CRO_FIELDS.getSource();
        // update vector value features to vuex store
        this.dispatch("_UPDATE_VECTOR_LIST", sourceVector.getFeatures());

        // get features with newly added properties
        let featuresWithProperties = this.get._VECTOR_DRAW_LAYER
          .getSource()
          .getFeatures();
        setTimeout(() => {
          this.$refs.form.reset();
          // write properties to geojson format
          if (this.get._VECTOR_DRAW_LAYER.getSource().getState() === "ready") {
            let geojsonVector = this.GEOJSON.writeFeatures(
              featuresWithProperties
            );
            // update geojson format to store
            this.dispatch("_UPDATE_GEOJSON_FORMAT_FEATURE_", geojsonVector);

            // enable vector build options
            this.dispatch("_UPDATE_SHOW_VECTOR_BUILD_OPTIONS_", true);
          }
        }, 20);

        setTimeout(() => {
          this.CleanProperties();
          this.get.olMap.removeInteraction(this.get._DRAW_INTERACTION_POLYGON);
          this.dispatch("_UpdateDialogDraw_", true);
          this.dispatch("_UpdateDialogAddFeatures_", false);
        }, 100);
      }
    },
    CloseAddFeaturesDialog() {
      this.CleanProperties();

      // close dialog
      this.dispatch("_UpdateDialogAddFeatures_", false);
    },
    CleanProperties() {
      this.nameProperty = null;
      this.locationProperty = null;
      this.descriptionProperty = null;
      this.categoryTypes = null;
      this.dateRecorded = null;
    }
  }
};
</script>
<style scoped>
</style>
