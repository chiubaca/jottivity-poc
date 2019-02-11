<template>
  <div class="all-posts">
    <div v-for="post in posts">
      <p>{{post.title}} | {{post.date}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllBlogs",
  props: {
    msg: String
  },
  data() {
    return {
      posts: []
    };
  },
  created() {
    fetch("https://micro-blog-495b7.firebaseio.com/alexchiu.json")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        // this.posts = JSON.stringify(myJson)
        for (let i in myJson) {
          console.log(myJson[i]);
          this.posts.push(myJson[i]);
        }
        // console.log(JSON.stringify(myJson));
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all-posts {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
