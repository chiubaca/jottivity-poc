
<template>

  <div>
        <div class="signup">
          <h3>Signup!</h3>
          <input type="text" placeholder="Email" v-model="email"><br/>
          <input type="password" placeholder="Password" v-model="password"><br/>
          <button @click="signUp">Sign Up</button><br/>
          <router-link to="/login">Login</router-link>
        </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

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

.signup {
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
  margin-bottom: 15px;
}

</style>
