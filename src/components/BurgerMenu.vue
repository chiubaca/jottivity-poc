<template>

  <div>
    <transition name="fade">
      <nav v-if="show">
        <div class="nav-items">
            <router-link to="/notebooks">📒 Notebooks</router-link>
            <router-link to="/about">📋 About</router-link>
        </div>

        <Logout/>

        <span class="version-num">🔧 Version 0.4.0 </span>

      </nav>
    </transition>
    
    <input type="checkbox" id="show-nav">
    <label for="show-nav">
      <div id="hamburger-button"
            @click="show=!show">
              <svg width="40" height="40" viewBox="0 0 100 100" 
                   xmlns="http://www.w3.org/2000/svg"
                   preserveAspectRatio="none">
                <path class="line line_1" d="M0 40h62c13 0 6 28-4 18L35 35"></path>
                <path class="line line_2" d="M0 50h70"></path>
                <path class="line line_3" d="M0 60h62c13 0 6-28-4-18L35 65"></path>
              </svg>
      </div>
    </label>
    

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

<style lang="scss" scoped>

input[type=checkbox]  {
    display:none;
}

#hamburger-button{
  position: fixed;
  width: 40px;
  height:40px;
}

#hamburger-button:hover{
  background-color: white;
  border-radius: 0px 0px 10px 0px;
}

#hamburger-button {
  background-color: white;
  border-radius: 0px 0px 10px 0px;
}

.line {
  fill: none;
  stroke:black;
  stroke-width: 3px;
  transition: 500ms ease-out;
  
  &_1 {
    stroke-dasharray: 21 100;
    stroke-dashoffset: 82;
    transition: 500ms ease-out;
    
    
    input[type=checkbox]:checked + label & {
      stroke-dashoffset: 26;
    }
  }
  
  &_2 {
    stroke-dasharray: 21 100;
    stroke-dashoffset: 82;
    transition: 500ms ease-out;
    // display: none;
    
      input[type=checkbox]:checked + label & {
      stroke-dashoffset: 25;
    }
  }
  
  &_3 {
    stroke-dasharray: 21 100;
    stroke-dashoffset: 82;
    transition: 500ms ease-out;
    // display: none;
    
      input[type=checkbox]:checked + label & {
      stroke-dashoffset: 26;
    }
  }
}

nav {
  margin:0px;
  padding:0px;
  border:0px;
  background: grey;
  width:270px;
  height:100vh;
  position: fixed;
}

.nav-items{
  display:flex;
  flex-direction: column;
  padding-top:60px;
  margin-left:25px;
}

#logout-button{
position:absolute;
  bottom:0;
  right:0
}

.version-num{
  position:absolute;
  bottom:0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
