<template>
  <div>
    <h1>Habilidades</h1>
    <div class="form">
      <form @submit.prevent="sendAbility">
        <input type="text" placeholder="Nombre" v-model="ability.name"> |
        <input type="text" placeholder="Descripcion" v-model="ability.description"> |
        <template v-if="edit === false">
          <button>Guardar</button>
        </template>
        <template v-else>
          <button>Actualizar</button>
        </template>
      </form>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ability of allAbilities" :key="ability._id">
          <td>{{ability.name}}</td>
          <td>{{ability.description}}</td>
          <td>
            <button @click="updateAbility(ability._id)">Editar</button> | 
            <button @click="removeAbility(ability._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import Vue from 'vue';
import axios from 'axios'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

class Ability {
  constructor(name, description) {
    this.name = name
    this.description = description
  }
}

export default Vue.extend({
  name: 'Abilities',
  data() {
    return {
      ability: new Ability(),
      editAbility: '',
      edit: false
    }
  },
  computed: {
    ...mapGetters(['allAbilities'])
  },
  methods: {
    ...mapActions(['getAbilities']),

    async sendAbility() {
      if(!this.edit) {
        await axios.post(`${process.env.VUE_APP_URI}/abilities`, {
          name: this.ability.name,
          description: this.ability.description
        })
        this.ability = new Ability()
        this.getAbilities()
      }else {
        await axios.put(`${process.env.VUE_APP_URI}/abilities/${this.editAbility}`, {
          name: this.ability.name,
          description: this.ability.description
        })
        this.edit = false
        this.getAbilities()
        this.ability = new Ability()
      }
    },
    async updateAbility(id) {
      const response = await axios.get(`${process.env.VUE_APP_URI}/abilities/${id}`)
      const data = response.data.data
      this.ability = new Ability(data.name, data.description)
      this.editAbility = data._id
      this.edit = true
    },
    async removeAbility(id) {
      await axios.delete(`${process.env.VUE_APP_URI}/abilities/${id}`)
      this.getAbilities()
    }
  },
  mounted() {
    this.getAbilities()
  }
})
</script>

<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  form{
    margin-bottom: 1.4rem;
  }
  input{
    border: 3px solid #2c3e50;
    border-radius: 6px;
    padding: .3rem;
  }
</style>