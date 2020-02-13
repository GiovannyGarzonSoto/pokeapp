<template>
  <div class="pokemon">
    <h3 class="heading-3">Pokemon</h3>

    <form @submit.prevent="sendPkmn" class="pokemon-form" enctype="multipart/form-data">
      <div class="pokemon-form__selects">
        <select v-model="pkmn.ability1" class="pokemon-form__select" name="ability1" required>
          <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
        </select>
        <select v-model="pkmn.ability2" class="pokemon-form__select" name="ability2" required>
          <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
        </select>
        <select v-model="pkmn.ability3" class="pokemon-form__select" name="ability3" required>
          <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
        </select>
      </div>

     <div class="pokemon-form__selects">
        <select v-model="pkmn.type1" class="pokemon-form__select" name="type1" required>
          <option :value="type._id" v-for="type of allTypes" :key="type._id">{{type.name}}</option>
        </select>
        <select v-model="pkmn.type2" class="pokemon-form__select" name="type2" required>
          <option :value="type._id" v-for="type of allTypes" :key="type._id">{{type.name}}</option>
        </select>
      </div>
    
      <div class="pokemon-form__selects">
        <select v-model="pkmn.group1" class="pokemon-form__select" name="group1" required>
          <option :value="group._id" v-for="group of allGroups" :key="group._id">{{group.name}}</option>
        </select>
        <select v-model="pkmn.group2" class="pokemon-form__select" name="group2" required>
          <option :value="group._id" v-for="group of allGroups" :key="group._id">{{group.name}}</option>
        </select>
      </div>

      <div class="pokemon-form__selects">
        <input type="text" v-model="pkmn.number" class="pokemon-form__input" placeholder="Numero" name="number" required>
        <input type="text" v-model="pkmn.name" class="pokemon-form__input" placeholder="Nombre" name="name" required>
      </div>
      <textarea v-model="pkmn.description" class="pokemon-form__text" placeholder="Descripcion" name="description" required></textarea>
      <div class="pokemon-form__selects">
        <input type="text" class="pokemon-form__input" v-model="pkmn.weight" placeholder="Peso" name="weight" required>
        <input type="text" class="pokemon-form__input" v-model="pkmn.height" placeholder="Altura" name="height" required>
      </div>
      <input type="text" class="pokemon-form__input" v-model="pkmn.hp" placeholder="Hp" name="hp" required>
      <div class="pokemon-form__selects">
        <input type="text" class="pokemon-form__input" v-model="pkmn.attack" placeholder="Ataque" name="attack" required>
        <input type="text" class="pokemon-form__input" v-model="pkmn.defense" placeholder="Defensa" name="defense" required>
      </div>
      <div class="pokemon-form__selects">
        <input type="text" class="pokemon-form__input" v-model="pkmn.spAttack" placeholder="Ataque Esp" name="spAttack" required>
        <input type="text" class="pokemon-form__input" v-model="pkmn.spDefense" placeholder="Defensa Esp" name="spDefense" required>
      </div>
      <input type="text" class="pokemon-form__input" v-model="pkmn.speed" placeholder="Velocidad" name="speed" required>
      <label for="image" class="image">
        <i class="fas fa-cloud-upload-alt"></i> Subir imagen
      </label>
      <input type="file" class="pokemon-form__input--file" id="image" name="image" required>
      <template v-if="!edit">
        <button class="btn">Guardar</button>
      </template>
      <template v-else>
        <button class="btn">Actualizar</button>
      </template>
    </form>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Habilidadades</th>
          <th>Tipo</th>
          <th>Grupo</th>
          <th>N°</th>
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
          <td>{{pkmn.name}}</td>
          <td>{{pkmn.ability1.name}} {{pkmn.ability2.name}} {{pkmn.ability3.name}}</td>
          <td>{{pkmn.type1.name}} {{pkmn.type2.name}}</td>
          <td>{{pkmn.group1.name}} {{pkmn.group2.name}}</td>
          <td>{{pkmn.number}}</td>
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
            <button @click="removePkmn(pkmn._id)" class="btn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
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
      edit: false,
      headers: {
        headers: this.token
      }
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapGetters(['allPokemon', 'allTypes', 'allAbilities', 'allGroups'])
  },
  methods: {
    ...mapActions(['getPokemon', 'getTypes', 'getAbilities', 'getGroups']),

    async sendPkmn() {
      const form = document.querySelector('.form')
      const formData = new FormData(form)
      await axios.post(`${process.env.VUE_APP_URI}/pokemon`, formData, {headers: {token: this.token}})
      this.getPokemon()
      this.pkmn = new Pkmn()
    },
    async removePkmn(id) {
      await axios.delete(`${process.env.VUE_APP_URI}/pokemon/${id}`, {headers: {token: this.token}})
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