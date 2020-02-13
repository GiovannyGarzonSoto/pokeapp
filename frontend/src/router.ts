import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

//lazy loading
const Front = () => import('./components/Front.vue').then(m => m.default)
const Selector = () => import('./components/Selector.vue').then(m => m.default)
const Signin = () => import('./components/Signin.vue').then(m => m.default)
const Signup = () => import('./components/Signup.vue').then(m => m.default)
const Control = () => import('./views/Control.vue').then(m => m.default)
const Details = () => import('./components/Details.vue').then(m => m.default)

const routes = [
  {
    path: '/',
    name: 'front',
    component: Front
  },
  {
    path: '/selector',
    name: 'selector',
    component: Selector,
    meta: {requireAuth: true}
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
    component: Control,
    //meta: {requireAuth: true}
  },
  {
    path: '/selector/:pkmn',
    name: 'details',
    component: Details,
    //meta: {requireAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const protectedRoutes = to.matched.some(record => record.meta.requireAuth)
  if(protectedRoutes && store.state.token === ''){
    next({name: 'signin'})
  }else{
    next()
  }
})

export default router
