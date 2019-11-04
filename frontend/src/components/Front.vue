<template>
  <div>
    <h1>Front</h1>
    <router-link to="/signin" tag="button">Iniciar Sesion</router-link> |
    <router-link to="/signup" tag="button">Registrarse</router-link>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Front'
})
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
button{
  border: 3px solid #2c3e50;
  border-radius: 6px;
  background: none;
  color: #2c3e50;
  font-weight: bolder;
  padding: .3rem;
}
</style>
