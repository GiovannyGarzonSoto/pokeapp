<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Portada</router-link> |
      <router-link to="/control">Control</router-link>
    </div>
    <router-view/>
  </div>
</template>

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
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
