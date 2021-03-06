import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'


Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', 
      redirect: '/notebooks',
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/notebooks/posts/:id',
      name: 'posts',
      // route level code-splitting
      component: () => import(/* webpackChunkName: "posts" */ './views/AllPosts.vue'),
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/notebooks',
      name: 'notebooks',
      component: () => import(/* webpackChunkName: "all-notebooks" */ './views/AllNotebooks.vue'),
      meta: {
        requiresAuth:true
      }
    }
  ]
});

//vue navigation guards
router.beforeEach((to, from , next) => {
  
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record=>record.meta.requiresAuth); //this loops through every route with a requiresAuth meta tag

  if(requiresAuth && !currentUser){
    //If the route we navigate to requires authentication and there 
    //is no current user logged in, we redirect to the Login view.
    next('login')
  }
  else if(!requiresAuth && currentUser){
    //If the route we navigate to does not require authentication and 
    //there is a user logged in, we redirect to the Home view.
    next();
  } 
  else{
    //No auth required and not logged in
    next();
  } 
});

export default router;
