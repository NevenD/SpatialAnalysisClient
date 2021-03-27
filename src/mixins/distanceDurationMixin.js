export default {
  methods: {
    distanceRoute(val) {
      if (val > 1000) {
        let kilometers = val / 1000;
        return `Route distance: ${Math.round(kilometers, 2)} km`;
      } else {
        return `Route distance: ${val} m`;
      }
    },
    durationRoute(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return `Duration: ${minutes} min and ${Math.round(seconds, 0)} sec`;
    },
  },
};
