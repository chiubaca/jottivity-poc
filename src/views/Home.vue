<template>
  <div class="home">
    <h1>Logged In Home Page</h1>
    <Logout />
  </div>
</template>

<script>
// @ is an alias to /src
import Logout from '@/components/Logout.vue'


export default {
  name: 'home',
  components: {
    Logout
  },
  methods: {
  },

}
</script>
