
<template>

  <div>
        <div>
          <h1>Login.</h1>
          <input type="text" placeholder="username" v-model="email">
          <input type="text" placeholder="password" v-model="password">
          <button @click="logIn">Login</button>
          <router-link to="/signup">Signup!</router-link>
        </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "Login",
  props: [],
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    logIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log(user)
        alert("You've logged in!")
        //redirect to another page once signed in
         console.log("logged in OK! redirecting you to your posts")
        this.$router.replace('posts')
      },
      (err) => {
        console.log(err.message)
        alert("uh oh, something went wrong. " + err.message )
      })
    }
  },
}
</script>

<style>



</style>
