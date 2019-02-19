<template>

  <div class="post" v-on:click="showPostContent=!showPostContent">
   <span>{{postData.date}}</span>
      <h1 >{{postData.title}}  </h1>
      <p>Mood: {{postData.mood}}  </p>
      <p>Productivity: {{postData.productivity}}</p>
      
      <PostModal v-bind:modalState="showPostContent" >  
        <div slot="post-contents" > {{postData.contents}}</div>
      </PostModal>

  </div>

</template>

<script>
import PostModal from './PostModal.vue'
export default {
  name: "Post",
  props:["postData"],
  components:{
    PostModal
  },
  data() {
    return {
      posts: [],
      showPostContent: false
    };
  },
  methods: {
    toggleModal() {
      
    },
  },
  computed: {
    toggleShow() {

      return true
    }
  },
  created() {
    console.log("hello from post component")
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
