<template>
<div>
   <v-snackbar
      v-model="showSaveMessage" color="success"
      style="color: #fff"
      :top="true"
      :multi-line="true"
      :timeout="5600"
    >
     {{ StatusMsgSuccess }}
         <v-btn fab dark small @click="showSaveMessage = false" >
        <v-icon >close</v-icon>
        </v-btn>
    </v-snackbar>
  <v-layout row justify-center>
    <v-dialog hide-overlay v-model="SaveRouteDialog" persistent max-width="500px">
      <v-card>
      <v-card-title class="headline" primary-title>Save route</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Route author" v-model="author"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-textarea label="Route description" v-model="description" hint="description of route (write some interesting stuff..)" rows="1" auto-grow></v-textarea>
              </v-flex>
                <v-flex xs12 sm6 md6>
                <v-text-field label="Route code" v-model="code"></v-text-field>
              </v-flex>
               <v-flex xs12 sm6 md6>
                <v-text-field label="Route name" v-model="routeName"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-text>
           <div class="text-xs-right">
      <v-tooltip top>
      <v-btn fab dark small color="green" @click.once="SaveRoute()" slot="activator">
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
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      author: null,
      showSaveMessage: false,
      saveMessage: null,
      code: null,
      routeName: null,
      description: null,
      get: this.$store.getters,
      dispatch: this.$store.dispatch,
    };
  },
  computed: {
    SaveRouteDialog() {
      return this.get.dialogRouteSave;
    },
    StatusMsgSuccess() {
      const msg = this.get._POST_RETURN_MSG_ === null ? "" : this.get._POST_RETURN_MSG_;
      return msg;
    },
  },
  methods: {
    ...mapActions(["SAVE_ASYNC_DIRECTION_DATA"]),
    CloseDialog() {
      this.dispatch("_UpdateDialogRouteSave", false);
      this.ResetSaveRouteValues();
    },
    async SaveRoute() {
      if (this.get._SAVE_ROUTE_COORDINATES_ !== null) {
        this.dispatch("_SET_ROUTE_LOADER_", true);
        const codeRoute = this.code === null ? "" : this.code.toUpperCase();
        const routeCreationDTO = {
          CreatedBy: this.author,
          Coordinates: this.get._SAVE_ROUTE_COORDINATES_,
          Code: codeRoute,
          RouteName: this.routeName,
          Description: this.description,
          TripDuration: this.get._SUMMARY_ROUTE_.duration,
          Length: this.get._SUMMARY_ROUTE_.distance,
        };

        await this.SAVE_ASYNC_DIRECTION_DATA(routeCreationDTO);

        this.saveMessage = this.get._POST_RETURN_MSG_;

        this.showSaveMessage = true;
        this.dispatch("_SET_ROUTE_LOADER_", false);
        setTimeout(() => {
          this.CloseDialog();
        }, 200);
      }
    },
    ResetSaveRouteValues() {
      this.author = null;
      this.routeName = null;
      this.description = null;
      this.code = null;
      this.saveMessage = null;
    },
  },
};
</script>
