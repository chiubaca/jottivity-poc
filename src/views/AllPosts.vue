<template>
  <div id="posts-view-container">
    <BurgerMenu/>
    <CustomHeader/>

    <MoodGraph class="dot-box"
              :class="fixGraph"
              :allPosts="posts"/>


    <!-- Im not happy with this hacky fix, Witout it, the posts element shift
         straight up when the graph element becomes fixed, need a better way solve this -->
    <!-- <div v-if="isGraphHidden" id="hack"> you should never see this...</div> -->
    <div id="toggle-show-graph">
            
            <div v-if="isGraphHidden"
                    v-on:click="toggleHideMoodGraph">
              📈
            </div>

            <div v-else
                    v-on:click="toggleHideMoodGraph">
              🙈
            </div>
    </div>

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
      fixGraph:"",
      isGraphHidden:false
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
    },
    toggleHideMoodGraph(){
      let moodGraph = document.getElementsByClassName("mood-graph");
      moodGraph[0].hidden = !moodGraph[0].hidden;
      
      this.isGraphHidden = !this.isGraphHidden;
      console.log(moodGraph[0]);
    }
  },
  created() {
    let moodGraph = document.getElementsByClassName("mood-graph");
    //get user id for the session, store in state
    this.uid = localStorage.getItem("UserID");
    localStorage.setItem("NotebookID", this.$route.params.id);

    //get data from db
    this.getAllPosts();
    
    //Scroll then fix the graph when it hits the top of the page
    window.addEventListener("scroll",  (event) => {

    let top = event.pageY;
        
    if (top > 98) {
      this.fixGraph = "fix-graph";
    }
    if (top < 98) {
      // this.toggleHideMoodGraph();
      this.fixGraph = "";
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


.fix-graph {
  position: fixed;
  top: 0px;
  width: 100%;
  left:0px ;
  border-radius: 0px 0px 10px 10px;
  z-index: 1;
}

#add-new-post-btn{
  position: fixed;
  right: 15px;
  bottom: 15px;
}


#toggle-show-graph { 
  position: fixed;
  right: 15px;
  bottom: 80px;

  div {
    background: white;
    padding: 10px;
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    font-size: 15px;
  }

  div:hover{
    background: silver
  }

}


</style>
