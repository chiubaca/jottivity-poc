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

    <div class="post-footer">
      <button class="options"
              v-on:click="showOptionsModal=!showOptionsModal">
            <span>...</span>
      </button>

      <div v-if=showOptionsModal class="options-modal dot-box">
        <ul>
        <!-- TODO:Enable renameing of notebooks
          <li v-on:click="showRenameModal=!showRenameModal">Rename</li> -->
        <li v-on:click="deletePost(postData, index)">Delete</li>
      </ul>
      </div>

    </div>
      
    
  </div>
</template>

<script>
import PostModal from "./PostModal.vue";
import {HTTP} from '@/httpCommon';
import firebase from 'firebase/app';

let uid, notebookID;

export default {
  name: "Post",
  props: ["postData", "index"],
  components: {
    PostModal
  },
  data() {
    return {
      posts: [],
      showPostContent: false,
      showOptionsModal:false
    };
  },
  methods: {
    closeModal() {
      this.showPostContent = false
    },
    deletePost(postData, index){
      if (confirm(`Are you sure you want to delete post "${postData.title}"` )) {
        // delete the post
        firebase.auth().currentUser.getIdToken()
          .then(token => {
            HTTP({
              method: "delete",
              url: `users/${uid}/notebooks/${notebookID}/posts/${postData.postID}/.json?auth=${token}`,
            })
          .then(response => {
            console.log(`You've deleted the post : ${response.status}`);
            this.showOptionsModal = false;
            this.$emit('deleted-post', index);
          })
          .catch(function(error) {
            alert("something went wrong", Error(error));
            console.log(Error(error))
          });
        });        

        } else {
          console.log("did not delete anything")
      } 
  },
  },
  computed: {

  },
  created() {
    uid = localStorage.getItem("UserID");
    notebookID = localStorage.getItem("NotebookID");     
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

.post-footer {
  position: relative;
  height: 10px;
  
  button.options { 
    //button styling reset
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    right:10px;
    bottom:0px;
    position: absolute;
    width:20px;
    height:20px;
    border-radius: 50%;

    span{
      bottom: 5px;
      position: relative;
    }

  }

  button.options:hover{
    background:#00000063;
  }

  .options-modal{
    height: 60px;
    width: 110px;
    right:10px;
    bottom:45px;
    position: absolute;
    background:#00000063;

     //list styling rest 
    li {
      list-style-type: none;
      padding:7px;
      cursor:pointer;
    }

    li:hover{
    background: #00000025;
    border-radius: 7px;
    margin:7px;
    padding:0px;
  }
    

  }

}





</style>
