<template>
<div>
  <div id="add-new-post-btn" 
       v-on:click="showNewPostModal = !showNewPostModal">   
       <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
       <circle cx="25" cy="25" r="25" fill="#9A1E1E"/>
       <path d="M15 25.5L14.9212 24.0021C14.1092 24.0448 13.4791 24.7266 13.5005 25.5394C13.5219 26.3522 14.1869 27 15 27V25.5ZM35.5 25.5L35.5 27C36.3284 27 37 26.3284 37 25.5C37 24.6716 36.3284 24 35.5 24V25.5ZM24 35C24 35.8284 24.6716 36.5 25.5 36.5C26.3284 36.5 27 35.8284 27 35H24ZM27 15C27 14.1716 26.3284 13.5 25.5 13.5C24.6716 13.5 24 14.1716 24 15H27ZM15 27H25.5V24H15V27ZM25.5 27H35.5V24H25.5V27ZM27 35V25.5H24V35H27ZM27 25.5V15H24V25.5H27ZM27 35V15H24V35H27ZM15.0788 26.9979C16.4515 26.9257 33.4392 27 35.5 27L35.5 24C33.5607 24 16.3985 23.9243 14.9212 24.0021L15.0788 26.9979Z" fill="white"/>
       </svg>
  </div>

  <div v-if="showNewPostModal" class="new-post-wrapper">
    <div class="container">
        {{getDate}}
        <textarea id="new-post-title" v-model="postTitle" placeholder="Title"> </textarea>
        
        <textarea id="new-post-content" v-model="postContents" rows="10" placeholder="How was your day?"></textarea>  
        
        <div class="tag-container">
         <!--TODO: Need to work out all tags dynamically  -->  
          <div>
            <div v-for="mood in tags[0].mood" :key="mood.id">
              <label :for="mood" class="tags">
                <input type="checkbox" 
                        :id="mood" 
                        :value="mood" 
                        v-model="checkedMoods">            
                {{mood}}
              </label>
            </div>
          </div>
          <div>
            <div v-for="prod in tags[1].productivity" :key="prod.id">
              <label :for="prod" class="tags">
                <input type="checkbox" 
                        :id="prod" 
                        :value="prod" 
                        v-model="checkedProductivity">            
                {{prod}}
              </label>
            </div>
          </div>
        </div>

      <button v-on:click="postEntry">save entry</button>
      <button v-on:click="showNewPostModal=!showNewPostModal"> exit </button>
    </div>   
  </div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "AddNewPost",
  props: ["tags"],
  data() {
    return {
      uid:"",
      showNewPostModal: false,
      checkedMoods:[],
      checkedProductivity:[],
      postTitle:"",
      postContents:"",
      
    };
  },
  methods: {
    submitPost(url , data) {
      console.log("submitting Post...")

      return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
    },
    postEntry(){
      let postObject = {
        "title": this.postTitle,
        "date": this.getDate,
        "mood": this.checkedMoods,
        "productivity": this.checkedProductivity,
        "contents": this.postContents
      }

      firebase.auth().currentUser.getIdToken()
      .then((token) => {
        this.submitPost(`https://micro-blog-495b7.firebaseio.com/users/${this.uid}/notebooks/0/posts.json?auth=${token}` , postObject)
      })


      
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
    }
  },
  created() {
    //get user id for the session, store in state
    this.uid = firebase.auth().currentUser.uid
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

.tag-container{
  display: flex;
  justify-content: space-evenly
}

#new-post-title{
  width: 100%
}

#new-post-content{
  width: 100%
}  
</style>
