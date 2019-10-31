import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    abilities: []
  },
  getters: {
    allAbilities: (state) => state.abilities
  },
  mutations: {
    setAbilities: (state, abilities) => state.abilities = abilities
  },
  actions: {
    getAbilities: async({commit}) => {
      const response = await axios.get(`http://localhost:3666/api/abilities`)
      commit('setAbilities', response.data.data)
    }
  },
  modules: {

  }
})
