<template>
  <v-layout row justify-center>
    <v-dialog v-model="SaveRouteDialog" persistent max-width="500px">
      <v-card>
      <v-card-title class="headline" primary-title>Save route</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Route author"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-textarea label="Route description" hint="description of route (write some interesting stuff..)" rows="1" auto-grow></v-textarea>
              </v-flex>
                <v-flex xs12 sm6 md6>
                <v-text-field label="Route code"></v-text-field>
              </v-flex>
               <v-flex xs12 sm6 md6>
                <v-text-field label="Route name"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-text>
           <div class="text-xs-right">
      <v-tooltip top>
      <v-btn fab dark small color="green" slot="activator">
        <v-icon dark>add</v-icon>
      </v-btn>
     <span>Save route</span>
    </v-tooltip>
    <v-tooltip top>
      <v-btn fab light small @click="CloseDialog()" slot="activator">
        <v-icon dark>close</v-icon>
      </v-btn>
     <span>Close</span>
    </v-tooltip>
    </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      get: this.$store.getters,
      dispatch: this.$store.dispatch,
    };
  },
  computed: {
    SaveRouteDialog() {
      return this.get.dialogRouteSave;
    },
  },
  methods: {
    CloseDialog() {
      this.dispatch("_UpdateDialogRouteSave", false);
    },
  },
};
</script>
