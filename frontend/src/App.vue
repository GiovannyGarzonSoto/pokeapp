<template>
  <div>
    <nav>
      <ul>
        <li><a href="#">Portada</a></li>
        <li><a href="#">Aplicacion</a></li>
        <li><a href="#">Administrar</a></li>
        <li><a href="#">Sobre mi</a></li>
      </ul>
    </nav>
    <router-view/>

    <footer>
      <ul>
        <li><a href="https://www.facebook.com/giovanny.grotesquecannibal" target="_blank"><i class="fab fa-facebook fa-2x"></i></a></li>
        <li><a href="https://github.com/Giovanky" target="_blank"><i class="fab fa-github fa-2x"></i></a></li>
        <li><a href="https://www.instagram.com/amorfadiccion" target="_blank"><i class="fab fa-instagram fa-2x"></i></a></li>
      </ul>
    </footer>
      
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss">
:root{
  --color: rgb(49, 49, 49);
}
html{
  box-sizing: border-box;
  font-size: .9rem;
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  width: 100vw;
}
ul {
  display: flex;

  & li{
    list-style: none;

    & a{
      display: block;
      padding: .3rem 1rem;
      
      text-decoration: none;
      color: var(--color);
    }
  }
}

footer{
  position: absolute;
  bottom: 0;

  & ul{
    display: flex;
    width: calc(100vw - 5rem);
    justify-content: center;
    justify-items: center;

    & li i{
      height: 5rem;
      width: 5rem;
    }
  }
}

</style>
