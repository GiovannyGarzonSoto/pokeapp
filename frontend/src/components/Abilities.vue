<template>
  <div>
    <h1>Habilidades</h1>

    <div class="form">
      <form @submit.prevent="sendAbility">
        <input type="text" v-model="ability.name" placeholder="Nombre">
        <input type="text" v-model="ability.description" placeholder="Descripcion">
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
        <tr v-for="(ability, index) of abilities" :key="index">
          <td>{{ability.nombre}}</td>
          <td>{{ability.descripcion}}</td>
          <td>
            <button @click="updateAbility(ability.id)">Editar</button>
            <button @click="removeAbility(ability.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  
  </div>
</template>

<script>
import axios from 'axios'

class Ability {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

export default {
  name: 'Abilities',
  data() {
    return {
      abilities: [],
      ability: new Ability(),
      editAbility: '',
      edit: false,
      apiUrl: 'http://127.0.0.1:3000/api/'
    }
  },
  methods: {
    getAbilities() {
      axios.get(`${this.apiUrl}abilities/`)
      .then(response => this.abilities = response.data)
      .catch(err => console.log(err))
    },
    sendAbility() {
      if(this.edit == false){
        axios.post('http://127.0.0.1:3000/api/abilities/', {
          nombre: this.ability.name,
          descripcion: this.ability.description
        })
        .then(response => {
          this.ability = new Ability()
          this.getAbilities()
        })
      }else {
        axios.put('http://127.0.0.1:3000/api/abilities/'+this.editAbility, {
          nombre: this.ability.name,
          descripcion: this.ability.description
        })
        .then(response => {
          this.edit = false
          this.getAbilities()
          this.ability = new Ability()
        })
        .catch(err => console.log(err))
      }
    },
    updateAbility(id) {
      axios.get(`http://127.0.0.1:3000/api/abilities/${id}`)
      .then(response => {
        let data = response.data[0]
        this.ability = new Ability(data.nombre, data.descripcion)
        this.editAbility = data.id
        this.edit = true
      })
      .catch(err => console.log(err))
    },
    removeAbility(id) {
      axios.delete(`http://127.0.0.1:3000/api/abilities/${id}`)
      .then(response => {
        this.getAbilities()
      })
      .catch(err => console.log(err))
    }
  },
  mounted() {
    this.getAbilities()
  }
}
</script>

<style lang="scss">
h1{
  text-align: center;
}

.form{
  display: flex;
  justify-content: center;
}

form{
  display: flex;
  flex-direction: column;
  width: 20rem;

  & input{
    color: var(--color);
    border-radius: 5px;
    background: none;
    border: 1px solid gray;
    display: block;
    padding: .3rem;
    margin: .4rem;
  }

  & button{
    display: block;
    width: 12rem;
    margin: auto;
    padding: .3rem;
    border: 1px solid gray;
    border-radius: 5px;
    background: none;
    color : var(--color);
  }
}

table{
  display: flex;
  width: 100vh;
  justify-content: center;
}
 
</style>
