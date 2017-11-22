// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import * as firebase from 'firebase'
import firebaseui from 'firebaseui'

import App from './App'
import router from './router'
import { store } from './store'
import { config } from './config'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$firebase = firebase.initializeApp(config.firebase)
Vue.prototype.$auth = firebase.auth()
Vue.prototype.$authUI = new firebaseui.auth.AuthUI(Vue.prototype.$auth)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('determineIfAdmin', user);
      if (user) {
        this.$store.commit('setUser', user);
      } else {
        this.$store.commit('clearUser');
      }
    });
  }
})
