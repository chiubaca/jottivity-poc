<template>

  <div class="medium-text">
    <transition name="slide">
      <nav v-if="show">
        <div class="nav-items">

            <router-link to="/notebooks">
               <div class="icons">
                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="notebookIconTitle">
                  <title id="notebookIconTitle">Notebook</title>
                  <path d="M9 8h5"></path>
                  <path d="M18 3v18H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12z"></path>
                  <path d="M5 19v-1a1 1 0 0 1 1-1h12"></path>
                </svg>
                 <span class="black">Notebooks</span>
              </div>
            </router-link>

            <router-link to="/about"><div class="icons">
                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="stickerIconTitle">
                  <title id="stickerIconTitle">Sticker</title>
                  <path d="M21,3 L21,11 C21,16.5228475 16.5228475,21 11,21 L3,21 L3,3 L21,3 Z"></path>
                  <path d="M9,21 C11.6666667,21 13,19.6666667 13,17 C13,17 13,15.6666667 13,13 L17,13 C19.6666667,13 21,11.6666667 21,9"></path>
                </svg>
                <span class="black">About</span>
              </div>
            </router-link>
            
            <a href="#">
              <div class="icons">
                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="settingsIconTitle">
                  <title id="settingsIconTitle">Settings</title>
                  <path d="M5.03506429,12.7050339 C5.01187484,12.4731696 5,12.2379716 5,12 C5,11.7620284 5.01187484,11.5268304 5.03506429,11.2949661 L3.20577137,9.23205081 L5.20577137,5.76794919 L7.9069713,6.32070904 C8.28729123,6.0461342 8.69629298,5.80882212 9.12862533,5.61412402 L10,3 L14,3 L14.8713747,5.61412402 C15.303707,5.80882212 15.7127088,6.0461342 16.0930287,6.32070904 L18.7942286,5.76794919 L20.7942286,9.23205081 L18.9649357,11.2949661 C18.9881252,11.5268304 19,11.7620284 19,12 C19,12.2379716 18.9881252,12.4731696 18.9649357,12.7050339 L20.7942286,14.7679492 L18.7942286,18.2320508 L16.0930287,17.679291 C15.7127088,17.9538658 15.303707,18.1911779 14.8713747,18.385876 L14,21 L10,21 L9.12862533,18.385876 C8.69629298,18.1911779 8.28729123,17.9538658 7.9069713,17.679291 L5.20577137,18.2320508 L3.20577137,14.7679492 L5.03506429,12.7050339 Z"></path>
                  <circle cx="12" cy="12" r="1"></circle>
                </svg>
                <span class="black">Settings</span>
              </div>
            </a>

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
  background-color: white;
  border-radius: 0px 0px 10px 0px;
}

#hamburger-button:hover{
  background-color: grey;
  border-radius: 0px 0px 10px 0px;
}

// https://codepen.io/YusukeNakaya/pen/mQQPQO
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

.icons svg {
  width: 30px;
  height: 30px;
  stroke: black;
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: white
}

nav {
  background: $background-color;
  box-shadow: 0px 2px 5px 1px #7d7d7d;
  width:250px;
  height:100vh;
  position: fixed;
}

.nav-items {
  display:flex;
  flex-direction: column;
  padding-top:60px;
  border-bottom: 1px solid #d6d6d6;
}

.nav-items:after{
  bottom: 25% 
}

.nav-items a {
  padding: 20px 20px 20px 35px;
  text-decoration:none;

    svg {
      position: relative;
      top: 10px;
      right: 5px;
    }

    span{
      left: 15px;
      position: relative;
    }

}

.nav-items *:hover{
  background-color: #c5c5c5;
}

#bottom-divider{
  border-bottom: 2px solid #f51c40;
  position: absolute;
  top: 50%;
  bottom: 0;
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

.slide-leave-active,
.slide-enter-active {
  transition: .1s;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

</style>
