<template>
  <v-app light>
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
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
  import Snackbar from './utils/snackbar'

  export default {
    data () {
      return {
        title: '< AMU OSS />',
        notify: Snackbar.model
      }
    }
  }
</script>
