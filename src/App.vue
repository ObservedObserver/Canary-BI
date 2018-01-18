<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'semantic-ui-css/semantic.js'
export default {
  name: 'App',
  mounted () {
    this.$store.commit('globalDataInit')
  }
}
</script>
<style src="../node_modules/semantic-ui-css/semantic.css"></style>
<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
