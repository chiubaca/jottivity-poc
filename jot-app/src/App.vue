<template>
  <div id="app">
    <img alt="pen logo" src="./assets/logo.png">

    <AllBlogs />
  </div>
</template>

<script>
import AllBlogs from './components/AllBlogs.vue'

export default {
  name: 'app',
  components: {
    AllBlogs
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
