<template>
  <div class="post" >
    <span>{{postData.date}}</span>
    <h1 v-on:click="showPostContent=true"> {{postData.title}} </h1>

    <div>Mood Score: {{postData.sentiment.score}} </div>
    <div>Mood Comparative: {{postData.sentiment.comparative}} </div>
    
    <div  v-for="(tag ,index) in postData.tags" :key="index" > 
      <h2>{{index}}</h2> 
        <div  v-for="(desc ,index) in tag" :key="index" > 
          {{desc.description}}
        </div>
    </div>

    <PostModal v-bind:modalState="showPostContent" 
               v-bind:postData="postData" 
               v-on:closeModal="closeModal" />
    
  </div>
</template>

<script>
import PostModal from "./PostModal.vue";
export default {
  name: "Post",
  props: ["postData"],
  components: {
    PostModal
  },
  data() {
    return {
      posts: [],
      showPostContent: false
    };
  },
  methods: {
    closeModal() {
      this.showPostContent = false
    }
  },
  computed: {

  },
  created() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  width: 75%;
  margin: 15px;
  padding: 5px;
  border-radius: 10px
}

.post:hover {
  box-shadow: 0px 0px 6px #7d7d7d;
}

</style>
