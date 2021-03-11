<template>
  <v-dialog v-model="DialogSettings" max-width="290">
    <v-card>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Turn on/off map settings</v-list-tile-title>
            <v-list-tile-sub-title>Awesome map settings</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn class="green--text" icon>
              <v-icon>settings</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch @change="ScaleLine" color="green"></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>Enable scale line</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch @change="MiniMap" color="green"></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>Enable MiniMap</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch @change="Attribution" color="green"></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>Show attribution</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch @change="ShowCoordinates" color="green"></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>Show coordinates</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-text-field
              v-model="UpdateRotation"
              color="success"
              label="Rotation number"
              type="number"
              min="0"
              max="360"
              prepend-icon="screen_rotation"
            ></v-text-field>
          </v-list-tile-action>
          <v-list-tile-title></v-list-tile-title>
        </v-list-tile>

        <br>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      rotation: 0,
      get: this.$store.getters,
      dispatch: this.$store.dispatch
    };
  },
  computed: {
    DialogSettings: {
      get: function() {
        return this.get.dialogSettings;
      },
      set: function() {
        this.dispatch("_UpdateDialogSettings_", false);
      }
    },
    UpdateRotation: {
      get: function() {
        return this.get._ROTATION;
      },
      set: function(value) {
        this.dispatch("_UPDATE_ROTATION_", value);
      }
    }
  },
  methods: {
    ScaleLine(event) {
      if (event) {
        this.get.olMap.addControl(this.get._SCALE_LINE);
      } else {
        this.get.olMap.removeControl(this.get._SCALE_LINE);
      }
    },
    MiniMap(event) {
      if (event) {
        this.get.olMap.addControl(this.get.miniMap);
      } else {
        this.get.olMap.removeControl(this.get.miniMap);
      }
    },
    Attribution(event) {
      if (event) {
        this.get.olMap.addControl(this.get._ATTRIBUTION_CONTROL);
        this.dispatch("_UPDATE_ATTRIBUTIONS_PANEL_", true);
      } else {
        this.get.olMap.removeControl(this.get._ATTRIBUTION_CONTROL);
        this.dispatch("_UPDATE_ATTRIBUTIONS_PANEL_", false);
      }
    },
    ShowCoordinates(event) {
      if (event) {
        this.get.olMap.addControl(this.get._MOUSE_POSITION_CONTROL);
      } else {
        this.get.olMap.removeControl(this.get._MOUSE_POSITION_CONTROL);
      }
    }
  }
};
</script>
<style>
.v-text-field__slot {
  width: 150px !important;
}
</style>

