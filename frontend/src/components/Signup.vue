<template>
  <div class="signup">
   <h2 class="heading-2 signup__title typed">Registrarse</h2>
   <form @submit.prevent="signup" class="form">
      <input type="text" name="name" class="form__input" placeholder="Nombre" v-model="user.name" required>
      <input type="email" name="email" class="form__input" v-model="user.email" placeholder="Correo">
      <input type="password" name="password" class="form__input" v-model="user.password" placeholder="Contraseña" required>
      <button class="btn">Enviar</button>
   </form>
   <router-link to="/" class="btn" tag="button">Volver</router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

class User {
  constructor(name, email, password) {
    this.name = name
    this.email = email
    this.password = password
  }
}

export default Vue.extend({
  name: 'Signup',
  data() {
    return {
      user: new User()
    }
  },
  methods: {
    async signup() {
      const data = await axios.post(`${process.env.VUE_APP_URI}/signup`, {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      if(data.data.success){
        this.$router.push({name: 'signin'})
      }else {
        this.$router.push({name: 'signup'})
      }
      this.user = new User()
    }
  }
})
</script>