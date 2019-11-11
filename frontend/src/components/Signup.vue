<template>
  <main>
   <h1>Registrarse</h1>
   <form>
      <input type="text" name="name" placeholder="Nombre" v-model="name">
      <input type="email" placeholder="Correo">
      <input type="password" name="password" placeholder="Contraseña">
      <input type="password" name="password" placeholder="Repetir Contraseña">
      <button type="submit">Enviar</button>
   </form>
   <button>Volver</button>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';

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
