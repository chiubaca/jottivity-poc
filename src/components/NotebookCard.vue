<template>
  <div class="notebook-container dot-box">
    <router-link :to="{path:'posts/'+ notebook.notebookID}" 
                 append>{{notebook.notebookAlias}}</router-link>

    <button class="options"
            v-on:click="togglePopup(index)">
            <span>...</span>
    </button>

    <div class="optionsPopup"> 
      <ul>
        <li>Rename</li>
        <li v-on:click="deleteNotebook(notebook)">Delete</li>
      </ul>
    </div>

    
  </div>
</template>

<script>
import {HTTP} from '@/httpCommon';
import firebase from 'firebase/app';

let uid;

export default {
  name: "NotebookCard",
  props: ["notebook", "index"],
  data() {
    return {};
  },
  methods:{
    togglePopup(index){
      let popup = document.getElementsByClassName("optionsPopup");
      popup[index].classList.toggle("show");  
    },
    deleteNotebook(notebookObject){
      if (confirm(`Are you sure you want to delete notebook "${notebookObject.notebookAlias}"?`)) {
         console.log("deleted notebook ID ", notebookObject.notebookID)
         console.log("user ID" , uid)

         //Send the new notebook to db
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(token => {
          HTTP({
            method: "delete",
            url: `users/${uid}/notebooks/${notebookObject.notebookID}.json?auth=${token}`,
          })
            .then(response => {
              alert(`You've deleted the notebook : ${response.status}`);
            })
            .catch(function(error) {
              alert("something went wrong", Error(error));
            });
        });


        } else {
          console.log("did not delete anything")
      } 
    }
  },
  created() {
    uid = localStorage.getItem("UserID");   
  }
};
</script>
n
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
//button styling reset
button { 
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  }
//list styling rest 
li {
  list-style-type: none;
  padding:7px;
  cursor:pointer;
  }

button.options{
  z-index: 1;
}

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
  grid-template-rows: 1fr 1fr 1fr;
    a{
      grid-area: name;
      place-self: center stretch;
      text-transform: capitalize;
    }

    .options {
      grid-area: option;
      justify-self: end;
      right: 10px;
      position: relative;
    }
}

.notebook-container:hover {
  box-shadow: 0px 0px 0px white;
}

.optionsPopup {
  visibility: hidden;
  background:#00000063;
  border-radius: 7px;
  margin:5px;
  grid-column-start: 3;
  grid-row-start: 1;
  grid-row-end: 4;
  
  li:hover{
    background: #00000025;
    border-radius: 7px;
    margin:7px;
    padding:0px;
  }

}

.optionsPopup.show{
    visibility:visible;
    opacity: 1;

  }

</style>
