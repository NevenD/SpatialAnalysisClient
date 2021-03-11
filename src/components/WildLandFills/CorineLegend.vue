   <template>
  <v-dialog hide-overlay v-model="DialogLegend" scrollable max-width="350px">
    <v-card>
      <v-card-title>Legend</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <img :src="legend.corine">
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      legend: {
        corine:
          "http://servisi.azo.hr/tlo/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=clc2018"
      },
      get: this.$store.getters,
      dispatch: this.$store.dispatch
    };
  },
  computed: {
    DialogLegend: {
      get: function() {
        return this.get.dialogLegend;
      },
      set: function() {
        this.dispatch("_UpdateDialogLegend_", false);
      }
    }
  }
};
</script>
