<template>
<div>
  <button v-on:click="showNewPostModal = !showNewPostModal"> add new post</button>
  <div v-if="showNewPostModal" class="new-post-container">
    <div> 
      <button v-on:click="showNewPostModal=!showNewPostModal"> exit </button>
      <br>
      <textarea cols="30" rows="10"></textarea>
      <br>
      <button>save entry</button>
    </div>   
  </div>
</div>
</template>

<script>
export default {
  name: "AddNewPost",
  data() {
    return {
      showNewPostModal: false
    };
  },
  created() {
    console.log(this.showNewPostModal);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-post-container{
  background-color: #3d3b3b5b;
  position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.new-post-container div {
  background-color: #fff;
  box-shadow: 0px 0px 13px #7d7d7d;
   position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
}
</style>
