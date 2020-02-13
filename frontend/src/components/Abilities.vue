<template>
  <main class="ability">
    <h3 class="heading-3">Habilidades</h3>
    <form @submit.prevent="sendAbility" class="ability-form mb-md">
      <input type="text" class="ability-form__input" placeholder="Nombre" v-model="ability.name" required> 
      <input type="text" class="ability-form__input" placeholder="Descripcion" v-model="ability.description" required> 
      <template v-if="edit === false">
        <button class="btn"><img src="../assets/escritura.svg" class="ability-form__btn">Guardar</button>
      </template>
      <template v-else>
        <button class="btn"><img src="../assets/escritura.svg" class="ability-form__btn"> Actualizar</button>
      </template>
    </form>
    
    <table class="ability-table">
      <thead>
        <tr>
          <th class="heading-4">Nombre</th>
          <th class="heading-4">Descripcion</th>
          <th class="heading-4">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ability of allAbilities" :key="ability._id" class="ability-table__row">
          <td class="ability-table__cell">{{ability.name}}</td>
          <td class="ability-table__cell">{{ability.description}}</td>
          <td class="buttons">
            <button @click="updateAbility(ability._id)" class="btn"><img src="../assets/lapiz.svg" class="buttons__img"> Editar</button> 
            <button @click="removeAbility(ability._id)" class="btn"><img src="../assets/basura.svg" class="buttons__img"> Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import Vue from 'vue';
import axios from 'axios'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Swal from 'sweetalert2'

class Ability {
  constructor(name, description) {
    this.name = name
    this.description = description
  }
}

export default Vue.extend({
  name: 'Abilities',
  data() {
    return {
      ability: new Ability(),
      editAbility: '',
      edit: false
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapGetters(['allAbilities'])
    
  },
  methods: {
    ...mapActions(['getAbilities']),

    async sendAbility() {
      if(!this.edit) {
        const swal = Swal.fire({
        title: 'Guardar nueva Habilidad?',
        text: 'Bpp bpp!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'La nueva Habilidad ha sido guardada',
            'Pokedex actualizada',
            'success'
          )
        }
      })
      const data = await axios.post(`${process.env.VUE_APP_URI}/abilities`, {
            name: this.ability.name,
            description: this.ability.description
          }, {headers: {token: this.token}})
          console.log(data)
          this.ability = new Ability()
          this.getAbilities()
        /**/
      }else {
        await axios.put(`${process.env.VUE_APP_URI}/abilities/${this.editAbility}`, {
          name: this.ability.name,
          description: this.ability.description
        }, {headers: {token: this.token}})
        this.edit = false
        this.getAbilities()
        this.ability = new Ability()
      }
    },
    async updateAbility(id) {
      const response = await axios.get(`${process.env.VUE_APP_URI}/abilities/${id}`, {headers: {token: this.token}})
      const data = response.data.data
      this.ability = new Ability(data.name, data.description)
      this.editAbility = data._id
      this.edit = true
    },
    async removeAbility(id) {
      await axios.delete(`${process.env.VUE_APP_URI}/abilities/${id}`, {headers: {token: this.token}})
      this.getAbilities()
    }
  },
  mounted() {
    this.getAbilities()
  }
})
</script>