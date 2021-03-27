export default {
  data() {
    return {
      buttons: [
        { color: "green", dark: true, icon: "add", clickEvent: this.QueryRoute, title: "Fetch route" },
        { color: "red", dark: true, icon: "delete_forever", clickEvent: this.DeleteFetchedRoutes, title: "Delete route" },
        { color: "white", dark: false, icon: "close", clickEvent: this.CloseDialog, title: "Close" },
      ],
      routeAuthor: "",
      get: this.$store.getters,
      dispatch: this.$store.dispatch,
    };
  },
};
