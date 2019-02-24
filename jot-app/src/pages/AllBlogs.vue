<template>
  <div>
     <AddNewPost/>
    <div class="all-posts" v-for="(post,index) in posts" :key="index">
      <Post v-bind:post-data="post"> </Post>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import AddNewPost from '../components/AddNewPost.vue'
export default {
  name: "AllBlogs",
  components:{
    Post,
    AddNewPost
  },
  data() {
    return {
      posts: [],
   
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
    fetch("https://micro-blog-495b7.firebaseio.com/users/alexchiu/notebooks/0/posts.json")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        // this.posts = JSON.stringify(myJson)
        for (let i in myJson) {
          // console.log(myJson[i]);
          this.posts.push(myJson[i]);
        }
        // console.log(JSON.stringify(myJson));
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all-posts {

  display: flex;
  flex-direction: column-reverse; /* easily reverse with column-reverse*/
  align-items: center
}


</style>
