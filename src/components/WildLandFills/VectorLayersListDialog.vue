<template>
  <v-dialog v-model="DialogVectorList" hide-overlay max-width="450">
    <v-layout>
      <v-flex>
        <v-card style="height: 500px;">
          <v-img :src="urlImg" height="200px"></v-img>
          <v-card-title primary-title>
            <div>
              <h2 class="font-weight-light">Registered Wild LandFills</h2>
            </div>
          </v-card-title>
          <v-list three-line>
            <template v-for="(feature, index) in VECTOR_LIST">
              <v-list-tile :key="index" avatar @click="onFeatureExtent(feature)">
                <v-list-tile-avatar>
                  <img :src="urlImg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{feature.get("Name")}}</v-list-tile-title>
                  <v-list-tile-sub-title>Location: {{feature.get("Location")}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>Date registered: {{feature.get("Date")}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="index + 'divider'" inset></v-divider>
              <br :key="index + 'br'">
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
import header_img from "@/assets/images/field_header.jpg";

export default {
  data() {
    return {
      urlImg: header_img,
      get: this.$store.getters,
      dispatch: this.$store.dispatch
    };
  },
  methods: {
    onFeatureExtent(feature) {
      var extent = feature.getGeometry().getExtent();
      this.get.olMap.getView().fit(extent);
    }
  },
  computed: {
    DialogVectorList: {
      get: function() {
        return this.get.dialogVectorList;
      },
      set: function() {
        this.dispatch("_UpdateDialogVectorList_", false);
      }
    },
    VECTOR_LIST() {
      return this.get._VECTOR_LIST;
    }
  },
  filters: {
    areaDecimal(val) {
      return val.toFixed(2);
    }
  }
};
</script>

