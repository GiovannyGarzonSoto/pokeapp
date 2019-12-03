<template>
  <div id="app">
    <div id="nav">
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

<style lang="scss">
*,*:before,*:after{
  box-sizing: inherit;
}
html{
  box-sizing:border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display:flex;
  justify-content: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    cursor: pointer;
    text-decoration: underline;
    &.router-link-exact-active {
      color: #42b983;
    }
    
  }
}
</style>
