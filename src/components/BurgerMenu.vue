<template>

  <div>
    <transition name="fade">
      <nav v-if="show"
          :class="show">
        <button @click="show=!show">hide</button>
        <router-link to="/notebooks">Notebooks</router-link> | 
        <router-link to="/about">About</router-link> |
        <Logout/>
      </nav>
    </transition>
    
    <button id="hamburger-button"
            @click="show=!show">🍔
    </button>

  </div>
</template>

<script>
import Logout from "@/components/Logout.vue";
export default {
  name: "BurgerMenu",
  components: {
    Logout,
  },
  data() {
    return {
      show: false
    }
  },
}
</script>

<style scoped>

#hamburger-button{
  position: absolute;
}

nav {
  z-index: 1;
  display: flex;
  flex-direction: column;
  background: black;
  width:25vw;
  height:100vh;
  position: fixed;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
