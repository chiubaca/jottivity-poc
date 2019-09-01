<template>
  <div class="post dot-box" >
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
<style lang="scss" scoped>
// @import "src/assets/scss/variables.scss";
// @import "src/assets/scss/common.scss";

.post {
  width: 75%;
  margin: 15px;
  padding: 5px;
}

.post:hover {
  box-shadow: 0px 0px 0px white;
}

</style>
