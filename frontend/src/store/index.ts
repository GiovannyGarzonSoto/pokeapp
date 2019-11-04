import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    abilities: [],
    types: [],
    classes: [],
    moves: [],
    pokemon: [],
    groups: []
  },
  getters: {
    allAbilities: state => state.abilities,
    allTypes: state => state.types,
    allClasses: state => state.classes,
    allMoves: state => state.moves,
    allPokemon: state => state.pokemon,
    allGroups: state => state.groups
  },
  mutations: {
    setAbilities: (state, abilities) => state.abilities = abilities,
    setTypes: (state, types) => state.types = types,
    setClasses: (state, classes) => state.classes = classes,
    setMoves: (state, moves) => state.moves = moves,
    setPokemon: (state, pokemon) => state.pokemon = pokemon,
    setGroups: (state, groups) => state.groups = groups
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
    }
  }
})
