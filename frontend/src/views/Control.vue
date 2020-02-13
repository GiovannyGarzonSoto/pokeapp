<template>
    <div class="control">
        <h2 class="heading-2">Control</h2>
        <div class="control__buttons">
            <button class="btn" @click="selected='Abilities'"><img src="../assets/menu.svg" class="control-btn__img"> Habilidades</button>
            <button class="btn" @click="selected='Moves'"><img src="../assets/mover.svg" class="control-btn__img"> Movimientos</button> 
            <button class="btn" @click="selected='Pokemon'"><img src="../assets/pokebola.svg" class="control-btn__img"> Pokemon</button>
        </div>
        <component :is="selected"></component>
    </div>
</template>

<script>
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