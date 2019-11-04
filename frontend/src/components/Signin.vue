<template>
  <div class="hello">
    <h1>Iniciar Sesion</h1>
    <form>
      <input type="text" name="name" placeholder="Nombre">
      <input type="email" placeholder="Correo">
      <input type="password" name="password" placeholder="Contraseña">
    </form>
    <button>Volver</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Signin',
  
});
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
</style>
