<template>
  <button id="logout-button" v-on:click="logout"> 
    <router-link to="/login">Log Out </router-link>
  </button>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "Logout",
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(()=> {
        alert("You logged out")
      })
      
    }
  },
};
</script>


<style scoped>
</style>
