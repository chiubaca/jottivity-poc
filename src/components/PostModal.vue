<template>
  <div v-if="modalState" class="modal-container" v-on:keyup.esc="closeModal()">
    
    <div class="modal-contents dot-box">
      <textarea v-focus id="post-title" v-model="postData.title"></textarea>
      <textarea id="post-contents" v-model="postData.contents"></textarea>

      <button v-on:click="editPost()">Update</button>
      <button id="button-exit" 
            v-on:click="closeModal()">
              &times;
      </button>
      
    </div>
  </div>
</template>

<script>
import firebaseHelpers from '@/mixins/firebaseHelpers'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "PostModal",
  props: ["modalState" , "postData"],
  mixins:[firebaseHelpers],
  data() {
    return{
     UserID:"",
     NotebookID:""
    }
  },
  methods: {
    closeModal(){
      this.$emit('closeModal')
    },
    editPost(){
      let url =`https://micro-blog-495b7.firebaseio.com/users/${this.UserID}/notebooks/${this.NotebookID}/posts/${this.postData.postID}`
      firebase.auth().currentUser.getIdToken()
      .then((token) => {
        this.updatePost(`${url}.json?auth=${token}`, this.postData)
      })
    }
  },
  created() {
    this.UserID = localStorage.getItem("UserID");
    this.NotebookID = localStorage.getItem("NotebookID")
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "src/assets/scss/buttons.scss";

.modal-container {
  background-color: #3d3b3b5b;
  position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.modal-container .modal-contents {
  background-color: #fff;
  box-shadow: 0px 0px 13px #7d7d7d;
  position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 75%;
  overflow-x: hidden;
}

textarea{
  resize: none;
  width:100%;
  border:none
} 

#post-title{
    height:10%;
    font-size: 1.5em;
    border-bottom: 5px solid
}

#post-contents{
  height:70%;
  border-bottom: 1px solid
}

</style>
