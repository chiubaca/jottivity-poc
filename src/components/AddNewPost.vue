<template>
<div>
  <button v-on:click="showNewPostModal = !showNewPostModal"> add new post</button>
  <div v-if="showNewPostModal" class="new-post-wrapper">
    <div class="container">
       <h2>title:</h2>   
       <textarea v-model="postTitle"></textarea>
       <!--TODO: Need to work out all tags dynamically  -->
        <div v-for="mood in tags[0].mood" :key="mood.id">
           <label :for="mood" class="tags">
            <input type="checkbox" 
                    :id="mood" 
                    :value="mood" 
                    v-model="checkedMoods">            
            {{mood}}
          </label>
        </div>

        <br/>

        <div v-for="prod in tags[1].productivity" :key="prod.id">
           <label :for="prod" class="tags">
            <input type="checkbox" 
                    :id="prod" 
                    :value="prod" 
                    v-model="checkedProductivity">            
            {{prod}}
          </label>
        </div>
      
      
      <br>
      <textarea v-model="postContents" cols="30" rows="10"></textarea>
      <br>
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
        "date": "2019-03-01T00:00:00",
        "mood": this.checkedMoods,
        "productivity": this.checkedProductivity,
        "contents": this.postContents
      }
      this.submitPost("https://micro-blog-495b7.firebaseio.com/users/alexchiu/notebooks/0/posts.json" , postObject)
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
</style>
