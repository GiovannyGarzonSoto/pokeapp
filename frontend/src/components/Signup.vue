<template>
   <div>
        <h1>Registrate</h1>
        <form @submit.prevent="signup">
            <input type="text" name="name" placeholder="Nombre" required>
            <input type="mail" placeholder="Correo">
            <input type="password" name="password" placeholder="Contraseña" required>
            <input type="password" name="rePassword" placeholder="Repetir Contraseña" required>
            <button>Registrarse</button>
        </form>
        O puedes <a href="">iniciar sesion</a> 
   </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        signup() {

        }
    }
}
</script>

<style scoped lang="sass">

</style>
