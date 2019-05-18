<template>
  <div id='component-container'>
    <Logout/>
    <p>User ID : {{this.uid}}</p>
    <div class="notebooks-container">

      <div class="notebook" v-for="(notebook,index) in notebooks" :key="index">
        <router-link :to="{path:'posts/'+ notebook.notebookID}" append>
          <p> Notebook ID:  {{notebook.notebookID}} </p>
          <p> Notebook Name: {{notebook.notebookAlias}} </p>
          <p> Date Created:  {{notebook.dateCreated}} </p>
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
        .catch(err => {console.log("error getting notebook objects" , err)})
        .then(notebookIdsArray => {
          for (let notebookID in notebookIdsArray) {
            //we wrap the string into a simple object and push this into a holding array
            notebookIdsArr.push({'notebookID':notebookID});
            //whilst we know the notebookID here, we can fetch the metadata properties of each notebook
            fetch(baseURL + `notebooks/${notebookID}/metadata.json?auth=${token}`)
            .then(response => {return response.json()})
            //this returns the notebook meta data object which push into vue data
            .catch(err => {console.log("error getting notebook metadata" , err)}) 
            .then(notebookObject => {
              console.log("got metadata:" , notebookObject)
              this.notebooks.push(notebookObject);
              return this.notebooks;
            //with each notebook object that is pushed into vue data we merge it with the 
            //the equivlent notbookID which should have its index in-sync with the order
            //of the notebooks array
            })
            .catch(err => {console.log("error pushing notebook metadata into app state" , err)})
            .then(notebooksArray => {
              let arrayIndex = notebooksArray.length - 1;
              Object.assign(notebooksArray[arrayIndex] , notebookIdsArr[arrayIndex])
            })
          }
        })
        .catch(err => {console.log("error iterating through notebooks data" , err)})
      });  
    },
    addNewNotebook(){
      let notebookObject = {
        metadata:{
          'dateCreated':'n/a',
          'notebookAlias': this.newNotebookName
        },
        "posts":{
         "0" : { 
          "contents" : "Edit me!",
          "title": "Example Post",
          "date": "2019-01-01T00:00:00",
            "tags":{
              "mood" : [ {
                "colour" : "blue",
                "description" : "Happy",
                "tag" : "mood"
              } ],
              "productivity" : [ {
                "colour" : "blue",
                "description" : "Friends",
                "tag" : "productivity"
              } ]
            },
          }
        },
         "tags" :
           {
          "mood": [
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Happy"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Content"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Energetic"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Frustrated"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Angry"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Tired"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Optimistic"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Annoyed"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Dissatisfied"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Unmotivated"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Motiviated"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Satisfied"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Inspired"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Confused"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Sad"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Excited"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Demotivated"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Relaxed"
              },
              {
                  "tag": "mood",
                  "colour": "blue",
                  "description": "Stressed"
              }
          ],
          "productivity": [
              {
                  "tag": "productivity",
                  "colour": "blue",
                  "description": "Fitness"
              },
              {
                  "tag": "productivity",
                  "colour": "blue",
                  "description": "Leisure"
              },
              {
                  "tag": "productivity",
                  "colour": "blue",
                  "description": "Life"
              },
              {
                  "tag": "productivity",
                  "colour": "blue",
                  "description": "Work"
              },
              {
                  "tag": "productivity",
                  "colour": "blue",
                  "description": "Friends"
              },
              {
                  "tag": "productivity",
                  "colour": "blue",
                  "description": "Family"
              },
              {
                  "tag": "productivity",
                  "colour": "blue",
                  "description": "Holiday"
              }
          ]
        }
      };
      
      firebase.auth().currentUser.getIdToken()
      .then((token) => {
        this.submitPost(`https://micro-blog-495b7.firebaseio.com/users/${this.uid}/notebooks.json?auth=${token}`, notebookObject)
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
    localStorage.setItem('UserID', this.uid);
    //get data from db
    this.getData()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#component-container{
    background-image: url(../assets/images/dot.png) 
}

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
