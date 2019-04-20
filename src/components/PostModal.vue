<template>
  <div v-if="modalState" class="modal-container">
    <div class="modal-contents">
      <p>postID: {{postData.postID}}</p>
      <textarea name="post-contents" v-model="postData.contents"></textarea>
      <br/>
      <button>Update</button>
      <br/>
      <button v-on:click="closeModal()">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostModal",
  props: ["modalState" , "postData"],
  data() {
    return{
     
    }
  },
  methods: {
    closeModal(){
      this.$emit('closeModal')
    }
  },
  computer: {

  },
  created() {

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
