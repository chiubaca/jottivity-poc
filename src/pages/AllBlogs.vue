<template>
  <div>
    <Logout/>
    <AddNewPost v-bind:tags="tags"></AddNewPost>
    <div class="all-posts" v-for="(post,index) in posts" :key="index">
      <Post v-bind:post-data="post"> </Post>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import AddNewPost from '../components/AddNewPost.vue'
import Logout from '@/components/Logout.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "AllBlogs",
  components:{
    Post,
    AddNewPost,
    Logout
  },
  data() {
    return {
      uid:"",
      posts: [],
      tags: []
    };
  },
  methods: {
    getData() {
      const uid = firebase.auth().currentUser.uid;
      
      firebase.auth().currentUser.getIdToken().then((token) => {
         const postsURL = `https://micro-blog-495b7.firebaseio.com/users/${uid}/notebooks/0.json`+ `?auth=${token}`

        fetch(postsURL)
        .then(response => {
          return response.json();
        }).then(myJson => {
        //Store all posts from db
          for (let i in myJson.posts) {
            this.posts.push(myJson.posts[i]);
          }
          //Store all tags from db
          for (let i in myJson.tags) {
          this.tags.push(myJson.tags[i]);
          }
          // console.log(JSON.stringify(myJson));
        });
      })
     
    },
 
  },
  computed: {
    toggleShow() {
      return true
    }
  },
  beforeCreate() {
    //get uid for the session
    this.uid = firebase.auth().currentUser.uid

  },
  created() {
    this.getData()

  },
  

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
