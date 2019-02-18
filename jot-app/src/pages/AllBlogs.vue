<template>
  <div>
    <div class="all-posts" v-for="(post,index) in posts" :key="index">
      <Post v-bind:post-data="post"> </Post>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
export default {
  name: "AllBlogs",
  components:{
    Post
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
    fetch("https://micro-blog-495b7.firebaseio.com/users/alexchiu.json")
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column; /* easily reverse with column-reverse*/
  align-items: center
}

.all-posts div{
   box-shadow: 0px 0px 13px #7d7d7d;
   width:500px;
   margin:15px;
   padding:5px
   
}
</style>
