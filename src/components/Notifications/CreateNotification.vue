<template>
  <v-layout row justify-center>
      <v-dialog persistent v-if="isAdmin" v-model="showDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Send Notification</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field label="Title" v-model="notificationItem.title" :rules="titleRules" prepend-icon="title" ></v-text-field>
              <v-text-field label="Notice" v-model="notificationItem.body" :rules="bodyRules" prepend-icon="edit" required multi-line></v-text-field>
              <v-text-field label="Color" v-model="notificationItem.color" :rules="colorRules" prepend-icon="palette"></v-text-field>
              <div :style="{ backgroundColor: color, height: '20px', margin: '0 0 20px 40px' }"></div>
              <v-switch label="Skip Notification" v-model="notificationItem.skip"></v-switch>
            </v-form>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click="$emit('close')">Close</v-btn>
            <v-btn class="blue--text darken-1" flat v-show="valid" @click="send">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
  import _ from 'lodash'
  import Vuex from 'vuex'
  import Snackbar from '../../utils/snackbar'

  function isHexColor(hex){
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
  }

  const notificationItem = {
    title: null,
    body: null,
    color: null,
    skip: false
  }

  export default {
    props: ['showDialog'],
    data() {
      return {
        notificationItem: _.clone(notificationItem),
        valid: false,
        titleRules: [
          (title) => (!!title ? title.length > 3 : true) || 'Title should be more than 3 characters',
        ],
        bodyRules: [
          (body) => !!body || 'Body is Required',
          (body) => (!!body && body.length > 5) || 'Body should be more than 5 characters',
        ],
        colorRules: [
          (color) => (!!color ? isHexColor(color) : true) || 'Color must be a valid hex code'
        ]
      }
    },
    computed: {
      color() {
        return isHexColor(this.notificationItem.color) ? this.notificationItem.color : '#aaa';
      },
      ...Vuex.mapGetters(['isAdmin'])
    },
    methods: {
      send() {
        this.$store.dispatch('createNotification', this.notificationItem)
          .then(response => {
            Snackbar.success('Notification Created');
            this.notificationItem = _.clone(notificationItem);
            this.$emit('close');
          }).catch(error => {
            console.log(error);
            Snackbar.error('Error creating notification');
            this.$emit('close');
          });
      }
    }
  }
</script>

