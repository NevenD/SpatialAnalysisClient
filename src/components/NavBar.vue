<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-side-icon @click="UpdateSidePanel()"></v-toolbar-side-icon>
      <v-toolbar-title class="font-weight-light"> Mapping Wild Landfills
      </v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" light app>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img :src="wildLandFills" />
          </v-avatar>
          <p class="gray--text subheading mt-1">Wild Landfills</p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="gray--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="gray--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import logo from "@/assets/images/navbar.jpg";

export default {
  data() {
    return {
      wildLandFills: logo,
      dispatch: this.$store.dispatch,
      drawer: false,
      links: [
        { icon: "maps", text: "Wild LandFills Map", route: "/" },
        { icon: "code", text: "Features", route: "/features" }
      ]
    };
  },
  methods: {
    UpdateSidePanel() {
      this.drawer = !this.drawer;
      let value = this.drawer;
      this.dispatch("_UpdateSideBarePanel_", value);
    }
  }
};
</script>


