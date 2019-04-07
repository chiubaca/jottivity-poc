<template>
  <div>
    <Logout/>
    <div class="notebooks-container">
      <div class="notebook" v-for="(notebook,index) in notebooks" :key="index">
        <router-link :to="{path:'posts/'+ index}" 
                      
                      append>
            {{notebook}} | {{index}}
        </router-link>
      </div>
     
    </div>
     <div class="new-notebook" v-on:click="addNewNotebook"> + New Notebook </div>  

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
    };
  },
  methods: {
    getData() {
      console.log("getting notebooks...")
      firebase.auth().currentUser.getIdToken().then((token) => {
        const postsURL = `https://micro-blog-495b7.firebaseio.com/users/${this.uid}/notebooks.json?auth=${token}`
        //TODO:this needs tidying up
        fetch(postsURL)
        .then(response => {
          return response.json();
        })
        .then(notebookObject => {
          //Store all posts from db
          for (let i in notebookObject) {
            this.notebooks.push(notebookObject[i].name);
          }
       
        });
      });
    },
    addNewNotebook(){

      let notebookObject = {
        "title": "test"
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
    this.getData();
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
  width: 60px;
  height: 60px;
  margin: 15px;
  padding: 50px;

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
  width: 60px;
  height: 60px;
  margin: 15px;
  padding: 50px;
  border-radius: 10px
}

.new-notebook:hover {
  box-shadow: 0px 0px 6px #7d7d7d;

}

</style>
