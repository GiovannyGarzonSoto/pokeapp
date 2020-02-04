<template>
  <main>
    <h1>Iniciar Sesion</h1>
    <form @submit.prevent="signin">
      <input type="text" name="name" placeholder="Nombre" v-model="user.name" required>
      <input type="password" name="password" placeholder="Contraseña" v-model="user.password" required>
      <button>Enviar</button>
    </form>
    <router-link to="/" tag="button">Volver</router-link>
  </main>
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
