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
      <v-card class="card-overflow">
      <v-expansion-panel light v-model="expandContent" expand focusable>
            <v-expansion-panel-content>
                <v-icon slot="actions" color="secondary">$vuetify.icons.expand</v-icon>
              <div slot="header">Route waypoints</div>
      <v-card v-for="(waypoint, index) in GenerateWayPoints" :key="index" :hover="true">
          <v-layout>
            <v-flex xs2>
          <v-card-text >{{index +1}}.</v-card-text>
        </v-flex> 
        <v-flex xs10 class="duration-segment-low">
          <v-card-text class="card-text" >{{waypoint.name}}</v-card-text>
          <v-card-text class="card-text grey--text" >{{waypoint.instruction}}</v-card-text>
          <v-card-text class="card-text grey--text ">{{waypoint.distance | distance}}</v-card-text>
          <v-chip style="margin-bottom:10px;" color="secondary" text-color="white">{{waypoint.duration | duration}}</v-chip>
        </v-flex> 
          </v-layout>
          <v-divider></v-divider>
        </v-card >
           </v-expansion-panel-content>
          </v-expansion-panel>
      </v-card>
      <br>
       <v-divider></v-divider>
       <v-card flat class="card-text">
    <v-btn block color="success" dark>Save route<v-icon right>add</v-icon></v-btn>
       </v-card>
 <v-card flat class="card-text">
    <v-btn block color="red" dark @click="DeleteRouteAndCloseSidebar()">  Delete route<v-icon right dark>delete_forever</v-icon></v-btn>
       </v-card>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import _logo from "@/assets/images/navbar.jpg";

export default {
  data() {
    return {
      expandContent: [true],
      logo: _logo,
      dispatch: this.$store.dispatch,
      get: this.$store.getters,
    };
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
    DeleteRouteAndCloseSidebar() {
      this.dispatch("_DELETE_DIRECTION_WAYPOINTS_", []);

      // clear source
      const vectorRoute = this.get._VECTOR_ROUTE;
      const vectorRouteSource = vectorRoute.getSource();
      vectorRouteSource.clear();

      setTimeout(() => {
        this.dispatch("_UpdateSideBarePanel_", false);
      }, 500);
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
      return `Duration: ${minutes}:${Math.round(seconds, 0)} min`;
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

.card-overflow {
  overflow-y: auto;
  max-height: 580px;
}

.card-button {
  padding: 4px;
}
.card-text {
  padding: 4px;
}
.card-text-title {
  border-bottom: 1px solid lightgray;
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
