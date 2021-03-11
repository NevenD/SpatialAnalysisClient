<template>
  <v-dialog hide-overlay v-model="DialogMeasure" width="300">
    <v-card>
      <v-card-title>
        <div>
          <h3 class="headline mb-0">Measure vectors</h3>
        </div>
      </v-card-title>

      <v-divider></v-divider>
      <v-subheader>Calculate spherical lengths and areas for vector geometries.</v-subheader>
      <v-btn flat light class="grey--text darken-1" @click="MeasureArea()">
        <span>Measure Area &emsp;</span>
        <v-icon right>border_outer</v-icon>
      </v-btn>
      <v-btn flat class="grey--text darken-1" light @click="MeasureLength()">
        <span>Measure length</span>
        <v-icon right>border_color</v-icon>
      </v-btn>
      <v-divider></v-divider>
      <br>
      <v-btn flat color="red" @click="DeleteMeasuredVectors" light>
        <span>Delete measure</span>
        <v-icon right>delete</v-icon>
      </v-btn>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      measureArea: "area",
      measureLength: "length",
      get: this.$store.getters,
      dispatch: this.$store.dispatch
    };
  },
  computed: {
    DialogMeasure: {
      get: function() {
        return this.get.dialogMeasure;
      },
      set: function() {
        this.dispatch("_UpdateDialogMeasure_", false);
      }
    }
  },
  methods: {
    MeasureArea() {
      // enable measure options flag to enable clicking on vector layers
      this.dispatch("_UPDATE_MEASURE_OPTIONS_ACTIVE_", false);
      // remove draw area interaction and clear vectors
      this.get._MEASURE_VECTOR.getSource().clear();
      this.get.olMap.removeInteraction(this.get._DRAW_MEASURE_LENGTH);
      this.dispatch("_UPDATE_MEASURE_VALUE_", this.measureArea);
      // call measure value snackbar
      this.dispatch("_UPDATE_MEASURE_PANEL_", true);

      // add interaction for measure area
      setTimeout(() => {
        this.get.olMap.addInteraction(this.get._DRAW_MEASURE_AREA);
      }, 50);

      // close modal dialog
      setTimeout(() => {
        this.dispatch("_UpdateDialogMeasure_", false);
      }, 200);
    },
    MeasureLength() {
      // enable measure options flag to enable clicking on vector layers
      this.dispatch("_UPDATE_MEASURE_OPTIONS_ACTIVE_", false);
      // remove draw area interaction and clear vectors
      this.get._MEASURE_VECTOR.getSource().clear();
      this.get.olMap.removeInteraction(this.get._DRAW_MEASURE_AREA);
      this.dispatch("_UPDATE_MEASURE_VALUE_", this.measureLength);
      // call measure value snackbar
      this.dispatch("_UPDATE_MEASURE_PANEL_", true);

      // add interaction for measure length
      setTimeout(() => {
        this.get.olMap.addInteraction(this.get._DRAW_MEASURE_LENGTH);
      }, 50);

      // close modal measure dialog
      setTimeout(() => {
        this.dispatch("_UpdateDialogMeasure_", false);
      }, 200);
    },
    DeleteMeasuredVectors() {
      // delete vuex measure values and remove draw interaction
      this.dispatch("_UPDATE_MEASURE_VALUE_AREA_", "");
      this.dispatch("_UPDATE_MEASURE_VALUE_LENGTH_", "");

      // reset measure options flag to enable clicking on vector layers
      this.dispatch("_UPDATE_MEASURE_OPTIONS_ACTIVE_", true);

      this.dispatch("_UPDATE_MEASURE_VALUE_AREA_", "");
      this.get.olMap.removeInteraction(this.get._DRAW_MEASURE_LENGTH);
      this.get.olMap.removeInteraction(this.get._DRAW_MEASURE_AREA);
      // delete measured vectors
      this.get._MEASURE_VECTOR.getSource().clear();
      // close snackbar  dialog on delete
      this.dispatch("_UPDATE_MEASURE_PANEL_", false);
    }
  }
};
</script>
