import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import transitions from 'vuetify/es5/components/transitions'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    error: '#f83e70'
  },
  transitions,
  directives: {
    Ripple
  }
})
