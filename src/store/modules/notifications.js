import { firebaseAction } from 'vuexfire'

export default {
  state: {
    notifications: [],
    notificationsRef: null
  },
  mutations: {
    // Mutation to set notifications reference
    setNotificationsRef: (state, ref) => {
      state.notificationsRef = ref;
    }
  },
  actions: {
    // Action to bind the reference to array and save reference
    setNotificationsRef: firebaseAction(({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('notifications', ref, callbacks);
      commit('setNotificationsRef', ref);
    }),
    createNotification: ({ state }, notification) => {
      return state.notificationsRef.push(notification);
    },
    deleteNotification: ({ state }, id) => {
      return state.notificationsRef.child(id).remove();
    }
  },
  getters: {
    notifications: state => state.notifications.slice().reverse()
  }
}
