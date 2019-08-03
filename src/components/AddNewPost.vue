<template>
<div>
  <!-- TODO: this should be button element -->
  <div id="add-new-post-btn" 
       v-on:click="showNewPostModal = !showNewPostModal">   
      <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -2 28 28" aria-labelledby="editIconTitle">
        <title id="editIconTitle">Add New Post</title>
        <path d="M18.4142136 4.41421356L19.5857864 5.58578644C20.366835 6.36683502 20.366835 7.63316498 19.5857864 8.41421356L8 20 4 20 4 16 15.5857864 4.41421356C16.366835 3.63316498 17.633165 3.63316498 18.4142136 4.41421356zM14 6L18 10"></path>
      </svg>
  </div>

  <div class="new-post-wrapper"
       v-if="showNewPostModal"
       v-on:keyup.esc="showNewPostModal=!showNewPostModal">
    
    <div class="container dot-box">
        {{getDate}}
        <textarea v-focus id="new-post-title" v-model="postObject.title" placeholder="Title"> </textarea>
        <textarea id="new-post-content" v-model="postObject.contents" rows="10" placeholder="How was your day?"></textarea>  
        
        <div>
          Overall Score: {{sentiment.score}} <br/>
          Comparative Score: {{sentiment.comparative}} <br/>
          Postive Words: {{sentiment.positive}} <br/>
          Negative Words: {{sentiment.negative}} <br/>
          Analysed Words: {{sentiment.tokens}} <br/>
          All Words: {{sentiment.words}} <br/>        
        </div>
        
        <TagContainer v-bind:tags="tags"
                      v-on:checked-tags="handleCheckedTags"/>
        
        <button v-on:click="postEntry">save entry</button>
         
    </div>
    <button v-on:click="showNewPostModal=!showNewPostModal" 
            id="button-exit"> &times;
    </button>  
  </div>
</div>
</template>

<script>
import TagContainer from '@/components/TagsContainer'
import {HTTP} from '@/httpCommon'
import getDate from '@/mixins/getDate'
import Sentiment from 'sentiment'
import firebase from 'firebase/app'
import 'firebase/auth'

let uid;
var sentiment = new Sentiment();

export default {
  name: "AddNewPost",
  props: ["tags"],
  components:{
    TagContainer
  },
  mixins:[getDate],
  data() {
    return {
      showNewPostModal: false,
      sentiment:{},
      postObject:{
        title:"",
        contents:"",
        tags:{},
        date: "",
      }
    };
  },
  methods: {
    postEntry(){
      this.postObject.sentiment = this.sentiment;
      firebase.auth().currentUser.getIdToken()
      .then((token) => {
        HTTP({
          method: 'post',
          url : `users/${uid}/notebooks/${this.$route.params.id}/posts.json?auth=${token}`,
          data : this.postObject
        })
        .then((response) => {
          alert(`Success : ${response.status}`);
          // assign the postID to the postObject before emit the event
          // for AllPost component to read.
          this.postObject.postID = response.data.name;
          this.$emit('new-post', this.postObject);
          this.showNewPostModal = false;
        }).catch(function (error) {
          alert('something went wrong', Error(error) );
        });
      })
    },
    
    handleCheckedTags(selectedTagsObject){
      this.postObject.tags = selectedTagsObject;
    },

    pingEvent(){
      this.$emit("new-post")
    }
  },
  computed: {
    selectedTagsArray(){
       let allTags = []
       for (let tagNames in this.postObject.tags) {
        for(let items in this.postObject.tags[tagNames]){
          allTags.push(this.postObject.tags[tagNames][items].description)
        }
      }
      return allTags;  
    }
  },
  watch: {
    postObject: {
      handler: function(val){

      this.sentiment = sentiment.analyze(`${val.contents} ${this.selectedTagsArray.join(" ")}`);

      },
      deep: true
    }
  },
  created() {
    uid = localStorage.getItem("UserID");
    this.postObject.date = this.getDate;

   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "src/assets/scss/buttons.scss";

#add-new-post-btn { 
  border-radius: 50%;
  color: black;
  border: solid;
  border-width: 1.5px;
  background-color: white;
  
    svg {
      width: 50px;
      height: 50px;
      stroke: #000;
      stroke-width: 1.0;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      color: #000;
    } 

}

#add-new-post-btn:hover{

  background-color: silver;
  border-radius: 50%;

}

.new-post-wrapper{
  position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.new-post-wrapper .container {
  background-color: #fff;
  box-shadow: 0px 0px 13px #504c4c8c;
   position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 75%;
  overflow: auto
}

textarea{
  resize: none;
  width:100%;
  border:none;
} 

#new-post-title{
  // width: 100%;
  height:10%;
  font-size: 1.5em;
  border-bottom: 5px solid
}

#new-post-content{
  width: 100%;
  border-bottom: 1px solid
}  

#button-exit{
  position: relative;
  top: 0%;
  right: 5%;
}
</style>
