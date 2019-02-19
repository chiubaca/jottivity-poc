<template>
  <div v-if="modalState" class="post-modal">

   <slot name="post-contents">
        <p>default text</p>
   </slot>
  
  </div>
</template>

<script>
export default {
  name: "PostModal",
  props:["modalState"],
  data() {
    return {
        showModal: false
    };
  },
  created() {
    console.log(this.modalState)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .post-modal{
   background-color: #fff;
   box-shadow: 0px 0px 13px #7d7d7d;

   width:100%

   
}

</style>
