
<template>

  <div>
        <div>
          <h1>Signup!</h1>
          <input type="text" placeholder="Email" v-model="email">
          <input type="text" placeholder="Password" v-model="password">
          <button @click="signUp">Sign Up</button>
           <router-link to="/login">Login</router-link>
        </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "signUp",
  props: [],
  data() {
    return {
      email: "",
      password:""
    }
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(function(user){
        console.log(user)
        alert("your account has been created!")
      },
      function(err){
        console.log(err.message)
        alert("uh oh, something went wrong. " + err.message )
      })
    }
  },
}
</script>

<style>



</style>
