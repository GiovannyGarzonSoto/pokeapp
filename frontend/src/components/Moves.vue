<template>
  <div>
    <h1>Movimientos</h1>
    <div class="form">
      <form @submit.prevent="sendMove">
        <select v-model="move.type">
          <option :value="type._id" v-for="type of allTypes" :key="type._id"> {{type.name}} </option>
        </select>
        <select v-model="move.clase">
          <option :value="clase._id" v-for="clase of allClasses" :key="clase._id"> {{clase.name}} </option>
        </select>
        <input type="text" v-model="move.name" placeholder="Movimiento">
        <textarea type="text" placeholder="Descripcion" v-model="move.description"/>
        <input type="text" placeholder="Potencia" v-model="move.power">
        <input type="text" placeholder="Precision" v-model="move.accuracy">
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
          <td class="desc">{{move.description}}</td>
          <td>{{move.power}}</td>
          <td>{{move.accuracy}}</td>
          <td>
            <button @click="updateMove(move._id)">Editar</button> |
            <button @click="removeMove(move._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
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
form{
  margin-bottom: 1.4rem;
}
input{
  border: 3px solid #2c3e50;
  border-radius: 6px;
  padding: .3rem;
}
select{
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.1;
  padding: .6em 1.4em .5em .8em;
  width: 100%;
  max-width: 100%; 
  box-sizing: border-box;
  margin: 0;
  border: 3px solid #2c3e50;
  border-radius: 6px;
}
textarea{
  border: 3px solid #2c3e50;
  border-radius: 6px;
  padding: .3rem;
}
.desc{
  width: 17rem;
}
</style>