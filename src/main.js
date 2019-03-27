import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import config from '../firebase.config'
import './registerServiceWorker'

Vue.config.productionTip = false

let app = "" ;

firebase.initializeApp(config);

//This ensures vue is aware of what authentication state Firebase is at. 
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})