<template>
  <v-app light>
    <v-toolbar fixed app>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">{{ title }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-if="!user" :key="'signin'" :to="'/signin'">
          <v-icon left>lock</v-icon>
          Sign In
        </v-btn>
        <v-btn flat v-if="user" :key="'signin'" @click="logout">
          <v-icon left>lock_open</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
        <v-snackbar
          :timeout="notify.timeout"
          :color="notify.color"
          v-model="notify.snackbar"
        >
          {{ notify.text }}
          <v-btn dark flat @click.native="notify.snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Vuex from 'vuex'
  import Snackbar from './utils/snackbar'
  import router from './router'

  export default {
    data () {
      return {
        title: '< AMU OSS />',
        notify: Snackbar.model
      }
    },
    computed: Vuex.mapGetters(['user']),
    methods: {
      logout () {
        this.$store.dispatch('logout');
        router.push('/signin');
      }
    }
  }
</script>
