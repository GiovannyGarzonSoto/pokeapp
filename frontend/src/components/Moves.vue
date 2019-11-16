<template>
  <div>
    <h1>Movimientos</h1>

    <form @submit.prevent="sendMove">
      <select v-model="move.type" required>
        <option :value="type._id" v-for="type of allTypes" :key="type._id"> {{type.name}} </option>
      </select>
      <select v-model="move.clase" required>
        <option :value="clase._id" v-for="clase of allClasses" :key="clase._id"> {{clase.name}} </option>
      </select>
      <input type="text" v-model="move.name" placeholder="Movimiento" required>
      <textarea type="text" placeholder="Descripcion" v-model="move.description" required/>
      <input type="text" placeholder="Potencia" v-model="move.power" required>
      <input type="text" placeholder="Precision" v-model="move.accuracy" required>
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
          <th>Movimiento</th>
          <th>Tipo</th>
          <th>Categoria</th>
          <th>Description</th>
          <th>Potencia</th>
          <th>Precision</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="move of allMoves" :key="move._id">
          <td>{{move.name}} </td>
          <td>{{move.type.name}}</td>
          <td>{{move.clase.name}}</td>
          <td>{{move.description}}</td>
          <td>{{move.power}}</td>
          <td>{{move.accuracy}}</td>
          <td class="buttons">
            <button @click="updateMove(move._id)">Editar</button> 
            <button @click="removeMove(move._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

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
      edit: false
    }
  },
  computed: {
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
        })
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
        })
        this.edit = false
        this.getMoves()
        this.moves = new Move()
      }
    },
    async updateMove(id) {
      const response = await axios.get(`${process.env.VUE_APP_URI}/moves/${id}`)
      const data = response.data.data
      this.move = new Move(data.name, data.description, data.power, data.accuracy, data.type, data.class)
      this.editMove = data._id
      this.edit = true
    },
    async removeMove(id) {
      await axios.delete(`${process.env.VUE_APP_URI}/moves/${id}`)
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