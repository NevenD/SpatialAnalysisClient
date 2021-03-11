<template>
  <v-snackbar
    v-model="AttributionPanel"
    class="black--text"
    color="#f5f5f5"
    auto-height
    bottom
    center
    :timeout="0"
  >
    <v-container>
      <v-layout row>
        <v-text-field id="street" v-html="OPENSTREET"></v-text-field>
      </v-layout>
      <v-layout row>
        <v-text-field id="dof" v-html="DOF"></v-text-field>
      </v-layout>
      <v-layout row>
        <v-text-field id="tk" v-html="TK"></v-text-field>
      </v-layout>
      <v-layout row>
        <v-text-field id="corine" v-html="CORINE"></v-text-field>
      </v-layout>
      <v-layout row>
        <v-text-field id="bing" v-html="BING"></v-text-field>
      </v-layout>
    </v-container>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      OPENSTREET: "© Openstreet Map ",
      timeout: 0,
      get: this.$store.getters,
      dispatch: this.$store.dispatch
    };
  },

  computed: {
    AttributionPanel: {
      get: function() {
        return this.get._ATTRIBUTIONS_PANEL;
      },
      set: function() {
        this.dispatch("_UPDATE_ATTRIBUTIONS_PANEL_", false);
      }
    },
    DOF() {
      return this.get._DOF_ATTRIBUTIONS;
    },
    TK() {
      return this.get._TK_ATTRIBUTIONS;
    },
    CORINE() {
      return this.get._CORINE_ATTRIBUTIONS;
    },
    BING() {
      return this.get._BING_ATTRIBUTIONS;
    }
  },
  methods: {
    MiniMap(event) {
      if (event) {
        this.get.olMap.addControl(this.get.miniMap);
      } else {
        this.get.olMap.removeControl(this.get.miniMap);
      }
    }
  }
};
</script>

