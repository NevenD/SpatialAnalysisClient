import Vue from 'vue'
import Router from 'vue-router'
import Map from './views/Map.vue'
import Features from './views/Features.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'map',
      component: Map,
      meta: { keepAlive: true }
    },
    {
      path: '/features',
      name: 'features',
      component: Features
    },

  ]
})
