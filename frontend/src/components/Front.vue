<template>
  <div class="front">
    <img src="../assets/front.png" class="front__img">
    <router-link to="/signin" tag="button" class="btn">Iniciar Sesion</router-link> 
    <router-link to="/signup" tag="button" class="btn">Registrarse</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Front'
})
</script>