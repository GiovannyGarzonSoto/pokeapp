<template>
    <div>
        <h1>Control</h1>
        <button @click="selected = 'Abilities'">Habilidades</button> |
        <button @click="selected = 'Moves'">Movimientos</button> |
        <button @click="selected = 'Pokemon'">Pokemon</button>
        <component :is="selected"></component>
    </div>
</template>

<script lang="ts">
import Abilities from '../components/Abilities.vue'
import Moves from '../components/Moves.vue'
import Pokemon from '../components/Pokemon.vue'

export default {
    components: {
        Abilities,
        Moves,
        Pokemon
    },
    data() {
        return {
            selected: ''
        }
    }
}
</script>

<style lang="scss">
    #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    }

    #nav {
    padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
            color: #42b983;
            }
        }
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