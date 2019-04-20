<template>
  <div>
    {{this.$route.params.id}}
    <Logout/>
    <AddNewPost v-bind:tags="tags"></AddNewPost>
    <div class="all-posts" v-for="(post,index) in posts" :key="index">
      <Post v-bind:post-data="post"> </Post>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import AddNewPost from '@/components/AddNewPost.vue'
import Logout from '@/components/Logout.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "AllPosts",
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
      firebase.auth().currentUser.getIdToken().then((token) => {
        const postsURL = `https://micro-blog-495b7.firebaseio.com/users/${this.uid}/notebooks/${this.$route.params.id}.json?auth=${token}`
        //TODO:this needs tidying up
        fetch(postsURL)
        .then(response => {
          return response.json();
        })
        .then(notebookObject => {
          //Store all posts from db
          
          for (let i in notebookObject.posts) {
            //this merges the notebook ID as another key in the notebookObject
            //then pushes into app state
            this.posts.push(Object.assign(notebookObject.posts[i], {"postID": i}));
          }
          //Store all tags from db
          for (let i in notebookObject.tags) {
          this.tags.push(notebookObject.tags[i]);
          }
        });
      });
    },
 
  },
  computed: {
    toggleShow() {
      return true
    }
  },
  created() {
    //get user id for the session, store in state
    this.uid = firebase.auth().currentUser.uid
    //get data from db
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
