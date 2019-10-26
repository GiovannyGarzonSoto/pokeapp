<template>
  <div>
    <h1>Administrar Pokedex</h1>

    <router-link to="/pokemon">Administrar Pokemon</router-link> |
    <router-link to="/moves">Administrar Movimientos</router-link> |
    <router-link to="/abilities">Administrar Habilidades</router-link> 

  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
 
</style>
