<template>
  <div>

    <div id="nav">
        <router-link to="/notebooks">Notebooks</router-link> | 
        <router-link to="/posts">Posts</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login">Login</router-link>
    </div>
        
    <header> 
      <img alt="pen logo" src="@/assets/images/logo.svg">
      <div>
        <h1>Jottivity.</h1>
        <h2>Jot your thoughts, mood &amp; productivity</h2>
        <h3>v0.3.2</h3>
      </div>
    </header>

  </div>  
</template>

<script>


export default {
  name: "CustomHeader"
};
</script>


<style scoped>

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
