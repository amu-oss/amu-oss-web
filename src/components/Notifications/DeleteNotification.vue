<template>
  <v-layout row justify-center>
      <v-dialog v-model="showDeleteDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Delete notification</span>
          </v-card-title>
          <v-card-text>
            Are you sure you want to delete the notification?
          </v-card-text>
          <v-card-actions>
            <v-btn class="blue--text" flat @click="$emit('clear-selected')">No</v-btn>
            <v-btn class="red--text" flat @click="deleteNews">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
  import Vuex from 'vuex'
  import Snackbar from '../../utils/snackbar'

  export default {
    props: ['selectedToDelete'],
    computed: {
      showDeleteDialog () {
        return this.selectedToDelete != null;
      }
    },
    methods: {
      deleteNews () {
        this.$store.dispatch('deleteNotification', this.selectedToDelete)
          .then(response => {
            Snackbar.success('Notification Deleted');
          }).catch(error => {
            Snackbar.error('Error deleting notification');
          });
        this.$emit('clear-selected');
      }
    }
  }
</script>

