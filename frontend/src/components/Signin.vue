<template>
   <div>
        <h1>Inicia Sesion</h1>
        <form @submit.prevent="signin">
           <input type="text" name="name" placeholder="Nombre" required>
           <input type="password" name="password" placeholder="Contraseña" required>
           <button>Iniciar</button>
        </form>
        O puedes <a href="">registrarte</a> 
   </div>
</template>

<script>
export default {
   data() {
      return {

      }
   },
   methods: {
      signin(){
            
      }

   }
}
</script>

<style scoped lang="sass">

</style>
