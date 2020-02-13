<template>
  <div class="selector">
    <section class="selector__container" v-for="pkmn of allPokemon" :key="pkmn._id">
      <img :src="pkmn.imageUrl" class="selector__img">
      <div class="selector__info">
        <div class="selector__types">
          <img :src="pkmn.type1.imageUrl" :alt="pkmn.type1.name">
          <img :src="pkmn.type2.imageUrl" :alt="pkmn.type2.name">
        </div>
        <p class="selector__name">
          <template v-if="pkmn.number<10"><span>#00{{pkmn.number}}</span></template>
          <template v-else-if="pkmn.number<100"><span>#0{{pkmn.number}}</span></template>
          <template v-else><span>#{{pkmn.number}}</span></template>
          <span>{{pkmn.name}}</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  name: 'Selector',
  data() {
    return {
    
    }
  },
  computed: {
    ...mapGetters(['allPokemon'])
  },
  methods: {
    ...mapActions(['getPokemon'])
  },
  created(){
    this.getPokemon()
  }
})
</script>