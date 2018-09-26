<template>
  <div id="app">
    <div id="nav" class="border-bottom fixed-top row">
      <div id='brushBtn' class="col-1"><colorchanger></colorchanger></div>
      <router-link id='brand' to="/" class="col-2">hacktiv<span v-bind:style='{color: defaultColor}'>overflow</span></router-link>
      <loginform id='loginform' class="col-9"></loginform>
    </div>
    <router-view/>
  </div>
</template>

<script>
import loginform from '@/components/loginForm.vue'
import colorchanger from '@/components/colorChanger.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    loginform,
    colorchanger
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
  padding: 20px 0px 20px 0;
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
  right: 5%;
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
#app #brushBtn {
  padding: 25px 0px 20px 0px;
  text-align: right;
}
#app #brushBtn button {
  background-color: white;
}
</style>
