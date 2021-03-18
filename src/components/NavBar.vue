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
              <div class="text-xs-center">

<v-tooltip top>
      <v-btn fab light small  slot="activator">
        <v-icon dark>add</v-icon>
      </v-btn>
     <span>Save route</span>
    </v-tooltip>
    <v-tooltip top>
      <v-btn fab light small @click="ZoomToRoute()" slot="activator">
        <v-icon dark>zoom_in</v-icon>
      </v-btn>
     <span>Zoom to route</span>
    </v-tooltip>
      <v-tooltip top>
      <v-btn fab dark color="red" small @click="DeleteRouteAndCloseSidebar()" slot="activator">
        <v-icon dark>delete_forever</v-icon>
      </v-btn>
     <span>Delete route and close sidebar</span>
    </v-tooltip>
  </div>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import _logo from "@/assets/images/navbar.jpg";
import { transformExtent } from "ol/proj";

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

      const vectorRoute = this.get._VECTOR_ROUTE_LAYER;
      const vectorRouteSource = vectorRoute.getSource();
      vectorRouteSource.clear();

      const vectorRoutePoint = this.get._VECTOR_ROUTE_POINTS_LAYER;
      const vectorRoutePointSource = vectorRoutePoint.getSource();
      vectorRoutePointSource.clear();
      setTimeout(() => {
        this.dispatch("_UpdateSideBarePanel_", false);
      }, 500);
    },
    ZoomToRoute() {
      const routeExtent = transformExtent(
        this.get._BBOX_ROUTE_,
        "EPSG:4326",
        "EPSG:3857"
      );
      this.get.olMap.getView().fit(routeExtent, { duration: 1500 });
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
