<template>
  <header><div id="nav">
    <router-link to="/">Билеты</router-link> |
    <router-link to="/about">О нас</router-link>
  </div></header>
  
  <router-view style="padding-bottom:50px;"/>
  <Footer id="footer"></Footer>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Footer,
  }
}
</script>


<style>

header {
  background-color: #42b983;
}

#footer {
  position: fixed;
  width: 100%;
  bottom: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: white;
}

</style>
