export default {
  data() {
    return {
      mapButtons: [
        { color: "red", show: true, dark: true, icon: "add", clickEvent: this.zoomIn, class: "mt-5", title: "Zoom in" },
        { color: "red", show: true, dark: true, icon: "remove", clickEvent: this.zoomOut, class: "mt-6", title: "Zoom out" },
        { color: "", show: true, dark: false, icon: "timeline", clickEvent: this.routeDialog, class: "mt-10", title: "Route settings" },
      ],
      speedButtons: [
        { color: "red", icon: "layers", clickEvent: this.layerDialog, title: "Select layers" },
        { color: "red", icon: "timeline", clickEvent: this.measureDialog, title: "Measure area/length" },
        { color: "red", icon: "download", clickEvent: this.queryDialog, title: "Fetch saved route" },
        { color: "red", icon: "settings", clickEvent: this.settingsDialog, title: "Map settings" },
      ],
      get: this.$store.getters,
      dispatch: this.$store.dispatch,
    };
  },
};
