<template>
  <div id="app">
    <div id="nav">
      <router-link to="/notebooks">Notebooks</router-link> | 
      <router-link to="/posts">Posts</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link>
      <header> 
        <img alt="pen logo" src="./assets/logo.svg">
          
        <div>
          <h1>Jottivity.</h1>
          <h2>Jot your thoughts, mood &amp; productivity</h2>
          <h3>PWA Build v0.2.4 </h3>
        </div>
      </header>

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
html *{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

header{
  display:flex;
  align-items: center;
  border-bottom: 5px solid;  
}

header img{
  height:100px;
  padding: 0 10px 0 20px
}

</style>
