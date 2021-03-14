<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-title class="font-weight-light"> Spatial Data
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" light app>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img :src="logo" />
          </v-avatar>
          <p class="gray--text subheading mt-1">Spatial Data</p>
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
import _logo from "@/assets/images/navbar.jpg";

export default {
  data() {
    return {
      logo: _logo,
      dispatch: this.$store.dispatch,
      drawer: true,
      links: [
        { icon: "maps", text: "Spatial Data", route: "/" },
      ]
    };
  },

};
</script>


