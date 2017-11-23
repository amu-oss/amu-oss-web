import Vue from 'vue'
import Vuex from 'vuex'

import { database, auth } from 'firebase'
import { firebaseMutations } from 'vuexfire'

import notifications from './modules/notifications'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    notifications
  },
  state: {
    user: null,
    isAdmin: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    clearUser (state) {
      state.user = null;
    },
    setAdmin (state, admin) {
      state.isAdmin = admin;
    },
    ...firebaseMutations
  },
  actions: {
    determineIfAdmin ({ commit }, user) {
      var ref = user ? user.uid : ''
      database().ref('admins/' + ref).once('value')
        .then(snapshot => {
          commit('setAdmin', snapshot.val());
        }).catch(error => {
          commit('setAdmin', false);
        });
    },
    logout: () => auth().signOut()
  },
  getters: {
    isAdmin: state => state.isAdmin,
    user: state => state.user
  }
})