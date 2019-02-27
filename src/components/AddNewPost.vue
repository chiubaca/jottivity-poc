<template>
<div>
  <button v-on:click="showNewPostModal = !showNewPostModal"> add new post</button>
  <div v-if="showNewPostModal" class="new-post-container">
    <div> 
      <button v-on:click="showNewPostModal=!showNewPostModal"> exit </button>
      <br>
      <textarea cols="30" rows="10"></textarea>
      <br>
      <button v-on:click="testPost">save entry</button>
    </div>   
  </div>
</div>
</template>

<script>
export default {
  name: "AddNewPost",
  data() {
    return {
      showNewPostModal: false
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
    testPost(){
      console.log("Test Post!")
      let testPost = {
        "title": "Test Post",
        "date": "2018-07-05T00:00:00",
        "mood": [
            "Happy"
        ],
        "productivity": [
            "Fitness",
            "Programming"
        ],
        "contents": "Just another test post"
      }
      this.submitPost("https://micro-blog-495b7.firebaseio.com/users/alexchiu/notebooks/0/posts.json" , testPost)
    }
  },
  created() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-post-container{
  background-color: #3d3b3b5b;
  position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.new-post-container div {
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
</style>
