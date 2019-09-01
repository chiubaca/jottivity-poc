<template>
  <div>        
    <header> 
      <div class="logo">
    
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="penIconTitle">
          <title id="penIconTitle">Pen</title>
          <path d="M14 17.584C15.7659 16.8124 17 15.0503 17 13C17 9 12 3 12 3C12 3 7 9 7 13C7 15.0503 8.2341 16.8124 10 17.584V21H14V17.584Z"></path>
          <path d="M12 3V11"></path>
          <circle cx="12" cy="12" r="1"></circle>
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
    width: 65px;
    height: 65px;
    stroke: $primary-dark-font-color;
    stroke-width: 0.9;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: white;
    transform: rotate(180deg);
    margin: -10px;
}

.logo svg:hover{
  fill:silver;
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
