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
import {HTTP} from '@/httpCommon'
import firebase from 'firebase/app'
import 'firebase/auth'



export default {
  name: "AllNotebooks",
  components:{
    Logout
  },
  mixins:[],
  data() {
    return {
      uid:"",
      notebooks: [],
      newNotebookName:""
    };
  },
  methods: {
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
    },
    getData2() {
      let notebookIdsArr = [];
      firebase.auth().currentUser.getIdToken().then((token) => {
        // First request gets all items IDs - shallow request is important 
        // so that the notebooks data is not retrieved.
        HTTP({
          method:'get',
          url: `users/${this.uid}/notebooks/.json?auth=${token}&shallow=true`
        })
        .then((notebookIdsObj)=>{
          // We make an additional request for each notebook id to get the full
          // metadata of the notebook. We can make dynamic requests to the full
          // contents of then notebook using the notebook id.
          for (let notebookID in notebookIdsObj.data){
            notebookIdsArr.push({'notebookID':notebookID});
            HTTP({
              method:'get',
              url: `users/${this.uid}/notebooks/${notebookID}/metadata.json?auth=${token}`  
            })
            .then(notebookObj => {
              this.notebooks.push(notebookObj.data);
              return this.notebooks;
            })
            .then(notebooksArray => {
              let arrayIndex = notebooksArray.length - 1;
              //Object.assign doesnt trigger vue reactive system so need to use $set 
              this.$set(notebooksArray[arrayIndex] , "notebookID" ,notebookIdsArr[arrayIndex].notebookID)
            })
          }
        })
      })
    },
  },
  created() {
    //get user id for the session, store in state
    this.uid = firebase.auth().currentUser.uid
    localStorage.setItem('UserID', this.uid);
    //get data from db
    // this.getData()
    this.getData2
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#component-container{
    background-image: url("../assets/images/note_bg.png") 
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
