<template>
<div>
  <div id="add-new-post-btn" 
       v-on:click="showNewPostModal = !showNewPostModal">   
       <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
       <circle cx="40" cy="40" r="40" fill="#9A1E1E"/>
       <path d="M30 40.5L29.9212 39.0021C29.1092 39.0448 28.4791 39.7266 28.5005 40.5394C28.5219 41.3522 29.1869 42 30 42V40.5ZM50.5 40.5L50.5 42C51.3284 42 52 41.3284 52 40.5C52 39.6716 51.3284 39 50.5 39L50.5 40.5ZM39 50C39 50.8284 39.6716 51.5 40.5 51.5C41.3284 51.5 42 50.8284 42 50H39ZM42 30C42 29.1716 41.3284 28.5 40.5 28.5C39.6716 28.5 39 29.1716 39 30H42ZM30 42H40.5V39H30V42ZM40.5 42H50.5V39H40.5V42ZM42 50V40.5H39V50H42ZM42 40.5V30H39V40.5H42ZM42 50V30H39V50H42ZM30.0788 41.9979C31.4515 41.9257 48.4392 42 50.5 42L50.5 39C48.5607 39 31.3985 38.9243 29.9212 39.0021L30.0788 41.9979Z" fill="white"/>
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
export default {
  name: "AddNewPost",
  props: ["tags"],
  data() {
    return {
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
      console.log("submitting a real post omg!!");
      let postObject = {
        "title": this.postTitle,
        "date": this.getDate,
        "mood": this.checkedMoods,
        "productivity": this.checkedProductivity,
        "contents": this.postContents
      }
      this.submitPost("https://micro-blog-495b7.firebaseio.com/users/alexchiu/notebooks/0/posts.json" , postObject)
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#add-new-post-btn{
  position: fixed;
  left: 90%;
  top: 90%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  width: 80px;
  height: 80px;
  box-shadow: 0px 0px 13px #504c4c8c;
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
