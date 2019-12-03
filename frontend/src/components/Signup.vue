<template>
  <main>
   <h1>Registrarse</h1>
   <form @submit.prevent="signup">
      <input type="text" name="name" placeholder="Nombre" v-model="user.name" required>
      <input type="email" name="email" v-model="user.email" placeholder="Correo">
      <input type="password" name="password" v-model="user.password" placeholder="Contraseña" required>
      <button>Enviar</button>
   </form>
   <router-link to="/" tag="button">Volver</router-link>
  </main>
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
