<template>
  <main>
    <h1>Habilidades</h1>

    <form @submit.prevent="sendAbility">
      <input type="text" placeholder="Nombre" v-model="ability.name" required> 
      <input type="text" placeholder="Descripcion" v-model="ability.description" required> 
      <template v-if="edit === false">
        <button>Guardar</button>
      </template>
      <template v-else>
        <button>Actualizar</button>
      </template>
    </form>
    
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
          <td class="buttons">
            <button @click="updateAbility(ability._id)">Editar</button> 
            <button @click="removeAbility(ability._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
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
  main{
    display: flex;
    flex-direction: column;
    align-items: space-between;
  }
  form{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    & input{
      margin-top: 1rem;
      border: 2px solid #364c63;
      border-radius: .8rem;
      padding: .3rem;
    }
  }
  button{
    border: 3px solid #2c3e50;
    border-radius: 1rem;
    background: none;
    color: #2c3e50;
    font-weight: bolder;
    padding: .3rem;
    width: 13rem;
    margin-top: 1rem;
  }
  table{
    margin-top: 1rem;
  }
  .buttons{
    display: flex;
    justify-content: center;

    & button{
      width: 5rem;
      margin: .2rem;
    }
  }
</style>