<template>
  <div id="posts-view-container">
    <BurgerMenu/>
    <CustomHeader/>
    <MoodGraph class="mood-graph dot-box"
               :class="fixGraph"
               :allPosts="posts"/>
    <!-- Im not happy with this hacky fix, Witout it, the posts element shift
         straight up when the graph element becomes fixed, need a better way solve this -->
    <div v-if="fixGraph === 'fix-graph'" id="hack"> you should never see this...</div>

    <AddNewPost v-on:new-post="handleNewPost" 
                v-bind:tags="tags"
                id="add-new-post-btn">
    </AddNewPost>

    <div class="all-posts">
      <Post v-for="(post,index) in posts" :key="index" v-bind:post-data="post"/>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/CustomHeader.vue'
import BurgerMenu from "@/components/BurgerMenu.vue";
import Post from "@/components/Post.vue";
import AddNewPost from "@/components/AddNewPost.vue";
import MoodGraph from "@/components/MoodGraph.vue";
import {HTTP} from '@/httpCommon'
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AllPosts",
  components: {
    Post,
    AddNewPost,
    MoodGraph,
    BurgerMenu,
    CustomHeader
  },
  data() {
    return {
      uid: "",
      posts: [],
      tags: {},
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
        })
      })
    },
    handleNewPost(newPost) {
      this.posts.push(newPost);
    }
  },
  computed: {
    toggleShow() {
      return true;
    },
    
  },
  watch: {},
  created() {
    //TODO: Seems kinda hacky, is there a better way to do this?
    let vue = this;
    //get user id for the session, store in state
    this.uid = localStorage.getItem("UserID");
    localStorage.setItem("NotebookID", this.$route.params.id);
    // console.log(localStorage.getItem("UserID"))
    //get data from db
    this.getAllPosts();
    
    //We fix the graph after 348 scrolled down
    window.addEventListener("scroll", function(event) {
    var top = this.scrollY,
        left =this.scrollX;
        
    if(top > 130){
      
      vue.fixGraph = "fix-graph"
    }
    if(top < 130){
      vue.fixGraph = ""
    }
    }, false);

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

#posts-view-container{
  margin:0;
  background-color: $background-color
}

.all-posts {
  display: flex;
  flex-direction: column-reverse; /* easily reverse with column-reverse*/
  align-items: center;
}

#hack{
  height:180px
}

.fix-graph {
  position: fixed;
  top: 0px;
  width: 100%;
  left:0px ;
    border-radius: 0px 0px 10px 10px;

}

 #add-new-post-btn{
  position: fixed;
  left: 87%;
  top: 90%;
}

#hamburger-button{
  z-index:2;
}

nav {
   z-index:900;
}
</style>
