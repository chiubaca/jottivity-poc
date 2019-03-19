<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
     
      <router-link to="/">Posts</router-link> |
       <router-link to="/about">About</router-link> |
       <router-link to="/login">Login</router-link>
      <header> 
       <img alt="pen logo" src="./assets/logo.svg">
        <div>
          <h1>Jottivity.</h1>
          <h2>Jot your thoughts, mood &amp; productivity</h2>
           <h3>PWA Build v0.2.1 </h3>
        </div>
      </header>
    <!-- <AllBlogs /> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
// import AllBlogs from './pages/AllBlogs.vue'

export default {
  name: 'app',
  components: {
    // AllBlogs
  }
}
</script>

<style>

header{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display:flex;
  align-items: center;

  border-bottom: 5px solid;  
}

header img{
  height:100px;
  padding: 0 10px 0 20px
}

</style>
