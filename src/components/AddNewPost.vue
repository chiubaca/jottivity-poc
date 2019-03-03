<template>
<div>
  <button v-on:click="showNewPostModal = !showNewPostModal"> add new post</button>
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
  width: 50%;
  height: 50%;
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
