<template>
  <div>
    <h1>Pokemon</h1>
    <form @submit.prevent="sendPkmn" class="form" enctype="multipart/form-data">
      <select v-model="pkmn.ability1" name="ability1">
        <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
      </select>
      <select v-model="pkmn.ability2" name="ability2">
        <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
      </select>
      <select v-model="pkmn.ability3" name="ability3">
        <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
      </select>
      <select v-model="pkmn.type1" name="type1">
        <option :value="type._id" v-for="type of allTypes" :key="type._id">{{type.name}}</option>
      </select>
      <select v-model="pkmn.type2" name="type2">
        <option :value="type._id" v-for="type of allTypes" :key="type._id">{{type.name}}</option>
      </select>
      <select v-model="pkmn.group1" name="group1">
        <option :value="group._id" v-for="group of allGroups" :key="group._id">{{group.name}}</option>
      </select>
      <select v-model="pkmn.group2" name="group2">
        <option :value="group._id" v-for="group of allGroups" :key="group._id">{{group.name}}</option>
      </select>
      <input type="text" v-model="pkmn.number" placeholder="Numero" name="number">
      <input type="text" v-model="pkmn.name" placeholder="Nombre" name="name">
      <textarea v-model="pkmn.description" placeholder="Descripcion" name="description"></textarea>
      <input type="text" v-model="pkmn.weight" placeholder="Peso" name="weight">
      <input type="text" v-model="pkmn.height" placeholder="Altura" name="height">
      <input type="text" v-model="pkmn.hp" placeholder="Hp" name="hp">
      <input type="text" v-model="pkmn.attack" placeholder="Ataque" name="attack">
      <input type="text" v-model="pkmn.defense" placeholder="Defensa" name="defense">
      <input type="text" v-model="pkmn.spAttack" placeholder="Ataque Esp" name="spAttack">
      <input type="text" v-model="pkmn.spDefense" placeholder="Defensa Esp" name="spDefense">
      <input type="text" v-model="pkmn.speed" placeholder="Velocidad" name="speed">
      <input type="file" name="image">
      <template v-if="!edit">
        <button>Guardar</button>
      </template>
      <template v-else>
        <button>Actualizar</button>
      </template>
    </form>

    <table>
      <thead>
        <tr>
          <th>Habilidad</th>
          <th>Habilidad2</th>
          <th>Habilidad3</th>
          <th>Tipo</th>
          <th>Tipo2</th>
          <th>Grupo</th>
          <th>Grupo2</th>
          <th>Numero</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Peso</th>
          <th>Altura</th>
          <th>Hp</th>
          <th>At</th>
          <th>Def</th>
          <th>AtEsp</th>
          <th>DefEsp</th>
          <th>Vel</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pkmn of allPokemon" :key="pkmn._id">
          <td>{{pkmn.ability1.name}} </td>
          <td>{{pkmn.ability2.name}}</td>
          <td>{{pkmn.ability3.name}}</td>
          <td>{{pkmn.type1.name}}</td>
          <td>{{pkmn.type2.name}}</td>
          <td>{{pkmn.group1.name}}</td>
          <td>{{pkmn.group2.name}}</td>
          <td>{{pkmn.number}}</td>
          <td>{{pkmn.name}}</td>
          <td>{{pkmn.description}}</td>
          <td>{{pkmn.weight}}</td>
          <td>{{pkmn.height}}</td>
          <td>{{pkmn.hp}}</td>
          <td>{{pkmn.attack}}</td>
          <td>{{pkmn.defense}}</td>
          <td>{{pkmn.spAttack}}</td>
          <td>{{pkmn.spDefense}}</td>
          <td>{{pkmn.speed}}</td>
          <td>
            <button @click="updatePkmn(pkmn._id)">Editar</button>
            <button @click="removePkmn(pkmn._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

class Pkmn {
  constructor(ability1, ability2, ability3, type1, type2, group1, group2, number, name, description, weight, height, hp, attack, defense, spAttack, spDefense, speed) {
    this.ability1 = ability1
    this.ability2 = ability2
    this.ability3 = ability3
    this.type1 = type1
    this.type2 = type2
    this.group1 = group1
    this.group2 = group2
    this.number = number
    this.name = name
    this.description = description
    this.weight = weight
    this.height = height
    this.hp = hp
    this.attack = attack
    this.defense = defense
    this.spAttack = spAttack
    this.spDefense = spDefense
    this.speed = speed
  }
}

export default Vue.extend({
  name: 'Pokemon',
  data() {
    return {
      pkmn: new Pkmn(),
      editPokemon: '',
      edit: false
    }
  },
  computed: {
    ...mapGetters(['allPokemon', 'allTypes', 'allAbilities', 'allGroups'])
  },
  methods: {
    ...mapActions(['getPokemon', 'getTypes', 'getAbilities', 'getGroups']),

    async sendPkmn() {
      if(!this.editPkmn){
        const form = document.querySelector('.form')
        const formData = new FormData(form)
        await axios.post('http://127.0.0.1:3666/api/pokemon', formData)
        this.getPokemon()
        this.pkmn = new Pkmn()
      }else {
        const form = document.querySelector('.form')
        const formData = new FormData(form)
        await axios.put(`http://127.0.0.1:3666/api/pokemon/${this.editPokemon}`, formData)
        this.edit = false
        this.getPokemon()
        this.pkmn = new Pkmn()
      }
    },
    async updatePkmn(id) {
      const response = await axios.get(`http://127.0.0.1:3666/api/pokemon/${id}`)
      const data = response.data.data
      this.pkmn = new Pkmn(data.ability1, data.ability2, data.ability3, data.type1, data.type2, data.group1, data.group2, data.number, data.name, data.description, data.weight, data.height, data.hp, data.attack, data.defense, data.spAttack, data.spDefense, data.speed)
      this.editPkmn = data._id
      this.edit = true
    },
    async removePkmn(id) {
      await axios.delete(`http://127.0.0.1:3666/api/pokemon/${id}`)
      this.getPokemon()
    }
  },
  mounted(){
    this.getPokemon()
    this.getTypes()
    this.getAbilities()
    this.getGroups()
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
