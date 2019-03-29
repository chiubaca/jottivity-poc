
<template>
  <div>
        <div class="login">
          <h3>Hey!</h3>
          <input type="text" placeholder="username" v-model="email"><br/>
          <input type="password" placeholder="password" v-model="password"><br/>
          <button @click="logIn">Login</button>
          <p>Dont have an account? <router-link to="/signup">Signup!</router-link></p>
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

<style scoped>

.login {
    margin-top: 40px;
    text-align: center
  }

input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}

button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
}

</style>
