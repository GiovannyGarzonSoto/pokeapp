import Vue from 'vue'
import Router from 'vue-router'
import Abilities from '../components/Abilities.vue'
import Admin from '../components/Admin.vue'
import Moves from '../components/Moves.vue'
import Pokemon from '../components/Pokemon.vue'
import Selector from '../components/Selector.vue'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'content',
      component: Selector
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/control',
      name: 'control',
      component: Admin
    },
    {
      path: '/abilities',
      name: 'abilities',
      component: Abilities
    },
    {
      path: '/moves',
      name: 'moves',
      component: Moves
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: Pokemon
    }
  ]
})