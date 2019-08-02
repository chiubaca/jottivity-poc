<template>
  <div id="notebooks-view-container">
    <BurgerMenu/>
    <CustomHeader/>
      <div class="notebooks-container medium-text">
        <router-link v-for="(notebook,index) in notebooks" :key="index"
                     :to="{path:'posts/'+ notebook.notebookID}" 
                     append
                     class=" notebook dot-box">
          {{notebook.notebookAlias}}
        </router-link>
      </div>
   
      <div class="new-notebook">
        <textarea id="new-notebook-name" v-model="newNotebookName" placeholder="Notebook Name"></textarea>
        <button v-on:click="addNewNotebook">+ New Notebook</button>
      </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/CustomHeader.vue'
import BurgerMenu from "@/components/BurgerMenu.vue";
import { HTTP } from "@/httpCommon";
import getDate from "@/mixins/getDate";
import notebook from "@/components/notebook.json";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AllNotebooks",
  components: {
    BurgerMenu,
    CustomHeader
  },
  mixins: [getDate],
  data() {
    return {
      uid: "",
      notebooks: [],
      newNotebookName: ""
    };
  },
  methods: {
    addNewNotebook() {
      //assign the notebook name to metadata
      //TODO: need to check notebook alias is not blank
      //TODO: notebooks need to be set with a valid date
      let notebookObj = notebook;
      notebookObj.metadata.notebookAlias = this.newNotebookName;
      notebookObj.metadata.dateCreated = this.getDate;
      notebookObj.posts["0"].date = this.getDate;
      //Send the new notebook to db
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(token => {
          HTTP({
            method: "post",
            url: `users/${this.uid}/notebooks.json?auth=${token}`,
            data: notebookObj
          })
            .then(response => {
              alert(`Success, created a new notebook : ${response.status}`);
              this.notebooks.push({
                notebookAlias: this.newNotebookName,
                dateCreated: this.getDate,
                notebookID: response.data.name
              });
            })
            .catch(function(error) {
              alert("something went wrong", Error(error));
            });
        });
    },
    getData() {
      let notebookIdsArr = [];
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(token => {
          // First request gets all items IDs - shallow request is important
          // so that the notebooks data is not retrieved.
          HTTP({
            method: "get",
            url: `users/${this.uid}/notebooks/.json?auth=${token}&shallow=true`
          }).then(notebookIdsObj => {
            // We make an additional request for each notebook id to get the full
            // metadata of the notebook. We can make dynamic requests to the full
            // contents of then notebook using the notebook id.
            for (let notebookID in notebookIdsObj.data) {
              notebookIdsArr.push({ notebookID: notebookID });
              HTTP({
                method: "get",
                url: `users/${
                  this.uid
                }/notebooks/${notebookID}/metadata.json?auth=${token}`
              })
                .then(notebookObj => {
                  this.notebooks.push(notebookObj.data);
                  return this.notebooks;
                })
                .then(notebooksArray => {
                  let arrayIndex = notebooksArray.length - 1;
                  //Object.assign doesnt trigger vue reactive system so need to use $set
                  this.$set(
                    notebooksArray[arrayIndex],
                    "notebookID",
                    notebookIdsArr[arrayIndex].notebookID
                  );
                });
            }
          });
        });
    }
  },
  computed: {
    toggleShow() {
      return true;
    }
  },
  created() {
    //get user id for the session, store in state
    this.uid = firebase.auth().currentUser.uid;
    localStorage.setItem("UserID", this.uid);
    //get data from db
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
// <style lang="scss" scoped>

#notebooks-view-container {
  background-color: $background-color
}

.notebooks-container {
  display: flex;
  flex-direction: row; /* easily reverse with column-reverse*/
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
}

.notebook {
  width: 300px;
  height: 60px;
  margin: 15px;
  padding: 50px;
  display: flex; //this centers the text
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}

.notebook:hover {
  box-shadow: 0px 0px 0px white;
}

.new-notebook {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  width: 200px;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
}
</style>
