<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view/>
  </div>
</template>
<!--<script>-->
  <!--import Canvas from './components/js/canvas'-->
  <!--export default {-->
    <!--name: 'App',-->
    <!--components: {-->
      <!--Canvas-->
    <!--}-->
  <!--}-->
<!--</script>-->
<style lang="less">
#app {
  padding:0px;

  margin:0px;

  position:absolute;

  top:0px;

  left:0px;

  width:100%;

  height:100%;

  border:hidden;
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
}
/*canvas{*/
  /*background: rgb(226, 225, 225);*/
  /*opacity: 0.3;*/
/*}*/
/*#nav {*/
  /*padding: 30px;*/
  /*a {*/
    /*font-weight: bold;*/
    /*color: #2c3e50;*/
    /*&.router-link-exact-active {*/
      /*color: #42b983;*/
    /*}*/
  /*}*/
/*}*/
</style>
