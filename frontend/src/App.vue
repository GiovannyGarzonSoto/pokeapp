<template>
  <div id="app">
    <div class="nav">
      <router-link to="/selector" v-if="isActive">Selector</router-link> 
      <router-link to="/control" v-if="isActive">| Control |</router-link>
      <a @click="closeSession()" v-if="isActive">Salir</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions(['closeSession', 'readToken'])
  },
  computed: {
    ...mapGetters(['isActive'])
  },
  mounted() {
    this.readToken
  }
}
</script>