<template>
  <v-layout row justify-center>
    <v-dialog hide-overlay v-model="FetchRouteDialog" persistent max-width="300px">
      <v-card>
      <v-card-title class="headline" primary-title>Fetch route by author</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Route author" v-model="routeAuthor"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-text>
           <div class="text-xs-right">
      <v-tooltip top>
      <v-btn fab dark small color="green" @click.once="QueryRoute()" slot="activator">
        <v-icon dark>add</v-icon>
      </v-btn>
     <span>Fetch route</span>
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      routeAuthor: null,
      get: this.$store.getters,
      dispatch: this.$store.dispatch,
    };
  },
  computed: {
    FetchRouteDialog() {
      return this.get.dialogQuery;
    },
  },
  methods: {
    ...mapActions(["GET_SAVED_ASYNC_DIRECTION_DATA"]),
    CloseDialog() {
      this.dispatch("_UpdateDialogQuery_", false);
      this.ResetSaveRouteValues();
    },
    async QueryRoute() {
      await this.GET_SAVED_ASYNC_DIRECTION_DATA(this.routeAuthor);
      this.saveMessage = this.get._POST_RETURN_MSG_;
      this.showSaveMessage = true;
      setTimeout(() => {
        this.CloseDialog();
      }, 200);
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
