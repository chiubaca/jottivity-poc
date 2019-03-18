<template>
  <div id="app">
    <header> 
       <img alt="pen logo" src="./assets/logo.png">
        <div>
          <h1>Jottivity.</h1>
          <h2>Jot your thoughts, mood &amp; productivity</h2>
           <h3>PWA Build v0.2</h3>
        </div>
    </header>
    <AllBlogs />
  </div>
</template>

<script>
import AllBlogs from './pages/AllBlogs.vue'

export default {
  name: 'app',
  components: {
    AllBlogs
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
