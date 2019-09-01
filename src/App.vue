<template>
  <div id="app">

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

<style lang="scss">

html {
  color: $primary-dark-font-color;
  background-color: $background-color;
  font-family: $main-font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

//this should ideally go into common.scss but it does'nt work
.dot-box{
  background-image: url("assets/images/dot.png");
}

</style>
