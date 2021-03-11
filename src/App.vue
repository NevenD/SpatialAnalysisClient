<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Navbar, Footer }
};
</script>

<style>
/* removes scrollbar */
html {
  overflow-y: auto;
  overflow-y: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.5s;
}

.fade-enter-active {
  transition-delay: 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
