import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//lazy loading
const Front = () => import('../components/Front.vue').then(m => m.default)
const Selector = () => import('../components/Selector.vue').then(m => m.default)
const Signin = () => import('../components/Signin.vue').then(m => m.default)
const Signup = () => import('../components/Signup.vue').then(m => m.default)
const Control = () => import('../views/Control.vue').then(m => m.default)

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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
