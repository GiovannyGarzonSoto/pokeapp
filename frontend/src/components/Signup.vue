<template>
  <main>
   <h1>Registrarse</h1>
   <form>
      <input type="text" name="name" placeholder="Nombre" v-model="name" required>
      <input type="email" placeholder="Correo">
      <input type="password" name="password" placeholder="Contraseña" required>
      <input type="password" name="password" placeholder="Repetir Contraseña" required>
      <button type="submit">Enviar</button>
   </form>
   <router-link to="/" tag="button">Volver</router-link>
  </main>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {} from 'vuex'

class User {
  constructor(name, email, password, google) {
    this.name = name
    this.email = email
    this.password = password
    this.google = google
  }
}

export default Vue.extend({
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    validPassword() {

    }
  }
})
</script>

<style scoped lang="scss">
main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form{
  display: flex;
  flex-direction: column;

  & input{
    margin-top: 1rem;
    border: 2px solid #364c63;
    border-radius: .8rem;
    padding: .3rem;
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
</style>
