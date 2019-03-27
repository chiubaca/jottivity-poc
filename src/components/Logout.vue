<template>
  <button v-on:click="logout"> Log Out </button>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "Logout",
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(()=> {
        this.$router.replace('login')
        console.log("signing out")
      })
    }
  },
};
</script>


<style scoped>
</style>
