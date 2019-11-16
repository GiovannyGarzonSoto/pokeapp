<template>
  <main>
    <div class="container" v-for="pkmn of allPokemon" :key="pkmn._id">
      <div class="visor">
        <img :src="pkmn.imageUrl">
      </div>
      <div class="information">
        <div class="types">
          <img :src="pkmn.type1.imageUrl" :alt="pkmn.type1.name">
          <img :src="pkmn.type2.imageUrl" :alt="pkmn.type2.name">
        </div>
        <div class="name">
          <template v-if="pkmn.number<10">
            <span>#00{{pkmn.number}}</span>
          </template>
          <template v-else-if="pkmn.number<100">
            <span>#0{{pkmn.number}}</span>
          </template>
          <template v-else>
            <span>#{{pkmn.number}}</span>
          </template>
          <span> {{pkmn.name}}</span>
        </div>
      </div>
    </div>
  </main>
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

<style scoped lang="scss">
main{
  display: flex;
  flex-direction: column;
}
.visor{

  & img {
    width: 15%;
    height: 15%; 
  }
}
</style>
