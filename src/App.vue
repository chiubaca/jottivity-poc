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

<style>
html *{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

</style>
