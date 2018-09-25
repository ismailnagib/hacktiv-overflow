<template>
  <div id="app">
    <div id="nav" class="border-bottom fixed-top row">
      <router-link id='brand' to="/">hacktiv<span id='overflow' class="col-3">overflow</span></router-link>
      <loginform id='loginform' class="col-9"></loginform>
    </div>
    <router-view/>
  </div>
</template>

<script>
import loginform from '@/components/loginForm.vue'

export default {
  name: 'app',
  components: {
    loginform
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#brand {
  padding: 20px 50px;
  text-align: left;
  font-size: 30px;
}
#nav {
  height: 9vh;
  background-color: white;
}
#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}
#overflow {
  color: #42b983;
}
#loginform {
  text-align: right;
  right: 3%;
}

textarea:focus, input:focus, button:focus {
  outline: none;
}
.unselectable {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
