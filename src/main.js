import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// Service Worker installation...
if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js')
  .then(function(registration){
      console.log("registration of SW successful, the scope is: " , registration.scope);
  })
  .catch(function(error){
      console.log("registration of SW failed, error: " , error)
  })
}