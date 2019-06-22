
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
import firebase from 'firebase/app'
import 'firebase/auth'

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
      .then((userCredential) => {
        let userID = userCredential.user.X.O
        alert(`You've logged in! User ID: ${userID}`)
        //redirect to another page once signed in
        this.$router.push({path:'notebooks'})
      },
      (err) => {
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
  width: 50%;
  padding: 15px;
}

button {
  margin-top: 20px;
  padding: 15px;
}

</style>
