<template>
  <div>        
    <header> 
      <img alt="pen logo" src="@/assets/images/logo.svg">
      <div>
        <h1 id="title">      
          Jottivity.
        </h1>
        <h2>Jot your thoughts, mood &amp; productivity</h2>
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

#title{
  font-size:35px
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
