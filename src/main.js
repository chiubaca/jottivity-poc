import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
// import fbConfig from '../firebase.config'
import './registerServiceWorker'

Vue.config.productionTip = false

let app = "" ;

const fbConfig = {
  apiKey: "AIzaSyC7h4UCcs1f5uPDNjOW7xVMCJVnm-hWPRg",
  authDomain: "micro-blog-495b7.firebaseapp.com",
  databaseURL: "https://micro-blog-495b7.firebaseio.com",
  projectId: "micro-blog-495b7",
  storageBucket: "micro-blog-495b7.appspot.com",
  messagingSenderId: "528040082699"
};

firebase.initializeApp(fbConfig);

//This ensures vue is aware of what authentication state Firebase is at. 
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})