<template>
  <div>
    <h1>Pokemon</h1>

    <form>
      <select v-model="pkmn.ability">
        <option :value="ability.id" v-for="(ability, index) of abilities" :key="index">{{ability.nombre}}</option>
      </select>
      <select v-model="pkmn.ability2">
        <option :value="ability.id" v-for="(ability, index) of abilities" :key="index">{{ability.nombre}}</option>
      </select>
      <select v-model="pkmn.ability3">
        <option :value="ability.id" v-for="(ability, index) of abilities" :key="index">{{ability.nombre}}</option>
      </select>
      <select v-model="pkmn.type">
        <option :value="type.id" v-for="(type, index) of types" :key="index">{{type.nombre}}</option>
      </select>
      <select v-model="pkmn.type2">
        <option :value="type.id" v-for="(type, index) of types" :key="index">{{type.nombre}}</option>
      </select>
      <select v-model="pkmn.group">
        <option :value="group.id" v-for="(group, index) of groups" :key="index">{{group.nombre}}</option>
      </select>
      <select v-model="pkmn.group2">
        <option :value="group.id" v-for="(group, index) of groups" :key="index">{{group.nombre}}</option>
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
      <input type="file" name="image" ref="image" @change="handleFileUpload()">
      <template v-if="edit === false">
        <button @submit.prevent="sendPokemon()">Guardar</button>
      </template>
      <template v-else>
        <button @submit.prevent="sendPokemon()">Actualizar</button>
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
        <tr v-for="(pkmn, index) of pokemon" :key="index">
          <td>{{pkmn.habilidad}} </td>
          <td>{{pkmn.habilidad2}}</td>
          <td>{{pkmn.habilidad3}}</td>
          <td>{{pkmn.tipo}}</td>
          <td>{{pkmn.tipo2}}</td>
          <td>{{pkmn.grupo}}</td>
          <td>{{pkmn.grupo2}}</td>
          <td>{{pkmn.numero}}</td>
          <td>{{pkmn.nombre}}</td>
          <td>{{pkmn.descripcion}}</td>
          <td>{{pkmn.peso}}</td>
          <td>{{pkmn.altura}}</td>
          <td>{{pkmn.hp}}</td>
          <td>{{pkmn.ata}}</td>
          <td>{{pkmn.def}}</td>
          <td>{{pkmn.ataesp}}</td>
          <td>{{pkmn.defesp}}</td>
          <td>{{pkmn.vel}}</td>
          <td>
            <button @click="updatePkmn(pkmn.id)">Editar</button>
            <button @click="removePkmn(pkmn.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios'

class Pkmn {
  constructor(ability, ability2, ability3, type, type2, group, group2, number, name, description, weight, height, hp, at, def, ats, defs, vel) {
    this.ability = ability;
    this.ability2 = ability2;
    this.ability3 = ability3;
    this.type = type;
    this.type2 = type2;
    this.group = group;
    this.group2 = group2;
    this.number = number;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.height = height;
    this.hp = hp;
    this.at = at;
    this.def = def;
    this.ats = ats;
    this.defs = defs;
    this.vel = vel;
  }
}

export default {
  name: 'Pokemon',
  data() {
    return {
      types: [],
      abilities: [],
      groups: [],
      pokemon: [],
      pkmn: new Pkmn(),
      editPkmn: '',
      edit: false,
      file: ''
    }
  },
  methods: {
    getTypes () {
      axios.get('http://127.0.0.1:3000/api/types/')
      .then(response => this.types = response.data)
      .catch(err => console.log(err))
    },
    getAbilities() {
      axios.get('http://127.0.0.1:3000/api/abilities/')
      .then(response => this.abilities = response.data)
      .catch(err => console.log(err))
    },
    getGroups() {
      axios.get('http://127.0.0.1:3000/api/groups/')
      .then(response => this.groups = response.data)
      .catch(err => console.log(err))
    },
    getPokemon() {
      axios.get('http://127.0.0.1:3000/api/pokemon/')
      .then(response => this.pokemon = response.data)
      .then(response => console.log(response))
      .catch(err => console.log(err))
    },
    sendPokemon() {
      let formData = new FormData()
      formData.append('image', this.file)

      if(this.edit == false) {
        axios.post('http://127.0.0.1:3000/api/pokemon/', {
          formData,
          habilidad: this.pkmn.ability,
          habilidad2: this.pkmn.ability2,
          habilidad3: this.pkmn.ability3,
          tipo: this.pkmn.type,
          tipo2: this.pkmn.type2,
          grupo: this.pkmn.group,
          grupo2: this.pkmn.group2,
          numero: this.pkmn.number,
          nombre: this.pkmn.name,
          descripcion: this.pkmn.description,
          peso: this.pkmn.weight,
          altura: this.pkmn.height,
          hp: this.pkmn.hp,
          ata: this.pkmn.at,
          def: this.pkmn.def,
          ataesp: this.pkmn.ats,
          defesp: this.pkmn.defs,
          vel: this.vel
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.getPokemon()
          this.pkmn = new Pkmn()
        })
        .catch(err => console.log(err))
      }else {
        axios.put('http://127.0.0.1:3000/api/pokemon/'+this.editPkmn, {
          habilidad: this.pkmn.ability,
          habilidad2: this.pkmn.ability2,
          habilidad3: this.pkmn.ability3,
          tipo: this.pkmn.type,
          tipo2: this.pkmn.type2,
          grupo: this.pkmn.group,
          grupo2: this.pkmn.group2,
          numero: this.pkmn.number,
          nombre: this.pkmn.name,
          descripcion: this.pkmn.description,
          peso: this.pkmn.weight,
          altura: this.pkmn.height,
          hp: this.pkmn.hp,
          ata: this.pkmn.at,
          def: this.pkmn.def,
          ataesp: this.pkmn.ats,
          defesp: this.pkmn.defs,
          vel: this.vel
        })
        .then(response => {
          this.edit = false
          this.getPokemon()
          this.pkmn = new Pkmn()
        })
        .catch(err => console.log(err))
      }
    },
    updatePkmn(id) {
      axios.get(`http://127.0.0.1:3000/api/pokemon/${id}`)
      .then(response => {
        let data = response.data[0]
        this.pkmn = new Pkmn(data.habilidad, data.habilidad2, data.habilidad3, data.tipo, data.tipo2, data.grupo, data.grupo2, data.numero, data.nombre, data.descripcion, data.peso, data.altura, data.hp, data.ata, data.def, data.ataesp, data.defesp, data.vel)
        this.editPkmn = data.id
        this.edit = true
      })
      .catch(err => console.log(err))
    },
    removePkmn(id) {
      axios.delete(`http://127.0.0.1:3000/api/pokemon/${id}`)
      .then(response => {
        this.getPokemon()
      })
      .catch(err => console.log(err))
    },
    handleFileUpload() {
      this.file = this.$refs.image.files[0]
    }
  },
  mounted() {
    this.getTypes()
    this.getAbilities()
    this.getGroups()
    this.getPokemon()
  }
}
</script>

<style scoped lang="scss">
 
</style>
