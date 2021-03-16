<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-title class="font-weight-light"> Spatial Data
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="ShowSideBar" light app>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img :src="logo" />
          </v-avatar>
          <p class="gray--text subheading mt-1">Spatial Data</p>
        </v-flex>
      </v-layout>
    <v-card v-for="(waypoint, index) in GenerateWayPoints" :key="index" :hover="true">
      <v-layout>
        <v-flex xs2>
      <v-card-text >{{index +1}}.</v-card-text>
    </v-flex> 
    <v-flex xs10 class="duration-segment-heigh">
      <v-card-text class="card-text" >{{waypoint.instruction}}</v-card-text>
      <v-card-text class="card-text grey--text ">{{waypoint.distance | distance}}</v-card-text>
      <v-card-text class="card-text grey--text"><v-chip color="secondary" text-color="white">{{waypoint.duration | duration}}</v-chip>
</v-card-text>
    </v-flex> 
      </v-layout>
    </v-card>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import _logo from "@/assets/images/navbar.jpg";

export default {
  data() {
    return {
      logo: _logo,
      dispatch: this.$store.dispatch,
      get: this.$store.getters,
      links: [{ icon: "maps", text: "Spatial Data", route: "/" }],
    };
    // dodati computed value koji će prikazivati je li sidebar true ili false
  },
  computed: {
    ShowSideBar: {
      get() {
        return this.get.sideBarPanel;
      },
      set(boolFlagValue) {
        return boolFlagValue;
      },
    },
    GenerateWayPoints() {
      return this.get._DIRECTION_WAYPOINTS_;
    },
  },
  methods: {
    FormatTime(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    },
  },
  filters: {
    distance: (val) => {
      if (val > 1000) {
        let kilometers = val / 1000;
        return `Segment distance: ${Math.round(kilometers, 2)} km`;
      } else {
        return `Segment distance: ${val} m`;
      }
    },
    duration: (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      const finalTime = `${(new Array(3).join("0") + minutes).slice(-2)}:${(
        new Array(3).join("0") + seconds
      ).slice(-2)}`;

      return `Duration: ${minutes}:${Math.round(seconds, 0)}`;
    },
  },
};
</script>

<style scoped>
.list-custom-wrap {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  white-space: normal;
}

.card-text {
  padding: 7px;
}

.duration-segment-low {
  border-left: 3px solid #4caf50;
}
.duration-segment-mid {
  border-left: 3px solid #ffeb3b;
}
.duration-segment-heigh {
  border-left: 3px solid #ff5722;
}
</style>
