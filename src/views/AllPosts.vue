<template>
  <div>
    <p>NotebookID: {{this.$route.params.id}}</p>
    <p>UserID: {{this.uid}}</p>
    <Logout/>
    <MoodGraph id="mood-graph"
               :class="fixGraph"
               v-bind:dateRange="dateRange"
               v-bind:sentimentScores="sentimentScores"/>
    <AddNewPost v-on:new-post="handleNewPost" v-bind:tags="tags"></AddNewPost>
    <div class="all-posts">
      <Post v-for="(post,index) in posts" :key="index" v-bind:post-data="post"/>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import AddNewPost from "@/components/AddNewPost.vue";
import Logout from "@/components/Logout.vue";
import MoodGraph from "@/components/MoodGraph.vue";
import {HTTP} from '@/httpCommon'
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AllPosts",
  components: {
    Post,
    AddNewPost,
    Logout,
    MoodGraph
  },
  data() {
    return {
      uid: "",
      posts: [],
      tags: {},
      dateRange:[],
      sentimentScores:[],
      fixGraph:""
    };
  },
  methods: {
    getAllPosts(){
      firebase.auth().currentUser.getIdToken().then((token) => {
        HTTP({
          method:'get',
          url: `users/${this.uid}/notebooks/${this.$route.params.id}.json?auth=${token}`
        })
        .then((notebookObject)=>{
          //Store all posts from db
          for (let i in notebookObject.data.posts) {
            //this merges the notebook ID as another key in the notebookObject
            //then pushes into app state
            this.posts.push(
              Object.assign(notebookObject.data.posts[i], { postID: i })
            );
          }
          //Store all tags from db
          this.tags = notebookObject.data.tags;
          return
        })
        .finally(()=>{
          this.getDateRange()
          this.getSentimentScores()
        })
      })
    },
    getDateRange() {
      this.dateRange = []; 
      let monthsArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug","Sep","Oct","Nov","Dec"]
      this.posts.forEach((post) => {
        let year = new Date(post.date).getYear()
        let month = new Date(post.date).getMonth()
        let day = new Date(post.date).getDate()
        this.dateRange.push(new Date(post.date).toLocaleDateString());
        // this.dateRange.push(new Date(post.date))
      });
    },
     getSentimentScores() {
      this.sentimentScores = [];
       this.posts.forEach((post) => {
        this.sentimentScores.push(post.sentiment.comparative.toPrecision(2));
      });
    },
    handleNewPost(newPost) {
      this.posts.push(newPost);
      this.getDateRange()
      this.getSentimentScores()
    }
  },
  computed: {
    toggleShow() {
      return true;
    },
    
  },
  watch: {},
  created() {
    let vue = this
    //get user id for the session, store in state
    this.uid = localStorage.getItem("UserID");
    localStorage.setItem("NotebookID", this.$route.params.id);
    // console.log(localStorage.getItem("UserID"))
    //get data from db
    this.getAllPosts();
    
    window.addEventListener("scroll", function(event) {
    var top = this.scrollY,
        left =this.scrollX;

    if(top > 340){
      vue.fixGraph = "fix-graph"
    }
    if(top < 340){
      vue.fixGraph = ""
    }

    }, false);

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all-posts {
  display: flex;
  flex-direction: column-reverse; /* easily reverse with column-reverse*/
  align-items: center;
}

#mood-graph{
  background: white
}

.fix-graph{
  position: fixed;
  top: 0px;
  width: 100%;
}
</style>
