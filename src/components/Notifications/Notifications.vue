<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
        <v-card class="cyan white--text">
          <div class="text-xs-center headline pt-4 pb-4">Notification Panel</div>
          <v-progress-linear :indeterminate="loading" v-show="loading" color="cyan" background-color="cyan lighten-3"></v-progress-linear>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-btn color="pink" dark fab v-if="isAdmin" @click="showCreateDialog = true">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <CreateNotification :show-dialog="showCreateDialog" v-on:close="showCreateDialog = false" />
    <DeleteNotification :selected-to-delete="selectedToDelete" v-on:clear-selected="selectedToDelete = null" />
    <v-layout row>
      <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
          v-on:delete-notification="deleteNotification(notification['.key'])"
          class="mt-3"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vuex from 'vuex'
  import Notification from './Notification'
  import CreateNotification from './CreateNotification'
  import DeleteNotification from './DeleteNotification'

  export default {
    data () {
      return {
        loading: true,
        showCreateDialog: false,
        selectedToDelete: null
      }
    },
    components: {
      Notification,
      CreateNotification,
      DeleteNotification
    },
    computed: Vuex.mapGetters(['notifications', 'isAdmin']),
    methods: {
      deleteNotification (key) {
        this.selectedToDelete = key;
      }
    },
    created () {
      this.$store.dispatch('setNotificationsRef', {
        ref: this.$firebase.database().ref('notifications'),
        callbacks: {
          readyCallback: snapshot => {
            this.loading = false;
          },
          cancelCallback: error => {
            this.loading = false;
          }
        }
      })
    }
  }

</script>
