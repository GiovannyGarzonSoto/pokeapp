<template>
  <div>
    <h1>Pokemon</h1>

    <form @submit.prevent="sendPkmn" class="form" enctype="multipart/form-data">
      <div class="abilities">
        <select v-model="pkmn.ability1" name="ability1" required>
          <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
        </select>
        <select v-model="pkmn.ability2" name="ability2" required>
          <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
        </select>
        <select v-model="pkmn.ability3" name="ability3" required>
          <option :value="ability._id" v-for="ability of allAbilities" :key="ability._id">{{ability.name}}</option>
        </select>
      </div>

     <div class="types">
        <select v-model="pkmn.type1" name="type1" required>
          <option :value="type._id" v-for="type of allTypes" :key="type._id">{{type.name}}</option>
        </select>
        <select v-model="pkmn.type2" name="type2" required>
          <option :value="type._id" v-for="type of allTypes" :key="type._id">{{type.name}}</option>
        </select>
      </div>
    
      <div class="groups">
        <select v-model="pkmn.group1" name="group1" required>
          <option :value="group._id" v-for="group of allGroups" :key="group._id">{{group.name}}</option>
        </select>
        <select v-model="pkmn.group2" name="group2" required>
          <option :value="group._id" v-for="group of allGroups" :key="group._id">{{group.name}}</option>
        </select>
      </div>

      <input type="text" v-model="pkmn.number" placeholder="Numero" name="number" required>
      <input type="text" v-model="pkmn.name" placeholder="Nombre" name="name" required>
      <textarea v-model="pkmn.description" placeholder="Descripcion" name="description" required></textarea>
      <div class="data">
        <input type="text" v-model="pkmn.weight" placeholder="Peso" name="weight" required>
        <input type="text" v-model="pkmn.height" placeholder="Altura" name="height" required>
      </div>
      <input type="text" v-model="pkmn.hp" placeholder="Hp" name="hp" required>
      <div class="physical">
        <input type="text" v-model="pkmn.attack" placeholder="Ataque" name="attack" required>
        <input type="text" v-model="pkmn.defense" placeholder="Defensa" name="defense" required>
      </div>
      <div class="special">
        <input type="text" v-model="pkmn.spAttack" placeholder="Ataque Esp" name="spAttack" required>
        <input type="text" v-model="pkmn.spDefense" placeholder="Defensa Esp" name="spDefense" required>
      </div>
      <input type="text" v-model="pkmn.speed" placeholder="Velocidad" name="speed" required>
      <label for="image" class="image">
        <i class="fas fa-cloud-upload-alt"></i> Subir imagen
      </label>
      <input type="file" id="image" name="image" required>
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
            <button @click="removePkmn(pkmn._id)">Eliminar</button>
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
      margin: .3rem;
    }

    & input[type="file"]{
      display: none;
    }

    & select{
      margin: .3rem;
      font-family: sans-serif;
      color: #2c3e50;
      line-height: 1.1;
      padding: .6em 1.4em .5em .8em;
      border: 3px solid #2c3e50;
      border-radius: .8rem;
      width: 13rem;
    }

    & textarea{
      margin-top: .8rem;
      border: 2px solid #2c3e50;
      border-radius: 1rem;
      padding: .3rem;
      width: 11rem;
      height: 4rem;
    }
  }
  button{
    border: 3px solid #2c3e50;
    border-radius: 1rem;
    background: none;
    color: #2c3e50;
    font-weight: bolder;
    padding: .3rem;
    width: 9rem;
    margin: 1rem;
  }
  table{
    margin-top: 1rem;
  }
  .image{
    border: 2px solid #2c3e50;
    border-radius: 1rem;
    background: none;
    color: #2c3e50;
    font-weight: bolder;
    padding: .3rem;
    width: 9rem;
    margin-top: 1rem;

    &:hover{
      width: 10rem;
    }
  }
</style>