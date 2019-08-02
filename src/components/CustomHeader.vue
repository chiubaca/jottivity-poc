<template>
  <div>        
    <header> 
      <div class="logo">
        
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="featherIconTitle">
          <title id="featherIconTitle">Feather</title>
          <path d="M5.12634 17C5.04271 17.6571 5 18.325 5 19V21M5.12634 17C6.03384 9.86861 11.7594 4 20 4L19 8H16L17 10L15 12H11L13 14L12 16H8L5.12634 17Z"></path>
        </svg>

      </div>

      <div>

        <h1 id="title">      
          Jottivity.
        </h1>

        <h2 id="sub-title">
          Jot your thoughts,<br/>  
          mood &amp; productivity
        </h2>
      
      </div>
    </header>
  </div>  
</template>

<script>
export default {
  name: "CustomHeader"
};
</script>

<style lang="scss" scoped>
.logo svg {
    width: 90px;
    height: 90px;
    stroke: $primary-font-color;
    stroke-width: 0.9;
    stroke-linecap: round;
    stroke-linejoin: round;
    // fill: yellow
}

#title{
  font-size:35px
}

#sub-title {
  font-size:11px;
  text-align: center;
  letter-spacing: 1.5px;
}

header{
  display:flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid;
  padding: 10px 0px 10px 0px;  
}

img{
  height:60px;
  padding: 0 10px 0 20px
}

header div{
  display: flex;
  flex-direction: column;
  align-self: center;
}




</style>
