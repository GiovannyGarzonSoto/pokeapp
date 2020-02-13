<template>
  <div class="signin">
    <h2 class="heading-2 form__title">Iniciar Sesion</h2>
    <form @submit.prevent="signin" class="form">
      <input type="text" name="name" class="form__input" placeholder="Nombre" v-model="user.name" required>
      <input type="password" name="password" class="form__input" placeholder="Contraseña" v-model="user.password" required>
      <button class="btn">Enviar</button>
    </form>
    <router-link to="/" class="btn" tag="button">Volver</router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import vuex, { mapState, mapActions } from 'vuex'

class User {
  constructor(name, email, password) {
    this.name = name
    this.email = email
    this.password = password
  }
}

export default Vue.extend({
  name: 'Signin',
  data() {
    return {
      user: new User()
    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    ...mapActions(['saveUser']),
    async signin() {
      const data = await axios.post(`${process.env.VUE_APP_URI}/signin`, {
        name: this.user.name,
        password: this.user.password
      })
      this.saveUser(data.data.token)
    }
  }
})
</script>