<template>
  <v-container>
    <v-layout row v-if="user">
      <v-flex xs12 sm8 lg6 xl4 offset-sm2 offset-lg3 offset-xl4 class="text-xs-center">
        <v-card>
            <div class="display-1 text-xs-center pt-3">You are already logged in!</div>
            <v-btn error large @click="logout" class="ma-3">Logout</v-btn>
          </v-card>
      </v-flex>
    </v-layout>
    <v-layout row v-show="!user">
      <v-flex xs12 sm8 lg6 xl4 offset-sm2 offset-lg3 offset-xl4>
        <v-card>
            <div class="display-1 text-xs-center pt-3">Sign In or Register</div>
            <div id="firebaseui-auth-container" class="pt-3 pb-3"></div>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style src="firebaseui/dist/firebaseui.css"></style>

<script>
  import firebase from 'firebase'
  import Vuex from 'vuex'

  export default {
    name: 'auth',
    computed: Vuex.mapState(['user']),
    methods: {
      logout () {
        this.$store.dispatch('logout')
      }
    },
    mounted () {
      var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ]
      }
      this.$authUI.start('#firebaseui-auth-container', uiConfig)
    }
  }
</script>
