<template>
  <div class="post">
   <span>{{postData.date}}</span>
      <h1>{{postData.title}} </h1>
      <p>Mood: {{postData.mood}}  </p>
      <p>Productivity: {{postData.productivity}}</p>
  </div>
</template>

<script>
export default {
  name: "Post",
  props:["postData"],
  components:{

  },
  data() {
    return {
      posts: [],
   
    };
  },
  methods: {
    toggleModal() {
      
    },
  },
  computed: {
    toggleShow() {

      return true
    }
  },
  created() {
    console.log("hello from post component")
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
