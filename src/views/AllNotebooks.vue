<template>
  <div>
    <Logout/>
    <div class="notebooks-container">
      <div class="notebook" v-for="(notebook,index) in notebooks" :key="index">
        <router-link :to="{path:'posts/'+ index}"        
                     append>
          <p> {{notebook.notebookID}}  </p>
          <p>  {{notebook.notebookAlias}} </p>
          <p>   {{notebook.dateCreated}}</p>
         
        
       
        </router-link>
      </div>
     
    </div>
     <div class="new-notebook"> 
        <textarea id="new-notebook-name" v-model="newNotebookName" placeholder="Notebook Name"> </textarea>
      <button v-on:click="addNewNotebook">+ New Notebook</button>  
      </div>  

  </div>
</template>

<script>
import Logout from '@/components/Logout.vue'
import firebaseHelpers from '@/mixins/firebaseHelpers'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "AllNotebooks",
  components:{
    Logout
  },
  mixins:[firebaseHelpers],
  data() {
    return {
      uid:"",
      notebooks: [],
      notebookIdLookup:[],
      newNotebookName:""
    };
  },
  methods: {
    getData() {
    
      console.log("getting notebooks...")
      firebase.auth().currentUser.getIdToken().then((token) => {
        const baseURL = `https://micro-blog-495b7.firebaseio.com/users/${this.uid}/`
        let notebookIdsArr = [];
        //TODO: this needs tidying up and need to implement error handling!!
        //A shallow fetch is required so we dont get all posts in each notebooks
        //we only want to get notebooks IDs + metadata but firebase querying is a bit crap
        //so we need to loop through all notebook ids and perform a fetch on each notebook- 
        //ID invidually once we have the ID in memory. So here comes some spaghetti..

        //We get fetch the data, the shallow parameter is important so
        //that we dont get a deep copy the contents all the notebooks
        //in the users account.
        fetch(baseURL + `notebooks/.json?auth=${token}&shallow=true`)
        // parse the data, standard fetch operation
        .then(response => {return response.json()})
        //we get back an array of strings which are the notebookIds
        .then(notebookIdsArray => {
          for (let notebookID in notebookIdsArray) {
            //we wrap the string into a simple object and push this into a holding array
            notebookIdsArr.push({'notebookID':notebookID});
            //whilst we know the notebookID here, we can fetch the metadata properties of each notebook
            fetch(baseURL + `notebooks/${notebookID}/metadata.json?auth=${token}`)
            .then(response => {return response.json()})
            //this returns the notebook meta data object which push into vue data 
            .then(notebookObject => {
              this.notebooks.push(notebookObject);
              return this.notebooks;
            //with each notebook object that is push into vue data we merge it with the 
            //the equivlent notbookID which should have its index in-sync with the order
            //with the notebooks array
            }).then(notebooksArray => {
              let arrayIndex = notebooksArray.length - 1;
              Object.assign(notebooksArray[arrayIndex] , notebookIdsArr[arrayIndex])
            })
          }
        })
      });  
    },
    addNewNotebook(){
      let notebookObject = {
        metadata:{
          'dateCreated':'2019-01-01T00:00:00',
          'notebookAlias': this.newNotebookName
        },
        "posts":[{}],
        "tags":[{}],
      }
      
      firebase.auth().currentUser.getIdToken()
      .then((token) => {
      this.submitPost(`https://micro-blog-495b7.firebaseio.com/users/Ki6HfZeETzWZxjhwAuELlWyrxMA2/notebooks.json?auth=${token}`, notebookObject)
      console.log("adding new notebook...")
      }).catch(err => console.log(err))
    
    }
 
  },
  computed: {
    toggleShow() {
      return true
    }
  },
  created() {
    //get user id for the session, store in state
    this.uid = firebase.auth().currentUser.uid
    //get data from db
    this.getData()
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notebooks-container {
  display: flex;
  flex-direction: row; /* easily reverse with column-reverse*/
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
}

.notebook {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  border-radius: 10px;
  width: 300px;
  height: 60px;
  margin: 15px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.notebook:hover {
  box-shadow: 0px 0px 6px #7d7d7d;

}

.new-notebook {
  
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  width:200px;
  margin: 15px;
  padding: 20px;
  border-radius: 10px
}


</style>
