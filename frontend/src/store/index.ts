import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import decode from 'jwt-decode'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    abilities: [],
    types: [],
    classes: [],
    moves: [],
    pokemon: [],
    groups: [],
    token: '',
    user: ''
  },
  getters: {
    allAbilities: state => state.abilities,
    allTypes: state => state.types,
    allClasses: state => state.classes,
    allMoves: state => state.moves,
    allPokemon: state => state.pokemon,
    allGroups: state => state.groups,
    isActive: state => !!state.token
  },
  mutations: {
    setAbilities: (state, abilities) => state.abilities = abilities,
    setTypes: (state, types) => state.types = types,
    setClasses: (state, classes) => state.classes = classes,
    setMoves: (state, moves) => state.moves = moves,
    setPokemon: (state, pokemon) => state.pokemon = pokemon,
    setGroups: (state, groups) => state.groups = groups,
    getUser: (state, payload) => {
      state.token = payload
      if(payload === ''){
        state.user = ''
      }else {
        state.user = decode(payload)
        router.push({name: 'selector'})
      }
    }
  },
  actions: {
    getAbilities: async({commit}) => {
      const response = await axios.get(`${process.env.VUE_APP_URI}/abilities`)
      commit('setAbilities', response.data.data)
    },
    getTypes: async({commit}) => {
      const response = await axios.get(`${process.env.VUE_APP_URI}/types`)
      commit('setTypes', response.data.data)
    },
    getClasses: async({commit}) => {
      const response = await axios.get(`${process.env.VUE_APP_URI}/classes`)
      commit('setClasses', response.data.data)
    },
    getMoves: async({commit}) => {
      const response = await axios.get(`${process.env.VUE_APP_URI}/moves`)
      commit('setMoves', response.data.data)
    },
    getPokemon: async({commit}) => {
      const response = await axios.get(`${process.env.VUE_APP_URI}/pokemon`)
      commit('setPokemon', response.data.data)
    },
    getGroups: async({commit}) => {
      const response = await axios.get(`${process.env.VUE_APP_URI}/groups`)
      commit('setGroups', response.data.data)
    },
    saveUser: ({commit}, payload) => {
      sessionStorage.setItem('token', payload)
      commit('getUser', payload)
    },
    closeSession: ({commit}) => {
      commit('getUser', '')
      sessionStorage.removeItem('token')
      router.push({name: 'front'})
    },
    readToken:({commit}) => {
      const token = sessionStorage.getItem('token')
      if(token) {
        commit('getUser', token)
      }else {
        commit('getUser', '')
      }
    }
  }
})
