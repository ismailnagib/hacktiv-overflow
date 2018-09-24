<template>
  <div id="app">
    <div id="nav" class="border-bottom fixed-top">
      <router-link to="/">hacktiv<span id='overflow'>overflow</span></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px 50px;
  text-align: left;
  font-size: 30px;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}
#overflow {
  color: #42b983;
}
</style>
