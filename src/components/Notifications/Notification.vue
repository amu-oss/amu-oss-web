<template>
  <v-card>
    <v-card-title primary-title :style="{ backgroundColor: bgColor, color: titleColor }">
      <div>
        <div class="headline">{{ notification.title || 'Notification Update' }}</div>
      </div>
    </v-card-title>
    <v-card-text>
      <p class="subheading">{{ notification.body }}</p>
      <div class="text-xs-right grey--text text--darken-3">{{ notification.timestamp | formatDate }}</div>
    </v-card-text>
    <v-card-actions v-if="isAdmin" class="grey lighten-3">
      <v-spacer></v-spacer>
      <v-tooltip top>
        <v-btn icon class="red--text" slot="activator" @click.stop="$emit('delete-notification')">
          <v-icon>delete</v-icon>
        </v-btn>
        Delete Notification
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
  import Vuex from 'vuex'
  import moment from 'moment'
  import tinycolor from 'tinycolor2'

  function getColor(notification) {
    return notification.color || '#33b5e5'
  }

  function getTitleColor(notification) {
    return tinycolor(getColor(notification)).isLight() ? '#333' : '#fff';
  }

  export default {
    props: ['notification'],
    computed: {
      bgColor () {
        return getColor(this.notification)
      },
      titleColor () {
        return getTitleColor(this.notification)
      },
      ...Vuex.mapGetters(['isAdmin'])
    },
    filters: {
      formatDate (isoDate) {
        return moment(isoDate).format('MMMM Do YYYY, h:mm:ss A')
      }
    }
  }
</script>
