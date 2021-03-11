<template>
  <v-snackbar
    color="#f5f5f5"
    class="black--text"
    v-model="MeasuredPanel"
    auto-height
    multi-line
    top
    center
    :timeout="0"
  >
    <div v-html="MeasuredValues"></div>
    <v-btn color="red" flat @click="CloseElement()">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      timeout: 0,
      get: this.$store.getters,
      dispatch: this.$store.dispatch
    };
  },

  computed: {
    MeasuredPanel() {
      return this.get._MEASURE_PANEL;
    },
    MeasuredValues: function() {
      if (this.get._MEASURE_VALUE === "area") {
        //if returned value is "area" then return measure area
        return this.get._MEASURE_VALUE_AREA;
      } else {
        //else show length measure
        return this.get._MEASURE_VALUE_LENGTH;
      }
    }
  },
  methods: {
    CloseElement() {
      this.dispatch("_UPDATE_MEASURE_PANEL_", false);
    }
  }
};
</script>

