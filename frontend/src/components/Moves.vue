<template>
  <div>
    <h1>Movimientos</h1>

    <form @submit.prevent="sendMove">
      <select v-model="move.type">
        <option :value="type.id" v-for="(type, index) of types" :key="index"> {{type.nombre}} </option>
      </select>
      <select v-model="move.category">
        <option :value="category.id" v-for="(category, index) of categories" :key="index"> {{category.nombre}} </option>
      </select>
      <input type="text" v-model="move.move" placeholder="Movimiento">
      <textarea type="text" placeholder="Descripcion" v-model="move.description"/>
      <input type="text" placeholder="Potencia" v-model="move.hugePower">
      <input type="text" placeholder="Precision" v-model="move.accuracy">
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
          <th>Descripcion</th>
          <th>Potencia</th>
          <th>Precision</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(move, index) of moves" :key="index">
          <td>{{move.nombre}} </td>
          <td>{{move.tipo}}</td>
          <td>{{move.categoria}}</td>
          <td>{{move.descripcion}}</td>
          <td>{{move.potencia}}</td>
          <td>{{move.presicion}}</td>
          <td>
            <button @click="updateMove(move.id)">Editar</button>
            <button @click="removeMove(move.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

class Move {
  constructor(type, category, move, description, hugePower, accuracy) {
    this.type = type;
    this.category = category;
    this.move = move;
    this.description = description;
    this.hugePower = hugePower;
    this.accuracy = accuracy;
  }
}

export default {
  name: 'Moves',
  data() {
    return {
      types: [],
      categories: [],
      moves: [],
      move: new Move(),
      editMove: '',
      edit: false
    }
  },
  methods: {
    getTypes() {
      axios.get('http://127.0.0.1:3000/api/types/')
      .then(response => this.types = response.data)
      .catch(err => console.log(err))
    },
    getCategories() {
      axios.get('http://127.0.0.1:3000/api/categories/')
      .then(response => this.categories = response.data)
      .catch(err => console.log(err))
    },
    getMoves() {
      axios.get('http://127.0.0.1:3000/api/moves/')
      .then(response => {
        this.moves = response.data
      })
      .catch(err => console.log(err))
    },
    sendMove(e) {
      if(this.edit == false){
        axios.post('http://127.0.0.1:3000/api/moves/', {
          tipo: this.move.type,
          categoria: this.move.category,
          nombre: this.move.move,
          descripcion: this.move.description,
          potencia: this.move.hugePower,
          precision: this.move.accuracy
        })
        .then(response => {
          this.getMoves()
          this.move = new Move()
        })
        .catch(err => console.log(err))
      }else {
        axios.put('http://127.0.0.1:3000/api/moves/'+this.editMove, {
          tipo: this.move.type,
          categoria: this.move.category,
          nombre: this.move.move,
          descripcion: this.move.description,
          potencia: this.move.hugePower,
          precision: this.move.accuracy
        })
        .then(response => {
          this.edit = false
          this.getMoves()
          this.move = new Move
        })
        .catch(err => console.log(err))
      }
    },
    updateMove(id) {
      axios.get(`http://127.0.0.1:3000/api/moves/${id}`)
      .then(response => {
        let data = response.data[0]
        this.move = new Move(data.tipo, data.categoria, data.nombre, data.descripcion, data.potencia, data.presicion)
        this.editMove = data.id
        this.edit = true
      })
      .catch(err => console.log(err))
    },
    removeMove(id) {
      axios.delete(`http://127.0.0.1:3000/api/moves/${id}`)
      .then(response => {
        this.getMoves()
      })
      .catch(err => console.log(err))
    }
  },
  mounted() {
    this.getTypes(),
    this.getCategories(),
    this.getMoves()
  }
}
</script>

<style scoped lang="scss">
 
</style>