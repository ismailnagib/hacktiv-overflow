<template>
  <div id="app">
    <div id="nav" class="border-bottom fixed-top row">
      <router-link id='brand' to="/" class="col-3">hacktiv<span v-bind:style='{color: defaultColor}'>overflow</span></router-link>
      <loginform id='loginform' class="col-9"></loginform>
    </div>
    <router-view/>
  </div>
</template>

<script>
import loginform from '@/components/loginForm.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    loginform
  },
  computed: {
    ...mapState(['defaultColor'])
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
  padding: 20px 0px 20px 10%;
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
#loginform {
  text-align: right;
  right: 10%
}
button {
  border: none;
  cursor: pointer;
  height: 40px;
  padding: 10px 20px;
  border-radius: 20px;
}

.closeModal {
  margin-top: 1% !important;
  margin-right: 1% !important;
}
.iconBtn {
  margin: 5px 0;
  float: right;
  height: 30px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: white;
}
textarea:focus, input:focus, button:focus {
  outline: none;
}
.unselectable {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: white;
}
</style>
