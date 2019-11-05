import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import {
  store
} from './store/store'

import VueResource from 'vue-resource'
import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueGoogleCharts)

Vue.config.productionTip = false

Vue.use(VueResource);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: '/signin',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  }
})

new Vue({
  store: store,
  router,
  render: h => h(App)
}).$mount('#app')