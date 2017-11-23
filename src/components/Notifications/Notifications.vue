<template>
  <v-container>
    <v-layout row class="mb-3">
      <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
        <v-card class="blue-grey white--text">
          <div class="text-xs-center headline pt-4 pb-4">News Panel</div>
          <v-progress-linear :indeterminate="loading" v-show="loading" color="blue-grey" background-color="blue-grey lighten-3"></v-progress-linear>
        </v-card>
      </v-flex>
    </v-layout>
    <DeleteNotification :selected-to-delete="selectedToDelete" v-on:clear-selected="selectedToDelete = null" />
    <v-layout row>
      <v-flex xs12 sm10 md8 lg6 xl4 offset-sm1 offset-md2 offset-lg3 offset-xl4>
        <v-card v-for="notification in notifications" :key="notification.id" class="mt-3">
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ notification.title || 'Notification Update' }}</div>
            </div>
          </v-card-title>
          <div class="pr-3 pl-3 pb-3">
            <div class="grey--text text--darken-3">{{ notification.timestamp }}</div>
            <br>
            <p>{{ notification.body }}</p>
          </div>
          <v-card-actions v-if="isAdmin">
            <v-spacer></v-spacer>
            <v-btn icon class="red--text"  @click.stop="deleteNotification(notification['.key'])">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vuex from 'vuex'
  import DeleteNotification from './DeleteNotification'

  export default {
    data () {
      return {
        loading: true,
        selectedToDelete: null
      }
    },
    components: {
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
