import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import {
  Ripple
} from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  icons: {
    iconfont: 'fa',
  },
  iconfont: 'md',
  directives: {
    Ripple
  }
})