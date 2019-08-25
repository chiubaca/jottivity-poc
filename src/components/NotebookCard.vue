<template>
  <div class="notebook-container dot-box">
    <router-link :to="{path:'posts/'+ notebook.notebookID}" 
                 append>{{notebook.notebookAlias}}</router-link>
    <div class="options">...</div>
  </div>
</template>

<script>
export default {
  name: "NotebookCard",
  props: ["notebook"],
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.notebook-container {
  width: 300px;
  height: 170px;
  margin: 15px;
  display: grid;
  grid-template-areas:
    ".  .  ."
    ". name ."
    ". . option";
  grid-template-columns: 1fr 1fr 1fr;
    a{
      grid-area: name;
      place-self: center stretch;
      text-transform: capitalize;
    }

    .options {
      grid-area: option;
      justify-self: end;
      top: 30px;
      right: 10px;
      position: relative;
      cursor: pointer;
    }
}

.notebook-container:hover {
  box-shadow: 0px 0px 0px white;
}
</style>
