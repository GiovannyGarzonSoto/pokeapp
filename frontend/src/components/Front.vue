<template>
  <main>
    <img src="../assets/pokemon-go.svg">
    <router-link to="/signin" tag="button">Iniciar Sesion</router-link> 
    <router-link to="/signup" tag="button">Registrarse</router-link>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Front'
})
</script>

<style scoped lang="scss">
  main{
    position: absolute;
    top: 15%;
    display: grid;
    width: calc(100vw - 1rem);
    grid-template-areas: 
      "image"
      "signin" 
      "signup";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-gap: 1rem;
    justify-items: center;
  }
  img{
    grid-area: image;
    width: 30%;
    justify-self: center;
  }
  button{
    border: 3px solid #2c3e50;
    border-radius: 1rem;
    background: none;
    color: #2c3e50;
    font-weight: bolder;
    padding: .3rem;
    width: 13rem;

    &:nth-child(1){
      grid-area: signin;
    }

    &:nth-child(2){
    grid-area: signup;
    }
  }
</style>