<template>
  <div>
    <Logout/>
    <div class="notebooks-container">
     <div class="notebook" v-for="(notebook,index) in notebooks" :key="index">
      {{notebook}}
      </div>
    </div>
  </div>
</template>

<script>
import Logout from '@/components/Logout.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "AllNotebooks",
  components:{
    Logout
  },
  data() {
    return {
      uid:"",
      notebooks: [],
    };
  },
  methods: {
    getData() {
      firebase.auth().currentUser.getIdToken().then((token) => {
        const postsURL = `https://micro-blog-495b7.firebaseio.com/users/${this.uid}/notebooks/.json?auth=${token}`
        //TODO:this needs tidying up
        fetch(postsURL)
        .then(response => {
          return response.json();
        })
        .then(notebookObject => {
          console.log(notebookObject)
          //Store all posts from db
          for (let i in notebookObject) {
            console.log(notebookObject[i].name)
            this.notebooks.push(notebookObject[i].name);
          }
       
        });
      });
    },
 
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
  flex-direction: column; /* easily reverse with column-reverse*/
  align-items: center
}

.notebook {
  
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  width: 75%;
  margin: 15px;
  padding: 50px;
  border-radius: 10px
}

.notebook:hover {
  box-shadow: 0px 0px 6px #7d7d7d;

}


</style>
