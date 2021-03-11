import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios';


Vue.config.productionTip = false

//adding main path to baseurl
axios.defaults.baseURL = "";
// Global settings for Axios
Vue.prototype.$http = axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
