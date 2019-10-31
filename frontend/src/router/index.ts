import Vue from 'vue'
import VueRouter from 'vue-router'
import Front from '../components/Front.vue'
import Selector from '../components/Selector.vue'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import Control from '../views/Control.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'front',
    component: Front
  },
  {
    path: '/selector',
    name: 'selector',
    component: Selector
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/control',
    name: 'control',
    component: Control
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
