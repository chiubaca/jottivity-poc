<template>
  <div v-if="modalState" class="modal-container">
    <div class="modal-contents">
      <p>postID: {{postData.postID}}</p>
      <p>UserID: {{UserID}}</p>
      <p>NotebookID: {{NotebookID}}</p>
      <textarea name="post-contents" v-model="postData.contents"></textarea>
      <br/>
      <button v-on:click="editPost()">Update</button>
      <br/>
      <button v-on:click="closeModal()">Close</button>
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
      console.log(this.postData.title)
      let url =`https://micro-blog-495b7.firebaseio.com/users/${this.UserID}/notebooks/${this.NotebookID}/posts/${this.postData.postID}`
      console.log(url)
      console.log(this.postData)

      firebase.auth().currentUser.getIdToken()
      .then((token) => {
        this.updatePost(`${url}.json?auth=${token}`, this.postData)
      })
    }
  },
  computer: {

  },
  created() {
    this.UserID = localStorage.getItem("UserID");
    this.NotebookID = localStorage.getItem("NotebookID")
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-container {
  background-color: #3d3b3b5b;
  position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.modal-container .modal-contents {
  background-color: #fff;
  box-shadow: 0px 0px 13px #7d7d7d;
   position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
}

textarea{
  width:100%;
  height:50%;
}
</style>
