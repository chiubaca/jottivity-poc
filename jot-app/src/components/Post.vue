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
 .post{
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

 }

 .post{
   box-shadow: 0px 0px 13px #7d7d7d;
   width:75%;
   margin:15px;
   padding:5px
   
}
</style>
