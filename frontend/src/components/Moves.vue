<template>
  <div class="move">
    <h2 class="heading-3">Movimientos</h2>

    <form @submit.prevent="sendMove" class="move-form">
      <div class="move-form__selects">
        <select v-model="move.type" required class="move-form__select">
          <option :value="type._id" v-for="type of allTypes" :key="type._id"> {{type.name}} </option>
        </select>
        <select v-model="move.clase" required class="move-form__select">
          <option :value="clase._id" v-for="clase of allClasses" :key="clase._id"> {{clase.name}} </option>
        </select>
      </div>
      <input type="text" v-model="move.name" class="move-form__input" placeholder="Movimiento" required>
      <textarea type="text" placeholder="Descripcion" class="move-form__input" v-model="move.description" required/>
      <input type="text" placeholder="Potencia" class="move-form__input" v-model="move.power">
      <input type="text" placeholder="Precision" class="move-form__input" v-model="move.accuracy">
      <template v-if="edit === false">
        <button class="btn">Guardar</button>
      </template>
      <template v-else>
        <button class="btn">Actualizar</button>
      </template>
    </form>

    <table class="move-table">
      <thead>
        <tr>
          <th class="heading-4 mr-sm">Movimiento</th>
          <th class="heading-4 mr-sm">Tipo</th>
          <th class="heading-4 mr-sm">Categoria</th>
          <th class="heading-4 mr-sm">Description</th>
          <th class="heading-4 mr-sm">Potencia </th>
          <th class="heading-4 mr-sm">Precision</th>
          <th class="heading-4 mr-sm">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="move of allMoves" :key="move._id" class="move-table__row">
          <td class="move-table__cell mr-sm">{{move.name}} </td>
          <td class="move-table__cell mr-sm">{{move.type.name}}</td>
          <td class="move-table__cell mr-sm">{{move.clase.name}}</td>
          <td class="move-table__cell mr-sm">{{move.description}}</td>
          <td class="move-table__cell mr-sm">{{move.power}}</td>
          <td class="move-table__cell mr-sm">{{move.accuracy}}</td>
          <td class="buttons">
            <button class="btn" @click="updateMove(move._id)"><img src="../assets/lapiz.svg" class="buttons__img">Editar</button> 
            <button class="btn" @click="removeMove(move._id)"><img src="../assets/basura.svg" class="buttons__img">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { mapState, mapGetters, mapActions } from 'vuex'

class Move {
  constructor( name, description, power, accuracy, type, clase) {
    this.name = name
    this.description = description
    this.power = power
    this.accuracy = accuracy
    this.type = type
    this.clase = clase
  }
}

export default Vue.extend({
  name: 'Moves',
  data() {
    return {
      move: new Move(),
      editMove: '',
      edit: false,
      headers: {
        headers: this.token
      }
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapGetters(['allTypes', 'allClasses', 'allMoves'])
  },
  methods: {
    ...mapActions(['getTypes', 'getClasses', 'getMoves']),

    async sendMove() {
      if(!this.edit){
        await axios.post(`${process.env.VUE_APP_URI}/moves`, {
          name: this.move.name,
          description: this.move.description,
          power: this.move.power,
          accuracy: this.move.accuracy,
          type: this.move.type,
          clase: this.move.clase
        }, {headers: {token: this.token}})
        this.move = new Move()
        this.getMoves()
      }else {
        await axios.put(`${process.env.VUE_APP_URI}/moves/${this.editMove}`, {
          name: this.move.name,
          description: this.move.description,
          power: this.move.power,
          accuracy: this.move.accuracy,
          type: this.move.type,
          clase: this.move.clase
        }, {headers: {token: this.token}})
        this.edit = false
        this.getMoves()
        this.moves = new Move()
      }
    },
    async updateMove(id) {
      const response = await axios.get(`${process.env.VUE_APP_URI}/moves/${id}`, {headers: {token: this.token}})
      const data = response.data.data
      this.move = new Move(data.name, data.description, data.power, data.accuracy, data.type, data.class)
      this.editMove = data._id
      this.edit = true
    },
    async removeMove(id) {
      await axios.delete(`${process.env.VUE_APP_URI}/moves/${id}`, {headers: {token: this.token}})
      this.getMoves()
    }
  },
  created() {
    this.getTypes()
    this.getClasses()
    this.getMoves()
  }
})
</script>