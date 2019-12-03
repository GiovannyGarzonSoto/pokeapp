<template>
    <div>
        <h1>Control</h1>
        <button @click="selected='Abilities'">Habilidades</button> |
        <button @click="selected='Moves'">Movimientos</button> |
        <button @click="selected='Pokemon'">Pokemon</button>
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

<style scoped lang="scss">
    button{
        border: 3px solid #2c3e50;
        border-radius: 6px;
        background: none;
        color: #2c3e50;
        font-weight: bolder;
        padding: .3rem;
    }
</style>