<template>
  <div>
    <h1>Pokemon</h1>
    <form @submit.prevent="sendPokemon">
      <select v-model="pkmn.ability">
        <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
      </select>
      <select v-model="pkmn.ability2">
        <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
      </select>
      <select v-model="pkmn.ability3">
        <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
      </select>
      <select v-model="pkmn.type">
        <option :value="type._id" v-for="type of allTypes" :key="type._id">{{type.name}}</option>
      </select>
      <select v-model="pkmn.type2">
        <option :value="type._id" v-for="type of allTypes" :key="type._id">{{type.name}}</option>
      </select>
      <select v-model="pkmn.group">
        <option :value="group._id" v-for="group of allGroups" :key="group._id">{{group.name}}</option>
      </select>
      <select v-model="pkmn.group2">
        <option :value="group._id" v-for="group of allGroups" :key="group._id">{{group.name}}</option>
      </select>
      <input type="text" v-model="pkmn.number" placeholder="Numero">
      <input type="text" v-model="pkmn.name" placeholder="Nombre">
      <textarea v-model="pkmn.description" placeholder="Description"></textarea>
      <input type="text" v-model="pkmn.weight" placeholder="Peso">
      <input type="text" v-model="pkmn.height" placeholder="Altura">
      <input type="text" v-model="pkmn.hp" placeholder="Hp">
      <input type="text" v-model="pkmn.at" placeholder="Ataque">
      <input type="text" v-model="pkmn.def" placeholder="Defensa">
      <input type="text" v-model="pkmn.ats" placeholder="Ataque Esp">
      <input type="text" v-model="pkmn.defs" placeholder="Defensa Esp">
      <input type="text" v-model="pkmn.vel" placeholder="Velocidad">
      <input type="file" name="image">
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
          <td>{{pkmn.ability}} </td>
          <td>{{pkmn.ability2}}</td>
          <td>{{pkmn.ability3}}</td>
          <td>{{pkmn.type}}</td>
          <td>{{pkmn.type2}}</td>
          <td>{{pkmn.group}}</td>
          <td>{{pkmn.group2}}</td>
          <td>{{pkmn.number}}</td>
          <td>{{pkmn.name}}</td>
          <td>{{pkmn.description}}</td>
          <td>{{pkmn.weight}}</td>
          <td>{{pkmn.height}}</td>
          <td>{{pkmn.hp}}</td>
          <td>{{pkmn.ata}}</td>
          <td>{{pkmn.def}}</td>
          <td>{{pkmn.ataesp}}</td>
          <td>{{pkmn.defesp}}</td>
          <td>{{pkmn.vel}}</td>
          <td>
            <button @click="updatePkmn(pkmn._id)">Editar</button>
            <button @click="removePkmn(pkmn._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default Vue.extend({
  name: 'Pokemon',
  data() {
    return {
      pokemon: [],
      editPokemon: '',
      edit: false
    }
  },
  computed: {
    ...mapGetters(['allPokemon', 'allTypes', 'allAbilities', 'allGroups'])
  },
  methods: {
    ...mapActions(['getPokemon', 'getTypes', 'getAbilities', 'getGroups'])
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
