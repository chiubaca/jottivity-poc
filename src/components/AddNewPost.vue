<template>
<div>
  <!-- TODO: this should be button element -->
  <div id="add-new-post-btn" 
       v-on:click="showNewPostModal = !showNewPostModal">   
       <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
       <circle cx="25" cy="25" r="25" fill="#9A1E1E"/>
       <path d="M15 25.5L14.9212 24.0021C14.1092 24.0448 13.4791 24.7266 13.5005 25.5394C13.5219 26.3522 14.1869 27 15 27V25.5ZM35.5 25.5L35.5 27C36.3284 27 37 26.3284 37 25.5C37 24.6716 36.3284 24 35.5 24V25.5ZM24 35C24 35.8284 24.6716 36.5 25.5 36.5C26.3284 36.5 27 35.8284 27 35H24ZM27 15C27 14.1716 26.3284 13.5 25.5 13.5C24.6716 13.5 24 14.1716 24 15H27ZM15 27H25.5V24H15V27ZM25.5 27H35.5V24H25.5V27ZM27 35V25.5H24V35H27ZM27 25.5V15H24V25.5H27ZM27 35V15H24V35H27ZM15.0788 26.9979C16.4515 26.9257 33.4392 27 35.5 27L35.5 24C33.5607 24 16.3985 23.9243 14.9212 24.0021L15.0788 26.9979Z" fill="white"/>
       </svg>
  </div>

  <div class="new-post-wrapper"
       v-if="showNewPostModal"
       v-on:keyup.esc="showNewPostModal=!showNewPostModal">
    
    <div class="container">
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
          console.error('something went wrong', Error(error) );
          alert(error);
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
    getDate() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      today = `${yyyy}-${mm}-${dd}T00:00:00`
      return today
    },
    selectedTagsArray(){
       let allTags = []
       for (let tagNames in this.postObject.tags) {
        for(let items in this.postObject.tags[tagNames]){
          allTags.push(this.postObject.tags[tagNames][items].description)
        };
      }; 
      return allTags;  
    }
  },
  watch: {
    postObject: {
      handler: function(val, oldVal){

      this.sentiment = sentiment.analyze(val.contents + this.selectedTagsArray.join(" "));

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
@import "src/assets/css/buttons.scss";

#add-new-post-btn{
  position: fixed;
  left: 87%;
  top: 90%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  width: 50px;
  height: 50px;
  box-shadow: 0px 0px 15px #504c4c8c;
}

#add-new-post-btn:hover{
    box-shadow: 0px 0px 6px #504c4c8c;
}

.new-post-wrapper{
  background-color: #00000077;
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
