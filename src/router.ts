import Vue from 'vue';
import Router from 'vue-router';


import store from './store';
import Home from './views/Home.vue';
import SignUp from './views/SignUp.vue';
import SignIn from './views/SignIn.vue';

Vue.use(Router);


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
]

export default new Router({ mode: 'history', routes });
