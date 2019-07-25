<template>
  <div id="app">
    <CustomHeader/>

    <router-view/>
  </div>
</template>

<script>
import CustomHeader from '@/components/CustomHeader.vue'

export default {
  name: 'app',
  components: {
    CustomHeader
  }
}
</script>

<style lang="scss">

html {
  color: $primary-font-color;
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
